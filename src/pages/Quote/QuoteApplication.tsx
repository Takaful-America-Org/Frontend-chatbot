import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import ChatInterface from './ChatInterface';
import WelcomeScreen from './WelcomeScreen';
import { conversationFlow, progressTexts } from '../../data/ConversationFlow';
import "../../styles/quote.css";
import { registerUser } from '../../api/auth';
import { createProperty } from '../../api/property';
import { createQuote } from '../../api/quote';
import type { PropertyCreateRequestSchema, QuoteCreateRequestSchema } from '../../api/schemas';

const QuoteApplication = () => {
  const [conversationStep, setConversationStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>({});
  const [awaitingUser, setAwaitingUser] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showFinalOptions, setShowFinalOptions] = useState(false);

  const addAssistantMessage = (content: string, step?: any, extra?: any) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), type: 'assistant', content, step, ...(extra || {}) }
    ]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', content }]);
  };

  const getFriendlyName = () => {
    const rawName = userData.full_name || userData.name || '';
    if (!rawName || typeof rawName !== 'string') return 'friend';
    const first = rawName.trim().split(/\s+/)[0];
    return first || 'friend';
  };

  const processNextStep = () => {
    const step = conversationFlow[conversationStep];
    if (!step) return;

    setIsProcessing(true);
    setShowTyping(true);
    setAwaitingUser(false);

    const messageText = typeof step.message === 'function' ? step.message(getFriendlyName()) : step.message;

    setTimeout(() => {
      addAssistantMessage(messageText, step);
      setShowTyping(false);

      if (step.type === 'loading' || step.id === 'generate_quote') {
        // Call backend APIs to register user, create property, and create quote
        (async () => {
          try {
            // 1) Register or upsert user
            const fullName: string = userData.full_name || '';
            const [firstName, ...rest] = (fullName || '').trim().split(/\s+/);
            const lastName = rest.join(' ') || firstName || 'User';
            const userRes = await registerUser({
              email: String(userData.email || '').trim(),
              first_name: firstName || 'User',
              last_name: lastName || 'User',
              phone_number: String(userData.phone_number || '').trim() || '+10000000000',
            });

            const userId = userRes.user_id;

            // Helpers: map UI fields to API enums/fields
            const mapPropertyType = (v: string | undefined) => {
              switch (v) {
                case 'single_family':
                  return 'single_family';
                case 'townhouse':
                  return 'townhouse';
                case 'apartment':
                case 'condo':
                  return 'condo';
                case 'duplex':
                  return 'single_family';
                default:
                  return 'single_family';
              }
            };

            const mapConstructionMaterial = (v: string | undefined) => {
              switch (v) {
                case 'frame':
                  return 'frame';
                case 'masonry':
                  return 'masonry';
                case 'steel':
                  return 'steel';
                case 'mixed':
                case 'other':
                  return 'other';
                default:
                  return 'frame';
              }
            };

            const mapFoundation = (v: string | undefined) => {
              switch (v) {
                case 'slab':
                  return 'slab';
                case 'basement':
                  return 'basement';
                case 'crawl_space':
                  return 'crawl_space';
                case 'pier_post':
                case 'pier_beam':
                  return 'pier_beam';
                default:
                  return 'slab';
              }
            };

            const mapGarage = (v: string | undefined) => (v && v !== 'none' ? true : false);
            const mapPool = (v: string | undefined) => (v && v !== 'none' ? true : false);

            const storiesStr = String(userData.stories || '1');
            const stories = parseInt(storiesStr === '3' ? '3' : storiesStr, 10) || 1;

            // 2) Create property
            const propertyPayload: PropertyCreateRequestSchema = {
              user_id: userId,
              street_address: String(userData.street_address || '').trim(),
              city: String(userData.city || '').trim(),
              state: String(userData.state || '').trim(),
              zip_code: String(userData.zip_code || '').trim(),
              construction_year: parseInt(String(userData.construction_year || new Date().getFullYear()), 10),
              home_value: parseInt(String(userData.home_value || '300000'), 10),
              square_footage: parseInt(String(userData.square_footage || '1500'), 10),
              property_type: mapPropertyType(userData.property_type) as any,
              construction_material: mapConstructionMaterial(userData.construction_material) as any,
              roof_type: (userData.roof_type || 'composition_shingle') as any,
              foundation_type: mapFoundation(userData.foundation_type) as any,
              stories: stories,
              bedrooms: userData.bedrooms ? parseInt(String(userData.bedrooms), 10) : null,
              bathrooms: userData.bathrooms ? parseInt(String(userData.bathrooms), 10) : null,
              garage: mapGarage(userData.garage),
              pool: mapPool(userData.pool),
            };

            const propertyRes = await createProperty(propertyPayload);

            // 3) Create quote
            const homeValueNum = propertyPayload.home_value;
            const dwellingLimit = Math.min(Math.round(homeValueNum * 1.2), homeValueNum + 100000);
            const deductible = parseInt(String(userData.deductible || '1000'), 10);

            const quotePayload: QuoteCreateRequestSchema = {
              property_id: propertyRes.property.property_id,
              user_id: userId,
              dwelling_limit: dwellingLimit,
              deductible: deductible,
            };

            const quoteRes = await createQuote(quotePayload);

            // Build UI-friendly quote summary
            const total = parseFloat(quoteRes.total_premium);
            const monthly = Math.round(total / 12);
            const normalizedQuote = {
              monthly,
              annual: Math.round(total),
              dwelling_limit: quoteRes.quote_version.dwelling_limit,
              discounts: quoteRes.quote_version.discounts || [],
            };

            addAssistantMessage('quote_result', step, { quote: normalizedQuote });
          } catch (e) {
            console.error('Failed to create quote via API:', e);
            addAssistantMessage('Sorry, I could not generate a quote right now. Please try again.');
          }

          // After showing the loading and quote message, open final options in chat
          setTimeout(() => {
            setConversationStep(conversationFlow.length);
            setAwaitingUser(true);
            setIsProcessing(false);
            setShowFinalOptions(true);
          }, 1500);
        })();
      } else {
        setAwaitingUser(true);
        setIsProcessing(false);
      }
    }, 800);
  };

  const handleUserResponse = (value: any, step: any) => {
    if (isProcessing) return;

    const isSelection = value && typeof value === 'object' && 'text' in value && 'value' in value;
    const messageContent = isSelection ? value.text : (typeof value === 'string' ? value : value.text || value);
    addUserMessage(messageContent);

    // Update user data if step has a field
    if (step?.field) {
      const storedValue = isSelection ? value.value : messageContent;
      setUserData((prev: any) => ({ ...prev, [step.field]: storedValue }));
    }

    setTimeout(() => {
      setConversationStep(prev => prev + 1);
    }, 800);
  };

  const handleFinalAction = (action: string) => {
    // Show assistant response for each final action
    setShowTyping(true);
    setAwaitingUser(false);

    const quoteRef = `TKF-${Date.now().toString().slice(-6)}`;

    setTimeout(() => {
      setShowTyping(false);
      switch (action) {
        case 'proceed':
          addAssistantMessage(
            "Excellent choice! 🎉\n\nI'm connecting you with our underwriting team to finalize your Shariah-compliant policy. You'll receive:\n\n• Policy documents within 24 hours\n• Payment setup instructions\n• Your Islamic compliance certificate\n• Direct contact for your account manager\n\nBarakallahu feeki for choosing Takaful! Your home will be protected according to Islamic principles."
          );
          break;
        case 'customize':
          addAssistantMessage(
            `Perfect! Our coverage specialist will help you customize your policy to fit your exact needs and budget.\n\nThey'll contact you within 15 minutes to discuss:\n• Adjusting coverage limits\n• Adding optional coverages\n• Optimizing your deductible\n• Special endorsements\n\nYour quote reference number is: ${quoteRef}`
          );
          break;
        case 'agent':
          addAssistantMessage(
            "Wonderful! I'm scheduling a call with one of our licensed Takaful specialists right now.\n\nExpected call time: Within 10 minutes\nSpecialist: Will have your complete quote ready\nTopics: Coverage details, Islamic compliance, next steps\n\nThey'll answer any questions about our Shariah-compliant approach and help you move forward.\n\nJazakallahu khairan for your patience!"
          );
          break;
        case 'email':
          addAssistantMessage(
            `Sending complete quote details to ${String(userData.email || '').trim() || 'your email'} now...\n\nYour email will include:\n📧 Detailed coverage breakdown\n📊 Premium calculation\n📜 Islamic compliance certificate\n📋 Policy application\n📞 Direct contact information\n🔒 Secure payment portal link\n\nExpected delivery: 2-3 minutes\nQuote reference: ${quoteRef}\n\nAlhamdulillah! Thank you for choosing Takaful for your home protection needs.`
          );
          break;
        default:
          addAssistantMessage('Thanks! We will follow up shortly.');
      }

      // After responding, keep final options hidden
      setShowFinalOptions(false);
      setAwaitingUser(false);
    }, 900);
  };

  const startConversation = () => {
    setShowWelcome(false);
    setTimeout(() => setConversationStep(0), 500);
  };

  useEffect(() => {
    if (!showWelcome && !isProcessing) processNextStep();
  }, [conversationStep, showWelcome]);

  if (showWelcome) {
    return (
      <MainLayout>
        <WelcomeScreen onStart={startConversation} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ChatInterface
        messages={messages}
        conversationStep={conversationStep}
        userData={userData}
        awaitingUser={awaitingUser}
        showTyping={showTyping}
        onUserResponse={handleUserResponse}
        onFinalAction={handleFinalAction}
        progressTexts={progressTexts}
        conversationFlow={conversationFlow}
        showFinalOptions={showFinalOptions}
      />
    </MainLayout>
  );
};

export default QuoteApplication;

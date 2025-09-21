import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import ChatInterface from "../../components/chat/ChatInterface";
import WelcomeScreen from "../../components/chat/WelcomeScreen";
import { conversationFlow, progressTexts } from "../../data/ConversationFlow";
import "../../styles/quote.css";
import { registerUser } from "../../api/auth";
import { createProperty } from "../../api/property";
import { createQuote } from "../../api/quote";
import type {
  PropertyCreateRequestSchema,
  QuoteCreateRequestSchema,
} from "../../api/schemas";

const QuoteApplication: React.FC = () => {
  const [conversationStep, setConversationStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>({});
  const [awaitingUser, setAwaitingUser] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const navigate = useNavigate();

  const addAssistantMessage = (
    content: string,
    step?: any,
    extra?: Record<string, any>
  ) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "assistant", content, step, ...(extra || {}) },
    ]);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "user", content },
    ]);
  };

  const getFriendlyName = () => {
    const rawName = userData.full_name || userData.name || "";
    if (!rawName || typeof rawName !== "string") return "friend";
    const first = rawName.trim().split(/\s+/)[0];
    return first || "friend";
  };

  const processNextStep = () => {
    const step = conversationFlow[conversationStep];
    if (!step) return;

    setIsProcessing(true);
    setShowTyping(true);
    setAwaitingUser(false);

    const messageText =
      typeof step.message === "function"
        ? step.message(getFriendlyName())
        : step.message;

    setTimeout(() => {
      addAssistantMessage(messageText, step);
      setShowTyping(false);

      if (step.type === "loading" || step.id === "generate_quote") {
        (async () => {
          try {
            // 1️⃣ Register User
            const registeredUser = await registerUser({
              name: userData.full_name,
              email: userData.email,
              phone: userData.phone,
            });
            const userId = registeredUser?.id;

            // 2️⃣ Create Property
            const propertyReq: PropertyCreateRequestSchema = {
              address: userData.address,
              state: userData.state,
              zip_code: userData.zip_code,
              dwelling_limit: parseFloat(userData.dwelling_limit),
              year_built: parseInt(userData.year_built, 10),
            };
            const propertyRes = await createProperty(userId, propertyReq);
            const propertyId = propertyRes?.id;

            // 3️⃣ Create Quote
            const quoteReq: QuoteCreateRequestSchema = {
              user_id: userId,
              property_id: propertyId,
              coverage_type: "homeowners",
            };
            const quoteRes = await createQuote(userId, quoteReq);

            const normalizedQuote = {
              monthly: quoteRes?.premium_monthly,
              annual: quoteRes?.premium_annual,
              dwelling_limit: quoteRes?.dwelling_limit,
              coverage: quoteRes?.coverage,
            };

            addAssistantMessage("quote_result", step, { quote: normalizedQuote });
          } catch (e) {
            console.error("Failed to create quote via API:", e);
            addAssistantMessage(
              "Sorry, I could not generate a quote right now. Please try again."
            );
          }

          setTimeout(() => {
            setConversationStep(conversationFlow.length);
            setAwaitingUser(true);
            setIsProcessing(false);
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

    const isSelection =
      value && typeof value === "object" && "text" in value && "value" in value;
    const messageContent = isSelection
      ? value.text
      : typeof value === "string"
      ? value
      : value.text || value;
    addUserMessage(messageContent);

    if (step?.field) {
      const storedValue = isSelection ? value.value : messageContent;
      setUserData((prev: any) => ({ ...prev, [step.field]: storedValue }));
    }

    setTimeout(() => {
      setConversationStep((prev) => prev + 1);
    }, 800);
  };

  const handleFinalAction = (action: string) => {
    console.log("Final action:", action);
    if (action === "proceed" || action === "view_dashboard") {
      navigate("/dashboard");
    }
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
      />
    </MainLayout>
  );
};

export default QuoteApplication;

import React, { useState, useRef, useEffect } from 'react';
import { finalOptions } from '../../data/ConversationFlow';

interface ChatInputProps {
  inputType: 'input' | 'options' | 'loading';
  currentStep: any;
  showFinalOptions?: boolean;
  onUserInput: (value: { text: string; sender: 'user' }) => void;
  onOptionSelect?: (selection: { text: string; value: string }) => void;
  onFinalAction: (action: string) => void;
  userData: any;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputType,
  currentStep,
  showFinalOptions = false,
  onUserInput,
  onOptionSelect,
  onFinalAction,
  userData
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when it becomes active
  useEffect(() => {
    if (inputType === 'input' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputType]);

  // Validate input
  useEffect(() => {
    if (currentStep?.validation) {
      setIsValid(currentStep.validation(inputValue));
    } else {
      setIsValid(inputValue.trim().length > 0);
    }
  }, [inputValue, currentStep]);

  // Handle send button click
  const handleSend = () => {
    if (!isValid || !inputValue.trim()) return;
    
    onUserInput({ text: inputValue.trim(), sender: 'user' });
    setInputValue('');
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      handleSend();
    }
  };

  // Handle option click
  // reference to avoid unused var warning
  void userData;

  const handleOptionClick = (option: any) => {
    if (showFinalOptions) {
      // Final actions are not part of the scripted flow; echo and trigger action
      onUserInput({ text: option.text, sender: 'user' });
      onFinalAction(option.action);
    } else if (onOptionSelect) {
      // Pass both text and value upward; parent will add a single user message
      onOptionSelect({ text: option.text, value: option.value });
    }
  };

  // Get display text for option
  const getOptionText = (option: any) => {
    return showFinalOptions ? option.text : option.text;
  };

  // (removed unused getOptionValue)

  // Text Input Component
  if (inputType === 'input' && currentStep) {
    return (
      <div className="flex items-end gap-3">
        <input
          ref={inputRef}
          type={currentStep.inputType || 'text'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={currentStep.placeholder || 'Type your answer...'}
          className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full text-base transition-all duration-300 focus:outline-none focus:border-[var(--gold)] bg-white font-poppins"
          style={{ minHeight: '50px' }}
        />
        <button
          onClick={handleSend}
          disabled={!isValid}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 ${
            isValid 
              ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--emerald)] hover:scale-110 hover:shadow-lg cursor-pointer' 
              : 'bg-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          →
        </button>
      </div>
    );
  }

  // Options Component
  if (inputType === 'options') {
    // Use final options if showing final options, otherwise use current step options
    const options = showFinalOptions ? finalOptions : (currentStep?.options || []);
    
    return (
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {options.map((option: any, index: number) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="w-full bg-[var(--cream)] hover:bg-gradient-to-r hover:from-[var(--gold)]/10 hover:to-[var(--emerald)]/10 border-2 border-transparent hover:border-[var(--gold)] rounded-2xl p-4 text-left transition-all duration-300 hover:transform hover:translate-x-2 group"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl w-8 text-center flex-shrink-0">
                {option.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[var(--deep-blue)] group-hover:text-[var(--gold)] transition-colors duration-300">
                  {getOptionText(option)}
                </div>
                <div className="text-sm text-[var(--text-light)] mt-1 leading-snug">
                  {option.desc || option.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  // Return null for loading state (handled by parent)
  return null;
};

export default ChatInput;
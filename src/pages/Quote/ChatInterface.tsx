import React from 'react';
import ProgressIndicator from './ProgressIndicator';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  messages: any[];
  conversationStep: number;
  userData: any;
  awaitingUser: boolean;
  showTyping: boolean;
  onUserResponse: (value: any, step: any) => void;
  onFinalAction: (action: string) => void;
  progressTexts: string[];
  conversationFlow: any[];
  showFinalOptions?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  conversationStep,
  userData,
  awaitingUser,
  showTyping,
  onUserResponse,
  onFinalAction,
  progressTexts,
  conversationFlow,
  showFinalOptions
}) => {
  // Create wrapper functions that match the expected signatures
  const handleUserInput = (value: { text: string; sender: "user"; }) => {
    onUserResponse(value, conversationFlow[conversationStep]);
  };

  const handleOptionSelect = (selection: { text: string; value: string; }) => {
    onUserResponse(selection, conversationFlow[conversationStep]);
  };

  return (
    <div className="relative flex flex-col h-[70vh] max-h-[70vh] overflow-hidden rounded-[25px] shadow-lg bg-[var(--cream)] takaful-quote">
      <div className="absolute top-0 left-0 right-0 h-[5px] bg-[linear-gradient(90deg,var(--gold),var(--emerald),var(--mint))]" />
      <ProgressIndicator currentStep={conversationStep} progressTexts={progressTexts} />
      <ChatHeader showTyping={showTyping} />
      <div className="flex-1 min-h-0 overflow-hidden">
        <MessageList messages={messages} />
      </div>
      <div className="border-t border-gray-100 bg-white p-4">
        {awaitingUser && (
          <ChatInput
            inputType={showFinalOptions ? 'options' : (conversationFlow[conversationStep]?.options ? 'options' : 'input')}
            currentStep={conversationFlow[conversationStep]}
            showFinalOptions={Boolean(showFinalOptions)}
            onUserInput={handleUserInput}
            onOptionSelect={handleOptionSelect}
            onFinalAction={onFinalAction}
            userData={userData}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

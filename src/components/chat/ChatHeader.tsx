import React from 'react';
import TypingIndicator from './TypingIndicator';

interface ChatHeaderProps {
  showTyping: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ showTyping }) => {
  return (
    <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-[#FAF8F3]">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#2E8B57] flex items-center justify-center text-xl text-white">
        🤖
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-serif text-[#0B2545] mb-1">Aisha - Takaful Assistant</h3>
        <p className="text-gray-500 text-sm">Shariah-Compliant Insurance Specialist</p>
      </div>

      {/* Typing Indicator */}
      {showTyping && <TypingIndicator />}
    </div>
  );
};

export default ChatHeader;

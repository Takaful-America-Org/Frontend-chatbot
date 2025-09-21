import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 text-[var(--text-light)] text-xs ml-auto takaful-quote">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-[var(--emerald)] rounded-full animate-bounce"></span>
        <span
          className="w-2 h-2 bg-[var(--emerald)] rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        ></span>
        <span
          className="w-2 h-2 bg-[var(--emerald)] rounded-full animate-bounce"
          style={{ animationDelay: '0.4s' }}
        ></span>
      </div>
      <span className="italic">Aisha is typing...</span>
    </div>
  );
};

export default TypingIndicator;

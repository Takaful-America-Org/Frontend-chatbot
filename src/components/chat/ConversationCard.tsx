import React from 'react';

const ConversationCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        relative flex flex-col min-h-96 overflow-hidden
        rounded-[25px] shadow-lg
        bg-[var(--cream)] takaful-quote
      "
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[5px] bg-[linear-gradient(90deg,var(--gold),var(--emerald),var(--mint))]" />
      
      {children}
    </div>
  );
};

export default ConversationCard;

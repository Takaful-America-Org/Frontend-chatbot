import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center py-8 takaful-quote">
      {/* Spinner */}
      <div
        className="
          w-10 h-10 mr-4
          rounded-full animate-spin
          border-[3px] border-[var(--gold)] border-t-[var(--emerald)]
        "
      ></div>

      {/* Text */}
      <span className="text-[var(--text-light)] font-medium">
        Processing...
      </span>
    </div>
  );
};

export default LoadingIndicator;

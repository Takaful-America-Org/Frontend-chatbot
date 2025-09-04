import React from 'react';

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 takaful-quote">
      {/* White Card Container */}
      <div className="bg-white rounded-[25px] p-16 shadow-md max-w-2xl w-full relative overflow-hidden">
        {/* Subtle Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-[25px] bg-gradient-to-r from-[var(--gold)] via-[var(--emerald)] to-[var(--mint)]" />

        {/* Progress Text Top Right */}
        <div className="absolute top-6 right-6 text-sm text-gray-500 font-medium">
          Getting Started
        </div>

        {/* Card Content */}
        <div className="relative z-10">
          {/* Hero Icon */}
          <div className="text-7xl mb-6">🏡</div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--deep)] mb-4">
            Welcome to Takaful Home Insurance
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Get a personalized, Shariah-compliant home insurance quote in just a few minutes. 
            Our AI assistant will guide you through each step.
          </p>

          {/* CTA Button */}
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-[var(--gold)] to-[var(--emerald)] text-white px-8 py-5 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start My Quote Journey →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

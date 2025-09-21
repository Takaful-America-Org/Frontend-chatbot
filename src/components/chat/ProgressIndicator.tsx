import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  progressTexts: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, progressTexts }) => {
  const currentProgress = Math.min(currentStep, progressTexts.length - 1);

  return (
    <div
      className="
        absolute top-4 right-4 z-10
        bg-[var(--pearl)] border border-[rgba(0,0,0,0.05)]
        rounded-xl px-3 py-1.5
        text-[11px] font-medium
        text-[var(--text-dark)]
        shadow-sm
      "
    >
      <span>{progressTexts[currentProgress]}</span>
    </div>
  );
};

export default ProgressIndicator;

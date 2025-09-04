import React from 'react';

interface TextInputProps {
  step: any;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ step, value, onChange, onSubmit }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const isValid = step?.validation ? step.validation(value) : value.trim().length > 0;

  return (
    <div className="flex gap-3 items-end takaful-quote">
      {/* Input */}
      <input
        type={step?.inputType || 'text'}
        className="
          flex-1 px-6 py-4 rounded-full text-base font-medium
          border-2 border-[var(--pearl)] bg-white
          placeholder-[var(--text-light)]
          transition-all focus:outline-none
          focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]
        "
        placeholder={step?.placeholder || 'Type your answer...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        autoFocus
      />

      {/* Submit button */}
      <button
        className={`
          w-12 h-12 rounded-full flex items-center justify-center text-lg
          text-white transition-all duration-200
          bg-[linear-gradient(135deg,var(--gold),var(--emerald))]
          hover:scale-110 hover:shadow-[0_0_12px_var(--gold)]
          ${!isValid ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : ''}
        `}
        onClick={onSubmit}
        disabled={!isValid}
      >
        ➤
      </button>
    </div>
  );
};

export default TextInput;

import React from 'react';

interface Option {
  icon: string;
  text: string;
  desc: string;
  value: string;
}

interface OptionsInputProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

const OptionsInput: React.FC<OptionsInputProps> = ({ options, onSelect }) => {
  return (
    <div
      className="
        flex flex-col gap-3 mt-4 max-h-80 overflow-y-auto pr-2
        scrollbar-thin takaful-quote
      "
    >
      {options.map((option: Option, index: number) => (
        <div
          key={index}
          className="
            bg-[var(--pearl)]
            border-2 border-transparent
            rounded-[20px] p-6 cursor-pointer
            transition-all duration-300
            hover:border-[var(--gold)] hover:shadow-md hover:-translate-y-1
            flex items-center gap-4
          "
          onClick={() => onSelect(option)}
        >
          {/* Icon */}
          <div className="text-2xl w-9 text-center flex-shrink-0">
            {option.icon}
          </div>

          {/* Text */}
          <div className="flex-1">
            <div className="font-semibold text-[var(--deep)] mb-1">
              {option.text}
            </div>
            <div className="text-[var(--text-light)] text-sm leading-relaxed">
              {option.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionsInput;

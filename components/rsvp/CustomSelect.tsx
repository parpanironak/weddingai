import React, { useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  isOpen,
  onToggle,
  icon
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[10px] uppercase tracking-widest text-scandi-charcoal/60 mb-1.5 font-bold">
        {label}
      </label>
      
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`
          w-full text-left bg-white/60 hover:bg-white/80 border p-3 pl-4 text-sm flex justify-between items-center rounded-2xl transition-colors
          focus:outline-none focus:border-scandi-gold
          ${isOpen ? 'border-scandi-gold bg-white/70' : 'border-scandi-charcoal/10'}
        `}
      >
        <span className={`flex items-center gap-2 truncate ${value ? 'text-scandi-charcoal' : 'text-scandi-charcoal/40'}`}>
           {icon && <span className="text-scandi-charcoal/60">{icon}</span>}
           {selectedOption ? (
             <span className="flex items-center gap-2">
                {selectedOption.icon}
                {selectedOption.label}
             </span>
           ) : placeholder}
        </span>
        <ChevronDown size={14} className={`transition-transform text-scandi-charcoal/40 ${isOpen ? 'rotate-180 text-scandi-gold' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white shadow-xl rounded-2xl border border-scandi-charcoal/10 max-h-56 overflow-hidden overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
           {options.map((option) => {
             const isSelected = option.value === value;
             return (
               <div
                 key={option.value}
                 onClick={() => {
                   onChange(option.value);
                   onToggle();
                 }}
                 className={`
                   flex items-center gap-2 p-3 pl-4 text-xs cursor-pointer transition-colors
                   ${isSelected ? 'bg-scandi-gold/10' : 'hover:bg-scandi-mist'}
                 `}
               >
                 <div className={`
                   w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0
                   ${isSelected ? 'bg-scandi-gold border-scandi-gold' : 'border-scandi-charcoal/30'}
                 `}>
                    {isSelected && <Check size={10} className="text-white" />}
                 </div>
                 <div className="flex items-center gap-2 text-scandi-charcoal">
                    {option.icon}
                    <span className={isSelected ? 'font-semibold text-scandi-gold' : ''}>{option.label}</span>
                 </div>
               </div>
             );
           })}
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { Check, X } from 'lucide-react';

interface AttendanceToggleProps {
  status: 'attending' | 'declining' | 'pending';
  onUpdate: (status: 'attending' | 'declining') => void;
}

export const AttendanceToggle: React.FC<AttendanceToggleProps> = ({ status, onUpdate }) => {
  return (
    <div className="bg-scandi-charcoal/5 p-1.5 rounded-xl flex gap-2 relative">
      <button
        type="button"
        onClick={() => onUpdate('attending')}
        className={`flex-1 py-3 px-2 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 
          ${status === 'attending' 
            ? 'bg-white text-scandi-gold shadow-md' 
            : 'text-scandi-charcoal/50 hover:bg-white/50 hover:text-scandi-charcoal'}`}
      >
        {status === 'attending' && <Check size={14} className="animate-in zoom-in duration-300" />}
        Accepts
      </button>
      
      <button
        type="button"
        onClick={() => onUpdate('declining')}
        className={`flex-1 py-3 px-2 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 
          ${status === 'declining' 
            ? 'bg-white text-scandi-charcoal shadow-md' 
            : 'text-scandi-charcoal/50 hover:bg-white/50 hover:text-scandi-charcoal'}`}
      >
        {status === 'declining' && <X size={14} className="animate-in zoom-in duration-300" />}
        Declines
      </button>
    </div>
  );
};
import React, { useState } from 'react';
import { GlassCard } from '../GlassCard';
import { SectionData } from '../../types';
import { FAQS } from '../../constants';
import { Minus, Plus } from 'lucide-react';

interface FaqSectionProps {
  data: SectionData;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="relative w-full h-full overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start px-4 pt-24 md:pt-12 md:pl-32 md:pr-12 overflow-y-auto no-scrollbar pb-32">
            
            {/* Header Outside GlassCard */}
            <div className="text-center shrink-0 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <h2 className="font-serif text-3xl md:text-5xl text-white drop-shadow-lg mb-2">{data.title}</h2>
                <p className="font-sans text-[10px] uppercase tracking-widest text-white/80 font-bold drop-shadow-md">Helpful Information</p>
            </div>

            <GlassCard className="max-w-3xl w-full border-white/40">
                <div className="space-y-4">
                {FAQS.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                    <div 
                        key={index} 
                        className={`transition-all duration-300 border-b border-scandi-charcoal/10 pb-4 ${isOpen ? '' : ''}`}
                    >
                        <button 
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full py-2 flex items-center justify-between text-left focus:outline-none group"
                        >
                        <span className={`font-serif text-lg ${isOpen ? 'text-scandi-gold' : 'text-scandi-charcoal/70'} group-hover:text-scandi-gold transition-colors`}>
                            {faq.question}
                        </span>
                        {isOpen ? <Minus className="text-scandi-gold" size={20} /> : <Plus className="text-scandi-charcoal/30" size={20} />}
                        </button>
                        
                        <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                        >
                        <p className="text-scandi-charcoal/60 font-sans text-sm leading-relaxed max-w-xl">
                            {faq.answer}
                        </p>
                        </div>
                    </div>
                    );
                })}
                </div>
            </GlassCard>
        </div>
    </div>
  );
};
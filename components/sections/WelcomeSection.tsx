import React, { useEffect, useState } from 'react';
import { GlassCard } from '../GlassCard';
import { SectionData, Guest } from '../../types';

interface WelcomeSectionProps {
  data: SectionData;
  guest: Guest | null;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ data, guest }) => {
  const [displayName, setDisplayName] = useState<string>("Guest");

  useEffect(() => {
    if (guest) {
      setDisplayName(guest.groupName);
    } else {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('guest');
      if (nameParam) setDisplayName(nameParam);
    }
  }, [guest]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 pb-24 md:pb-0 md:pl-32 md:pr-12">
        <GlassCard className="max-w-4xl w-full animate-float border-0 shadow-2xl p-6 md:p-8 text-center">
          <div className="space-y-8 py-4 md:py-8">
            <h1 className="font-serif text-5xl md:text-7xl text-scandi-charcoal leading-tight">
              Ruhani <span className="font-light text-scandi-gold text-4xl md:text-6xl align-middle mx-2">&</span> Ronak
            </h1>
            
            <div className="w-144 h-1 bg-gradient-to-r from-transparent via-scandi-gold to-transparent mx-auto my-8 opacity-60" />

            <p className="font-serif text-xl md:text-2xl text-scandi-charcoal/80 italic font-light">
              Request the pleasure of your company
            </p>

            <div className="mt-8">
              <h2 className="font-serif text-3xl md:text-4xl text-scandi-gold capitalize">
                {displayName}
              </h2>
            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-scandi-charcoal/70 font-sans text-sm tracking-wider font-semibold">
              <span>DECEMBER 23-24, 2026</span>
              <span className="hidden md:block text-scandi-gold">•</span>
              <span>UDAIPUR, RAJASTHAN</span>
            </div>
          </div>
        </GlassCard>
      
      <div className="absolute bottom-24 md:bottom-10 animate-bounce">
        <p className="text-scandi-charcoal/40 text-xs font-sans tracking-[0.3em] uppercase">Scroll</p>
      </div>
    </div>
  );
};
import React from 'react';
import { GlassCard } from '../GlassCard';
import { SectionData } from '../../types';

interface CoupleSectionProps {
  data: SectionData;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col lg:flex-row items-center justify-center p-6 lg:p-24 gap-8 lg:gap-16">
      
      {/* Groom */}
      <GlassCard className="flex-1 w-full max-w-md flex flex-col items-center text-center transform transition hover:scale-105 duration-700">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-wedding-gold/50 shadow-2xl mb-6 relative">
             {/* Placeholder for Groom - using a nature shot to represent calmness/strength if human faces aren't perfect from generic APIs */}
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" alt="Aarav" className="w-full h-full object-cover" />
        </div>
        <h2 className="font-serif text-4xl text-wedding-gold mb-2">Aarav Patel</h2>
        <p className="text-white/80 font-sans italic">
          "In Diya, I found not just a partner, but the very rhythm my heart beats to."
        </p>
      </GlassCard>

      <div className="text-6xl font-decorative text-white/80 animate-pulse">&</div>

      {/* Bride */}
      <GlassCard className="flex-1 w-full max-w-md flex flex-col items-center text-center transform transition hover:scale-105 duration-700">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-wedding-gold/50 shadow-2xl mb-6 relative">
             <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" alt="Diya" className="w-full h-full object-cover" />
        </div>
        <h2 className="font-serif text-4xl text-wedding-gold mb-2">Diya Sharma</h2>
        <p className="text-white/80 font-sans italic">
          "Aarav is my calm in the chaos, my laughter in the quiet, and my forever home."
        </p>
      </GlassCard>

    </div>
  );
};
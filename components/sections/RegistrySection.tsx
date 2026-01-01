import React from 'react';
import { GlassCard } from '../GlassCard';
import { SectionData } from '../../types';
import { REGISTRY_ITEMS } from '../../constants';
import { ArrowRight } from 'lucide-react';

interface RegistrySectionProps {
  data: SectionData;
}

export const RegistrySection: React.FC<RegistrySectionProps> = ({ data }) => {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
           <div className="inline-block py-4 px-12 mb-8">
             <h2 className="font-serif text-4xl text-scandi-charcoal mb-4">{data.title}</h2>
             <p className="font-sans text-sm tracking-wide text-scandi-gold uppercase font-bold">Your presence is our present</p>
           </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {REGISTRY_ITEMS.map((item, index) => (
            <GlassCard key={index} className="w-full max-w-sm group cursor-pointer hover:bg-white/90 border-white/40 p-0 overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.store} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-scandi-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-serif text-scandi-charcoal mb-2">{item.store}</h3>
                <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-scandi-gold mt-4 transition-colors font-bold">
                  <span>Visit Registry</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
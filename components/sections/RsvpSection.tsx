import React, { useState, useEffect } from 'react';
import { GlassCard } from '../GlassCard';
import { SectionData, Guest, GuestMember } from '../../types';
import { AlertCircle } from 'lucide-react';
import { GuestCard } from '../rsvp/GuestCard';

interface RsvpSectionProps {
  data: SectionData;
  guest: Guest | null;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ data, guest }) => {
  const [members, setMembers] = useState<GuestMember[]>([]);
  const [submittingIndex, setSubmittingIndex] = useState<number | null>(null);
  const [successIndices, setSuccessIndices] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeAllergyDropdown, setActiveAllergyDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (guest) {
      setMembers(JSON.parse(JSON.stringify(guest.members)));
    }
  }, [guest]);

  // Handle clicking outside - Fixed to look for the card container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeAllergyDropdown !== null) {
        const target = event.target as Element;
        // If the click is NOT inside a guest card that is currently active, reset the active state.
        // We use .closest('[data-guest-card]') to check if we are inside a card.
        if (!target.closest('[data-guest-card]')) {
          setActiveAllergyDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeAllergyDropdown]);

  const updateMember = (index: number, field: keyof GuestMember, value: any) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
    
    if (successIndices.includes(index)) {
      setSuccessIndices(prev => prev.filter(i => i !== index));
    }
  };

  const handleMemberSubmit = async (index: number) => {
    setSubmittingIndex(index);
    setErrorMessage("");

    try {
      let url = 'http://localhost:3000/api/rsvp'; 
      if (guest) url = `http://localhost:3000/api/guest/${guest.code}/rsvp`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: members, rsvp: {} }),
      });

      if (!response.ok) throw new Error('Failed to submit RSVP');

      setSuccessIndices(prev => [...prev, index]);
      setSubmittingIndex(null);
      
    } catch (error) {
      console.error(error);
      if (guest && (guest.code === 'GUEST001' || guest.code === 'FAMILY' || guest.code === 'GUEST002')) {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        setSuccessIndices(prev => [...prev, index]);
        setSubmittingIndex(null);
        return;
      }
      setSubmittingIndex(null);
      setErrorMessage("Could not connect to the server.");
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start px-4 pt-20 md:pt-12 overflow-y-auto no-scrollbar pb-32">
            
            <div className="text-center shrink-0 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <h2 className="font-serif text-3xl md:text-5xl text-white drop-shadow-lg mb-2">{data.title}</h2>
                <p className="font-sans text-[10px] uppercase tracking-widest text-white/80 font-bold drop-shadow-md">{data.subtitle}</p>
            </div>

            {!guest && (
               <div className="w-full max-w-md mx-auto">
                 <GlassCard className="text-center p-6 bg-white/75">
                    <AlertCircle className="mx-auto mb-3 text-scandi-gold" size={28} />
                    <p className="text-sm text-scandi-charcoal">Please use the personalized link sent to your invitation to RSVP.</p>
                 </GlassCard>
               </div>
            )}

            <div className="w-full max-w-4xl space-y-4 pb-12">
                {guest && members.map((member, idx) => (
                  <GuestCard 
                    key={idx}
                    index={idx}
                    member={member}
                    onUpdate={updateMember}
                    onSubmit={handleMemberSubmit}
                    isSubmitting={submittingIndex === idx}
                    isSuccess={successIndices.includes(idx)}
                    onResetSuccess={(i) => setSuccessIndices(prev => prev.filter(idx => idx !== i))}
                    activeDropdown={activeAllergyDropdown}
                    onToggleDropdown={setActiveAllergyDropdown}
                  />
                ))}
            </div>
        </div>
    </div>
  );
};
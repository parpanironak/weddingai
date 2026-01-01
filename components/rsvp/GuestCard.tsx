import React, { useState, useEffect } from 'react';
import { GlassCard } from '../GlassCard';
import { GuestMember } from '../../types';
import { Check, Heart, Loader2 } from 'lucide-react';
import { AttendanceToggle } from './AttendanceToggle';
import { FoodDining } from './FoodDining';
import { TravelDetails } from './TravelDetails';

interface GuestCardProps {
  member: GuestMember;
  index: number;
  onUpdate: (index: number, field: keyof GuestMember, value: any) => void;
  onSubmit: (index: number) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  onResetSuccess: (index: number) => void;
  activeDropdown: number | null;
  onToggleDropdown: (index: number | null) => void;
}

export const GuestCard: React.FC<GuestCardProps> = ({ 
  member, 
  index, 
  onUpdate, 
  onSubmit, 
  isSubmitting, 
  isSuccess, 
  onResetSuccess,
  activeDropdown,
  onToggleDropdown
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openField, setOpenField] = useState<string | null>(null);

  // Sync global active state: if this card isn't active globally, close local fields
  useEffect(() => {
    if (activeDropdown !== index) {
      setOpenField(null);
    }
  }, [activeDropdown, index]);

  // Handle local dropdown toggle and notify parent to elevate this card
  const handleFieldToggle = (field: string) => {
    if (openField === field) {
      setOpenField(null);
    } else {
      setOpenField(field);
      onToggleDropdown(index); // Elevate this card
    }
  };

  // Delay overflow-visible to allow animation to finish
  useEffect(() => {
    if (member.attendance === 'attending') {
        const timer = setTimeout(() => setIsExpanded(true), 700);
        return () => clearTimeout(timer);
    } else {
        setIsExpanded(false);
    }
  }, [member.attendance]);
  
  const handleMemberUpdate = (field: keyof GuestMember, value: any) => {
    onUpdate(index, field, value);
  };

  return (
    <div data-guest-card>
      <GlassCard 
        className={`relative transition-all duration-500 bg-white/75 backdrop-blur-xl border-white/60 shadow-xl !p-5 md:!p-6 ${activeDropdown === index ? 'z-20' : 'z-0'}`}
      >
        {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-scandi-gold/20 rounded-full flex items-center justify-center mb-4 text-scandi-gold shadow-inner border border-scandi-gold/10">
                  <Check size={32} />
              </div>
              <h3 className="font-serif text-2xl text-scandi-charcoal mb-1">Response Saved</h3>
              <p className="text-sm text-scandi-charcoal/60 max-w-xs mx-auto mb-6">
                  Thank you! {member.name}'s details have been updated successfully.
              </p>
              <button
                onClick={() => onResetSuccess(index)}
                className="px-5 py-2 rounded-full border border-scandi-gold text-scandi-gold hover:bg-scandi-gold hover:text-white transition-all text-[10px] uppercase font-bold tracking-widest"
              >
                Modify Response
              </button>
            </div>
        ) : (
            <>
              <div className="mb-3 border-b border-scandi-charcoal/10 pb-3 flex justify-between items-center">
                  <h3 className="font-serif text-xl md:text-2xl text-scandi-charcoal">{member.name}</h3>
              </div>

              <div className="mb-4">
                  <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-scandi-gold flex items-center gap-2 mb-2">
                    <Heart size={12} /> RSVP Status
                  </h4>
                  <AttendanceToggle 
                    status={member.attendance} 
                    onUpdate={(status) => handleMemberUpdate('attendance', status)} 
                  />
              </div>

              <div 
                className={`
                  transition-all duration-700 ease-in-out
                  ${member.attendance === 'attending' 
                    ? 'max-h-[3000px] opacity-100 ' + (isExpanded ? 'overflow-visible' : 'overflow-hidden') 
                    : 'max-h-0 opacity-0 overflow-hidden'}
                `}
              >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-2 border-t border-scandi-charcoal/10 pt-5">
                      <FoodDining 
                        member={member} 
                        onUpdate={handleMemberUpdate}
                        openField={openField}
                        onToggleField={handleFieldToggle}
                      />
                      <TravelDetails 
                        member={member} 
                        onUpdate={handleMemberUpdate}
                        openField={openField}
                        onToggleField={handleFieldToggle}
                      />
                  </div>
              </div>

              {member.attendance !== 'pending' && (
                  <div className="mt-4 pt-4 border-t border-scandi-charcoal/10 flex justify-end animate-in fade-in slide-in-from-top-2 duration-500">
                    <button 
                      onClick={() => onSubmit(index)}
                      disabled={isSubmitting}
                      className="bg-scandi-gold text-white font-sans text-[10px] uppercase tracking-widest py-2.5 px-6 hover:bg-scandi-charcoal transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={12} /> Saving...
                        </>
                      ) : (
                        <>Save Response</>
                      )}
                    </button>
                  </div>
              )}
            </>
        )}
      </GlassCard>
    </div>
  );
};
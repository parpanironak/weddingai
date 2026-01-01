import React from 'react';
import { Utensils } from 'lucide-react';
import { GuestMember } from '../../types';
import { AllergySelector } from './AllergySelector';
import { CustomSelect } from './CustomSelect';

interface FoodDiningProps {
  member: GuestMember;
  onUpdate: (field: keyof GuestMember, value: any) => void;
  openField: string | null;
  onToggleField: (field: string) => void;
}

export const FoodDining: React.FC<FoodDiningProps> = ({ 
  member, 
  onUpdate, 
  openField,
  onToggleField
}) => {
  
  const toggleAllergy = (allergy: string) => {
    const currentAllergies = member.allergies || [];
    const normalized = allergy.trim();
    if (currentAllergies.includes(normalized)) {
      onUpdate('allergies', currentAllergies.filter(a => a !== normalized));
    } else {
      onUpdate('allergies', [...currentAllergies, normalized]);
    }
  };

  const dietaryOptions = [
    { label: "No Restrictions", value: "None" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Vegan", value: "Vegan" },
    { label: "Jain", value: "Jain" }
  ];

  return (
    <div className="md:col-span-2 space-y-2">
      <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-scandi-gold flex items-center gap-2">
        <Utensils size={12} /> Food & Dining
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white/40 rounded-3xl border border-white/50 shadow-sm">
        
        {/* Dietary Preference */}
        <CustomSelect
          label="Dietary Preference"
          value={member.dietaryPreference || 'None'}
          options={dietaryOptions}
          onChange={(val) => onUpdate('dietaryPreference', val)}
          isOpen={openField === 'dietary'}
          onToggle={() => onToggleField('dietary')}
        />

        {/* Allergies */}
        <AllergySelector 
          selectedAllergies={member.allergies || []}
          onToggle={toggleAllergy}
          isOpen={openField === 'allergies'}
          onToggleDropdown={() => onToggleField('allergies')}
        />
        
        {member.allergies?.includes("Other") && (
          <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2">
            <label className="block text-[10px] uppercase tracking-widest text-scandi-charcoal/60 mb-1.5 font-bold">
              Specify other allergies
            </label>
            <input 
              type="text"
              value={member.otherAllergies || ''}
              onChange={(e) => onUpdate('otherAllergies', e.target.value)}
              placeholder="Details..."
              className="w-full bg-white/60 hover:bg-white/80 border border-scandi-charcoal/10 p-3 pl-4 text-sm focus:outline-none focus:border-scandi-gold transition-colors rounded-2xl"
            />
          </div>
        )}
        
      </div>
    </div>
  );
};
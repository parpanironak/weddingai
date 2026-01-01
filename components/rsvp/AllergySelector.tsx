import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Plus, X } from 'lucide-react';

const ALLERGENS = [
  "Dairy", "Egg", "Gluten", "Peanuts", "Tree Nuts", 
  "Shellfish", "Fish", "Soy", "Wheat", "Sesame", 
  "Corn", "Mustard", "Sulfites", "Other"
];

interface AllergySelectorProps {
  selectedAllergies: string[];
  onToggle: (allergy: string) => void;
  isOpen: boolean;
  onToggleDropdown: () => void;
}

export const AllergySelector: React.FC<AllergySelectorProps> = ({ 
  selectedAllergies = [], 
  onToggle, 
  isOpen, 
  onToggleDropdown,
}) => {
  const [allergySearch, setAllergySearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setAllergySearch(""); 
    }
  }, [isOpen]);

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onToggleDropdown(); // Close
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggleDropdown]);

  const handleAddCustom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allergySearch) {
      onToggle(allergySearch);
      setAllergySearch("");
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[10px] uppercase tracking-widest text-scandi-charcoal/60 mb-1.5 font-bold">
        Allergies
      </label>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleDropdown();
        }}
        className={`w-full text-left bg-white/60 hover:bg-white/80 border p-3 pl-4 text-sm flex justify-between items-center rounded-2xl transition-colors focus:outline-none focus:border-scandi-gold ${isOpen ? 'border-scandi-gold bg-white/70' : 'border-scandi-charcoal/10'}`}
      >
        <span className="truncate text-scandi-charcoal">
          {selectedAllergies.length > 0 
            ? `${selectedAllergies.length} selected`
            : "Select allergies..."}
        </span>
        <ChevronDown size={14} className={`transition-transform text-scandi-charcoal/40 ${isOpen ? 'rotate-180 text-scandi-gold' : ''}`} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute z-50 top-full left-0 w-full mt-2 bg-white shadow-xl rounded-2xl border border-scandi-charcoal/10 max-h-56 overflow-hidden overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white p-2 border-b border-scandi-charcoal/10 z-10">
            <div className="relative">
              <Search className="absolute left-2.5 top-3 text-scandi-charcoal/40" size={12} />
              <input
                ref={searchInputRef}
                type="text"
                value={allergySearch}
                onChange={(e) => setAllergySearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-2 p-2.5 text-xs bg-scandi-mist/50 rounded-2xl focus:bg-white border border-transparent focus:border-scandi-gold focus:outline-none transition-colors"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {ALLERGENS.filter(a => a.toLowerCase().includes(allergySearch.toLowerCase())).map((allergen) => {
            const isSelected = selectedAllergies.includes(allergen);
            return (
              <div 
                key={allergen}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(allergen);
                }}
                className={`flex items-center gap-2 p-3 pl-4 text-xs cursor-pointer transition-colors ${isSelected ? 'bg-scandi-gold/10' : 'hover:bg-scandi-mist'}`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-scandi-gold border-scandi-gold' : 'border-scandi-charcoal/30'}`}>
                  {isSelected && <Check size={10} className="text-white" />}
                </div>
                <span className={isSelected ? 'text-scandi-gold font-semibold' : 'text-scandi-charcoal'}>{allergen}</span>
              </div>
            );
          })}

          {allergySearch && !ALLERGENS.some(a => a.toLowerCase() === allergySearch.toLowerCase()) && !selectedAllergies.includes(allergySearch) && (
            <div 
              onClick={handleAddCustom}
              className="flex items-center gap-2 p-3 pl-4 text-xs cursor-pointer bg-scandi-gold/5 hover:bg-scandi-gold/10 text-scandi-gold font-bold border-t border-scandi-charcoal/10"
            >
              <Plus size={12} />
              <span>Add "{allergySearch}"</span>
            </div>
          )}
        </div>
      )}

      {/* Selected Tags */}
      {selectedAllergies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selectedAllergies.map(a => (
            <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-scandi-gold/10 text-scandi-gold text-[9px] uppercase font-bold border border-scandi-gold/20 animate-in fade-in zoom-in duration-200 shadow-sm">
              {a}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(a);
                }}
                className="hover:text-red-500 ml-0.5 rounded-full hover:bg-red-100 p-0.5 transition-colors"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
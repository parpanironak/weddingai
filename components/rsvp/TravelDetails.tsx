import React, { useRef } from 'react';
import { Plane, Train, Car, Calendar, Clock, Hash, Check } from 'lucide-react';
import { GuestMember } from '../../types';
import { CustomSelect } from './CustomSelect';

interface TravelDetailsProps {
  member: GuestMember;
  onUpdate: (field: keyof GuestMember, value: any) => void;
  openField: string | null;
  onToggleField: (field: string) => void;
}

export const TravelDetails: React.FC<TravelDetailsProps> = ({ 
  member, 
  onUpdate,
  openField,
  onToggleField
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  // Manage overflow visibility for the collapsible section
  React.useEffect(() => {
    if (member.isOutOfTown) {
        // Wait for animation (500ms) to finish before allowing overflow
        const timer = setTimeout(() => setIsExpanded(true), 550);
        return () => clearTimeout(timer);
    } else {
        setIsExpanded(false);
    }
  }, [member.isOutOfTown]);

  const modeOptions = [
    { label: "Flight", value: "Flight", icon: <Plane size={14} /> },
    { label: "Train", value: "Train", icon: <Train size={14} /> },
    { label: "Car", value: "Car", icon: <Car size={14} /> },
  ];

  return (
    <div className="md:col-span-2 space-y-2">
      <style>
        {`
          /* Hide default calendar picker indicator to use custom icon */
          input[type="date"]::-webkit-calendar-picker-indicator,
          input[type="time"]::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
          }
          
          /* Force light theme for the native picker popup */
          input[type="date"], input[type="time"] {
            color-scheme: light;
          }
        `}
      </style>
      <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-scandi-gold flex items-center gap-2">
        <Plane size={12} /> Travel Details
      </h4>
      
      <div className="p-6 bg-white/40 rounded-3xl border border-white/50 shadow-sm space-y-4">
        
        <label className="flex items-center gap-2 cursor-pointer group w-fit">
            <div className={`w-4 h-4 rounded border border-scandi-charcoal/30 flex items-center justify-center transition-all ${member.isOutOfTown ? 'bg-scandi-gold border-scandi-gold' : 'bg-white/50 group-hover:border-scandi-gold'}`}>
              {member.isOutOfTown && <Check size={10} className="text-white" />}
            </div>
            <input 
              type="checkbox" 
              checked={member.isOutOfTown || false}
              onChange={(e) => onUpdate('isOutOfTown', e.target.checked)}
              className="hidden"
            />
            <span className="text-[10px] uppercase tracking-widest text-scandi-charcoal/80 group-hover:text-scandi-charcoal transition-colors select-none font-bold">
              I am traveling from out of town
            </span>
        </label>

        <div className={`
            grid transition-all duration-500 ease-in-out gap-4
            ${member.isOutOfTown 
              ? 'grid-rows-[1fr] opacity-100 mt-2' 
              : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'}
        `}>
            {/* Inner container switches to overflow-visible after animation to let dropdowns pop out */}
            <div className={`${isExpanded ? 'overflow-visible' : 'overflow-hidden'} min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4`}>
              
              {/* Mode */}
              <div className="relative">
                <CustomSelect
                  label="Mode of Arrival"
                  value={member.travelMode || ''}
                  options={modeOptions}
                  onChange={(val) => onUpdate('travelMode', val)}
                  placeholder="Select Mode"
                  isOpen={openField === 'travelMode'}
                  onToggle={() => onToggleField('travelMode')}
                />
              </div>

              {/* Number */}
              {(member.travelMode === 'Flight' || member.travelMode === 'Train') && (
                  <div className="animate-in fade-in slide-in-from-left-2">
                    <label className="block text-[10px] uppercase tracking-widest text-scandi-charcoal/60 mb-1.5 font-bold">
                        {member.travelMode} Number
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={member.transportNumber || ''}
                        onChange={(e) => onUpdate('transportNumber', e.target.value)}
                        placeholder={`e.g. ${member.travelMode === 'Flight' ? 'AI 402' : '12951'}`}
                        className="w-full bg-white/60 hover:bg-white/80 border border-scandi-charcoal/10 p-3 text-sm focus:outline-none focus:border-scandi-gold transition-colors rounded-2xl text-scandi-charcoal placeholder-scandi-charcoal/40 pl-4"
                      />
                      <Hash size={14} className="absolute right-4 top-3.5 text-scandi-charcoal/40 pointer-events-none" />
                    </div>
                  </div>
              )}

              {/* Date */}
              {member.travelMode && (
                <div className="animate-in fade-in slide-in-from-left-2">
                  <label className="block text-[10px] uppercase tracking-widest text-scandi-charcoal/60 mb-1.5 font-bold">
                    Arrival Date
                  </label>
                  <div className="relative" onClick={() => dateInputRef.current?.showPicker()}>
                    <input 
                      ref={dateInputRef}
                      type="date"
                      value={member.arrivalDate || ''}
                      onChange={(e) => onUpdate('arrivalDate', e.target.value)}
                      className="w-full bg-white/60 hover:bg-white/80 border border-scandi-charcoal/10 p-3 text-sm focus:outline-none focus:border-scandi-gold transition-colors text-scandi-charcoal rounded-2xl cursor-pointer font-sans pl-4"
                    />
                    <Calendar size={14} className="absolute right-4 top-3.5 text-scandi-charcoal/40 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Time */}
              {member.travelMode && (
                <div className="animate-in fade-in slide-in-from-left-2">
                  <label className="block text-[10px] uppercase tracking-widest text-scandi-charcoal/60 mb-1.5 font-bold">
                    Est. Arrival Time
                  </label>
                  <div className="relative" onClick={() => timeInputRef.current?.showPicker()}>
                    <input 
                      ref={timeInputRef}
                      type="time"
                      value={member.arrivalTime || ''}
                      onChange={(e) => onUpdate('arrivalTime', e.target.value)}
                      className="w-full bg-white/60 hover:bg-white/80 border border-scandi-charcoal/10 p-3 text-sm focus:outline-none focus:border-scandi-gold transition-colors text-scandi-charcoal rounded-2xl cursor-pointer font-sans pl-4"
                    />
                    <Clock size={14} className="absolute right-4 top-3.5 text-scandi-charcoal/40 pointer-events-none" />
                  </div>
                </div>
              )}
              
            </div>
        </div>
      </div>
    </div>
  );
};
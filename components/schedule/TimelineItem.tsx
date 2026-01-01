import React from 'react';
import { ScheduleEvent } from '../../types';
import { GlassCard } from '../GlassCard';
import { Music, Sun, Heart, MapPin, Clock, Wine } from 'lucide-react';

interface TimelineItemProps {
  event: ScheduleEvent;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'music': return <Music className="text-white" size={16} />;
    case 'sun': return <Sun className="text-white" size={16} />;
    case 'glass': return <Wine className="text-white" size={16} />;
    default: return <Heart className="text-white" size={16} />;
  }
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, isActive, onHover, onClick }) => {
  const isRight = index % 2 !== 0; 
  
  return (
    <div 
        className={`relative flex items-center md:justify-between group ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        onMouseEnter={onHover}
        onClick={onClick}
    >
        {/* Desktop Spacer */}
        <div className="hidden md:block w-5/12" />

        {/* Center Node */}
        <div className={`
            absolute left-6 md:left-1/2 -translate-x-1/2
            w-16 h-16 rounded-full border-2 border-white/30 shadow-lg 
            flex items-center justify-center z-10 transition-all duration-300
            ${isActive ? 'bg-scandi-gold scale-110' : 'bg-scandi-charcoal scale-100'}
        `}>
            {getIcon(event.icon)}
        </div>

        {/* Content Side */}
        <div className={`
            pl-20 md:pl-0 w-full md:w-5/12 text-left
            ${isRight ? 'md:text-left md:pl-4' : 'md:text-right md:pr-4'}
        `}>
            <GlassCard className={`
                !p-4 cursor-pointer border-white/20 transition-all duration-300 inline-block
                w-fit md:max-w-[16rem]
                ${isActive 
                  ? 'bg-white/95 shadow-xl scale-105' 
                  : 'bg-white/40 hover:bg-white/75 hover:scale-[1.02] shadow-sm hover:shadow-md'}
            `}>
                <div className={`flex flex-col gap-0.5 items-start ${isRight ? 'md:items-start' : 'md:items-end'}`}>
                    <h3 className="font-serif text-lg md:text-xl text-scandi-charcoal leading-tight">{event.title}</h3>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-scandi-gold">
                            <Clock size={10} /> {event.time}
                        </span>
                    </div>
                    <a 
                        href={event.googleMapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[10px] text-scandi-charcoal/70 uppercase tracking-wide group/link hover:text-scandi-gold transition-colors z-20 w-fit mt-0.5"
                    >
                        <MapPin size={10} /> 
                        <span className="group-hover/link:underline underline-offset-2 decoration-scandi-gold">{event.location}</span>
                    </a>

                    {/* Clickable Indication */}
                    <div className={`
                      mt-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-scandi-gold/80 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0
                      flex-row
                    `}>
                      <span>View Details</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    </div>
  );
};
import React, { useState } from 'react';
import { SectionData, ScheduleEvent } from '../../types';
import { SCHEDULE } from '../../constants';
import { TimelineItem } from '../schedule/TimelineItem';
import { EventModal } from '../schedule/EventModal';

interface ScheduleSectionProps {
  data: SectionData;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  return (
    <div className="relative w-full h-full overflow-hidden">
      
      {/* Dynamic Background Layer for specific event focus */}
      {SCHEDULE.map((event, idx) => (
        <div 
          key={`bg-${idx}`}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${activeIndex === idx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          style={{ backgroundImage: `url(${event.dressCodeImage})` }}
        />
      ))}
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] transition-colors duration-700" />
      
      {/* Scrollable Content Container */}
      <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar">
        <div className="w-full min-h-full flex flex-col items-center px-4 pb-32 md:pb-12 md:pl-32 md:pr-12 pt-24 md:pt-12">
            
            {/* Header */}
            <div className="text-center shrink-0 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <h2 className="font-serif text-3xl md:text-5xl text-white drop-shadow-lg mb-2">{data.title}</h2>
                <p className="font-sans text-[10px] uppercase tracking-widest text-white/80 font-bold drop-shadow-md">{data.subtitle}</p>
            </div>

            {/* Timeline Container */}
            <div className="relative w-full max-w-5xl mx-auto flex flex-col">
                <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-px bg-white/20 md:-translate-x-1/2" />
                <div className="flex flex-col gap-6 md:gap-10">
                    {SCHEDULE.map((event, index) => (
                        <TimelineItem 
                          key={index}
                          index={index}
                          event={event}
                          isActive={activeIndex === index}
                          onHover={() => setActiveIndex(index)}
                          onClick={() => setSelectedEvent(event)}
                        />
                    ))}
                </div>
            </div>
        </div>
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};
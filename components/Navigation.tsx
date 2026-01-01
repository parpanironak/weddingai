import React from 'react';
import { SectionId } from '../types';
import { Heart, Calendar, Info, Home } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: SectionId.WELCOME, icon: Home, label: "Welcome" },
    { id: SectionId.SCHEDULE, icon: Calendar, label: "Schedule" },
    { id: SectionId.RSVP, icon: Heart, label: "RSVP" },
    { id: SectionId.FAQ, icon: Info, label: "Info" },
  ];

  return (
    <nav className="
      fixed z-50
      /* Mobile: Bottom Floating Bar */
      bottom-4 left-4 right-4 h-16
      /* Desktop: Left Sidebar */
      md:bottom-auto md:left-6 md:right-auto md:top-1/2 md:-translate-y-1/2 md:h-auto md:w-auto
      flex flex-col justify-center
    ">
      <div className="absolute inset-0 bg-white/75 backdrop-blur-xl rounded-full -z-10 w-full h-full border border-white/40 shadow-sm" />
      
      <div className="flex md:flex-col items-center justify-around md:justify-center w-full h-full px-2 md:py-6 md:px-3 gap-0 md:gap-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center justify-center p-2"
              aria-label={item.label}
            >
              <span className={`
                hidden md:block absolute left-10 ml-4 px-3 py-1 rounded-md bg-scandi-charcoal text-white text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md tracking-wider
              `}>
                {item.label}
              </span>
              
              <div className={`
                relative p-3 rounded-full transition-all duration-500 ease-out
                ${isActive ? 'bg-scandi-gold text-white scale-110 shadow-lg' : 'bg-transparent text-scandi-charcoal/60 hover:text-scandi-gold hover:bg-white/40'}
              `}>
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
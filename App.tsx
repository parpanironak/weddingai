import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS } from './constants';
import { SectionId, Guest } from './types';
import { Navigation } from './components/Navigation';
import { WelcomeSection } from './components/sections/WelcomeSection';
import { ScheduleSection } from './components/sections/ScheduleSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { FaqSection } from './components/sections/FaqSection';
import { BackgroundLayer } from './components/BackgroundLayer';

// Fallback data for preview/demo when backend is not running
const FALLBACK_GUESTS: Guest[] = [
  { 
    code: 'GUEST001', 
    groupName: 'Priya Sharma',
    members: [
      { name: 'Priya Sharma', attendance: 'pending', dietaryPreference: 'None', allergies: [], otherAllergies: '', travelMode: '', arrivalDetails: '' }
    ],
    rsvp: null 
  },
  { 
    code: 'GUEST002', 
    groupName: 'Rahul & Anjali',
    members: [
       { name: 'Rahul', attendance: 'pending', dietaryPreference: 'None', allergies: [], otherAllergies: '', travelMode: '', arrivalDetails: '' },
       { name: 'Anjali', attendance: 'pending', dietaryPreference: 'None', allergies: [], otherAllergies: '', travelMode: '', arrivalDetails: '' }
    ],
    rsvp: null 
  },
  { 
    code: 'FAMILY', 
    groupName: 'The Patel Family',
    members: [
      { name: 'Rajesh Patel', attendance: 'attending', dietaryPreference: 'Vegetarian', allergies: [], otherAllergies: '', travelMode: 'Car', arrivalDetails: '' },
      { name: 'Sunita Patel', attendance: 'attending', dietaryPreference: 'Vegetarian', allergies: [], otherAllergies: '', travelMode: 'Car', arrivalDetails: '' }
    ],
    rsvp: {
      message: 'We are so happy for you!',
      relationship: 'Family Member',
      tone: 'Heartfelt',
      updatedAt: new Date().toISOString()
    } 
  }
];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.WELCOME);
  const [guest, setGuest] = useState<Guest | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for unique code in URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code') || 'GUEST002';

    if (code) {
      fetch(`http://localhost:3000/api/guest/${code}`)
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Guest not found');
        })
        .then(data => setGuest(data))
        .catch(err => {
          console.error("Could not fetch guest details:", err);
          const fallbackGuest = FALLBACK_GUESTS.find(g => g.code === code);
          if (fallbackGuest) setGuest(fallbackGuest);
        });
    }
  }, []);

  const handleNavigate = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const renderSectionContent = (id: SectionId, data: any) => {
    switch (id) {
      case SectionId.WELCOME: return <WelcomeSection data={data} guest={guest} />;
      case SectionId.SCHEDULE: return <ScheduleSection data={data} />;
      case SectionId.RSVP: return <RsvpSection data={data} guest={guest} />;
      case SectionId.FAQ: return <FaqSection data={data} />;
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-scandi-charcoal font-sans bg-scandi-mist">
      
      {/* Global Background Layer */}
      {SECTIONS.map((section) => (
        <BackgroundLayer 
          key={section.id} 
          section={section} 
          isActive={activeSection === section.id} 
        />
      ))}

      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Scroll Container */}
      <main 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10 no-scrollbar"
      >
        {SECTIONS.map((section) => {
          return (
            <section
              key={section.id}
              id={section.id}
              className="h-screen w-full snap-start snap-always relative flex items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full">
                 {renderSectionContent(section.id, section)}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;
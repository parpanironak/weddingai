import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { GlassCard } from '../GlassCard';
import { ScheduleEvent } from '../../types';
import { X, Clock, MapPin, Info, ArrowUpRight, Shirt } from 'lucide-react';

interface EventModalProps {
  event: ScheduleEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Pinterest Widget Building
  useEffect(() => {
    if (!event) return;

    // Skip pinterest logic if no links are present
    if (!event.pinterestLinkWomen && !event.pinterestLinkMen) return;

    // Function to initialize Pinterest
    const initPinterest = () => {
      const pinUtils = (window as any).PinUtils;
      if (pinUtils && typeof pinUtils.build === 'function') {
        // We pass the container to restrict the build to just this component
        try {
            if (containerRef.current) {
                pinUtils.build(containerRef.current);
            }
        } catch (e) {
            console.error("Pinterest build error", e);
        }
      }
    };

    // Check if script exists, if not inject it
    if (!document.getElementById('pinterest-script')) {
      const script = document.createElement('script');
      script.id = 'pinterest-script';
      script.src = 'https://assets.pinterest.com/js/pinit.js'; // Use https
      script.async = true;
      script.defer = true;
      script.onload = initPinterest;
      document.body.appendChild(script);
    } else {
      // If script already exists, try to build immediately and then retry
      initPinterest();
      setTimeout(initPinterest, 500); // Retry for safety
      setTimeout(initPinterest, 1500); // Retry for network lag
    }

  }, [event]); 

  if (!event) return null;

  // Helper to determine the correct map source
  const getMapSrc = (link: string | undefined, location: string) => {
    // If the link is already a Google Maps Embed URL, use it directly
    if (link && link.includes('google.com/maps/embed')) {
        return link;
    }
    
    // Otherwise fallback to search query embed using the location name
    // This handles short links or missing links gracefully by searching for the venue name
    const query = encodeURIComponent(location);
    return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const mapSrc = getMapSrc(event.googleMapLink, event.location);
  const showStyleGuide = event.pinterestLinkWomen || event.pinterestLinkMen;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <GlassCard className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white/75 backdrop-blur-2xl border-white/50 shadow-2xl p-0 flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
         
         {/* Close Button */}
         <button 
           onClick={onClose}
           className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-white/50 hover:bg-white text-scandi-charcoal transition-colors backdrop-blur-md shadow-sm border border-white/20"
         >
           <X size={24} />
         </button>

         {/* Scrollable Content */}
         <div 
            ref={containerRef} 
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-scandi-gold/20"
         >
            {/* Header Section */}
            <div className="relative pt-16 pb-10 px-6 md:px-12 text-center border-b border-scandi-charcoal/5">
                <h2 className="font-serif text-3xl md:text-5xl text-scandi-charcoal mb-6">{event.title}</h2>
                
                {/* Chips for Time & Dress Code */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[11px] font-bold uppercase tracking-widest text-scandi-gold mb-6">
                    <span className="flex items-center gap-2 bg-scandi-gold/5 px-3 py-1.5 rounded-full border border-scandi-gold/10">
                        <Clock size={12} /> {event.time}
                    </span>
                    <span className="flex items-center gap-2 bg-scandi-gold/5 px-3 py-1.5 rounded-full border border-scandi-gold/10">
                        <Shirt size={12} /> {event.dressCode}
                    </span>
                </div>
                
                {event.description && (
                  <p className="max-w-xl mx-auto text-scandi-charcoal/70 text-sm leading-relaxed font-sans">{event.description}</p>
                )}
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-64 md:h-80 bg-white/5 border-y border-scandi-charcoal/5 relative grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    style={{ border: 0 }}
                    src={mapSrc}
                    className="w-full h-full"
                    title="Event Location"
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div>
            </div>

            {/* Style Guide Section - Only Show if Links Exist */}
            {showStyleGuide && (
              <div className="px-6 md:px-12 py-12">
                  <div className="text-center mb-10">
                      <h3 className="font-serif text-2xl md:text-3xl text-scandi-charcoal mb-2">Style Guide</h3>
                      <p className="text-[10px] uppercase tracking-widest text-scandi-gold font-bold">Inspiration for the Occasion</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                      {/* Women's Board */}
                      {event.pinterestLinkWomen && (
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-scandi-charcoal/60">
                                <span>For Her</span>
                            </div>
                            <div className="w-full flex justify-center min-h-[400px] relative">
                                <a 
                                    data-pin-do="embedBoard" 
                                    data-pin-board-width="300" 
                                    data-pin-scale-height="400" 
                                    data-pin-scale-width="80" 
                                    href={event.pinterestLinkWomen}
                                    className="flex flex-col items-center justify-center p-8 text-scandi-charcoal/40 hover:text-scandi-gold transition-colors w-full h-full border border-dashed border-scandi-charcoal/10 rounded-xl"
                                >
                                    <Info className="mb-2 opacity-50" />
                                    <span className="text-sm font-semibold">Load Women's Fashion</span>
                                    <span className="text-xs mt-1 opacity-60 flex items-center gap-1">
                                        Click to view on Pinterest <ArrowUpRight size={10} />
                                    </span>
                                </a>
                            </div>
                        </div>
                      )}

                      {/* Men's Board */}
                      {event.pinterestLinkMen && (
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-scandi-charcoal/60">
                                <span>For Him</span>
                            </div>
                            <div className="w-full flex justify-center min-h-[400px] relative">
                                <a 
                                    data-pin-do="embedBoard" 
                                    data-pin-board-width="300" 
                                    data-pin-scale-height="400" 
                                    data-pin-scale-width="80" 
                                    href={event.pinterestLinkMen}
                                    className="flex flex-col items-center justify-center p-8 text-scandi-charcoal/40 hover:text-scandi-gold transition-colors w-full h-full border border-dashed border-scandi-charcoal/10 rounded-xl"
                                >
                                    <Info className="mb-2 opacity-50" />
                                    <span className="text-sm font-semibold">Load Men's Fashion</span>
                                    <span className="text-xs mt-1 opacity-60 flex items-center gap-1">
                                        Click to view on Pinterest <ArrowUpRight size={10} />
                                    </span>
                                </a>
                            </div>
                        </div>
                      )}
                  </div>
              </div>
            )}

         </div>
      </GlassCard>
    </div>,
    document.body
  );
};
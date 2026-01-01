import React, { useRef, useState } from 'react';
import { GlassCard } from '../GlassCard';
import { SectionData } from '../../types';
import { Play, Pause } from 'lucide-react';

interface StorySectionProps {
  data: SectionData;
}

export const StorySection: React.FC<StorySectionProps> = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
      <GlassCard className="max-w-4xl w-full border-white/40 p-0 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* Text Side */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
          <h2 className="font-serif text-3xl md:text-4xl text-scandi-charcoal mb-4">
            {data.title}
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-scandi-clay font-bold mb-6">
            {data.subtitle}
          </p>
          <p className="text-scandi-charcoal/70 font-sans leading-relaxed mb-6">
            From our first coffee in Udaipur to the sunset proposal in Jaipur, every moment has led us to this day. 
            We are thrilled to share a glimpse of our journey with you.
          </p>
          <div className="w-16 h-0.5 bg-scandi-gold/50" />
        </div>

        {/* Video Side */}
        <div className="flex-1 relative order-1 md:order-2 bg-black h-64 md:h-auto min-h-[300px] group">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            poster="https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=2043&auto=format&fit=crop"
            onClick={togglePlay}
          >
            {/* Sample wedding/romance clip */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-the-forest-42862-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom Play Button Overlay */}
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
          >
            <button 
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-sans tracking-widest">
            0:30
          </div>
        </div>

      </GlassCard>
    </div>
  );
};
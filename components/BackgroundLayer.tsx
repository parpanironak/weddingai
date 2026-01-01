import React from 'react';
import { SectionData } from '../types';

interface BackgroundLayerProps {
  section: SectionData;
  isActive: boolean;
}

const getYouTubeEmbedUrl = (url: string) => {
  try {
    let videoId = '';
    if (url.includes('youtube.com/watch')) {
      videoId = new URL(url).searchParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1`; 
    }
  } catch (e) {
    return null;
  }
  return null;
};

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ section, isActive }) => {
  const isYouTube = section.backgroundVideo && (section.backgroundVideo.includes('youtube') || section.backgroundVideo.includes('youtu.be'));
  const youtubeEmbedUrl = isYouTube && section.backgroundVideo ? getYouTubeEmbedUrl(section.backgroundVideo) : null;

  return (
    <div className={`bg-layer bg-scandi-mist ${isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
      
      {/* 1. Base Static Image Layer - Always Rendered */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}
        style={{ backgroundImage: `url(${section.backgroundImage})` }} 
      />

      {/* 2. Video Layer - Rendered on top */}
      {youtubeEmbedUrl ? (
        <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
           <iframe 
             src={youtubeEmbedUrl} 
             className="w-full h-full object-cover pointer-events-none opacity-80" // slight opacity to blend
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             title="Background Video"
             frameBorder="0"
           />
        </div>
      ) : section.backgroundVideo ? (
         <video
           autoPlay
           muted
           loop
           playsInline
           poster={section.backgroundImage} // Fallback
           className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
         >
           <source src={section.backgroundVideo} type="video/mp4" />
         </video>
      ) : null}

      {/* 3. Overlays */}
      <div className="absolute inset-0 bg-white/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </div>
  );
};
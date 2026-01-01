import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'accent';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  variant = 'light' 
}) => {
  // Scandi glass: lighter, more blur, subtle borders, light shadows
  const baseStyles = "backdrop-blur-2xl border transition-all duration-500 rounded-[1.5rem] p-8";
  
  const variants = {
    light: "bg-white/75 border-white/40 text-scandi-charcoal shadow-lg shadow-glass-shadow",
    dark: "bg-scandi-charcoal/80 border-scandi-charcoal/40 text-white shadow-xl",
    accent: "bg-scandi-gold/20 border-scandi-gold/30 text-scandi-charcoal shadow-lg"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

import React, { useMemo } from 'react';
import { useConfig } from '../context/ConfigContext';

const Hero: React.FC = () => {
  const { config } = useConfig();

  // Sabit Yıldızlar
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 110}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 2 + 1}s`,
      driftDuration: `${Math.random() * 30 + 50}s`,
      delay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.4 + 0.6 
    }));
  }, []);

  // Yıldız Kaymaları (Meteors) - YAVAŞLATILDI
  const shootingStars = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60}%`, 
      left: `${Math.random() * 60 + 40}%`, 
      duration: `${Math.random() * 4 + 6}s`, 
      delay: `${Math.random() * 25}s`, 
      angle: `${Math.random() * 10 - 40}deg` 
    }));
  }, []);

  const parts = config.hero.title.split('/');
  const mainTitle = parts[0].trim();
  const accentTitle = parts[1] ? parts[1].trim() : "";
  
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-28 md:pt-44 lg:pt-52 pb-20 overflow-hidden hero-bg">
      <div className="stars-overlay">
        {/* Sabit Yıldızlar */}
        {stars.map((star) => (
          <div 
            key={`star-${star.id}`} 
            className="star" 
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              '--drift-duration': star.driftDuration,
              '--opacity': star.opacity,
              animationDelay: `${star.delay}, ${star.delay}`
            } as any}
          />
        ))}

        {/* Yeni Gelişmiş ve Yavaşlatılmış Yıldız Kaymaları */}
        {shootingStars.map((sStar) => (
          <div 
            key={`shooting-${sStar.id}`}
            className="shooting-star"
            style={{
              '--top': sStar.top,
              '--left': sStar.left,
              '--duration': sStar.duration,
              '--delay': sStar.delay,
              '--angle': sStar.angle
            } as any}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#050505] z-1"></div>
      
      <div className="relative z-10 text-center px-6 max-w-7xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[7.5rem] font-black text-white mb-2 md:mb-4 leading-[1.1] md:leading-[0.95] drop-shadow-[0_15px_40px_rgba(0,0,0,1)] tracking-tighter uppercase">
          <span className="block">{mainTitle}</span>
          {accentTitle && (
            <span style={{ color: config.primaryColor }} className="block drop-shadow-[0_0_35px_rgba(255,140,0,0.6)]">
               {accentTitle}
            </span>
          )}
        </h1>
        
        <div className="flex flex-col items-center gap-4 md:gap-6 mt-4 md:mt-8">
          <span className="font-script text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] animate-pulse-slow rotate-[-1deg]">
            {config.hero.slogan}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

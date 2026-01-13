
import React from 'react';
import { useConfig } from '../context/ConfigContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const { config } = useConfig();
  
  return (
    <div className={`flex items-center justify-center overflow-visible transition-all duration-1000 ${className || "h-20 md:h-44 lg:h-60"}`}>
      <img 
        src={config.logoUrl} 
        alt="Angora Kitap Akademi" 
        className="h-full w-auto object-contain drop-shadow-[0_0_30px_rgba(255,140,0,0.3)] hover:scale-[1.05] transition-all duration-700"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=AK&background=${config.primaryColor.replace('#','')}&color=fff&size=512&bold=true`;
        }}
      />
    </div>
  );
};

export default Logo;

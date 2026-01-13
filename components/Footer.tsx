
import React from 'react';
import { useConfig } from '../context/ConfigContext';

const Footer: React.FC = () => {
  const { config } = useConfig();

  // Highlight AKADEMİ in orange
  const parts = config.footer.copyright.split('AKADEMİ');

  return (
    <footer className="bg-[#050505] py-16 px-6 font-montserrat">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 text-center">
        
        {/* Copyright Section */}
        <div className="text-[12px] md:text-sm text-gray-500 uppercase tracking-[0.3em] font-black">
          {parts[0]}
          <span style={{ color: config.primaryColor }}>AKADEMİ</span>
          {parts[1]}
        </div>

        {/* Powered By Section */}
        <a 
          href={config.footer.poweredByUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2"
        >
          <span 
            className="text-[10px] md:text-[11px] font-black tracking-[0.4em] transition-all group-hover:scale-105"
            style={{ color: config.primaryColor }}
          >
            {config.footer.poweredByText}
          </span>
          <div className="h-[2px] w-8 bg-white/10 group-hover:w-24 group-hover:bg-current transition-all duration-500" style={{ color: config.primaryColor }}></div>
        </a>

      </div>
    </footer>
  );
};

export default Footer;

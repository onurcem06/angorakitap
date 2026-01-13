
import React from 'react';

const channels = [
  {
    name: 'Trendyol',
    label: 'Trendyol Mağazamız',
    color: '#1A1A1A',
    logo: 'https://cdn.dsmcdn.com/sfid/production/trendyol-logo-vertical.svg'
  },
  {
    name: 'Hepsiburada',
    label: 'Hepsiburada Mağazamız',
    color: '#FFFFFF',
    logo: 'https://images.hepsiburada.net/assets/sfcl/images/hb-logo.svg'
  },
  {
    name: 'Gardrops',
    label: 'Gardrops Mağazamız',
    color: '#632c8c',
    logo: 'https://images.gardrops.com/static/images/logo_gardrops_v3.svg'
  }
];

const SalesChannels: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#050505]">
      <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-center text-[#FF8C00] mb-20 tracking-wider uppercase">
        SATIŞ KANALLARIMIZ
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {channels.map((channel) => (
          <div key={channel.name} className="flex flex-col items-center group">
            <div className="w-full aspect-square max-w-[320px] bg-[#0A0E17] border border-[#FF8C00]/30 rounded-[2.5rem] p-10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:border-[#FF8C00] group-hover:shadow-[0_0_30px_rgba(255,140,0,0.2)]">
              <div 
                className="w-full h-full rounded-3xl flex items-center justify-center p-6 bg-white overflow-hidden shadow-inner"
                style={{ backgroundColor: channel.color === '#FFFFFF' ? '#FFFFFF' : channel.color }}
              >
                 <img 
                   src={channel.logo} 
                   alt={channel.name} 
                   className="max-w-full max-h-full object-contain"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${channel.name}&background=FF8C00&color=fff`;
                   }}
                 />
              </div>
            </div>
            
            <button className="btn-angora w-full max-w-[280px] py-4 rounded-full font-bold uppercase tracking-wider text-sm">
              Satış Kanalı
            </button>
            <p className="text-white/60 font-medium text-xs mt-4 uppercase tracking-[0.2em]">{channel.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SalesChannels;

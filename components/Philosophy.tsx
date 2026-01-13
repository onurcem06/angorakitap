
import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';

const BrandIcon = () => (
  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_10px_rgba(255,140,0,0.5)]">
    <path d="M20 85 L50 15 L80 85" stroke="#FF8C00" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M35 55 H65" stroke="#FF8C00" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="50" r="45" stroke="#FF8C00" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
  </svg>
);

const SocialIcon = ({ Icon }: { Icon: any }) => (
  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF8C00] social-icon-glow cursor-pointer hover:scale-110 transition-transform">
    <Icon size={24} fill="#FF8C00" />
  </div>
);

const Philosophy: React.FC = () => {
  return (
    <div className="w-full py-24 bg-[#0A0E17]">
      {/* Social Media Icons Bar from Style Guide */}
      <div className="max-w-4xl mx-auto mb-24 px-6">
        <div className="bg-[#FF8C00]/10 border border-[#FF8C00]/20 py-6 px-10 rounded-[2rem] flex justify-between items-center backdrop-blur-sm">
           <SocialIcon Icon={Facebook} />
           <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF8C00] social-icon-glow">
             <span className="font-bold text-xl">X</span>
           </div>
           <SocialIcon Icon={Instagram} />
           <SocialIcon Icon={Linkedin} />
           <SocialIcon Icon={Twitter} />
           <SocialIcon Icon={Youtube} />
        </div>
      </div>

      <section className="px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1 flex flex-col items-center">
          <BrandIcon />
          <div className="text-center mt-10">
            <h3 className="text-3xl font-montserrat font-bold text-white tracking-tight uppercase leading-none">ANGORA KİTAP</h3>
            <p className="text-lg text-[#FF8C00] font-bold tracking-[0.3em] uppercase">AKADEMİ</p>
          </div>
        </div>

        <div className="flex-[1.5]">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-8 uppercase leading-tight">
            OUR PHILOSOPHY: <span className="text-[#FF8C00]">HAYATI OKU</span>
          </h2>
          
          <p className="text-gray-300 font-normal text-lg leading-relaxed mb-12 font-inter">
            Angora Kitap Akademi, dijital yayıncılık ve eğitimde mükemmelliği hedefleyen bir platformdur. 
            Öğrencilerimize en güncel kaynakları ve etkileşimli öğrenme deneyimlerini sunarak kariyer hedeflerine ulaşmalarını destekliyoruz. 
            Tüm içeriklerimiz alanında uzman eğitmenler tarafından özenle hazırlanmıştır.
          </p>
          
          <button className="btn-angora px-14 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em]">
            Daha Fazla
          </button>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;

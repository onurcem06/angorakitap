
import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

// Use React.FC for better type checking and to include standard React props like key
const ContactItem: React.FC<{ Icon: any, text: string, href?: string, color: string }> = ({ Icon, text, href, color }) => {
  if (!text || text === "") return null;
  const content = (
    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all group shadow-xl backdrop-blur-md">
      <Icon size={16} style={{ color }} className="group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-widest">{text}</span>
    </div>
  );

  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="block">{content}</a> : content;
};

// Use React.FC for better type checking and to include standard React props like key
const SocialIcon: React.FC<{ Icon: any, url: string, color: string, name: string }> = ({ Icon, url, color, name }) => {
  if (!url || url === "#") return null;
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative flex flex-col items-center"
      title={name}
    >
      <div 
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-500 group-hover:scale-110 backdrop-blur-xl"
        style={{ boxShadow: `0 0 0px 0px ${color}00` }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = `0 0 30px 2px ${color}44`;
          e.currentTarget.style.backgroundColor = `${color}11`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        }}
      >
        <Icon size={28} className="transition-all duration-300 group-hover:text-white" style={{ color: color }} />
      </div>
      <span className="mt-3 text-[9px] font-black text-gray-500 tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">{name}</span>
    </a>
  );
};

// Fixed: Added React.FC type definition to resolve 'key' property error during mapping
const StoreCard: React.FC<{ store: any, primaryColor: string }> = ({ store, primaryColor }) => {
  return (
    <a 
      href={store.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative w-full md:w-[320px] bg-white/5 border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm overflow-hidden flex flex-col items-center"
      onMouseEnter={(e) => e.currentTarget.style.borderColor = primaryColor}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={14} style={{ color: primaryColor }} />
      </div>
      
      <div className="w-24 h-24 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform">
        <img 
          src={store.logo} 
          alt={store.name} 
          className="max-w-full max-h-full object-contain"
          onError={(e) => (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${store.name}&background=FF8C00&color=fff`}
        />
      </div>
      
      <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-1">{store.name}</h4>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Mağazamıza Git</p>
      
      <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full w-0 group-hover:w-full transition-all duration-700" style={{ backgroundColor: primaryColor }}></div>
      </div>
    </a>
  );
};

const ChannelsAndSocials: React.FC = () => {
  const { config } = useConfig();

  const hasChannels = config.channels && config.channels.length > 0;
  const hasSocials = Object.values(config.socials).some(url => url !== "#" && url !== "");
  const hasContact = config.contact.phone || config.contact.email || config.contact.address;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto -mt-32 relative z-20 font-montserrat">
      <div className="social-card p-10 md:p-16 rounded-[4rem] flex flex-col gap-24">
        
        {/* Mağazalar */}
        {hasChannels && (
          <div className="space-y-12">
            <div className="flex flex-col items-center gap-4">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.6em]">SATIŞ MAĞAZALARIMIZ</h3>
               <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.primaryColor }}></div>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {config.channels.map((store) => (
                <StoreCard key={store.id} store={store} primaryColor={config.primaryColor} />
              ))}
            </div>
          </div>
        )}

        {/* Sosyal Medya */}
        {hasSocials && (
          <div className="space-y-12">
            <div className="flex flex-col items-center gap-4">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.6em]">BİZİ TAKİP EDİN</h3>
               <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.primaryColor }}></div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <SocialIcon name="INSTAGRAM" Icon={Instagram} url={config.socials.instagram} color="#E1306C" />
              <SocialIcon name="YOUTUBE" Icon={Youtube} url={config.socials.youtube} color="#FF0000" />
              <SocialIcon name="FACEBOOK" Icon={Facebook} url={config.socials.facebook} color="#1877F2" />
              <SocialIcon name="TWITTER" Icon={Twitter} url={config.socials.twitter} color="#1DA1F2" />
            </div>
          </div>
        )}

        {/* İletişim */}
        {hasContact && (
          <div className="pt-16 border-t border-white/10 flex flex-wrap justify-center gap-6 md:gap-12">
            <ContactItem Icon={Phone} text={config.contact.phone} href={config.contact.phone ? `tel:${config.contact.phone}` : undefined} color={config.primaryColor} />
            <ContactItem Icon={Mail} text={config.contact.email} href={config.contact.email ? `mailto:${config.contact.email}` : undefined} color={config.primaryColor} />
            <ContactItem Icon={MapPin} text={config.contact.address} color={config.primaryColor} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ChannelsAndSocials;

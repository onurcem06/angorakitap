
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StoreLink {
  id: string;
  name: string;
  url: string;
  logo: string;
}

interface SiteConfig {
  adminPassword?: string; // Güvenlik için eklendi
  logoType: 'image' | 'text';
  logoUrl: string;
  primaryColor: string;
  fontFamily: string;
  hero: {
    title: string;
    slogan: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  channels: StoreLink[];
  socials: {
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
  };
  footer: {
    copyright: string;
    poweredByText: string;
    poweredByUrl: string;
  };
}

const DEFAULT_CONFIG: SiteConfig = {
  adminPassword: "angora2025", // İlk kurulum şifresi
  logoType: 'image',
  logoUrl: "",
  primaryColor: "#FF8C00",
  fontFamily: "'Montserrat', sans-serif",
  hero: {
    title: "ANGORA KİTAP / AKADEMİ",
    slogan: "Hayatı Oku",
  },
  contact: {
    phone: "+90 123 456 78 90",
    email: "info@angorakitap.com",
    address: "Ankara, Türkiye",
  },
  channels: [
    { id: '1', name: 'Trendyol', url: '#', logo: 'https://cdn.dsmcdn.com/sfid/production/trendyol-logo-vertical.svg' },
    { id: '2', name: 'Hepsiburada', url: '#', logo: 'https://images.hepsiburada.net/assets/sfcl/images/hb-logo.svg' },
    { id: '3', name: 'Gardrops', url: '#', logo: 'https://images.gardrops.com/static/images/logo_gardrops_v3.svg' }
  ],
  socials: {
    instagram: "#",
    twitter: "#",
    facebook: "#",
    youtube: "#",
  },
  footer: {
    copyright: "© 2026 ANGORA KİTAP AKADEMİ",
    poweredByText: "POWERED BY KAFAMDA KIRK TİLKİ",
    poweredByUrl: "https://kafamdakirkilki.com"
  }
};

interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('angora_site_config');
    const parsed = saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    // Eğer eski versiyonlardan kalma bir config varsa ve şifre alanı yoksa ekleyelim
    if (!parsed.adminPassword) parsed.adminPassword = DEFAULT_CONFIG.adminPassword;
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem('angora_site_config', JSON.stringify(config));
    document.documentElement.style.setProperty('--angora-orange', config.primaryColor);
    document.documentElement.style.setProperty('--font-main', config.fontFamily);
  }, [config]);

  const updateConfig = (newParams: any) => {
    setConfig(prev => ({ ...prev, ...newParams }));
  };

  const resetConfig = () => {
    if (window.confirm("Tüm site ayarları ve şifreniz varsayılana dönecek. Emin misiniz?")) {
      setConfig(DEFAULT_CONFIG);
    }
  };

  return (
    <div style={{ fontFamily: config.fontFamily }}>
      <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
        {children}
      </ConfigContext.Provider>
    </div>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within ConfigProvider');
  return context;
};

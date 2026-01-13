
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteConfig, saveSiteConfig } from '../services/firebase';

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
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  // Load from Firebase on mount
  useEffect(() => {
    const loadConfig = async () => {
      // First try to load from localstorage for instant paint explanation
      const localSaved = localStorage.getItem('angora_site_config');
      if (localSaved) {
        setConfig(JSON.parse(localSaved));
      }

      // Then fetch fresh data from Firebase
      try {
        const result = await getSiteConfig();
        if (result.success && result.data) {
          // Merge default config with incoming data to ensure no missing fields
          // if schema changes in future
          const mergedConfig = { ...DEFAULT_CONFIG, ...result.data } as SiteConfig;
          setConfig(mergedConfig);
          // Update local storage to keep it fresh
          localStorage.setItem('angora_site_config', JSON.stringify(mergedConfig));
        } else {
          // If no config in Firebase (first run), save the default to Firebase
          await saveSiteConfig(DEFAULT_CONFIG);
        }
      } catch (error) {
        console.error("Failed to load config from Firebase", error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Update effect for CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--angora-orange', config.primaryColor);
    document.documentElement.style.setProperty('--font-main', config.fontFamily);
  }, [config]);

  const updateConfig = async (newParams: Partial<SiteConfig>) => {
    // 1. Optimistic UI update (update state immediately)
    const newConfig = { ...config, ...newParams };
    setConfig(newConfig);

    // 2. Update Local Storage for backup
    localStorage.setItem('angora_site_config', JSON.stringify(newConfig));

    // 3. Persist to Firebase
    // We send only the changed params to merge
    const result = await saveSiteConfig(newParams);
    if (!result.success) {
      console.error("Firebase Update Failed:", result.error);
      alert("Hata: Ayarlar buluta kaydedilemedi! \nSebep: " + JSON.stringify(result.error));
    }
  };

  const resetConfig = async () => {
    if (window.confirm("Tüm site ayarları ve şifreniz varsayılana dönecek. Emin misiniz?")) {
      setConfig(DEFAULT_CONFIG);
      localStorage.setItem('angora_site_config', JSON.stringify(DEFAULT_CONFIG));
      const result = await saveSiteConfig(DEFAULT_CONFIG);
      if (!result.success) {
        alert("Sıfırlama hatası: " + JSON.stringify(result.error));
      }
    }
  };

  if (loading && !config) {
    return <div className="h-screen w-full bg-[#0A0E17] flex items-center justify-center text-[#FF8C00]">Yükleniyor...</div>;
  }

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

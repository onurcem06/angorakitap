
import React, { useState, useRef } from 'react';
import { Settings, Save, RotateCcw, X, Image, Type, Phone, Link as LinkIcon, Lock, Unlock, Copy, Check, Upload, Trash2, Plus, ArrowRight, Instagram, Youtube, Facebook, Twitter, Key } from 'lucide-react';
import { useConfig, StoreLink } from '../context/ConfigContext';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const mainLogoRef = useRef<HTMLInputElement>(null);
  const storeLogoRef = useRef<HTMLInputElement>(null);
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);

  const { config, updateConfig, resetConfig } = useConfig();
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'contact' | 'links' | 'footer' | 'security' | 'export'>('general');

  const [newPassword, setNewPassword] = useState("");
  const [passUpdateMsg, setPassUpdateMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Artık şifreyi config üzerinden kontrol ediyoruz
    if (passwordInput === config.adminPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Hatalı şifre!");
      setPasswordInput("");
    }
  };

  const handlePasswordChange = () => {
    if (newPassword.length < 4) {
      setPassUpdateMsg("Şifre en az 4 karakter olmalıdır.");
      return;
    }
    updateConfig({ adminPassword: newPassword });
    setPassUpdateMsg("Şifre başarıyla güncellendi!");
    setNewPassword("");
    setTimeout(() => setPassUpdateMsg(""), 3000);
  };

  const handleMainLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig({ logoUrl: reader.result as string, logoType: 'image' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoreLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, storeId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newChannels = config.channels.map(c =>
          c.id === storeId ? { ...c, logo: reader.result as string } : c
        );
        updateConfig({ channels: newChannels });
      };
      reader.readAsDataURL(file);
    }
  };

  const addStore = () => {
    const newStore: StoreLink = {
      id: Date.now().toString(),
      name: "Yeni Mağaza",
      url: "#",
      logo: ""
    };
    updateConfig({ channels: [...config.channels, newStore] });
  };

  const removeStore = (id: string) => {
    updateConfig({ channels: config.channels.filter(c => c.id !== id) });
  };

  const updateStore = (id: string, params: Partial<StoreLink>) => {
    const newChannels = config.channels.map(c =>
      c.id === id ? { ...c, ...params } : c
    );
    updateConfig({ channels: newChannels });
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-black/60 hover:bg-[#FF8C00] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all text-white border border-white/20"
      >
        <Lock size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[520px] bg-[#0A0E17] z-[101] shadow-2xl border-l border-white/10 flex flex-col font-sans overflow-hidden animate-in slide-in-from-right duration-300">

      {!isAuthenticated ? (
        <div className="flex-grow flex flex-col items-center justify-center p-10 text-center">
          <div className="w-24 h-24 bg-[#FF8C00]/10 rounded-full flex items-center justify-center text-[#FF8C00] mb-8">
            <Lock size={48} />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter text-center">ADMİN GİRİŞİ</h2>
          <form onSubmit={handleLogin} className="w-full space-y-5">
            <input
              type="password"
              autoFocus
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Şifre"
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-5 text-white text-center outline-none focus:border-[#FF8C00] transition-all text-lg`}
            />
            {error && <p className="text-red-500 text-xs font-black uppercase tracking-[0.2em]">{error}</p>}
            <button type="submit" className="w-full bg-[#FF8C00] text-white font-black py-5 rounded-2xl hover:brightness-110 transition-all text-sm tracking-widest uppercase">PANELİ AÇ</button>
          </form>
          <button onClick={() => setIsOpen(false)} className="mt-8 text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest">SİTEYE GERİ DÖN</button>
        </div>
      ) : (
        <>
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/30">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-3 tracking-tighter">YÖNETİM PANELİ</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-1">GÖRSEL VE İÇERİK KONTROLÜ</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={28} /></button>
          </div>

          <div className="flex bg-black/40 p-2 gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-white/5">
            {[
              { id: 'general', label: 'TASARIM', icon: Image },
              { id: 'hero', label: 'VİTRİN', icon: Type },
              { id: 'contact', label: 'İLETİŞİM', icon: Phone },
              { id: 'links', label: 'KANALLAR', icon: LinkIcon },
              { id: 'footer', label: 'FOOTER', icon: Settings },
              { id: 'security', label: 'GÜVENLİK', icon: Key },
              { id: 'export', label: 'DIŞA AKTAR', icon: Copy }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#FF8C00] text-white shadow-lg' : 'text-gray-500 hover:bg-white/5'
                  }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-10 pb-36 scrollbar-thin scrollbar-thumb-white/10">

            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest block">Kurumsal Logo (Resim)</label>
                  <div
                    onClick={() => mainLogoRef.current?.click()}
                    className="w-full aspect-[2/1] rounded-3xl border-2 border-dashed border-white/10 hover:border-[#FF8C00]/50 flex flex-col items-center justify-center cursor-pointer bg-white/5 transition-all group relative overflow-hidden"
                  >
                    {config.logoUrl ? (
                      <img src={config.logoUrl} className="max-h-[85%] object-contain relative z-10 p-4" />
                    ) : (
                      <Upload className="text-gray-600 group-hover:text-[#FF8C00]" size={40} />
                    )}
                    <span className="text-[10px] text-gray-500 mt-3 font-black uppercase tracking-widest z-10">RESİM SEÇ VEYA SÜRÜKLE</span>
                  </div>
                  <input type="file" ref={mainLogoRef} onChange={handleMainLogoUpload} className="hidden" accept="image/*" />
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest block">Ana Vurgu Rengi</label>
                  <div className="flex gap-6 items-center">
                    <input type="color" value={config.primaryColor} onChange={(e) => updateConfig({ primaryColor: e.target.value })} className="w-16 h-16 rounded-2xl bg-transparent cursor-pointer border-none shadow-xl" />
                    <input type="text" value={config.primaryColor} className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white font-mono uppercase tracking-widest" readOnly />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-6">
                  <h3 className="text-white font-black text-sm uppercase tracking-widest text-center">PANEL ŞİFRESİNİ DEĞİŞTİR</h3>
                  <p className="text-[10px] text-gray-500 text-center uppercase">Güvenliğiniz için varsayılan şifreyi (angora2025) mutlaka değiştirin.</p>

                  <div className="space-y-2">
                    <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest ml-1">Yeni Şifre</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="En az 4 karakter"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:border-[#FF8C00] outline-none"
                    />
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    className="w-full py-4 bg-[#FF8C00] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                  >
                    ŞİFREYİ GÜNCELLE
                  </button>

                  {passUpdateMsg && (
                    <p className={`text-center text-[10px] font-black uppercase tracking-widest ${passUpdateMsg.includes('başarıyla') ? 'text-green-500' : 'text-red-500'}`}>
                      {passUpdateMsg}
                    </p>
                  )}
                </div>

                {/* DEBUG SECTION */}
                <div className="p-8 bg-red-500/10 rounded-[2rem] border border-red-500/20 space-y-6">
                  <h3 className="text-red-400 font-black text-sm uppercase tracking-widest text-center">BAĞLANTI DURUMU (DEBUG)</h3>
                  <div className="space-y-2 text-[10px] uppercase font-bold tracking-widest">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">API Key:</span>
                      <span className={import.meta.env.VITE_FIREBASE_API_KEY ? "text-green-500" : "text-red-500"}>
                        {import.meta.env.VITE_FIREBASE_API_KEY ? "MEVCUT" : "YOK (MISSING)"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Project ID:</span>
                      <span className="text-white">{import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOK"}</span>
                    </div>
                    <div className="p-2 bg-black/40 rounded text-center text-gray-400 normal-case font-mono text-[9px]">
                      Eğer yukarıda "YOK" yazıyorsa Vercel ayarları yapılmamış demektir.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest">Mağaza Listesi</label>
                  <button onClick={addStore} className="flex items-center gap-2 px-4 py-2 bg-[#FF8C00] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110">
                    <Plus size={14} /> MAĞAZA EKLE
                  </button>
                </div>

                <div className="space-y-6">
                  {config.channels.map((store) => (
                    <div key={store.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-5 relative group">
                      <button onClick={() => removeStore(store.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Trash2 size={14} />
                      </button>

                      <div className="flex gap-5">
                        <div
                          onClick={() => {
                            setActiveStoreId(store.id);
                            storeLogoRef.current?.click();
                          }}
                          className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 cursor-pointer hover:ring-2 ring-[#FF8C00] transition-all overflow-hidden shrink-0 shadow-inner"
                        >
                          {store.logo ? (
                            <img src={store.logo} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Upload className="text-gray-400" size={24} />
                          )}
                        </div>
                        <div className="flex-grow space-y-3">
                          <input
                            placeholder="Mağaza İsmi"
                            value={store.name}
                            onChange={(e) => updateStore(store.id, { name: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold"
                          />
                          <input
                            placeholder="Mağaza Linki (URL)"
                            value={store.url}
                            onChange={(e) => updateStore(store.id, { url: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <input
                    type="file"
                    ref={storeLogoRef}
                    onChange={(e) => activeStoreId && handleStoreLogoUpload(e, activeStoreId)}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest block">Sosyal Medya Linkleri</label>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <Instagram className="text-pink-500 shrink-0" size={20} />
                      <input placeholder="Instagram URL" value={config.socials.instagram} onChange={(e) => updateConfig({ socials: { ...config.socials, instagram: e.target.value } })} className="flex-grow bg-transparent border-none outline-none text-xs text-white" />
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <Youtube className="text-red-500 shrink-0" size={20} />
                      <input placeholder="Youtube URL" value={config.socials.youtube} onChange={(e) => updateConfig({ socials: { ...config.socials, youtube: e.target.value } })} className="flex-grow bg-transparent border-none outline-none text-xs text-white" />
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <Facebook className="text-blue-500 shrink-0" size={20} />
                      <input placeholder="Facebook URL" value={config.socials.facebook} onChange={(e) => updateConfig({ socials: { ...config.socials, facebook: e.target.value } })} className="flex-grow bg-transparent border-none outline-none text-xs text-white" />
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <Twitter className="text-sky-400 shrink-0" size={20} />
                      <input placeholder="Twitter URL" value={config.socials.twitter} onChange={(e) => updateConfig({ socials: { ...config.socials, twitter: e.target.value } })} className="flex-grow bg-transparent border-none outline-none text-xs text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] text-gray-500 uppercase font-black ml-2">Copyright Metni</label>
                    <input
                      value={config.footer.copyright}
                      onChange={(e) => updateConfig({ footer: { ...config.footer, copyright: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest block underline underline-offset-8 decoration-2">Powered By Ayarları</label>
                    <input
                      value={config.footer.poweredByText}
                      onChange={(e) => updateConfig({ footer: { ...config.footer, poweredByText: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#FF8C00] font-black"
                    />
                    <input
                      value={config.footer.poweredByUrl}
                      onChange={(e) => updateConfig({ footer: { ...config.footer, poweredByUrl: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest block text-center">Vitrindeki Ana Başlık</label>
                  <p className="text-[9px] text-gray-600 text-center uppercase tracking-tighter mb-2">(/ işareti ile bölerseniz ikinci kısım turuncu olur)</p>
                  <input
                    value={config.hero.title}
                    onChange={(e) => updateConfig({ hero: { ...config.hero, title: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg text-white font-black text-center focus:border-[#FF8C00] outline-none transition-all uppercase"
                  />
                </div>
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest block text-center">Slogan (El Yazısı Alanı)</label>
                  <input value={config.hero.slogan} onChange={(e) => updateConfig({ hero: { ...config.hero, slogan: e.target.value } })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold text-center" />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest ml-1">Telefon</label>
                    <input value={config.contact.phone} onChange={(e) => updateConfig({ contact: { ...config.contact, phone: e.target.value } })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest ml-1">E-Posta</label>
                    <input value={config.contact.email} onChange={(e) => updateConfig({ contact: { ...config.contact, email: e.target.value } })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-[#FF8C00] uppercase font-black tracking-widest ml-1">Adres</label>
                    <textarea rows={3} value={config.contact.address} onChange={(e) => updateConfig({ contact: { ...config.contact, address: e.target.value } })} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white resize-none" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-[#FF8C00]/10 p-10 rounded-[2.5rem] border border-[#FF8C00]/20 text-center space-y-8 shadow-2xl">
                  <h3 className="text-white font-black text-xl uppercase tracking-widest">YAYINA HAZIRLIK</h3>
                  <button onClick={copyConfig} className="w-full flex items-center justify-center gap-4 py-6 rounded-2xl bg-[#FF8C00] text-white font-black text-sm shadow-[0_10px_30px_rgba(255,140,0,0.4)] hover:scale-[1.03] active:scale-95 transition-all">
                    {copied ? <Check size={24} /> : <Copy size={24} />}
                    {copied ? "KOPYALANDI!" : "KONFİGÜRASYONU KOPYALA"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 bg-[#0A0E17]/90 backdrop-blur-xl border-t border-white/10 flex gap-4">
            <button onClick={resetConfig} className="flex-1 flex items-center justify-center py-5 rounded-2xl bg-white/5 text-gray-500 hover:text-red-500 transition-all font-black text-xs border border-white/5"><RotateCcw size={20} /></button>
            <button onClick={() => setIsOpen(false)} className="flex-[4] flex items-center justify-center py-5 rounded-2xl bg-[#FF8C00] text-white font-black text-sm shadow-2xl uppercase tracking-[0.2em] hover:brightness-110">PANELİ KAPAT</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;

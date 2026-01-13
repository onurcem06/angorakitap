
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChannelsAndSocials from './components/ChannelsAndSocials';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { ConfigProvider } from './context/ConfigContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';

function App() {
  return (
    <ConfigProvider>
      <HelmetProvider>
        <div className="min-h-screen bg-[#0A0E17] text-white selection:bg-[#FF8C00] selection:text-white font-inter overflow-x-hidden">
          <SEO />

          {/* Arkaplan Efektleri */}
          <div className="fixed inset-0 z-0 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Hero />
              <ChannelsAndSocials />
            </main>
            <Footer />
            <AdminPanel />
          </div>
        </div>
      </HelmetProvider>
    </ConfigProvider>
  );
};

export default App;

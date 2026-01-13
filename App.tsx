
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChannelsAndSocials from './components/ChannelsAndSocials';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact';
import { ConfigProvider } from './context/ConfigContext';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <div className="min-h-screen flex flex-col bg-[#050505]">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <ChannelsAndSocials />
          <Contact />
        </main>
        <Footer />
        <AdminPanel />
      </div>
    </ConfigProvider>
  );
};

export default App;

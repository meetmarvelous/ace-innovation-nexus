import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import PartnershipsView from './components/PartnershipsView';
import WorkView from './components/WorkView';
import NetworkView from './components/NetworkView';
import AdminView from './components/AdminView';
import FloatingGuide from './components/FloatingGuide';
import ParticleField from './components/ParticleField';
import ContactModal from './components/ContactModal';
import { triggerHaptic } from './utils/haptics';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'about', 'partnerships', 'network', 'admin'].includes(hash)) {
        setCurrentTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Standalone Admin Portal Page (completely separate layout, navbar, white minimalist theme)
  if (currentTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative selection:bg-[#004aad] selection:text-white">
        <AdminView
          onBackToWebsite={() => {
            triggerHaptic(15);
            window.location.hash = 'home';
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans antialiased relative" style={{ background: 'var(--cosmic-bg)', color: 'var(--cosmic-text)' }}>
      
      {/* Cosmic Particle Background */}
      <ParticleField />

      {/* Header element */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openContactModal={() => { triggerHaptic(20); setContactModalOpen(true); }}
      />

      {/* Main Screen Router Render */}
      <main className="flex-grow relative z-10">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={setCurrentTab}
            openContactModal={() => { triggerHaptic(20); setContactModalOpen(true); }}
          />
        )}
        {currentTab === 'services' && <WorkView />}
        {currentTab === 'about' && <AboutView />}
        {currentTab === 'partnerships' && <PartnershipsView />}
        {(currentTab === 'network' || currentTab === 'careers') && (
          <NetworkView openContactModal={() => { triggerHaptic(20); setContactModalOpen(true); }} />
        )}
      </main>

      {/* Footer element */}
      <Footer
        setCurrentTab={setCurrentTab}
        openContactModal={() => { triggerHaptic(20); setContactModalOpen(true); }}
      />

      {/* Floating 3D Guide Character */}
      <FloatingGuide currentTab={currentTab} />

      {/* GLOBAL STRATEGY CONSULTATION MODAL PORTAL */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

    </div>
  );
}

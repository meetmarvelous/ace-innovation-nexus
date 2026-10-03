import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import WorkView from './components/WorkView.tsx';
import FloatingGuide from './components/FloatingGuide.tsx';
import ParticleField from './components/ParticleField.tsx';
import ContactModal from './components/ContactModal.tsx';
import { triggerHaptic } from './utils/haptics.ts';
import './index.css';

function WorkApp() {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  const navigateToHome = (tab: string) => {
    // Redirect standalone nav clicks back to the main app homepage
    window.location.href = tab === 'home' ? '/' : `/#${tab}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans antialiased relative" style={{ background: 'var(--cosmic-bg)', color: 'var(--cosmic-text)' }}>
      
      {/* Cosmic Particle Background */}
      <ParticleField />

      {/* Header element */}
      <Header
        currentTab="services"
        setCurrentTab={navigateToHome}
        openContactModal={() => { triggerHaptic(20); setContactModalOpen(true); }}
      />

      {/* Main Screen Router Render */}
      <main className="flex-grow relative z-10">
        <WorkView />
      </main>

      {/* Footer element */}
      <Footer
        setCurrentTab={navigateToHome}
        openContactModal={() => { triggerHaptic(20); setContactModalOpen(true); }}
      />

      {/* Floating 3D Guide Character */}
      <FloatingGuide currentTab="services" />

      {/* GLOBAL STRATEGY CONSULTATION MODAL PORTAL */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkApp />
  </StrictMode>
);

import React, { useState } from 'react';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone, Linkedin, Twitter, Sparkles, X } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface FooterProps {
  currentTab?: string;
  setCurrentTab: (tab: string) => void;
  openContactModal: () => void;
}

export default function Footer({ currentTab, setCurrentTab, openContactModal }: FooterProps) {
  const [quoteToast, setQuoteToast] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInstantQuoteClick = () => {
    triggerHaptic(20);
    setQuoteToast(true);
    setTimeout(() => {
      setQuoteToast(false);
    }, 4500);
  };

  const officeHubs = [
    { city: "Ibadan, Nigeria", role: "Headquarters", address: "Ace Innovation Nexus, Jericho, Ibadan" }
  ];

  const shouldShowTopCta = !['about', 'onepercent', 'acedemy'].includes(currentTab || '');

  return (
    <footer className="w-full relative z-10" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
      
      {/* TOAST NOTIFICATION FOR INSTANT QUOTE */}
      {quoteToast && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 text-white border border-blue-500/30 shadow-2xl backdrop-blur-md transition-all"
          style={{ animation: 'fade-in-up 0.3s ease forwards' }}
        >
          <div className="h-7 w-7 rounded-xl bg-blue-500/20 text-[#004aad] flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-xs font-semibold pr-2 font-sans">
            Instant Quote Calculator is coming soon! In the meantime, please book a consultation with our team.
          </div>
          <button 
            onClick={() => setQuoteToast(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            title="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Top Section: CTA Grid (Only rendered on client/commercial tabs: Home, Work, Brands) */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        {shouldShowTopCta && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center pb-16" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-display">
                Ready to grow your business?
              </h2>
              <p className="mt-4 max-w-xl text-base text-slate-600">
                Let us handle your marketing, content, photography, videos, and website so you can focus on running your business.
              </p>
            </div>
            <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end items-center">
              <button
                id="footer-cta-primary"
                onClick={openContactModal}
                className="group flex items-center justify-center gap-1.5 rounded-xl px-6 py-4 text-sm font-semibold text-white transition-all neon-btn haptic-press shadow-md"
              >
                Book Consultation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                id="footer-cta-quote"
                onClick={handleInstantQuoteClick}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70 px-5 py-4 text-sm font-semibold text-[#004aad] transition-all hover:bg-blue-100 hover:border-blue-300 haptic-press"
              >
                <Sparkles className="h-4 w-4 text-[#004aad]" />
                <span>Instant Quote</span>
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-200/70 text-[#004aad] uppercase tracking-wider ml-1">SOON</span>
              </button>
            </div>
          </div>
        )}

        {/* Middle Section: Navigation & Hubs */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Logo Profile */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/2.svg"
                alt="AN"
                className="h-9 w-9 object-contain"
              />
              <div>
                <div className="text-base font-extrabold tracking-tight text-slate-900 font-display leading-none">
                  ACE INNOVATION
                </div>
                <div className="text-[10px] font-semibold tracking-widest font-mono uppercase mt-0.5 gradient-text">
                  NEXUS
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-600 max-w-xs leading-relaxed">
              A full-service digital agency helping businesses grow with marketing, content creation, photography, videography, website development, and mobile apps.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.instagram.com/aceinnovationnexusofficial"
                target="_blank"
                rel="noreferrer referrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:text-[#004aad] hover:border-[#004aad]/40 hover:bg-blue-50 haptic-press"
                title="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
              {/* LinkedIn button temporarily hidden pending account recovery */}
              {/* <a
                href="https://www.linkedin.com/in/ace-innovation-nexus-0210b0441"
                target="_blank"
                rel="noreferrer referrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:text-[#004aad] hover:border-[#004aad]/40 hover:bg-blue-50 haptic-press"
                title="LinkedIn Page"
              >
                <Linkedin className="h-5 w-5" />
              </a> */}
              <a
                href="https://x.com/aceinnovation01"
                target="_blank"
                rel="noreferrer referrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:text-[#004aad] hover:border-[#004aad]/40 hover:bg-blue-50 haptic-press"
                title="Twitter Page"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Quick Links</h3>
            <ul className="mt-6 space-y-3.5 text-sm font-medium">
              <li>
                <button onClick={() => handleNavClick('home')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">Home</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">About Us</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">Our Work</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('network')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">Associated Brands</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('onepercent')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">1% Club</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('acedemy')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">ACEDEMY</button>
              </li>
            </ul>
          </div>

          {/* Physical locations / Hubs */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Our Office</h3>
            <div className="mt-6 space-y-5">
              {officeHubs.map((hub, idx) => (
                <div key={idx} className="flex gap-3">
                  <MapPin className="h-5 w-5 text-[#004aad] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{hub.city}</h4>
                    <span className="text-[10px] font-semibold uppercase font-mono block tracking-wider mt-0.5 gradient-text">
                      {hub.role}
                    </span>
                    <p className="text-[12px] text-slate-500 mt-0.5">{hub.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
          <div>
            &copy; {currentYear} Ace Innovation Nexus. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#004aad] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#004aad] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

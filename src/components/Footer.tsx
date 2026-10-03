import React from 'react';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openContactModal: () => void;
}

export default function Footer({ setCurrentTab, openContactModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const officeHubs = [
    { city: "Ibadan, Nigeria", role: "Headquarters", address: "Ace Innovation Nexus, Dugbe, Ibadan" }
  ];

  return (
    <footer className="w-full relative z-10" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
      
      {/* Top Section: CTA Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center pb-16" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-display">
              Ready to grow your business?
            </h2>
            <p className="mt-4 max-w-xl text-base text-slate-600">
              Let us handle your marketing, content, photography, videos, and website — so you can focus on running your business.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <button
              id="footer-cta-primary"
              onClick={openContactModal}
              className="group flex items-center justify-center gap-1.5 rounded-xl px-6 py-4 text-sm font-semibold text-white transition-all neon-btn haptic-press"
            >
              Get a Free Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              id="footer-cta-secondary"
              onClick={() => handleNavClick('network')}
              className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-400 haptic-press"
            >
              Associated Brands
            </button>
          </div>
        </div>

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
                href="https://www.instagram.com/officialaceinnovationnexus"
                target="_blank"
                rel="noreferrer referrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:text-[#004aad] hover:border-[#004aad]/40 hover:bg-blue-50 haptic-press"
                title="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer referrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:text-[#004aad] hover:border-[#004aad]/40 hover:bg-blue-50 haptic-press"
                title="LinkedIn Page"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
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
                <button onClick={() => handleNavClick('services')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">Our Work</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">About Us</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('partnerships')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">Partnerships</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('network')} className="text-slate-600 hover:text-[#004aad] transition-colors haptic-press">Associated Brands</button>
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

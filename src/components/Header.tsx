import React, { useState, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openContactModal: () => void;
}

export default function Header({ currentTab, setCurrentTab, openContactModal }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Work' },
    { id: 'about', label: 'About Us' },
    { id: 'partnerships', label: 'Partnerships' },
    { id: 'network', label: 'Associated Brands' }
  ];

  const handleNavClick = (tabId: string) => {
    triggerHaptic(10);
    setCurrentTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel-strong" style={{ borderBottom: '1px solid rgba(0, 74, 173, 0.1)' }}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none haptic-press"
        >
          <img
            src="/images/2.svg"
            alt="AN"
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-900 font-display leading-tight">
              ACE INNOVATION
            </div>
            <div className="text-xs font-semibold tracking-widest font-mono uppercase gradient-text">
              NEXUS
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg haptic-press ${
                  isActive
                    ? 'text-[#004aad] bg-blue-50/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: '#004aad' }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            id="nav-cta-btn"
            onClick={() => { triggerHaptic(20); openContactModal(); }}
            className="group flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all neon-btn haptic-press"
          >
            Get Started
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-btn"
          onClick={() => { triggerHaptic(10); setIsOpen(!isOpen); }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 md:hidden focus:outline-none haptic-press"
          aria-expanded={isOpen}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Backing Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 md:hidden" style={{ background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)' }} onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-20 left-0 right-0 z-40 px-6 py-8 shadow-xl transition-all duration-300 md:hidden glass-panel-strong ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ borderBottom: '1px solid rgba(0, 74, 173, 0.15)' }}
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors haptic-press ${
                  isActive
                    ? 'bg-blue-50 text-[#004aad]'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
                <div className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#004aad]' : 'bg-transparent'}`} />
              </button>
            );
          })}
          <div className="mt-4 border-t border-slate-200 pt-6">
            <button
              id="mobile-nav-cta-btn"
              onClick={() => {
                setIsOpen(false);
                triggerHaptic(20);
                openContactModal();
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl py-3.5 text-center text-sm font-bold text-white shadow transition-all neon-btn haptic-press"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

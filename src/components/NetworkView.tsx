import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Instagram, Facebook, Globe, ExternalLink, Search, MapPin, Sparkles, Building2, ArrowUpRight, Share2, ShieldCheck } from 'lucide-react';
import { associatedOrganizations as defaultOrganizations } from '../data';
import { getAssociatedOrganizations } from '../lib/dataService';
import { AssociatedOrganization, AssociatedLink } from '../types';
import KineticText from './KineticText';

interface NetworkViewProps {
  openContactModal: () => void;
}

export default function NetworkView({ openContactModal }: NetworkViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orgList, setOrgList] = useState<AssociatedOrganization[]>(defaultOrganizations);

  useEffect(() => {
    getAssociatedOrganizations().then(setOrgList).catch(() => {});
  }, []);

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const categories = ['All', 'Healthcare', 'Hospitality', 'Education', 'Food & Beverage', 'Creative & Lifestyle'];

  const filteredOrganizations = useMemo(() => {
    return orgList.filter((org) => {
      const matchesCategory = selectedCategory === 'All' || org.category === selectedCategory;
      const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (org.location && org.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (org.description && org.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [orgList, selectedCategory, searchQuery]);

  const renderLinkIcon = (linkType: AssociatedLink['type']) => {
    switch (linkType) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-400 group-hover:text-white transition-colors" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-400 group-hover:text-white transition-colors" />;
      case 'website':
        return <Globe className="h-4 w-4 text-cyan-400 group-hover:text-white transition-colors" />;
      default:
        return <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-white transition-colors" />;
    }
  };

  return (
    <div className="w-full relative min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative py-16 lg:py-24 cosmic-section star-field">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-4xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#004aad] border border-blue-200 bg-blue-50/80">
            <Building2 className="h-3.5 w-3.5 text-[#004aad]" />
            Associated Network & Organizations
          </span>

          <div className="perspective-container">
            <KineticText
              text="Organizations We Work With"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display leading-[1.1]"
              delay={0.1}
            />
            <KineticText
              text="Our Ecosystem & Partners"
              as="h2"
              variant="shimmer"
              className="text-2xl font-bold tracking-tight sm:text-3xl font-display leading-[1.1] mt-2"
              delay={0.6}
            />
          </div>

          <p className="mt-5 text-base text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            Discover the healthcare institutions, hospitality suites, educational academies, and creative enterprises associated with Ace Innovation Nexus. Connect directly with their official digital channels below.
          </p>

          {/* FEATURED LINKTREE BANNER CARD */}
          <div className="mt-8 max-w-2xl mx-auto rounded-3xl p-6 glass-panel-strong border border-blue-200 shadow-lg relative overflow-hidden text-left sm:flex sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider font-mono">
                  <Share2 className="h-3 w-3 text-emerald-600" />
                  Official Linktree
                </span>
                <span className="text-xs text-slate-500 font-mono">@aceinnovationnexus</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display">ACE INNOVATION NEXUS HUB</h3>
              <p className="text-xs text-slate-600">Access all our verified social portals, portfolio links, and contact channels in one place.</p>
            </div>
            
            <a
              href="https://linktr.ee/aceinnovationnexus"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerHaptic(20)}
              className="mt-4 sm:mt-0 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold text-white transition-all neon-btn haptic-press shrink-0"
            >
              <span>Visit Linktree</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </section>

      {/* SEARCH AND FILTER BAR */}
      <section className="relative py-8 border-y border-slate-200 glass-panel">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? associatedOrganizations.length 
                : associatedOrganizations.filter(o => o.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { triggerHaptic(10); setSelectedCategory(cat); }}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all border haptic-press ${
                    selectedCategory === cat
                      ? 'text-white border-[#004aad] shadow-xs'
                      : 'text-slate-600 border-slate-200 bg-slate-50 hover:text-slate-900 hover:border-slate-300'
                  }`}
                  style={selectedCategory === cat ? { background: '#004aad' } : {}}
                >
                  {cat} <span className="opacity-75 text-[10px] ml-1">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Realtime Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search organizations or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs cosmic-input font-sans"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#004aad]" />
          </div>

        </div>
      </section>

      {/* ORGANIZATIONS GRID */}
      <section className="relative py-16 max-w-7xl mx-auto px-6 sm:px-8">
        {filteredOrganizations.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#004aad]">
              <Building2 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No organizations match your query</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Try selecting "All" categories or adjusting your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrganizations.map((org) => (
              <div
                key={org.id}
                className="group flex flex-col justify-between rounded-3xl p-6 cosmic-card tilt-3d perspective-container relative overflow-hidden"
              >
                {/* Upper Content */}
                <div>
                  
                  {/* Top Bar: Logo & Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-16 w-16 rounded-2xl p-2.5 flex items-center justify-center bg-slate-50 border border-slate-200 shadow-xs group-hover:border-[#004aad]/40 transition-colors">
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          // Fallback to placeholder SVG if image load fails
                          (e.target as HTMLImageElement).src = '/logos/placeholder.svg';
                        }}
                      />
                    </div>
                    
                    <span className="rounded-lg px-2.5 py-1 text-[9px] font-bold text-[#004aad] uppercase tracking-wider font-mono bg-blue-50 border border-blue-100">
                      {org.category}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div className="mt-5 space-y-1.5">
                    <h3 className="text-xl font-extrabold text-slate-900 font-display leading-snug group-hover:text-[#004aad] transition-colors">
                      {org.name}
                    </h3>
                    
                    {org.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
                        <MapPin className="h-3.5 w-3.5 text-[#004aad] shrink-0" />
                        <span>{org.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {org.description && (
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 font-sans">
                      {org.description}
                    </p>
                  )}

                </div>

                {/* Associated Links Buttons Footer */}
                <div className="mt-6 pt-5 border-t border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-2">
                    {org.links.length > 1 ? 'Associated Platforms' : 'Official Channel'}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {org.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerHaptic(15)}
                        className="group/btn inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 bg-slate-50 hover:bg-[#004aad] hover:text-white hover:border-[#004aad] transition-all haptic-press"
                      >
                        {renderLinkIcon(link.type)}
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-3 w-3 text-slate-400 group-hover/btn:text-white transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM COLLABORATION CTA */}
      <section className="relative py-16 cosmic-section border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center glass-panel-strong p-10 rounded-3xl border border-blue-200 space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#004aad] border border-blue-200 bg-blue-50">
            <Sparkles className="h-3.5 w-3.5 text-[#004aad]" />
            Join Our Ecosystem
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Want to collaborate or list your brand?
          </h2>

          <p className="text-sm text-slate-600 max-w-xl mx-auto font-sans">
            We help healthcare organizations, hospitality businesses, schools, and creative brands accelerate their digital growth and visibility.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => { triggerHaptic(20); openContactModal(); }}
              className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all neon-btn haptic-press"
            >
              <span>Get Started With Us</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

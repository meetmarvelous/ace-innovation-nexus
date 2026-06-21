import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import AboutView from './components/AboutView';
import PartnershipsView from './components/PartnershipsView';
import CareersView from './components/CareersView';
import FloatingGuide from './components/FloatingGuide';
import ParticleField from './components/ParticleField';
import { Send, CheckCircle2, Shield, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  // Global contact modal form states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientUrl, setClientUrl] = useState('');
  const [clientChallenge, setClientChallenge] = useState('SEO optimization & organic rankings');
  const [clientNotes, setClientNotes] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const triggerHaptic = useCallback((pattern: number | number[] = 30) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const handleGlobalContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return alert("Verify core fields: Name and Business Email required.");

    triggerHaptic([20, 40, 20]);
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      triggerHaptic([30, 60, 30, 60, 30]);
    }, 1500);
  };

  const closeAndResetContact = () => {
    triggerHaptic(15);
    setContactModalOpen(false);
    setClientName('');
    setClientEmail('');
    setClientUrl('');
    setClientChallenge('SEO optimization & organic rankings');
    setClientNotes('');
    setContactSuccess(false);
  };

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
        {currentTab === 'services' && <ServicesView />}
        {currentTab === 'about' && <AboutView />}
        {currentTab === 'partnerships' && <PartnershipsView />}
        {currentTab === 'careers' && <CareersView />}
      </main>

      {/* Footer element */}
      <Footer
        setCurrentTab={setCurrentTab}
        openContactModal={() => { triggerHaptic(20); setContactModalOpen(true); }}
      />

      {/* Floating 3D Guide Character */}
      <FloatingGuide currentTab={currentTab} />

      {/* GLOBAL STRATEGY CONSULTATION MODAL PORTAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md" style={{ background: 'rgba(5, 5, 15, 0.85)' }}>
          <div
            id="global-contact-modal-container"
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel-strong"
            style={{
              animation: 'fade-in-up 0.3s ease forwards',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.15), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Close trigger button */}
            <button
              onClick={closeAndResetContact}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600/30 focus:outline-none transition-colors haptic-press"
              title="Close Portal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Success pipeline complete */}
            {contactSuccess ? (
              <div className="space-y-6 text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400" style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}>
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white font-display">Growth Consultation Scheduled</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                    Outstanding, {clientName}. We've indexed your corporate challenge diagnostics. A strategy briefing task has been queued for our Lead Architect team.
                  </p>
                </div>

                <div className="border border-purple-500/20 p-5 rounded-xl text-left text-xs max-w-sm mx-auto font-mono space-y-1.5 shadow-sm text-slate-300" style={{ background: 'rgba(15, 15, 30, 0.6)' }}>
                  <div><span className="text-purple-400">CLIENT COMPANY:</span> {clientUrl || 'Ace Nexus VIP Partner'}</div>
                  <div><span className="text-purple-400">PRIMARY LEVER:</span> {clientChallenge}</div>
                  <div><span className="text-purple-400">DESK STATUS:</span> <span className="text-emerald-400 font-bold">ACKNOWLEDGED_#042</span></div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    id="modal-success-close-btn"
                    onClick={closeAndResetContact}
                    className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all neon-btn haptic-press"
                  >
                    Return to Blueprint
                  </button>
                </div>
              </div>
            ) : (
              // Contact intake form
              <div className="space-y-5 text-left">
                
                <div>
                  <span className="inline-flex items-center gap-1 rounded bg-purple-500/15 border border-purple-500/25 px-2.5 py-0.5 text-[9px] font-bold text-purple-300 uppercase tracking-wider font-mono">
                    <Sparkles className="h-3 w-3 fill-purple-400 text-purple-400" />
                    Strategy Intake Desk
                  </span>
                  <h3 className="text-xl font-black text-white font-display mt-2 leading-tight">
                    Schedule Brand Partnership Proposal
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Specify your current constraints and goals list below.</p>
                </div>

                <form onSubmit={handleGlobalContactSubmit} className="space-y-4">
                  
                  <div>
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Your Corporate Name & Title</label>
                    <input
                      required
                      type="text"
                      className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                      placeholder="Tega - Managing Director"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Business Email (Verified)</label>
                      <input
                        required
                        type="email"
                        className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                        placeholder="tega@comcorp.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Current Brand URL (Optional)</label>
                      <input
                        type="url"
                        className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                        placeholder="https://comcorp.com"
                        value={clientUrl}
                        onChange={(e) => setClientUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Primary Operational Challenge Focus</label>
                    <select
                      className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-select"
                      value={clientChallenge}
                      onChange={(e) => setClientChallenge(e.target.value)}
                    >
                      <option>SEO optimization & organic rankings</option>
                      <option>Visual retail branding & video strategy</option>
                      <option>Full-stack digital products & mobile PWAs</option>
                      <option>Corporate upskilling & talent placements</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Additional Strategic Notes or Targets (Optional)</label>
                    <textarea
                      rows={3}
                      className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                      placeholder="Briefly state conversion blockers or monthly retainer expectations..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                    />
                  </div>

                  <div className="pt-4 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 font-mono tracking-wide">
                      <Shield className="h-3.5 w-3.5 text-purple-400" />
                      SECURE PIPELINE NDA PROTECTED
                    </span>
                    <button
                      id="submit-consultation-form-btn"
                      disabled={contactLoading}
                      type="submit"
                      className="group flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all neon-btn haptic-press"
                    >
                      {contactLoading ? 'Encrypting coordinates...' : 'Acquire My Audited Proposal'}
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                </form>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

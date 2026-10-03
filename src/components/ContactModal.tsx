import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, Sparkles, X } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientUrl, setClientUrl] = useState('');
  const [clientChallenge, setClientChallenge] = useState('Marketing & SEO');
  const [clientNotes, setClientNotes] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return alert("Please fill in your name and email address.");

    triggerHaptic([20, 40, 20]);
    setContactLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('contact_submissions').insert([
          {
            full_name: clientName,
            email: clientEmail,
            company: clientUrl,
            service_requested: clientChallenge,
            message: clientNotes || 'No additional details provided.',
          }
        ]);
        if (error) {
          console.warn('Supabase submission warning:', error.message);
        }
      } catch (err) {
        console.error('Failed to submit lead to Supabase:', err);
      }
    }

    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      triggerHaptic([30, 60, 30, 60, 30]);
    }, 800);
  };

  const handleClose = () => {
    triggerHaptic(15);
    onClose();
    setClientName('');
    setClientEmail('');
    setClientUrl('');
    setClientChallenge('Marketing & SEO');
    setClientNotes('');
    setContactSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div
        id="global-contact-modal-container"
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel-strong"
        style={{
          animation: 'fade-in-up 0.3s ease forwards',
          boxShadow: '0 20px 50px rgba(0, 74, 173, 0.15), 0 4px 12px rgba(15, 23, 42, 0.08)',
        }}
      >
        {/* Close trigger button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors haptic-press"
          title="Close Portal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success state */}
        {contactSuccess ? (
          <div className="space-y-6 text-center py-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600" style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)' }}>
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-display">We've Got Your Message!</h3>
              <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
                Thanks {clientName}! We'll review your details and get back to you within 1-2 business days with a plan tailored to your needs.
              </p>
            </div>

            <div className="border border-blue-100 bg-blue-50/50 p-5 rounded-xl text-left text-xs max-w-sm mx-auto font-mono space-y-1.5 shadow-sm text-slate-700">
              <div><span className="text-[#004aad] font-bold">WEBSITE:</span> {clientUrl || 'Not provided'}</div>
              <div><span className="text-[#004aad] font-bold">SERVICE:</span> {clientChallenge}</div>
              <div><span className="text-[#004aad] font-bold">STATUS:</span> <span className="text-emerald-600 font-bold">RECEIVED ✓</span></div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                id="modal-success-close-btn"
                onClick={handleClose}
                className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all neon-btn haptic-press"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          // Contact intake form
          <div className="space-y-5 text-left">
            <div>
              <span className="inline-flex items-center gap-1 rounded bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[9px] font-bold text-[#004aad] uppercase tracking-wider font-mono">
                <Sparkles className="h-3 w-3 fill-[#004aad] text-[#004aad]" />
                Let's Talk
              </span>
              <h3 className="text-xl font-black text-slate-900 font-display mt-2 leading-tight">
                Book a Free Consultation
              </h3>
              <p className="text-xs text-slate-600 mt-1">Tell us a bit about your business and what you need help with.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#004aad] uppercase tracking-wider font-mono">Your Name</label>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                  placeholder="e.g. Tega John-Sola"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-[#004aad] uppercase tracking-wider font-mono">Email Address</label>
                  <input
                    required
                    type="email"
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                    placeholder="e.g. you@email.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#004aad] uppercase tracking-wider font-mono">Your Website (Optional)</label>
                  <input
                    type="url"
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                    placeholder="https://yourwebsite.com"
                    value={clientUrl}
                    onChange={(e) => setClientUrl(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#004aad] uppercase tracking-wider font-mono">What Do You Need Help With?</label>
                <select
                  className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-select"
                  value={clientChallenge}
                  onChange={(e) => setClientChallenge(e.target.value)}
                >
                  <option>Marketing & SEO</option>
                  <option>Branding, Photography & Video</option>
                  <option>Website or App Development</option>
                  <option>Content Creation & Social Media</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#004aad] uppercase tracking-wider font-mono">Anything Else You'd Like Us to Know? (Optional)</label>
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                  placeholder="Tell us about your business, your goals, or any challenges you're facing..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 font-mono tracking-wide">
                  <Shield className="h-3.5 w-3.5 text-[#004aad]" />
                  YOUR INFO IS SAFE WITH US
                </span>
                <button
                  id="submit-consultation-form-btn"
                  disabled={contactLoading}
                  type="submit"
                  className="group flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all neon-btn haptic-press"
                >
                  {contactLoading ? 'Sending...' : 'Send My Request'}
                  <Send className="h-4 w-4" />
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}

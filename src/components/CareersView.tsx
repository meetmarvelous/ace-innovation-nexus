import React, { useState, useRef, useCallback } from 'react';
import { jobRoles } from '../data';
import { JobRole } from '../types';
import { Search, Briefcase, MapPin, DollarSign, CheckCircle2, ChevronDown, ChevronUp, UploadCloud, Send, FileText, Check, Award, Compass } from 'lucide-react';
import KineticText from './KineticText';

export default function CareersView() {
  const [selectedDept, setSelectedDept] = useState<'All' | 'Tech' | 'Growth' | 'Creative' | 'Operations'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  // Apply form states
  const [applyingJob, setApplyingJob] = useState<JobRole | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  // Custom drag & drop feedback
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [applicationCompleted, setApplicationCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const departments: ('All' | 'Tech' | 'Growth' | 'Creative' | 'Operations')[] = [
    'All', 'Tech', 'Growth', 'Creative', 'Operations'
  ];

  const filteredJobs = jobRoles.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const toggleExpandJob = (jobId: string) => {
    triggerHaptic(10);
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const perkCards = [
    {
      title: "Work From Anywhere",
      icon: Compass,
      desc: "Our team is fully remote. You can work from home, a café, or anywhere with good internet. We care about the work you deliver, not where you sit."
    },
    {
      title: "We Invest in You",
      icon: Award,
      desc: "We pay for online courses, certifications, and tools to help you grow. Whether it's a design course, a marketing certification, or new software — we've got you covered."
    },
    {
      title: "Office When You Need It",
      icon: Briefcase,
      desc: "Sometimes you need a proper workspace. We provide access to co-working spaces in major Nigerian cities whenever you need a change of scenery."
    }
  ];

  // Drag and drop event handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setResumeFile(file);
      simulateResumeUpload();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      simulateResumeUpload();
    }
  };

  const simulateResumeUpload = () => {
    triggerHaptic([10, 20, 10]);
    setIsUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          triggerHaptic([20, 40, 20]);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail || !resumeFile) {
      return alert("Please fill in your name, email, and upload your CV/resume.");
    }
    triggerHaptic([30, 60, 30, 60, 30]);
    setApplicationCompleted(true);
  };

  const resetIntakeForm = () => {
    triggerHaptic(10);
    setApplyingJob(null);
    setCandidateName('');
    setCandidateEmail('');
    setPortfolioLink('');
    setResumeFile(null);
    setUploadProgress(0);
    setUploadSuccess(false);
    setApplicationCompleted(false);
  };

  return (
    <div className="w-full">
      
      {/* HEADER BANNER */}
      <section className="relative py-16 lg:py-20 cosmic-section star-field" style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Careers</span>
          <div className="mt-4">
            <KineticText
              text="Join Our"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-white sm:text-5xl font-display leading-[1.1] inline"
              delay={0.2}
            />
            {' '}
            <KineticText
              text="Growing Team"
              as="span"
              variant="shimmer"
              className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]"
              delay={0.8}
            />
          </div>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1s forwards', opacity: 0 }}>
            We're always looking for talented people who love what they do — marketers, designers, photographers, videographers, and developers. Work from anywhere.
          </p>
        </div>
      </section>

      {/* PERKS CARDS */}
      <section className="relative py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Perks & Benefits</span>
          <h2 className="text-3xl font-black text-white font-display">Why Work With Us</h2>
          <p className="text-sm text-slate-400">We believe great work comes from happy, supported people.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative z-10">
          {perkCards.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between cosmic-card tilt-3d perspective-container">
                <div className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">{perk.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans">{perk.desc}</p>
                </div>
                <div className="mt-8 pt-4 flex items-center justify-between text-[11px] font-mono tracking-wider font-bold" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <span className="text-slate-600">ACE INNOVATION NEXUS</span>
                  <span className="text-emerald-400">✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEARCH AND JOB LISTINGS */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-5xl px-6 sm:px-8 text-left relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Open Positions</span>
              <h2 className="text-3xl font-black text-white font-display mt-0.5">Explore Open Roles</h2>
            </div>

            {/* Search box */}
            <div className="relative w-full max-w-xs shrink-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm cosmic-input shadow-sm"
                placeholder="Search by job title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Department filter */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => { triggerHaptic(10); setSelectedDept(dept); }}
                className={`rounded-full px-5 py-2.5 text-xs font-bold border transition-all haptic-press ${
                  selectedDept === dept
                    ? 'text-white border-purple-500/40 shadow-sm'
                    : 'text-slate-400 border-purple-500/10 hover:text-white hover:border-purple-500/25'
                }`}
                style={selectedDept === dept ? { background: 'linear-gradient(135deg, var(--cosmic-accent), var(--cosmic-cyan))', boxShadow: 'var(--glow-purple)' } : { background: 'rgba(15, 15, 30, 0.5)' }}
              >
                {dept === 'All' ? 'All Departments' : dept}
              </button>
            ))}
          </div>

          {/* Job listing panels */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((role) => {
                const isExpanded = expandedJobId === role.id;
                return (
                  <div
                    key={role.id}
                    id={`job-panel-${role.id}`}
                    className="overflow-hidden rounded-2xl p-5 sm:p-6 cosmic-card transition-all"
                  >
                    
                    {/* Collapsed Header */}
                    <div
                      onClick={() => toggleExpandJob(role.id)}
                      className="flex cursor-pointer items-center justify-between gap-4 haptic-press"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white font-display group-hover:text-purple-300">
                            {role.title}
                          </h3>
                          <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1.5 font-medium"><MapPin className="h-3.5 w-3.5" />{role.location}</span>
                            <span className="flex items-center gap-1.5 font-semibold font-mono"><DollarSign className="h-3.5 w-3.5" />{role.salaryEstimate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="hidden sm:inline-block rounded-md px-3 py-1 text-[10px] font-bold text-purple-300 uppercase tracking-wider font-mono" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                          {role.type}
                        </span>
                        {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 space-y-6" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-white font-display">About This Role</h4>
                          <p className="text-sm text-slate-400 leading-relaxed font-sans">{role.description}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-bold text-white font-display mb-3">What You'll Do</h4>
                            <ul className="space-y-2.5 text-xs text-slate-400">
                              {role.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex gap-2.5 leading-relaxed">
                                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white font-display mb-3">What We're Looking For</h4>
                            <ul className="space-y-2.5 text-xs text-slate-400">
                              {role.requirements.map((req, idx) => (
                                <li key={idx} className="flex gap-2.5 leading-relaxed">
                                  <CheckCircle2 className="h-4.5 w-4.5 text-purple-400 shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-5 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                          <span className="text-xs text-slate-600 font-mono">ACE INNOVATION NEXUS CAREERS</span>
                          <button
                            id={`apply-trigger-${role.id}`}
                            onClick={() => { triggerHaptic(20); setApplyingJob(role); }}
                            className="rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all neon-btn haptic-press"
                          >
                            Apply Now &rarr;
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-purple-500/15 p-12 text-center text-slate-500" style={{ background: 'rgba(15, 15, 30, 0.4)' }}>
                <Briefcase className="mx-auto h-8 w-8 text-slate-600 stroke-dasharray animate-pulse" />
                <h3 className="mt-4 text-sm font-bold text-slate-300 font-display">No matching roles found</h3>
                <p className="text-xs text-slate-500 mt-1">Try a different search term or filter.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* APPLICATION MODAL */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md" style={{ background: 'rgba(5, 5, 15, 0.85)' }}>
          <div
            id="careers-modal-container"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel-strong"
            style={{
              animation: 'fade-in-up 0.3s ease forwards',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.15), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Close button */}
            <button
              onClick={resetIntakeForm}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600/30 focus:outline-none transition-colors haptic-press"
              title="Close"
            >
              <Check className="h-4 w-4 rotate-45" />
            </button>

            {/* Success state */}
            {applicationCompleted ? (
              <div className="space-y-6 text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400" style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}>
                  <Check className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white font-display">Application Sent!</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                    Thanks {candidateName}! We've received your application for the <strong className="text-purple-300">{applyingJob.title}</strong> role. Our team will review it and get back to you within 4 business days.
                  </p>
                </div>

                <div className="rounded-xl p-4.5 text-left text-xs max-w-md mx-auto font-mono space-y-1.5 shadow-sm text-slate-300" style={{ background: 'rgba(15, 15, 30, 0.6)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                  <div><span className="text-slate-500">NAME:</span> {candidateName}</div>
                  <div><span className="text-slate-500">ROLE:</span> {applyingJob.title}</div>
                  <div><span className="text-slate-500">CV/RESUME:</span> {resumeFile ? resumeFile.name : 'Uploaded'}</div>
                  <div><span className="text-slate-500">STATUS:</span> <span className="text-emerald-400 font-bold">RECEIVED ✓</span></div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    id="finish-intake-modal-btn"
                    onClick={resetIntakeForm}
                    className="rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all neon-btn haptic-press"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              // Application Form
              <div className="space-y-6 text-left">
                
                <div>
                  <span className="rounded px-2.5 py-0.5 text-[10px] font-bold text-purple-300 uppercase tracking-wider font-mono" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    Job Application
                  </span>
                  <span className="text-xs font-bold text-slate-500 block mt-2 font-mono">ROLE: {applyingJob.title.toUpperCase()}</span>
                  <h3 className="text-xl font-black text-white font-display mt-0.5 leading-snug">
                    Apply Now
                  </h3>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    
                    <div>
                      <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Your Full Name</label>
                      <input
                        required
                        type="text"
                        className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                        placeholder="e.g. Tega John-Sola"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Email Address</label>
                      <input
                        required
                        type="email"
                        className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                        placeholder="e.g. you@email.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    
                    <div>
                      <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Portfolio or Website (Optional)</label>
                      <input
                        type="url"
                        className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-input"
                        placeholder="https://your-portfolio.com"
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Your Main Skill</label>
                      <select className="mt-2 w-full rounded-xl px-4 py-3 text-sm cosmic-select">
                        <option>Web & App Development</option>
                        <option>SEO & Marketing</option>
                        <option>Design & Branding</option>
                        <option>Photography & Video</option>
                        <option>Content Creation</option>
                      </select>
                    </div>

                  </div>

                  {/* DRAG & DROP RESUME */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">CV / Resume (PDF or DOC)</label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`mt-2 rounded-2xl border-2 border-dashed p-6 text-center flex flex-col items-center justify-center gap-3 transition-colors ${
                        dragActive 
                          ? 'border-purple-500/50 bg-purple-500/5' 
                          : resumeFile 
                            ? 'border-purple-500/20' 
                            : 'border-purple-500/10 hover:border-purple-500/25'
                      }`}
                      style={{ background: dragActive ? 'rgba(139, 92, 246, 0.05)' : resumeFile ? 'rgba(15, 15, 30, 0.4)' : 'rgba(15, 15, 30, 0.3)' }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {resumeFile ? (
                        <div className="flex items-center gap-3 rounded-xl px-4 py-2.5 shadow-sm max-w-sm cosmic-card">
                          <FileText className="h-5 w-5 text-purple-400" />
                          <span className="text-xs font-semibold text-slate-300 truncate max-w-[200px]">{resumeFile.name}</span>
                          {uploadSuccess ? (
                            <span className="rounded px-1.5 py-0.5 text-[9px] font-bold text-emerald-400" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>READY</span>
                          ) : (
                            <span className="rounded px-1.5 py-0.5 text-[9px] font-bold text-purple-300" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>UPLOADING</span>
                          )}
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="h-8 w-8 text-slate-500 stroke-dasharray font-sans" />
                          <div>
                            <p className="text-xs text-slate-400">
                              <button type="button" onClick={triggerFileSelect} className="text-purple-400 font-bold hover:underline focus:outline-none haptic-press">Choose file</button>
                              <span> or drag your CV/resume here</span>
                            </p>
                            <p className="text-[10px] text-slate-600 mt-1 font-mono">PDF, DOC up to 5MB</p>
                          </div>
                        </>
                      )}

                      {/* Upload progress */}
                      {isUploading && (
                        <div className="w-full max-w-xs rounded-full h-1 mt-2 overflow-hidden" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                          <div className="h-1 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, var(--cosmic-accent), var(--cosmic-cyan))' }} />
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                    <button
                      type="button"
                      onClick={resetIntakeForm}
                      className="rounded-xl border border-purple-500/20 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-purple-500/10 transition-colors haptic-press"
                      style={{ background: 'rgba(15, 15, 30, 0.6)' }}
                    >
                      Cancel
                    </button>
                    <button
                      id="submit-applicant-dossier"
                      type="submit"
                      disabled={isUploading || !resumeFile}
                      className="group flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all neon-btn haptic-press disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Send Application
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

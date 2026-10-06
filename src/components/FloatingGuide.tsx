import { useState, useEffect, useCallback } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface FloatingGuideProps {
  currentTab: string;
}

const guideMessages: Record<string, string[]> = {
  home: [
    "Welcome to the Nexus! 🚀 We build brands that break through the noise.",
    "Ready to accelerate your digital presence? You're in the right place!",
    "Hey there! I'm Savvy, founder of ACE Innovation. Let me show you around! ✨",
    "Fun fact: Our client retention rate is 98%; we don't just deliver, we over-deliver! 💯",
    "Media, Tech, and Training: that's our DNA. Explore our services below! 👇",
  ],
  services: [
    "This is where the magic happens! Check out our proven strategies. 🎯",
    "From SEO to full-stack engineering, we handle the whole pipeline.",
    "Every case study here represents real revenue growth for real businesses.",
    "Through our training programs, we've trained and empowered ambitious creators and professionals across Africa! 📚",
    "Click any project to dive into the full blueprint. I'm proud of every one! 💜",
  ],
  about: [
    "Meet the crew! Every team member here is a specialist in their field. 🧠",
    "We're not just a creative shop; we're systematic growth operators.",
    "Built in Sub-Saharan Africa, serving the world. That's our story! 🌍",
    "Our values aren't just words on a wall; they're our actual rules of engagement.",
  ],
  partnerships: [
    "Partnerships are how we scale impact. Join our ecosystem! 🤝",
    "From talent hubs to tech integrations, there's a tier for every kind of org.",
    "Our Ibadan HQ is the nerve center, but our reach is global! 🌐",
  ],
  network: [
    "Explore the brands and organizations in our active network! 🔗",
    "From healthcare and hospitality to education and entertainment, we build with the best.",
    "Click any official channel button to connect directly with our partner brands! 🌐",
    "Have a brand ready for next-level growth? Let's talk! 🤝",
  ],
  careers: [
    "Explore the brands and organizations in our active network! 🔗",
    "From healthcare and hospitality to education and entertainment, we build with the best.",
    "Click any official channel button to connect directly with our partner brands! 🌐",
    "Have a brand ready for next-level growth? Let's talk! 🤝",
  ],
};

export default function FloatingGuide({ currentTab }: FloatingGuideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const triggerHaptic = useCallback((pattern: number | number[] = 30) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Haptics not supported, silent fail
      }
    }
  }, []);

  const getRandomMessage = useCallback(() => {
    const messages = guideMessages[currentTab] || guideMessages.home;
    return messages[Math.floor(Math.random() * messages.length)];
  }, [currentTab]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show initial bubble after entrance
      setTimeout(() => {
        setCurrentMessage(getRandomMessage());
        setShowBubble(true);
        triggerHaptic([20, 50, 20]);
      }, 1200);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Periodic random messages
  useEffect(() => {
    if (isMinimized) return;

    const showRandomMessage = () => {
      setCurrentMessage(getRandomMessage());
      setShowBubble(true);
      triggerHaptic(15);

      // Auto-hide after 8 seconds
      setTimeout(() => {
        setShowBubble(false);
      }, 8000);
    };

    const interval = setInterval(() => {
      // Random chance of showing (roughly every 20-35 seconds)
      if (Math.random() > 0.3) {
        showRandomMessage();
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [currentTab, isMinimized, getRandomMessage, triggerHaptic]);

  // Update message on tab change
  useEffect(() => {
    if (isMinimized) return;

    const timer = setTimeout(() => {
      setCurrentMessage(getRandomMessage());
      setShowBubble(true);
      triggerHaptic([15, 30, 15]);

      setTimeout(() => setShowBubble(false), 7000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentTab]);

  const handleGuideClick = () => {
    triggerHaptic(25);
    if (isMinimized) {
      setIsMinimized(false);
      setTimeout(() => {
        setCurrentMessage(getRandomMessage());
        setShowBubble(true);
      }, 300);
    } else {
      setShowBubble(!showBubble);
      if (!showBubble) {
        setCurrentMessage(getRandomMessage());
      }
    }
  };

  const handleMinimize = () => {
    triggerHaptic(15);
    setShowBubble(false);
    setIsMinimized(true);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      style={{
        animation: 'guide-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      {/* Speech Bubble */}
      {showBubble && !isMinimized && (
        <div
          className="relative max-w-[280px] sm:max-w-xs"
          style={{
            animation: 'bubble-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <div className="glass-panel-strong rounded-2xl rounded-br-md px-4 py-3 shadow-xl border border-slate-200">
            <button
              onClick={() => {
                setShowBubble(false);
                triggerHaptic(10);
              }}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
              title="Dismiss"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              {currentMessage}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-[#004aad] tracking-wider font-mono uppercase">
                SAVVY • FOUNDER
              </span>
            </div>
          </div>
          {/* Bubble pointer */}
          <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-white border-b border-r border-slate-200" />
        </div>
      )}

      {/* Guide Character */}
      <div className="relative group">
        {isMinimized ? (
          // Minimized floating icon
          <button
            id="guide-minimized-btn"
            onClick={handleGuideClick}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#004aad] to-[#0284c7] shadow-lg haptic-press animate-float"
            style={{
              boxShadow: '0 8px 25px rgba(0, 74, 173, 0.35)',
            }}
            title="Talk to Savvy"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </button>
        ) : (
          <div className="relative">
            {/* Minimize button */}
            <button
              onClick={handleMinimize}
              className="absolute -top-2 -left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 shadow-xs"
              title="Minimize guide"
            >
              <X className="h-3 w-3" />
            </button>

            {/* Character container */}
            <button
              id="guide-character-btn"
              onClick={handleGuideClick}
              className="relative overflow-hidden rounded-2xl haptic-press cursor-pointer transition-transform hover:scale-105"
              style={{
                animation: 'float 4s ease-in-out infinite',
                width: '90px',
                height: '110px',
              }}
              title="Click to chat with Savvy"
            >
              {/* Glow effect behind character */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
                  animation: 'glow-pulse 3s ease-in-out infinite',
                }}
              />
              <img
                src="/images/founder-guide.png"
                alt="Savvy - Your AI Guide"
                className="relative z-10 w-full h-full object-cover object-top rounded-2xl"
                style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))' }}
              />
            </button>

            {/* Orbital glow ring */}
            <div
              className="absolute -inset-2 rounded-3xl pointer-events-none"
              style={{
                border: '1px solid rgba(139, 92, 246, 0.15)',
                animation: 'glow-pulse 4s ease-in-out infinite',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

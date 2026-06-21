import { useEffect, useRef, useState } from 'react';

interface KineticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;
  variant?: 'reveal' | 'shimmer' | 'gradient' | 'glow';
  delay?: number;
  stagger?: number;
  triggerOnView?: boolean;
}

export default function KineticText({
  text,
  as: Tag = 'h1',
  className = '',
  variant = 'reveal',
  delay = 0,
  stagger = 0.03,
  triggerOnView = true,
}: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(!triggerOnView);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!triggerOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [triggerOnView, hasAnimated]);

  // Split text into words and letters for animation
  const renderAnimatedText = () => {
    if (variant === 'shimmer') {
      return (
        <span
          className={`shimmer-text ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: `opacity 0.5s ease ${delay}s` }}
        >
          {text}
        </span>
      );
    }

    if (variant === 'gradient') {
      return (
        <span
          className={`gradient-text ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transition: `opacity 0.5s ease ${delay}s`,
            animation: isVisible ? `fade-in-up 0.8s ease ${delay}s forwards` : 'none',
          }}
        >
          {text}
        </span>
      );
    }

    if (variant === 'glow') {
      return (
        <span
          className={`text-glow-purple ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: `opacity 0.5s ease ${delay}s` }}
        >
          {text}
        </span>
      );
    }

    // 'reveal' variant - letter by letter
    const words = text.split(' ');
    let letterIndex = 0;

    return words.map((word, wordIdx) => (
      <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {word.split('').map((letter) => {
          const currentIndex = letterIndex++;
          return (
            <span
              key={`${wordIdx}-${currentIndex}`}
              className="kinetic-letter"
              style={{
                animationDelay: isVisible
                  ? `${delay + currentIndex * stagger}s`
                  : '0s',
                animationPlayState: isVisible ? 'running' : 'paused',
                opacity: isVisible ? undefined : 0,
              }}
            >
              {letter}
            </span>
          );
        })}
        {wordIdx < words.length - 1 && (
          <span
            className="kinetic-letter"
            style={{
              animationDelay: isVisible
                ? `${delay + letterIndex++ * stagger}s`
                : '0s',
              animationPlayState: isVisible ? 'running' : 'paused',
              opacity: isVisible ? undefined : 0,
            }}
          >
            {' '}
          </span>
        )}
      </span>
    ));
  };

  return (
    <Tag ref={ref as any} className={className}>
      {renderAnimatedText()}
    </Tag>
  );
}

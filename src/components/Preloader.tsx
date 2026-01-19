import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
        if (percentRef.current) {
          const progress = Math.round(this.progress() * 100);
          percentRef.current.textContent = `${progress}%`;
        }
      }
    });

    // Fade out text
    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in'
    });

    // Scale and fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Background orbs */}
      <div className="floating-orb w-96 h-96 bg-secondary -top-48 -left-48" />
      <div className="floating-orb w-72 h-72 bg-primary -bottom-36 -right-36" />
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
            Prateek Chaudhary
          </h1>
          <p className="text-muted-foreground text-lg tracking-widest uppercase">
            Developer
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-4">
          <div className="progress-container">
            <div ref={progressRef} className="progress-bar" />
          </div>
          <span ref={percentRef} className="text-primary text-sm font-medium">
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

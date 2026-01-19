import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    // Headline animation
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    // CTA animation
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Spline fade in
    tl.fromTo(splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });

  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Spline Background Layer - z-index 0 */}
      <div ref={splineRef} className="absolute inset-0 z-0">
        <iframe 
          src="https://my.spline.design/orb-MiDWqvefDMBOx0GYW6aNB752/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Spline Animation"
        />
      </div>

      {/* Background orbs - z-index 1 */}
      <div className="hero-orb floating-orb w-[500px] h-[500px] bg-secondary -top-32 -left-32 z-[1]" />
      <div className="hero-orb floating-orb w-[400px] h-[400px] bg-primary bottom-0 right-1/4 z-[1]" />
      <div className="hero-orb floating-orb w-[300px] h-[300px] bg-accent top-1/3 right-0 z-[1]" />

      {/* Content Layer - z-index 10 */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-primary uppercase tracking-widest text-sm mb-4 font-medium">
            Welcome to my world
          </p>
          
          <h1 
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Hi, I'm{' '}
            <span className="gradient-text">Prateek Chaudhary</span>
            <br />
            <span className="text-foreground">Developer</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Crafting digital experiences with clean code and creative solutions. 
            Passionate about building web applications that make a difference.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-glow"
            >
              View My Work
            </button>
            <button onClick={scrollToContact} className="btn-hero">
              Hire Me Now
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - z-index 20 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

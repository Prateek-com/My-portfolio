import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, Code, Desktop, Database, Terminal } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer animation
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating particles
      gsap.to('.footer-particle', {
        y: -20,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="py-16 relative overflow-hidden">
      {/* Floating particles */}
      <div className="footer-particle absolute w-2 h-2 rounded-full bg-primary/40 top-10 left-1/4" />
      <div className="footer-particle absolute w-3 h-3 rounded-full bg-secondary/40 top-20 right-1/3" />
      <div className="footer-particle absolute w-2 h-2 rounded-full bg-accent/40 bottom-20 left-1/2" />
      <div className="footer-particle absolute w-1 h-1 rounded-full bg-primary/60 top-1/2 right-1/4" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Prateek Chaudhary
              </h3>
              <p className="text-muted-foreground text-sm">
                Building the future, one line at a time.
              </p>
            </div>

            {/* Navigation */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className="nav-link text-sm text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4 text-foreground">Services</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Code size={16} weight="light" className="text-primary" />
                  <span>Web Development</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Desktop size={16} weight="light" className="text-primary" />
                  <span>Frontend Design</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Database size={16} weight="light" className="text-primary" />
                  <span>Backend Development</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Terminal size={16} weight="light" className="text-primary" />
                  <span>Node.js Applications</span>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4 text-foreground">Connect</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                <a 
                  href="https://github.com/Prateek-com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover:glow-primary p-2"
                >
                  <GithubLogo size={24} weight="light" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-secondary transition-colors hover:glow-secondary p-2"
                >
                  <LinkedinLogo size={24} weight="light" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
            <span>Made with</span>
           
            <span> Prateek Chaudhary © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

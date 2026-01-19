import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';
import gsap from 'gsap';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? 'glass-card py-4' : 'py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-xl font-bold gradient-text">
          PC
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="nav-link"
              >
                {item.name}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-hero text-sm px-6 py-2"
            >
              Hire Me
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2"
        >
          {isOpen ? <X size={28} weight="light" /> : <List size={28} weight="light" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 glass-card">
          <ul className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <li key={item.name} className="mobile-nav-item">
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl font-light text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li className="mobile-nav-item">
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-hero"
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { ModalType } from '../types';
import gsap from 'gsap';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenModal: (type: ModalType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );
    
    // Logo entrance animation
    gsap.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.2, delay: 0.5, ease: 'back.out(1.7)' }
    );
  }, []);

  const handleLogoHover = (isEntering: boolean) => {
    if (isEntering) {
      gsap.to('.logo-icon', { rotate: 45 + 180, scale: 1.1, duration: 0.6, ease: 'power2.out' });
      gsap.to('.logo-text', { x: 5, duration: 0.3 });
    } else {
      gsap.to('.logo-icon', { rotate: 45, scale: 1, duration: 0.6, ease: 'power2.inOut' });
      gsap.to('.logo-text', { x: 0, duration: 0.3 });
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'dark:bg-black/80 bg-white/80 backdrop-blur-md py-4 border-b dark:border-white/10 border-black/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div 
          ref={logoRef}
          className="flex items-center space-x-3 cursor-pointer group"
          onMouseEnter={() => handleLogoHover(true)}
          onMouseLeave={() => handleLogoHover(false)}
        >
          <div className="logo-icon w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-purple/20 rotate-45 transition-all">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="logo-text text-2xl font-bold font-display tracking-tight dark:text-white text-black transition-transform">
            Signals<span className="text-brand-pink">HQ</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium dark:text-gray-300 text-gray-600 hover:text-brand-pink dark:hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-brand-pink hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-6 w-px bg-brand-lightBorder dark:bg-brand-border mx-2"></div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl dark:hover:bg-white/10 hover:bg-black/5 transition-all active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-brand-purple" />}
          </button>

          <button 
            onClick={() => onOpenModal('signup')}
            className="dark:bg-white bg-black dark:text-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(196,113,237,0.3)] transition-all flex items-center space-x-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-brand-purple" />}
          </button>
          <button className="dark:text-white text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full dark:bg-black bg-white border-b dark:border-white/10 border-black/10 p-6 md:hidden flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-300">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium dark:text-gray-300 text-gray-600 border-b border-black/5 dark:border-white/5 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsOpen(false);
              onOpenModal('signup');
            }}
            className="dark:bg-white bg-black dark:text-black text-white w-full py-4 rounded-full font-bold shadow-lg"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

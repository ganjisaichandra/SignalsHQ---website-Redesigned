
import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import UseCases from './components/UseCases';
import CustomerStories from './components/CustomerStories';
import Security from './components/Security';
import LogoScrolling from './components/LogoScrolling';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Modal from './components/Modal';
import { ModalType } from './types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [modal, setModal] = useState<{ isOpen: boolean; type: ModalType }>({ isOpen: false, type: null });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const openModal = (type: ModalType) => setModal({ isOpen: true, type });
  const closeModal = () => setModal({ ...modal, isOpen: false });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      if (section.id === 'hero' || section.classList.contains('sticky-card')) return;
      
      gsap.fromTo(section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-purple selection:text-white dark:bg-black bg-brand-light transition-colors duration-300 overflow-x-hidden">
      {/* Background SVG Patterns */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05]">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} onOpenModal={openModal} />
      
      <main>
        <Hero onOpenModal={openModal} />
        
        <LogoScrolling />

        <Stats />
        <Features />
        <UseCases />
        <CustomerStories />
        <Security />
        <Pricing onOpenModal={openModal} />
        <CTA onOpenModal={openModal} />
      </main>
      <Footer />
      
      <Modal isOpen={modal.isOpen} type={modal.type} onClose={closeModal} />

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;

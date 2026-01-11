
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LOGOS = [
  { name: 'Sama Tributa', color: 'text-yellow-500' },
  { name: 'Northbridge Tax', color: 'text-blue-500' },
  { name: 'Tax Advisory Pro', color: 'text-purple-500' },
  { name: 'Firm Solutions', color: 'text-green-500' },
  { name: 'Tax Intelligence', color: 'text-orange-500' },
  { name: 'Advisory Partners', color: 'text-blue-400' },
  { name: 'Tax Experts', color: 'text-purple-600' },
  { name: 'CPA Network', color: 'text-teal-400' },
];

const LogoScrolling: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.firstChild as HTMLElement;
      if (marqueeContent) {
        const totalWidth = marqueeContent.offsetWidth;
        
        gsap.to(marqueeRef.current, {
          x: -totalWidth / 2,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }
    }
  }, []);

  return (
    <section className="py-16 border-y border-brand-lightBorder dark:border-brand-border bg-white/50 dark:bg-black/50 backdrop-blur-sm overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-textMuted dark:text-gray-500">
          TRUSTED BY TAX FIRMS ACROSS THE BOARD
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap py-4">
          <div className="flex items-center space-x-12 md:space-x-24 px-12">
            {[...LOGOS, ...LOGOS].map((logo, idx) => (
              <div key={idx} className="flex items-center space-x-2 group cursor-default">
                <div className={`w-2 h-2 rounded-full ${logo.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                <span className="text-2xl md:text-3xl font-display font-black dark:text-white/40 text-black/40 group-hover:text-black dark:group-hover:text-white transition-all duration-300">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Gradients for fade effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/50 dark:from-black/50 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/50 dark:from-black/50 to-transparent z-10"></div>
      </div>
    </section>
  );
};

export default LogoScrolling;


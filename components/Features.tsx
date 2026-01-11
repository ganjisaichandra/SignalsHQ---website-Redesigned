
import React, { useEffect, useRef } from 'react';
import { FEATURES } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.feature-card');
    if (!cards.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%', // Trigger slightly earlier for better visibility
        toggleActions: 'play none none none'
      }
    });

    // 1. Animate Section Header
    tl.fromTo(headerRef.current,
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power4.out' 
      }
    );

    // 2. Staggered Entrance for Cards
    tl.fromTo(cards, 
      { 
        y: 60, 
        opacity: 0, 
        scale: 0.92,
        rotateX: -10 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotateX: 0,
        duration: 1.4, 
        stagger: 0.15, // Smooth staggering delay
        ease: 'expo.out',
      },
      "-=0.7" // Start cards animation while header is still finishing
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-32 transition-colors duration-300 dark:bg-brand-dark bg-white relative overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headerRef} className="max-w-3xl mb-24 opacity-0">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-black mb-6">
            PRODUCT
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] dark:text-white text-black mb-8">
            Everything You Wish Tax Software Could Do
          </h2>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx}
              className="feature-card glass-card p-10 rounded-[2.5rem] group hover:-translate-y-5 hover:rotate-1 transition-all duration-500 cursor-default relative overflow-hidden opacity-0"
              style={{ perspective: '1000px' }}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-brand-purple/20">
                <div className="text-white">
                   {feature.icon}
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 dark:text-white text-black group-hover:text-brand-pink transition-colors">
                {feature.title}
              </h4>
              <p className="dark:text-gray-400 text-brand-textMuted leading-relaxed text-base font-medium mb-6">
                {feature.description}
              </p>
              {feature.details && (
                <ul className="space-y-3 mb-4">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm dark:text-gray-300 text-gray-600">
                      <span className="text-brand-pink mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              {feature.comingSoon && (
                <div className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold mt-4">
                  Coming soon
                </div>
              )}
              {!feature.comingSoon && idx < 2 && (
                <div className="mt-6">
                  {idx === 0 ? (
                    <button className="text-brand-purple font-bold text-sm hover:underline">
                      Start free trial →
                    </button>
                  ) : (
                    <button className="text-brand-purple font-bold text-sm hover:underline">
                      Book a Demo →
                    </button>
                  )}
                </div>
              )}
              
              {/* Hover highlight line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

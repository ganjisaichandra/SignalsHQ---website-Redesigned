
import React, { useEffect, useRef } from 'react';
import { STATS } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.stat-item');
    if (!items) return;

    items.forEach((item) => {
      const val = item.querySelector('.stat-value');
      gsap.fromTo(val,
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="solutions" className="py-24 relative overflow-hidden dark:bg-black bg-brand-light transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold dark:text-white text-black mb-6">
            Cut research and preparation hours with AI‑driven automation.
          </h2>
          <p className="text-lg dark:text-gray-400 text-brand-textMuted">
            One reliable layer for <strong>authoritative answers</strong>, <strong>automated intake and extraction</strong>, and <strong>streamlined prep</strong> to help your firm cut busy‑season grind and redirect time to advisory.
          </p>
        </div>
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto"
        >
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-item relative">
              <div className="stat-value text-5xl md:text-7xl font-display font-extrabold mb-3 text-gradient">
                {stat.value}
              </div>
              <div className="stat-label text-xs dark:text-brand-textMuted text-gray-500 font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </div>
              {idx < STATS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-px h-12 bg-brand-lightBorder dark:bg-brand-border -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

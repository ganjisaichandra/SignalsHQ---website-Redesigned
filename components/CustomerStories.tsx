
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const CustomerStories: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.testimonial-card');
    if (!cards.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    tl.fromTo(headerRef.current,
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power4.out' 
      }
    );

    tl.fromTo(cards, 
      { 
        y: 60, 
        opacity: 0, 
        scale: 0.92,
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.4, 
        stagger: 0.2, 
        ease: 'expo.out',
      },
      "-=0.7"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="customer-stories"
      ref={sectionRef}
      className="py-32 transition-colors duration-300 dark:bg-black bg-brand-light relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-24 opacity-0">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-black mb-6">
            CUSTOMER STORIES
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] dark:text-white text-black mb-8">
            Trusted by firms across the board
          </h2>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={idx}
              className="testimonial-card glass-card p-10 rounded-[2.5rem] group hover:-translate-y-5 transition-all duration-500 cursor-default relative overflow-hidden opacity-0"
            >
              <div className="mb-6">
                <svg className="w-12 h-12 text-brand-purple/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-lg dark:text-gray-300 text-gray-700 leading-relaxed mb-8 font-medium italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold dark:text-white text-black">{testimonial.name}</div>
                  <div className="text-sm dark:text-gray-400 text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;



import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, TrendingUp, Shield, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const USE_CASES = [
  {
    title: 'Always Current on Tax Rules',
    description: 'Delivers the latest updates across SALT and Federal taxes directly in your workflow.',
    icon: <CheckCircle className="w-8 h-8 text-brand-purple" />,
  },
  {
    title: 'Turn Raw Data into Insight',
    description: 'Uses AI to locate, organize, and surface client insights hidden in client documents.',
    icon: <TrendingUp className="w-8 h-8 text-brand-pink" />,
  },
  {
    title: 'Surface Savings & Risks',
    description: 'Analyze your client data to unlock opportunities and spot risks proactively.',
    icon: <Shield className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: 'Complex Advisory Ready',
    description: 'Automates nexus studies, maps P&L, and handles K-1s for complex pass-through entities with accuracy.',
    icon: <FileText className="w-8 h-8 text-green-500" />,
  },
];

const UseCases: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.use-case-card');
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
        stagger: 0.15, 
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
      id="use-case"
      ref={sectionRef}
      className="py-32 transition-colors duration-300 dark:bg-brand-dark bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headerRef} className="max-w-3xl mb-24 opacity-0">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-black mb-6">
            USE CASE
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] dark:text-white text-black mb-8">
            Focus on high-value client outcomes.
          </h2>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {USE_CASES.map((useCase, idx) => (
            <div 
              key={idx}
              className="use-case-card glass-card p-10 rounded-[2.5rem] group hover:-translate-y-5 transition-all duration-500 cursor-default relative overflow-hidden opacity-0"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-brand-purple/20">
                {useCase.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 dark:text-white text-black group-hover:text-brand-pink transition-colors">
                {useCase.title}
              </h4>
              <p className="dark:text-gray-400 text-brand-textMuted leading-relaxed text-base font-medium">
                {useCase.description}
              </p>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;


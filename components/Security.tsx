
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SECURITY_FEATURES = [
  {
    title: 'End-to-end Encryption',
    badge: 'SOC 2 Type II',
    icon: <Lock className="w-8 h-8 text-brand-purple" />,
  },
  {
    title: 'Monitoring Systems',
    details: ['24/7 intrusion detection', 'Quarterly scans & annual pen tests'],
    icon: <Eye className="w-8 h-8 text-brand-pink" />,
  },
  {
    title: 'Access Control',
    details: ['Multi‑Factor Authentication & Role‑based permissions'],
    icon: <Shield className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: 'Regulation Compliant',
    details: ['TLS 256‑bit in transit & at rest'],
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
  },
];

const Security: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.security-card');
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
      id="security"
      ref={sectionRef}
      className="py-32 transition-colors duration-300 dark:bg-brand-dark bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-24 opacity-0">
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] dark:text-white text-black mb-6">
            Secure Conversations. Smarter Tax Strategies.
          </h2>
          <p className="text-lg dark:text-gray-400 text-brand-textMuted italic">
            Built on industry-leading standards to keep your clients' data safe and your firm audit-ready.
          </p>
          <a href="#" className="inline-block mt-6 text-brand-purple font-bold hover:underline">
            Find more →
          </a>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {SECURITY_FEATURES.map((feature, idx) => (
            <div 
              key={idx}
              className="security-card glass-card p-8 rounded-[2.5rem] group hover:-translate-y-5 transition-all duration-500 cursor-default relative overflow-hidden opacity-0"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-brand-purple/20">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 dark:text-white text-black group-hover:text-brand-pink transition-colors">
                {feature.title}
              </h4>
              {feature.badge && (
                <div className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold mb-3">
                  {feature.badge}
                </div>
              )}
              {feature.details && (
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="text-sm dark:text-gray-400 text-brand-textMuted">
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;


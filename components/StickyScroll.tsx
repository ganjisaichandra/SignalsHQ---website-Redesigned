
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, BrainCircuit, Zap, BarChart4 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WORKFLOW_STEPS = [
  {
    title: "Data Ingestion",
    description: "Our infrastructure aggregates over 1PB of raw market data daily from 40+ global exchanges, sentiment feeds, and on-chain metrics.",
    icon: <Database className="w-8 h-8 text-brand-purple" />,
    color: "from-brand-purple/20 to-transparent",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Neural Processing",
    description: "Custom-trained transformer models identify non-linear patterns and institutional liquidity clusters with 99.9% reliability.",
    icon: <BrainCircuit className="w-8 h-8 text-brand-pink" />,
    color: "from-brand-pink/20 to-transparent",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Signal Refinement",
    description: "Proprietary probabilistic filters remove market noise, ensuring only the highest conviction setups reach your dashboard.",
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-500/20 to-transparent",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Smart Execution",
    description: "Instantly route orders through our ultra-low latency gateway with optimized slippage protection and MEV resistance for institutional performance.",
    icon: <BarChart4 className="w-8 h-8 text-green-500" />,
    color: "from-green-500/20 to-transparent",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop"
  }
];

const StickyScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.sticky-card') as HTMLElement[];
    
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Last card doesn't need this effect

      const nextCard = cards[index + 1];
      
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.5,
        scrollTrigger: {
          trigger: nextCard,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 dark:bg-black bg-brand-light relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-black mb-6">
            WORKFLOW
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold dark:text-white text-black mb-8">
            How we deliver <span className="text-gradient">Market Alpha.</span>
          </h2>
          <p className="text-xl text-brand-textMuted dark:text-gray-400">
            A seamless pipeline from raw data to executed success.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div 
              key={idx} 
              className="sticky-card sticky top-32 w-full min-h-[500px] flex items-center justify-center"
            >
              <div className={`w-full glass-card rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden bg-gradient-to-br ${step.color} border-white/10 shadow-2xl`}>
                <div className="lg:w-1/2 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-inner">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-brand-purple font-black text-sm tracking-[0.3em] uppercase mb-2 block">Step 0{idx + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-display font-bold dark:text-white text-black mb-6">{step.title}</h3>
                    <p className="text-lg md:text-xl dark:text-gray-400 text-brand-textMuted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white">
                          <img src={`https://i.pravatar.cc/150?u=${idx}${i}`} className="rounded-full" alt="user" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-bold dark:text-gray-500 text-gray-400 uppercase tracking-widest">Active on this node</span>
                  </div>
                </div>

                <div className="lg:w-1/2 w-full aspect-video lg:aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  
                  {/* Floating Tech Badge */}
                  <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-white font-mono text-xs font-bold">STATUS: NOMINAL</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyScroll;

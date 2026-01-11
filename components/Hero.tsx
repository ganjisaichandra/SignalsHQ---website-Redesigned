
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { ModalType } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenModal: (type: ModalType) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const bgPurpleRef = useRef<HTMLDivElement>(null);
  const bgPinkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);
  const growthTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Initial entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(titleRef.current, 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
    )
    .fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    )
    .fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    )
    .fromTo(visualRef.current,
      { scale: 0.9, opacity: 0, rotateX: -20 },
      { scale: 1, opacity: 1, rotateX: 0, duration: 1.5, ease: 'expo.out' },
      '-=1'
    );

    // Continuous floating idle animation for the main mockup
    gsap.to(visualRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Extremely slow movement for the background texture
    gsap.to(textureRef.current, {
      backgroundPosition: '100px 100px',
      duration: 120,
      repeat: -1,
      ease: 'linear'
    });

    // Real-time Data Animation for the Network Load Bars
    if (barsRef.current) {
      const bars = barsRef.current.children;
      gsap.to(bars, {
        height: (i) => `${[40, 70, 45, 90, 65, 80, 55, 100][i] * 1.2}px`,
        duration: "random(0.5, 1.2)",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.1,
          from: "random",
        },
        ease: "power1.inOut"
      });
    }

    // Auto-scrolling color animation for "Growth" text
    if (growthTextRef.current) {
      const colorGradients = [
        'linear-gradient(135deg, #7442B6 0%, #C471ED 100%)', // purple to pink
        'linear-gradient(135deg, #C471ED 0%, #3B82F6 100%)', // pink to blue
        'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', // blue to green
        'linear-gradient(135deg, #10B981 0%, #F59E0B 100%)', // green to amber
        'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)', // amber to red
        'linear-gradient(135deg, #EF4444 0%, #8B5CF6 100%)', // red to violet
        'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', // violet to pink
        'linear-gradient(135deg, #EC4899 0%, #7442B6 100%)', // pink to purple
      ];

      const colorTimeline = gsap.timeline({ repeat: -1 });
      
      colorGradients.forEach((gradient) => {
        colorTimeline.to(growthTextRef.current, {
          backgroundImage: gradient,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: function() {
            if (growthTextRef.current) {
              growthTextRef.current.style.webkitBackgroundClip = 'text';
              growthTextRef.current.style.backgroundClip = 'text';
              growthTextRef.current.style.webkitTextFillColor = 'transparent';
            }
          }
        });
      });
      
      // Set initial gradient
      if (growthTextRef.current) {
        growthTextRef.current.style.backgroundImage = colorGradients[0];
        growthTextRef.current.style.webkitBackgroundClip = 'text';
        growthTextRef.current.style.backgroundClip = 'text';
        growthTextRef.current.style.webkitTextFillColor = 'transparent';
      }
    }

    // --- Pronounced Parallax Scrolling Effects ---
    
    // Background Purple Blur - Deepest background, moves very little for massiveness
    gsap.to(bgPurpleRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2.5 
      }
    });

    // Background Pink Blur - Faster opposing movement to create layer tension
    gsap.to(bgPinkRef.current, {
      yPercent: -75,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.8
      }
    });

    // Foreground Content - Significant lag to feel mid-ground
    gsap.to(contentRef.current, {
      y: 220,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      }
    });

    // Visual Mockup - High speed and scale change to feel like it's popping forward
    gsap.to(visualRef.current, {
      y: -350,
      rotateX: 18,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative pt-32 pb-16 md:pt-48 md:pb-32 lg:pt-56 lg:pb-40 overflow-hidden min-h-screen flex items-center"
    >
      {/* Dynamic Parallax Background Blurs */}
      <div 
        ref={bgPurpleRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-brand-purple/10 dark:bg-brand-purple/20 blur-[150px] rounded-full -z-20 opacity-70"
      ></div>
      <div 
        ref={bgPinkRef}
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-pink/5 blur-[120px] rounded-full -z-20 animate-pulse"
      ></div>

      {/* Subtle Slow-moving Geometric Texture */}
      <div 
        ref={textureRef}
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.05] dark:opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0 M0 0 L5 5 M35 35 L40 40' stroke='%237442B6' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center text-center w-full">
        <div ref={contentRef} className="flex flex-col items-center w-full max-w-7xl">
          <div className="inline-flex items-center space-x-2 dark:bg-brand-gray/50 bg-white border dark:border-brand-border border-brand-lightBorder px-5 py-2 rounded-full text-[10px] md:text-xs font-black mb-10 shadow-xl backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span>
            </span>
            <span className="dark:text-gray-300 text-gray-700 tracking-[0.2em]">AI POWERED TAX INTELLIGENCE</span>
          </div>

          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tight leading-[1.1] mb-8 md:mb-10 dark:text-white text-black px-4 max-w-6xl"
          >
            Powering Tax Experts. <br className="hidden sm:block" />
            <span className="block sm:inline">Fueling Firm </span>
            <span 
              ref={growthTextRef}
              className="inline-block growth-text bg-clip-text text-transparent"
            >
              Growth.
            </span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl dark:text-gray-400 text-brand-textMuted max-w-3xl mb-14 leading-relaxed font-medium"
          >
            Smart Automation Built for Scaling Tax Firms
          </p>

          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 mb-24"
          >
            <button 
              onClick={() => onOpenModal('signup')}
              className="bg-gradient-primary px-12 py-5 rounded-full font-black text-white text-lg hover:shadow-[0_0_40px_rgba(116,66,182,0.5)] transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => onOpenModal('sales')}
              className="flex items-center space-x-4 group dark:text-white text-black font-bold text-lg"
            >
              <div className="w-14 h-14 rounded-full border-2 dark:border-white/20 border-black/10 flex items-center justify-center group-hover:bg-brand-purple/10 group-hover:border-brand-purple/40 transition-all">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <span className="group-hover:text-brand-purple transition-colors">Book a Demo</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Mockup - Refined for high impact */}
        <div 
          ref={visualRef}
          className="w-full max-w-6xl mx-auto relative perspective-1000 mt-12"
        >
          <div className="glass-card rounded-[3rem] p-4 md:p-8 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative border-t border-l border-white/20 dark:border-white/10 bg-black/40">
            {/* Browser-style Header Mockup */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="hidden md:flex space-x-4">
                <div className="w-32 h-4 bg-white/10 rounded-full"></div>
                <div className="w-20 h-4 bg-white/10 rounded-full"></div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-white/20"></div>
              </div>
            </div>

            {/* Dashboard Content Area */}
            <div className="aspect-[16/8] w-full rounded-[2rem] bg-black/90 overflow-hidden border border-white/10 relative group/img">
              {/* Refined Image Source with clear tech theme */}
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop" 
                alt="SignalsHQ Tax Intelligence Platform" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover/img:scale-105 opacity-60"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Animated Tooltips */}
              <div className="absolute top-10 left-10 space-y-4">
                <div className="flex items-center space-x-3 bg-brand-purple/90 backdrop-blur-xl p-3.5 rounded-2xl border border-white/20 shadow-2xl animate-in slide-in-from-left duration-700">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-xs md:text-sm tracking-wide">Tax Research: Instant Answers</span>
                </div>
                <div className="flex items-center space-x-3 bg-brand-pink/90 backdrop-blur-xl p-3.5 rounded-2xl border border-white/20 shadow-2xl animate-in slide-in-from-left duration-700 delay-150">
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-xs md:text-sm tracking-wide">Security: SOC 2 Type II</span>
                </div>
              </div>

              {/* Refined Network Load Statistics Area */}
              <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                <div ref={barsRef} className="flex space-x-1.5 items-end">
                  {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-3 md:w-4 bg-brand-pink rounded-t-md shadow-[0_0_15px_rgba(196,113,237,0.6)]" 
                      style={{ height: `${h}px` }}
                    ></div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-5 bg-black/60 backdrop-blur-2xl p-5 rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-105">
                   <div className="text-right">
                     <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Time Saved</div>
                     <div className="text-xl md:text-2xl font-display font-black text-white leading-none">4+ <span className="text-brand-pink text-xs">hours</span></div>
                   </div>
                   <div className="w-12 h-12 bg-brand-pink/20 rounded-2xl flex items-center justify-center border border-brand-pink/30">
                     <Activity className="w-7 h-7 text-brand-pink animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Base Glow */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-brand-purple/40 blur-[120px] -z-10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

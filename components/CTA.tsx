
import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ModalType } from '../types';

interface CTAProps {
  onOpenModal: (type: ModalType) => void;
}

const CTA: React.FC<CTAProps> = ({ onOpenModal }) => {
  const [activeLoading, setActiveLoading] = useState<ModalType>(null);

  const handleAction = (type: ModalType) => {
    setActiveLoading(type);
    
    // Simulate a brief "preparing" delay to show the high-end loading state
    setTimeout(() => {
      onOpenModal(type);
      setActiveLoading(null);
    }, 800);
  };

  return (
    <section className="py-24 px-6 dark:bg-black bg-white transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="relative bg-gradient-primary rounded-[3rem] p-10 md:p-20 overflow-hidden group shadow-2xl shadow-brand-purple/20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-8 tracking-tight leading-tight">
              Get hands-on with AI-powered tax automation today.
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 font-medium">
              Start Free. No Credit Card Required.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => handleAction('signup')}
                disabled={activeLoading !== null}
                className="bg-white text-brand-purple min-w-[220px] px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 group/btn disabled:opacity-80 disabled:hover:translate-y-0"
              >
                {activeLoading === 'signup' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span>Start 15-day Free Trial</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <button 
                onClick={() => handleAction('sales')}
                disabled={activeLoading !== null}
                className="bg-black/20 backdrop-blur-md border border-white/30 text-white min-w-[220px] px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center disabled:opacity-80"
              >
                {activeLoading === 'sales' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Contact Sales"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

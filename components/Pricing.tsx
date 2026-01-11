
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ModalType } from '../types';

const PLANS = [
  {
    name: 'Free Trial',
    price: '$0',
    duration: '14 days',
    features: ['Real-time Spot Signals', 'Standard Execution', 'Basic Analytics', 'Community Support'],
    cta: 'Start Trial',
    type: 'signup' as ModalType,
    popular: false,
  },
  {
    name: 'Pro Trader',
    price: '$49',
    duration: 'per month',
    features: ['Spot & Perp Signals', 'AI Pattern Discovery', 'Priority Execution', 'Full API Access', 'Personal Dashboards'],
    cta: 'Get Started',
    type: 'signup' as ModalType,
    popular: true,
  },
  {
    name: 'Institutional',
    price: '$199',
    duration: 'per month',
    features: ['Custom Signal Models', 'Ultra-low Latency', 'White-label Reports', 'Dedicated Account Mgr', 'On-prem Deployment'],
    cta: 'Contact Sales',
    type: 'sales' as ModalType,
    popular: false,
  },
];

interface PricingProps {
  onOpenModal: (type: ModalType) => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  return (
    <section id="pricing" className="py-24 dark:bg-black bg-white transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-brand-pink text-sm font-bold uppercase tracking-widest mb-4">Pricing Plans</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold dark:text-white text-black mb-6">Simple, transparent pricing for everyone.</h3>
          <p className="dark:text-gray-400 text-brand-textMuted">Choose the plan that fits your trading style. Upgrade or downgrade anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div 
              key={plan.name}
              className={`relative glass-card p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                plan.popular ? 'border-brand-purple ring-2 ring-brand-purple/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-purple text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}
              <h4 className="text-lg font-bold mb-2 dark:text-white text-black">{plan.name}</h4>
              <div className="flex items-baseline space-x-1 mb-8">
                <span className="text-4xl md:text-5xl font-display font-extrabold dark:text-white text-black">{plan.price}</span>
                <span className="dark:text-gray-500 text-gray-400 text-sm">{plan.duration}</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3 text-sm">
                    <Check className="w-4 h-4 text-brand-pink shrink-0" />
                    <span className="dark:text-gray-300 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onOpenModal(plan.type)}
                className={`w-full py-4 rounded-full font-bold transition-all flex items-center justify-center space-x-2 group ${
                  plan.popular 
                    ? 'bg-gradient-primary text-white shadow-lg shadow-brand-purple/20' 
                    : 'dark:bg-white/5 bg-black/5 dark:text-white text-black hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

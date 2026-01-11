
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ModalType } from '../types';
import gsap from 'gsap';

interface ModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ type, isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, pointerEvents: 'none' });
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (type === 'sales') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.message) newErrors.message = 'Please include a message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  if (!isOpen && !isSuccess) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div 
        ref={modalRef}
        className="glass-card w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="text-center py-12 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-3xl font-display font-bold mb-4 dark:text-white text-black">Request Received!</h3>
            <p className="text-brand-textMuted dark:text-gray-400">Our team will reach out to you within 24 hours.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 dark:text-white text-black">
                {type === 'signup' ? 'Get Started' : 'Contact Sales'}
              </h3>
              <p className="text-brand-textMuted dark:text-gray-400 font-medium">
                {type === 'signup' 
                  ? 'Start your 14-day free trial. No credit card required.' 
                  : 'Let us build a custom institutional solution for your team.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {type === 'sales' && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-brand-textMuted dark:text-gray-500 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className={`w-full bg-black/5 dark:bg-white/5 border ${errors.name ? 'border-brand-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all dark:text-white text-black`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {errors.name && <p className="text-brand-pink text-[10px] font-bold mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-textMuted dark:text-gray-500 mb-2">Work Email</label>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className={`w-full bg-black/5 dark:bg-white/5 border ${errors.email ? 'border-brand-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all dark:text-white text-black`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {errors.email && <p className="text-brand-pink text-[10px] font-bold mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
              </div>

              {type === 'sales' && (
                <>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-brand-textMuted dark:text-gray-500 mb-2">Company</label>
                    <input 
                      type="text" 
                      placeholder="SignalsHQ Inc."
                      className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all dark:text-white text-black"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-brand-textMuted dark:text-gray-500 mb-2">Message</label>
                    <textarea 
                      placeholder="How can we help?"
                      rows={3}
                      className={`w-full bg-black/5 dark:bg-white/5 border ${errors.message ? 'border-brand-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all dark:text-white text-black resize-none`}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                    {errors.message && <p className="text-brand-pink text-[10px] font-bold mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.message}</p>}
                  </div>
                </>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-white py-5 rounded-full font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-brand-purple/40 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{type === 'signup' ? 'Create Account' : 'Send Request'}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

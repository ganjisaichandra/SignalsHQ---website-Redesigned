
import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="dark:bg-black bg-brand-light pt-24 pb-12 border-t dark:border-brand-border border-brand-lightBorder transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
              </div>
              <span className="text-xl font-bold font-display tracking-tight dark:text-white text-black">
                Signals<span className="text-brand-pink">HQ</span>
              </span>
            </div>
            <p className="dark:text-gray-400 text-brand-textMuted text-sm leading-relaxed max-w-xs">
              Smart Automation Built for Scaling Tax Firms.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border dark:border-brand-border border-brand-lightBorder flex items-center justify-center dark:text-gray-400 text-gray-500 hover:text-brand-purple hover:border-brand-purple transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 dark:text-white text-black">Product</h4>
            <ul className="space-y-4 text-sm dark:text-gray-400 text-brand-textMuted">
              <li><a href="#features" className="hover:text-brand-pink transition-colors">Features</a></li>
              <li><a href="#use-case" className="hover:text-brand-pink transition-colors">Use Case</a></li>
              <li><a href="#security" className="hover:text-brand-pink transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 dark:text-white text-black">Resources</h4>
            <ul className="space-y-4 text-sm dark:text-gray-400 text-brand-textMuted">
              <li><a href="#" className="hover:text-brand-pink transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Knowledge Hub</a></li>
              <li><a href="#security" className="hover:text-brand-pink transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 dark:text-white text-black">Company</h4>
            <ul className="space-y-4 text-sm dark:text-gray-400 text-brand-textMuted">
              <li><a href="#" className="hover:text-brand-pink transition-colors">Privacy policy</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Terms conditions</a></li>
              <li><a href="#contact" className="hover:text-brand-pink transition-colors">Contact us</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t dark:border-brand-border border-brand-lightBorder">
          <div className="mb-8">
            <h4 className="font-bold mb-4 dark:text-white text-black">Subscribe to Tax Newsletter</h4>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-full border dark:border-brand-border border-brand-lightBorder dark:bg-brand-gray bg-white dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
              <button className="bg-gradient-primary px-6 py-3 rounded-full font-bold text-white hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] md:text-xs font-medium dark:text-gray-500 text-gray-400 uppercase tracking-widest">
            <p>© 2025 SignalsHQ, Inc. All rights reserved.</p>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
              <a href="#security" className="hover:text-black dark:hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

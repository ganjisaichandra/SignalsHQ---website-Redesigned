
import React from 'react';
import { NavLink, Feature, Stat, Testimonial } from './types';
import { 
  Search, 
  Brain, 
  TrendingUp, 
  FileText,
  Shield,
  CheckCircle
} from 'lucide-react';

export const NAV_LINKS: NavLink[] = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Use Case', href: '#use-case' },
  { name: 'Security', href: '#security' },
  { name: 'Resources', href: '#resources' },
  { name: 'Contact', href: '#contact' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Tax Research',
    description: 'Instant, reliable answers to your tax questions. Clear, citable answers backed by laws and court rulings.',
    icon: <Search className="w-6 h-6 text-[#C471ED]" />,
    details: ['Direct IRS citations & references', 'Federal & SALT coverage for comprehensive advisory'],
  },
  {
    title: 'Neural AI',
    description: 'Client Data in One Place. Centralized. Searchable. Always current.',
    icon: <Brain className="w-6 h-6 text-[#C471ED]" />,
    details: ['AI document intake & extraction', '360° client overview at your fingertips'],
  },
  {
    title: 'Advisory',
    description: 'Strategy That Pays Off. Deliver proactive advice without the manual grind.',
    icon: <TrendingUp className="w-6 h-6 text-[#C471ED]" />,
    details: ['Nexus study', 'Advisory-ready reporting', 'Multi-entity (1040, 1065, 1120-S) support'],
    comingSoon: true,
  },
  {
    title: 'Preparation',
    description: 'First Pass Returns? Already Done. Cut prep time by 70%.',
    icon: <FileText className="w-6 h-6 text-[#C471ED]" />,
    details: ['AI reclassification with audit trail', 'Works with your existing tool stack', 'Individual & Corporation ready'],
    comingSoon: true,
  },
];

export const STATS: Stat[] = [
  { label: 'Time saved', value: '4+ hrs' },
  { label: 'Advisory Revenue', value: '2X' },
  { label: 'Client Satisfaction', value: '95%+' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Tax Manager',
    role: 'Sama Tributa',
    content: 'Research used to be a black hole. Now, I just type the question and get a citable IRS answer in seconds.',
    avatar: 'https://picsum.photos/100/100?random=1',
  },
  {
    name: 'Managing Partner',
    role: 'Northbridge Tax Advisory',
    content: '80% faster first drafts. What used to take us two days is now done in two hours.',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
];

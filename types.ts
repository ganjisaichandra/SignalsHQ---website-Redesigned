
// Fixed: Added React import to provide access to React namespace for ReactNode type
import React from 'react';

export type ModalType = 'signup' | 'sales' | null;

export interface NavLink {
  name: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];
  comingSoon?: boolean;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

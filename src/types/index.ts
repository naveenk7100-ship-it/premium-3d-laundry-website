export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  badge?: string;
  turnaround: string;
  startingPrice: string;
  features: string[];
  color: string;
  accentBg: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  timeframe: string;
  icon: string;
  highlights: string[];
}

export interface ShopTourStop {
  id: string;
  title: string;
  zone: string;
  subtitle: string;
  description: string;
  features: string[];
  equipment: string;
  ecoFeature: string;
  badge: string;
  imageTheme: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  turnaround: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
}

export interface PricingItem {
  id: string;
  category: string;
  name: string;
  pricePerUnit: number;
  unitLabel: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  serviceUsed: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'pricing' | 'process' | 'eco';
  question: string;
  answer: string;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  category: string;
  description: string;
  stainType: string;
  fabric: string;
  beforeDesc: string;
  afterDesc: string;
}

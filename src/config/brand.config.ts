/**
 * ONE CENTRAL CLIENT BRAND CONFIGURATION FILE
 * ============================================
 * Replace the bracketed placeholders [CLIENT ...] below with real business information.
 * Any update here will automatically reflect across the 3D Showroom, Navbar, Footer,
 * Booking Flow, Contact Widgets, SEO metadata, and Receipts without modifying individual components.
 */

export interface BrandConfig {
  businessName: string;
  brandShortName: string;
  tagline: string;
  subtitle: string;
  logo: {
    title: string;
    subtext: string;
    monogram: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappLink: string;
    email: string;
    conciergeEmail: string;
  };
  location: {
    storeName: string;
    street: string;
    city: string;
    stateZip: string;
    full: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    parkingInfo: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    valetCutoff: string;
    isOpenNowText: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  bookingSettings: {
    isDemoMode: boolean; // Set to false when connecting to a real logistics / payment API
    currencySymbol: string;
    defaultTurnaroundHours: number;
    expressTurnaroundHours: number;
    freePickupThresholdUsd: number;
    timeSlots: string[];
    fragrances: string[];
    guaranteeAmount: string;
  };
  seo: {
    siteUrl: string;
    siteName: string;
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    twitterHandle: string;
    keywords: string[];
  };
}

export const BRAND_CONFIG: BrandConfig = {
  // Brand Identity
  businessName: '[CLIENT BUSINESS NAME] — FreshFold Atelier',
  brandShortName: 'FreshFold',
  tagline: 'Fresh Clothes. Zero Effort.',
  subtitle: 'Premium laundry care, pickup and delivery — made effortless.',

  logo: {
    title: 'FreshFold',
    subtext: 'Atelier & Valet',
    monogram: 'FF',
  },

  // Contact Information
  contact: {
    phone: '[CLIENT PHONE]',
    phoneFormatted: '+1 (800) 555-3653',
    whatsapp: '[CLIENT WHATSAPP]',
    whatsappLink: 'https://wa.me/18005553653?text=Hello%20FreshFold%20Concierge,%20I%20would%20like%20to%20schedule%20a%20valet%20pickup.',
    email: '[CLIENT EMAIL]',
    conciergeEmail: 'valet@[CLIENT-DOMAIN].com',
  },

  // Physical Location & Showroom
  location: {
    storeName: 'Flagship Organic Atelier',
    street: '[CLIENT ADDRESS]',
    city: '[CLIENT CITY]',
    stateZip: '[CLIENT STATE / ZIP]',
    full: '[CLIENT FULL ADDRESS: 428 Ocean Avenue, Suite 100, Downtown Metro, CA 90210]',
    coordinates: {
      lat: 34.0195,
      lng: -118.4912,
    },
    parkingInfo: 'Complimentary 20-minute curbside valet bay & EV charging dock',
  },

  // Operating Hours
  hours: {
    weekdays: 'Mon – Fri: 7:00 AM – 9:00 PM',
    saturday: 'Saturday: 8:00 AM – 8:00 PM',
    sunday: 'Sunday: 9:00 AM – 6:00 PM',
    valetCutoff: 'Same-day emergency rush cutoff: 1:00 PM',
    isOpenNowText: '🟢 Showroom Open • Valet Window: Next 35 Mins',
  },

  // Social Channels
  socialLinks: {
    instagram: 'https://instagram.com/[CLIENT_HANDLE]',
    facebook: 'https://facebook.com/[CLIENT_PAGE]',
    twitter: 'https://x.com/[CLIENT_HANDLE]',
    linkedin: 'https://linkedin.com/company/[CLIENT_COMPANY]',
  },

  // Service & Booking Rules
  bookingSettings: {
    isDemoMode: true, // Clearly informs clients and testers that demo bookings are saved to local mock DB
    currencySymbol: '$',
    defaultTurnaroundHours: 24,
    expressTurnaroundHours: 4,
    freePickupThresholdUsd: 25,
    timeSlots: [
      'Today (Evening 6:00 PM – 7:30 PM)',
      'Tomorrow (Morning 8:00 AM – 10:00 AM)',
      'Tomorrow (Afternoon 1:00 PM – 3:00 PM)',
      'Tomorrow (Evening 6:00 PM – 8:00 PM)',
    ],
    fragrances: ['Fresh Lavender', 'Ocean Breeze', '100% Fragrance Free'],
    guaranteeAmount: '$1,000 Garment Protection Guarantee',
  },

  // SEO & Social Sharing
  seo: {
    siteUrl: 'https://naveenk7100-ship-it.github.io/premium-3d-laundry-website',
    siteName: 'FreshFold Organic Laundry Atelier',
    metaTitle: 'Fresh Clothes. Zero Effort. | Premium 3D Laundry & Valet Showroom',
    metaDescription:
      'Explore an interactive 3D virtual walkthrough of our modern organic laundry atelier. Zero-PERC eco dry cleaning, ozone sanitization, and complimentary doorstep pickup & delivery.',
    ogImage: '/opengraph-image',
    twitterHandle: '@freshfold_laundry',
    keywords: [
      '3D laundry website',
      'interactive laundry showroom',
      'organic dry cleaners',
      'valet laundry pickup delivery',
      'ozone fabric sanitization',
      'eco garment care',
    ],
  },
};

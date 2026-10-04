import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FreshFold — Premium Eco-Care Laundry & Valet',
    short_name: 'FreshFold',
    description:
      'Artisanal garment care, zero-PERC organic dry cleaning, and 24h valet doorstep delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050d1a',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

import type { Metadata, Viewport } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { BookingProvider } from '@/context/BookingContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import AuthModal from '@/components/common/AuthModal';
import { BRAND_CONFIG } from '@/config/brand.config';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_CONFIG.tagline} | ${BRAND_CONFIG.brandShortName}`,
    template: `%s | ${BRAND_CONFIG.brandShortName}`,
  },
  description: BRAND_CONFIG.seo.metaDescription,
  keywords: BRAND_CONFIG.seo.keywords,
  authors: [{ name: BRAND_CONFIG.businessName }],
  creator: BRAND_CONFIG.businessName,
  publisher: BRAND_CONFIG.businessName,
  applicationName: BRAND_CONFIG.brandShortName,
  metadataBase: new URL(BRAND_CONFIG.seo.siteUrl),
  openGraph: {
    title: `${BRAND_CONFIG.tagline} | ${BRAND_CONFIG.brandShortName}`,
    description: BRAND_CONFIG.seo.metaDescription,
    url: BRAND_CONFIG.seo.siteUrl,
    siteName: BRAND_CONFIG.businessName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_CONFIG.tagline} | ${BRAND_CONFIG.brandShortName}`,
    description: BRAND_CONFIG.seo.metaDescription,
    creator: BRAND_CONFIG.seo.twitterHandle,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LocalBusiness structured data JSON-LD for rich Google & search previews
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    name: BRAND_CONFIG.businessName,
    description: BRAND_CONFIG.seo.metaDescription,
    url: BRAND_CONFIG.seo.siteUrl,
    telephone: BRAND_CONFIG.contact.phoneFormatted,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND_CONFIG.location.street,
      addressLocality: BRAND_CONFIG.location.city,
      postalCode: BRAND_CONFIG.location.stateZip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BRAND_CONFIG.location.coordinates.lat,
      longitude: BRAND_CONFIG.location.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white bg-slate-950">
        <ThemeProvider>
          <AuthProvider>
            <BookingProvider>
              <ToastProvider>
                {children}
                <AuthModal />
              </ToastProvider>
            </BookingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

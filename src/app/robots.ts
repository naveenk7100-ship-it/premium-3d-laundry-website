import { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/config/brand.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${BRAND_CONFIG.seo.siteUrl}/sitemap.xml`,
  };
}

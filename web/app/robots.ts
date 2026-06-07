import { MetadataRoute } from 'next';

// WHY THIS FILE: SR-03 requires robots.txt. Next.js auto-generates it from this file.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/pulses', '/templates', '/settings'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/sitemap.xml`,
  };
}

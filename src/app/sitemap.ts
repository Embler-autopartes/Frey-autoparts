import type { MetadataRoute } from 'next';

const BASE = 'https://frey-autoparts.com';

const routes = ['', '/catalogo', '/aplicacion', '/acerca', '/contacto', '/politicas'];
const locales = ['es', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const path = locale === 'es' ? route : `/${locale}${route}`;
      entries.push({
        url: `${BASE}${path || '/'}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
        alternates: {
          languages: {
            es: `${BASE}${route || '/'}`,
            en: `${BASE}/en${route}`,
          },
        },
      });
    }
  }

  return entries;
}

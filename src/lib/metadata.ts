import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Section =
  | { key: 'home.hero'; titleKey: 'title' }
  | { key: 'catalog.hero'; titleKey: 'title' }
  | { key: 'vehicle.hero'; titleKey: 'title' }
  | { key: 'contact.hero'; titleKey: 'title' }
  | { key: 'about.hero'; titleKey: 'titleA' }
  | { key: 'policies.hero'; titleKey: 'title' };

export async function buildPageMetadata({
  locale,
  section,
  pageTitle,
}: {
  locale: string;
  section: Section['key'];
  pageTitle: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: section });
  let subtitle = '';
  try {
    subtitle = t('subtitle');
  } catch {
    subtitle = '';
  }

  return {
    title: pageTitle,
    description: subtitle,
    openGraph: {
      title: `${pageTitle} — FREY Auto Parts`,
      description: subtitle,
      type: 'website',
      locale,
      images: ['/hero/hero-main.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} — FREY`,
      description: subtitle,
      images: ['/hero/hero-main.webp'],
    },
  };
}

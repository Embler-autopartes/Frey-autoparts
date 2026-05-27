import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { CatalogGrid } from '@/components/catalog/catalog-grid';

export default async function CatalogoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catalog');

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-4 bg-ink-2 pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 -z-10 tech-grid opacity-50" />

        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {t('hero.eyebrow')}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-2">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="bg-ink-1 py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <CatalogGrid />
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative isolate overflow-hidden bg-ink-2 py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 tech-grid opacity-40" />

        <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {locale === 'es' ? 'Búsqueda asistida' : 'Assisted search'}
          </p>
          <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-2">
            {t('cta.subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/cotizacion"
              className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all hover:bg-acid-3"
            >
              {t('cta.primary')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 border border-ink-5 bg-ink-3 px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-mist-3 transition-all hover:border-mist-3"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { setRequestLocale, getTranslations } from 'next-intl/server';
import { QuoteBuilder } from '@/components/quote/quote-builder';

export default async function CotizacionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('quote.hero');

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-4 bg-ink-2 pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 -z-10 tech-grid opacity-50" />

        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {t('eyebrow')}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-2">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="bg-ink-1 py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <QuoteBuilder />
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

export async function FeaturedPart() {
  const t = await getTranslations('home.feature');

  return (
    <section className="relative overflow-hidden bg-ink-0 py-28 lg:py-36">
      {/* Background tech grid */}
      <div className="absolute inset-0 tech-grid-fine opacity-40" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Image side */}
          <div className="relative">
            {/* Frame */}
            <div className="absolute -inset-2 border border-ink-4" />
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-3">
              <Image
                src="/images/product-hand-pump.webp"
                alt={t('title')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-0/50 via-transparent to-transparent" />
            </div>

            {/* Caption strip — dark callout on light bg */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 bg-ink-0/90 px-4 py-3 backdrop-blur-sm">
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-chrome-1">
                  Reference photo
                </p>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-chrome-2">
                  {t('partNumber')}
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-acid-2">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid-2" />
                In stock
              </div>
            </div>

            {/* Corner ticks */}
            <span className="absolute -left-3 -top-3 h-4 w-4 border-l border-t border-acid-2" />
            <span className="absolute -right-3 -top-3 h-4 w-4 border-r border-t border-acid-2" />
            <span className="absolute -left-3 -bottom-3 h-4 w-4 border-b border-l border-acid-2" />
            <span className="absolute -right-3 -bottom-3 h-4 w-4 border-b border-r border-acid-2" />
          </div>

          {/* Spec sheet side */}
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
              ◆ {t('eyebrow')}
            </p>
            <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
              {t('title')}
            </h2>

            <p className="mt-6 max-w-md text-pretty leading-relaxed text-mist-2">
              {t('desc')}
            </p>

            {/* Spec table */}
            <dl className="mt-12 border-y border-ink-4">
              {[
                ['Application', t('spec1')],
                ['Resistance', t('spec2')],
                ['Temperature', t('spec3')],
                ['Sealing', t('spec4')],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[160px_1fr] gap-4 border-b border-ink-4 py-4 last:border-b-0"
                >
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1">
                    {k}
                  </dt>
                  <dd className="font-mono text-sm text-mist-3">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/cotizacion"
                className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3 transition-all hover:bg-acid-3"
              >
                Agregar a cotización
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mist-2 hover:text-mist-4"
              >
                Ver hoja técnica completa →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

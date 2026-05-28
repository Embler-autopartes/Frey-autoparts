import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

export async function FeaturedPart() {
  const t = await getTranslations('home.feature');

  return (
    <section className="relative overflow-hidden bg-ink-0 py-32 lg:py-44">
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="tech-grid-fine absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Editorial header */}
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-3">
            ◆ {t('eyebrow')}
          </p>
          <h2 className="mt-8 font-serif text-5xl font-light italic leading-[0.95] tracking-tight text-mist-4 sm:text-7xl">
            {t('title')}
          </h2>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* Photo on black */}
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <Image
                src="/images/product-hand-pump.webp"
                alt={t('title')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />
            </div>

            {/* Corner ticks Brembo-style */}
            <span className="absolute -left-2 -top-2 h-6 w-6 border-l border-t border-acid-2" />
            <span className="absolute -right-2 -top-2 h-6 w-6 border-r border-t border-acid-2" />
            <span className="absolute -left-2 -bottom-2 h-6 w-6 border-b border-l border-acid-2" />
            <span className="absolute -right-2 -bottom-2 h-6 w-6 border-b border-r border-acid-2" />

            {/* Floating part number badge */}
            <div className="absolute -bottom-5 left-8 bg-acid-2 px-5 py-2.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/80">
                Part No.
              </p>
              <p className="font-mono text-base font-medium tracking-[0.05em] text-white">
                {t('partNumber')}
              </p>
            </div>
          </div>

          {/* Spec sheet — blueprint style */}
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mist-2">
              Technical specification
            </p>

            <p className="mt-10 max-w-md font-serif text-2xl font-light italic leading-snug text-chrome-2 sm:text-3xl">
              «{t('desc')}»
            </p>

            {/* Spec table — blueprint style */}
            <dl className="mt-12 border-t-2 border-acid-2">
              {[
                ['Application', t('spec1')],
                ['Resistance', t('spec2')],
                ['Temperature', t('spec3')],
                ['Sealing', t('spec4')],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className="group grid grid-cols-[140px_1fr] items-baseline gap-6 border-b border-ink-4 py-5 transition-colors hover:border-acid-2/60"
                >
                  <dt className="flex items-baseline gap-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-mist-2">
                    <span className="text-acid-3">/{String(i + 1).padStart(2, '0')}</span>
                    {k}
                  </dt>
                  <dd className="font-serif text-lg leading-snug text-mist-4">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-14 flex flex-wrap gap-4">
              <Link
                href="/cotizacion"
                className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-7 py-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white transition-all hover:bg-acid-3"
              >
                Agregar a cotización
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 px-2 py-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mist-2 transition-colors hover:text-mist-4"
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

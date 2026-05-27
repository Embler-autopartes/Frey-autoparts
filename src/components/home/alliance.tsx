import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

export async function Alliance() {
  const t = await getTranslations('home.alliance');

  return (
    <section className="relative bg-ink-1 py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="relative overflow-hidden border border-ink-4 bg-ink-2">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/images/banner-frey-embler.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center mix-blend-luminosity"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-ink-2 via-ink-2/85 to-ink-1/70" />
          <div className="absolute inset-0 tech-grid opacity-30" />

          <div className="relative grid gap-12 p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16 lg:p-16">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
                ◆ {t('eyebrow')}
              </p>

              <div className="mt-8 flex flex-wrap items-baseline gap-6">
                <span className="font-display text-6xl uppercase tracking-tight text-mist-4 sm:text-7xl">
                  FREY
                </span>
                <span className="font-display text-5xl text-acid-2 sm:text-6xl">×</span>
                <span className="font-display text-6xl uppercase tracking-tight text-chrome-2 sm:text-7xl">
                  EMBLER
                </span>
              </div>

              <p className="mt-8 max-w-xl text-pretty leading-relaxed text-mist-2">
                {t('desc')}
              </p>

              <Link
                href="/acerca"
                className="mt-10 inline-flex items-center gap-3 border border-ink-5 px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mist-3 transition-all hover:border-acid-2 hover:text-acid-2"
              >
                {t('cta')}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              </Link>
            </div>

            {/* Map / location card */}
            <div className="border border-ink-4 bg-ink-1 p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-mist-1">
                Master Distributor / LATAM
              </p>
              <p className="mt-3 font-display text-3xl uppercase tracking-tight text-mist-4">
                México
              </p>

              <dl className="mt-6 space-y-3">
                <SpecRow label="HQ" value="Ciudad de México" />
                <SpecRow label="Coverage" value="LATAM · USA" />
                <SpecRow label="Stock local" value="6,200 SKU" />
                <SpecRow label="Lead time" value="Same-day metro" />
              </dl>

              <div className="mt-8 flex items-center justify-between border-t border-ink-4 pt-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
                  Status
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-acid-2">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid-2" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_1.4fr] gap-3 border-b border-ink-4/70 pb-2">
      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">{label}</dt>
      <dd className="font-mono text-xs text-mist-3">{value}</dd>
    </div>
  );
}

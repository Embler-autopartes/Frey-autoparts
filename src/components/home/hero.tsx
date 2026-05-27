import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export async function Hero() {
  const t = await getTranslations('home.hero');

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink-1">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/warehouse-aerial.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.42]"
        />
        {/* Layered overlays — light platinum wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-1 via-ink-1/75 to-ink-1/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-1 via-ink-1/60 to-transparent" />
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Vertical side label */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <p className="origin-left -rotate-90 font-mono text-[0.65rem] uppercase tracking-[0.45em] text-mist-1 whitespace-nowrap">
          Frey · Auto Parts · Est. 2003 · Shanghai
        </p>
      </div>

      {/* Right side spec strip */}
      <div className="absolute right-6 top-1/2 hidden w-64 -translate-y-1/2 border-l border-acid-2/40 pl-6 lg:block">
        <div className="space-y-6">
          {[t('spec1'), t('spec2'), t('spec3')].map((spec, i) => (
            <div key={spec} className="flex items-start gap-3">
              <span className="mt-1 font-mono text-[0.6rem] text-acid-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
                  Spec / {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-1 font-display text-base leading-tight text-mist-3">
                  {spec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 pb-20 pt-40 lg:px-32 lg:pb-32">
        <div className="max-w-3xl">
          <div className="flex animate-fade-in-up items-center gap-3">
            <span className="h-px w-12 bg-acid-2" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
              {t('eyebrow')}
            </p>
          </div>

          <h1 className="mt-8 animate-fade-in-up font-display text-[clamp(3.5rem,9vw,9rem)] font-medium uppercase leading-[0.85] tracking-tight text-mist-4 delay-100">
            <span className="block">{t('titleA')}</span>
            <span className="block text-chrome-2">{t('titleB')}</span>
            <span className="block">
              <span className="text-acid-2">{t('titleC')}</span>
            </span>
          </h1>

          <p className="mt-10 max-w-xl animate-fade-in-up text-pretty text-lg leading-relaxed text-mist-3 delay-300">
            {t('subtitle')}
          </p>

          <div className="mt-12 flex animate-fade-in-up flex-wrap gap-4 delay-500">
            <Link
              href="/cotizacion"
              className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-3 transition-all hover:bg-acid-3"
            >
              {t('ctaPrimary')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
            </Link>
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-3 border border-ink-4 bg-ink-3/70 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-mist-3 backdrop-blur transition-all hover:border-mist-3 hover:text-mist-4"
            >
              {t('ctaSecondary')}
              <span className="h-1.5 w-1.5 rounded-full bg-acid-2 transition-transform group-hover:scale-150" />
            </Link>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="mt-16 flex items-end justify-between border-t border-ink-4 pt-6">
          <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid-2" />
            <span>27,400 SKU online · Stock global en tiempo real</span>
          </div>
          <div className="hidden items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1 sm:flex">
            <span>Scroll</span>
            <ChevronDown className="h-3.5 w-3.5 animate-pulse-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}

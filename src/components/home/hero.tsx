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
          src="/hero/hero-main.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Editorial overlay — softer wash, more atmospheric */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-1/95 via-ink-1/60 to-ink-1/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-1/85 via-transparent to-ink-1/30" />
        <div className="grain absolute inset-0 opacity-50" />
      </div>

      {/* Vertical side label */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <p className="origin-left -rotate-90 font-mono text-[0.6rem] uppercase tracking-[0.5em] text-mist-2 whitespace-nowrap">
          Frey Auto Parts · Est. 2004 · German engineering
        </p>
      </div>

      {/* Right side spec strip (editorial vertical) */}
      <div className="absolute right-8 top-1/2 hidden w-72 -translate-y-1/2 border-l border-acid-2/30 pl-8 lg:block">
        <div className="space-y-8">
          {[t('spec1'), t('spec2'), t('spec3')].map((spec, i) => (
            <div key={spec} className="border-b border-ink-4/60 pb-4 last:border-b-0">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-acid-2">
                / {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-2 font-serif text-2xl leading-[1.05] text-mist-3">
                {spec}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 pb-20 pt-40 lg:px-32 lg:pb-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex animate-fade-in-up items-center gap-4">
            <span className="h-px w-16 bg-acid-2" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
              {t('eyebrow')}
            </p>
          </div>

          {/* Editorial headline — serif + display mix */}
          <h1 className="mt-10 animate-fade-in-up leading-[0.9] text-mist-4 delay-100">
            <span className="block font-serif text-[clamp(4rem,10vw,11rem)] font-light italic tracking-tight">
              {t('titleA')}
            </span>
            <span className="mt-2 block font-display text-[clamp(2.5rem,6vw,6rem)] font-medium uppercase tracking-[0.02em] text-chrome-2">
              {t('titleB')}{' '}
              <span className="text-acid-2">{t('titleC')}</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-10 max-w-xl animate-fade-in-up text-pretty text-lg leading-relaxed text-mist-2 delay-300">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="mt-14 flex animate-fade-in-up flex-wrap gap-4 delay-500">
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all hover:bg-acid-3"
            >
              {t('ctaPrimary')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
            </Link>
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-3 border border-ink-4 bg-ink-3/70 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-mist-3 backdrop-blur transition-all hover:border-mist-3 hover:text-mist-4"
            >
              {t('ctaSecondary')}
              <span className="h-1.5 w-1.5 rounded-full bg-acid-2 transition-transform group-hover:scale-150" />
            </Link>
          </div>
        </div>

        {/* Bottom signature line */}
        <div className="mt-16 flex flex-col items-start gap-3 border-t border-ink-4/60 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-serif text-base italic text-mist-2">
            Engineered in Germany. Manufactured for Europe.
          </p>
          <div className="hidden items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-2 sm:flex">
            <span>Scroll</span>
            <ChevronDown className="h-3.5 w-3.5 animate-pulse-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}

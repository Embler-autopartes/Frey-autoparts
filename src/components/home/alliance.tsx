import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

const ALLIANCE_YEAR = 2017;

export async function Alliance() {
  const t = await getTranslations('home.alliance');
  const locale = await getLocale();
  const yearsStrong = new Date().getFullYear() - ALLIANCE_YEAR;

  const facts: { k: string; v: string }[] =
    locale === 'es'
      ? [
          { k: 'HQ Embler', v: 'México' },
          { k: 'Cobertura', v: 'LATAM + sur de EE.UU.' },
          { k: 'Marcas', v: 'MB · BMW · Land Rover' },
          { k: 'Soporte', v: 'Bilingüe ES/EN' },
          { k: 'Lead time', v: 'Same-day Valle de México' },
          { k: 'Inicio', v: 'Alianza desde 2017' },
        ]
      : [
          { k: 'HQ Embler', v: 'Mexico' },
          { k: 'Coverage', v: 'LATAM + south US' },
          { k: 'Brands', v: 'MB · BMW · Land Rover' },
          { k: 'Support', v: 'Bilingual ES/EN' },
          { k: 'Lead time', v: 'Same-day Mexico City metro' },
          { k: 'Started', v: 'Alliance since 2017' },
        ];

  const FILE_REF = `MX-LATAM · 03-${String(ALLIANCE_YEAR).slice(-2)}/${String(new Date().getFullYear()).slice(-2)}`;

  return (
    <section className="relative isolate overflow-hidden bg-ink-1 py-28 lg:py-44">
      {/* Atmospheric background: photo + grain + grid */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/warehouse-corridor.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.10]"
          style={{ filter: 'grayscale(0.6) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-1 via-ink-1/95 to-ink-1" />
        <div className="tech-grid absolute inset-0 opacity-30" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* ────────── EDITORIAL HEADER ────────── */}
        <header className="flex flex-col gap-4 border-b border-ink-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-3 self-start border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
            <span className="text-acid-2">◆</span>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
              {t('eyebrow')}
            </p>
          </div>
          <div className="flex items-baseline gap-6 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mist-1">
            <span className="hidden sm:inline">
              <span className="text-mist-2">File</span> · {FILE_REF}
            </span>
            <span className="inline-flex items-center gap-2 text-acid-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid-2" />
              Active partnership
            </span>
          </div>
        </header>

        {/* ────────── YEAR ANCHOR + EDITORIAL PROSE ────────── */}
        <div className="mt-16 grid gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-16">
          {/* Years strong — massive serif italic number as anchor */}
          <aside className="lg:col-span-4">
            <div className="relative">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-mist-1">
                {locale === 'es' ? 'Años de alianza' : 'Years strong'}
              </span>
              <span className="mt-3 block font-serif text-[clamp(8rem,17vw,15rem)] font-light italic leading-[0.78] tracking-[-0.04em] text-acid-2">
                {String(yearsStrong).padStart(2, '0')}
              </span>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="h-px w-10 bg-acid-2" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mist-2">
                  {ALLIANCE_YEAR} → {new Date().getFullYear()}
                </span>
              </div>
            </div>

            {/* Decorative stat */}
            <dl className="mt-12 space-y-5">
              <div className="border-l-2 border-acid-2 pl-5">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">
                  Territory
                </dt>
                <dd className="mt-1 font-serif text-2xl font-light text-mist-4">
                  {locale === 'es' ? 'México · LATAM · sur US' : 'Mexico · LATAM · south US'}
                </dd>
              </div>
              <div className="border-l border-ink-4 pl-5">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">
                  Coverage
                </dt>
                <dd className="mt-1 font-serif text-2xl font-light text-mist-4">
                  Mercedes-Benz · BMW · Land Rover
                </dd>
              </div>
            </dl>
          </aside>

          {/* Editorial description with drop cap */}
          <div className="lg:col-span-8">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-mist-1">
              {locale === 'es' ? 'Manifiesto de la alianza' : 'Alliance manifesto'}
            </span>

            <blockquote className="mt-6 max-w-2xl">
              <p className="font-serif text-2xl font-light leading-[1.4] text-mist-3 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:not-italic first-letter:leading-[0.8] first-letter:text-acid-2 sm:text-[1.65rem]">
                {t('desc')}
              </p>
            </blockquote>

            {/* Inline pull-quote */}
            <p className="mt-10 max-w-md border-l-2 border-acid-2 pl-6 font-serif text-xl font-light italic leading-snug text-mist-4 sm:text-2xl">
              «{locale === 'es'
                ? 'Calidad alemana. Soporte mexicano.'
                : 'German quality. Mexican support.'}»
            </p>
          </div>
        </div>

        {/* ────────── CO-SIGNED — LOGO LOCKUP ────────── */}
        <div className="relative mt-28 lg:mt-36">
          {/* Top label centered on border */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-ink-1 px-6">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.45em] text-mist-1">
              Co-signed · 2017
            </span>
          </div>

          <div className="border-y border-ink-4 py-16 lg:py-20">
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 sm:grid-cols-[1fr_auto_1.4fr] sm:gap-16">
              {/* FREY side */}
              <figure className="flex flex-col items-center gap-4">
                <div className="relative h-32 w-32 overflow-hidden rounded-sm bg-ink-3 ring-1 ring-ink-4 transition-all duration-700 hover:ring-acid-2 sm:h-36 sm:w-36">
                  <Image
                    src="/logo.webp"
                    alt="FREY"
                    fill
                    sizes="144px"
                    className="object-contain p-2 mix-blend-multiply"
                  />
                </div>
                <figcaption className="text-center">
                  <p className="font-display text-2xl uppercase tracking-tight text-mist-4">
                    FREY
                  </p>
                  <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">
                    Manufacturing · DE
                  </p>
                </figcaption>
              </figure>

              {/* × center */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-serif text-7xl font-light italic leading-none text-acid-2 sm:text-8xl">
                  ×
                </span>
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.35em] text-mist-1">
                  Alliance
                </span>
              </div>

              {/* EMBLER side */}
              <figure className="flex flex-col items-center gap-4">
                <a
                  href="https://tienda.emblerautopartes.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="EMBLER Autopartes — ir a tienda online"
                  className="relative block h-32 w-32 overflow-hidden rounded-sm bg-black ring-1 ring-ink-4 transition-all duration-700 hover:ring-acid-2 sm:h-36 sm:w-36"
                >
                  <Image
                    src="/logos/embler-official.png"
                    alt="EMBLER Autopartes"
                    fill
                    sizes="144px"
                    className="object-contain p-2"
                  />
                </a>
                <figcaption className="text-center">
                  <p className="font-display text-2xl uppercase tracking-tight text-mist-4">
                    EMBLER Autopartes
                  </p>
                  <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">
                    Distribution · MX
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* ────────── FACTS GRID + CTA CARD ────────── */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16 lg:mt-24">
          {/* Facts table — editorial numbered */}
          <div>
            <header className="mb-10 flex items-baseline justify-between border-b border-ink-4 pb-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-acid-2">
                {locale === 'es' ? 'Datos operativos' : 'Operational facts'}
              </p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">
                {facts.length} / {String(facts.length).padStart(2, '0')}
              </p>
            </header>

            <dl className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
              {facts.map((f, i) => (
                <div
                  key={f.k}
                  className="group grid grid-cols-[28px_1fr] items-baseline gap-4 border-b border-ink-4 pb-4 transition-colors hover:border-acid-2/40"
                >
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1 transition-colors group-hover:text-acid-2">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
                      {f.k}
                    </dt>
                    <dd className="mt-1.5 font-serif text-xl font-light leading-snug text-mist-4">
                      {f.v}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA — green island */}
          <aside className="relative isolate flex flex-col justify-between overflow-hidden border border-acid-2 bg-acid-2 p-8 text-white lg:p-10">
            {/* Decorative corner ticks */}
            <span className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-white/40" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-white/40" />

            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-white/70">
                {locale === 'es' ? 'Distribución regional' : 'Regional distribution'}
              </p>
              <p className="mt-8 font-serif text-3xl font-light italic leading-[1.1] text-white sm:text-4xl">
                {locale === 'es'
                  ? <>Pregunta por tu zona<br />y volumen mínimo.</>
                  : <>Ask about your zone<br />and minimum volume.</>}
              </p>
            </div>

            <a
              href="https://tienda.emblerautopartes.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center justify-between gap-3 border-t border-white/30 pt-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white transition-all hover:text-white/90"
            >
              <span>
                {locale === 'es' ? 'Ir a tienda online Embler' : 'Go to Embler online shop'}
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                strokeWidth={2.4}
              />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

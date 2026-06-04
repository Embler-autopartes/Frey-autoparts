import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/metadata';
import { HqCarousel, type HqSlide } from '@/components/about/hq-carousel';
import { HeroCarousel, type HeroSlide } from '@/components/about/hero-carousel';
import { Eyebrow } from '@/components/shared/eyebrow';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  return buildPageMetadata({ locale, section: 'about.hero', pageTitle: t('titleA') });
}

export default async function AcercaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Manifesto />
      <AboutStats />
      <Headquarters />
      <Timeline />
      <Values />
      <Plant />
      <Certs />
      <AllianceDetail />
      <AboutCta />
    </>
  );
}

/* ---------------- HERO ---------------- */
async function AboutHero() {
  const t = await getTranslations('about.hero');

  const carouselCaptions = t.raw('carousel.slides') as string[];
  const carouselLabel = t('carousel.label');
  // Each photo keeps its own caption (cap = index into carousel.slides).
  // Lead with the facility shots that aren't reused in the Headquarters
  // section below (cede-01 / cede-02 are the facade & aerial shown there),
  // so the hero doesn't echo imagery the visitor sees moments later.
  const carouselOrder = [
    { src: '/cede/cede-03.webp', cap: 2 },
    { src: '/cede/cede-04.webp', cap: 3 },
    { src: '/cede/cede-01.webp', cap: 0 },
    { src: '/cede/cede-02.webp', cap: 1 },
  ];
  const carouselSlides: HeroSlide[] = carouselOrder.map(({ src, cap }) => ({
    src,
    alt: carouselCaptions[cap] ?? carouselLabel,
    caption: carouselCaptions[cap] ?? '',
  }));

  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-ink-1">
      <Image
        src="/images/warehouse-overview.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-1 via-ink-1/75 to-ink-1/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-1 via-ink-1/55 to-transparent" />
      <div className="absolute inset-0 -z-10 tech-grid opacity-40" />

      <div className="mx-auto flex min-h-[88svh] max-w-[1440px] flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-16">
          <div className="max-w-3xl">
            <div className="flex animate-fade-in-up items-center gap-3">
              <span className="h-px w-12 bg-acid-2" />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
                ◆ {t('eyebrow')}
              </p>
            </div>
            <h1 className="mt-8 animate-fade-in-up font-display text-[clamp(3rem,8vw,7.5rem)] font-medium uppercase leading-[0.88] tracking-tight text-mist-4 delay-100">
              <span className="block">{t('titleA')}</span>
              <span className="block text-chrome-2">{t('titleB')}</span>
              <span className="block text-acid-2">{t('titleC')}</span>
            </h1>
            <p className="mt-8 max-w-xl animate-fade-in-up text-pretty text-lg leading-relaxed text-mist-2 delay-300">
              {t('subtitle')}
            </p>
            <Link
              href="/contacto"
              className="mt-10 inline-flex animate-fade-in-up items-center gap-3 border border-acid-2 bg-acid-2 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all delay-500 hover:bg-acid-3"
            >
              {t('cta')}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
            </Link>
          </div>

          {/* Headquarters carousel — beside the hero text */}
          <div className="h-[58svh] max-h-[560px] w-full animate-fade-in-up delay-300 lg:h-[clamp(380px,60svh,560px)]">
            <HeroCarousel slides={carouselSlides} label={carouselLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MANIFESTO ---------------- */
async function Manifesto() {
  const t = await getTranslations('about.intro');
  const locale = await getLocale();
  return (
    <section className="bg-ink-1 py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 className="mt-8 text-balance font-display text-4xl uppercase leading-[1] tracking-tight text-mist-4 sm:text-6xl">
          {t('title')}
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="border-l border-acid-2 pl-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1">
              EST. 2004 · Stuttgart, DE
            </p>
            <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1">
              {locale === 'es' ? '22+ años · 40 países' : '22+ years · 40 countries'}
            </p>
          </div>
          <p className="text-pretty text-lg leading-relaxed text-mist-2">
            {t('body')}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
async function AboutStats() {
  const t = await getTranslations('about');
  const items = t.raw('stats') as { value: string; unit: string; label: string }[];
  return (
    <section className="relative border-y border-ink-4 bg-ink-3 py-20 lg:py-24">
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <div key={i} className="relative bg-ink-3 px-6 py-10">
              <span className="absolute right-3 top-2 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
                / {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-medium leading-none tracking-tight text-mist-4 sm:text-6xl">
                  {s.value}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-acid-2">
                  {s.unit}
                </span>
              </div>
              <p className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-mist-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HEADQUARTERS (carousel) ---------------- */
async function Headquarters() {
  const t = await getTranslations('about.headquarters');
  const raw = t.raw('slides') as { title: string; caption: string; meta: string }[];
  const sources = [
    { src: '/images/frey-hq-facade.webp' },
    { src: '/images/frey-hq-aerial.webp' },
  ];
  const slides: HqSlide[] = raw.map((s, i) => ({
    src: sources[i]?.src ?? sources[0].src,
    alt: s.title,
    title: s.title,
    caption: s.caption,
    meta: s.meta,
  }));

  return (
    <section className="relative isolate overflow-hidden bg-ink-1 py-28 lg:py-36">
      <div className="absolute inset-0 tech-grid-fine opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid-2/40 to-transparent" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-12 grid gap-8 border-b border-ink-4 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="mt-8 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
              {t('title')}
            </h2>
          </div>
          <p className="max-w-md text-pretty leading-relaxed text-mist-2 lg:text-right">
            {t('desc')}
          </p>
        </header>

        <HqCarousel
          slides={slides}
          prevLabel={t('prev')}
          nextLabel={t('next')}
          counterLabel={t('counter')}
        />
      </div>
    </section>
  );
}

/* ---------------- TIMELINE ---------------- */
async function Timeline() {
  const t = await getTranslations('about.timeline');
  const events = t.raw('events') as { year: string; title: string; desc: string }[];
  return (
    <section className="bg-ink-1 py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-16 max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
            {t('title')}
          </h2>
        </header>

        <ol className="relative grid gap-px bg-ink-4 lg:grid-cols-3">
          {events.map((e, i) => (
            <li
              key={e.year}
              className="group relative bg-ink-1 p-8 transition-colors hover:bg-ink-3"
            >
              <span className="absolute right-4 top-3 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
                /{String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl text-acid-2 sm:text-5xl">
                  {e.year}
                </span>
                <span className="h-px flex-1 bg-ink-4" />
              </div>
              <h3 className="mt-6 font-display text-xl uppercase tracking-tight text-mist-4 sm:text-2xl">
                {e.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-2">
                {e.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- VALUES ---------------- */
async function Values() {
  const t = await getTranslations('about.values');
  const items = t.raw('items') as { code: string; title: string; desc: string }[];
  return (
    <section className="border-y border-ink-4 bg-ink-3 py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-16 max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
            {t('title')}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v) => (
            <div
              key={v.code}
              className="group relative bg-ink-3 p-8 transition-colors hover:bg-ink-1 corner-bracket"
            >
              <span className="font-display text-6xl text-acid-2/30 transition-colors group-hover:text-acid-2 sm:text-7xl">
                {v.code}
              </span>
              <h3 className="mt-8 font-display text-2xl uppercase tracking-tight text-mist-4">
                {v.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mist-2">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PLANT ---------------- */
async function Plant() {
  const t = await getTranslations('about.plant');
  const locale = await getLocale();
  const gallery = [
    { src: '/images/warehouse-aisle-wide.webp', caption: t('captions.image1'), tall: true },
    { src: '/images/warehouse-forklift.webp', caption: t('captions.image2'), tall: false },
    { src: '/images/warehouse-racks-wide.webp', caption: t('captions.image3'), tall: false },
    { src: '/images/shanghai-fair-booth.webp', caption: t('captions.image4'), tall: true },
  ];
  const ops =
    locale === 'es'
      ? [
          { k: 'Área', v: '45,000 m² · 3 zonas climatizadas' },
          { k: 'Turnos', v: '3 turnos · 24 h · 6 días' },
          { k: 'Picking', v: 'RF-guided · OTIF 98.6%' },
          { k: 'QC por lote', v: 'Muestreo AQL 1.0 antes de despacho' },
        ]
      : [
          { k: 'Area', v: '45,000 m² · 3 climate zones' },
          { k: 'Shifts', v: '3 shifts · 24 h · 6 days' },
          { k: 'Picking', v: 'RF-guided · OTIF 98.6%' },
          { k: 'Lot QC', v: 'AQL 1.0 sampling before dispatch' },
        ];
  return (
    <section className="relative isolate overflow-hidden bg-ink-1 py-28 lg:py-36">
      <div className="absolute inset-0 tech-grid-fine opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid-2/40 to-transparent" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Editorial masthead */}
        <header className="mb-12 grid gap-10 border-b border-ink-4 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="mt-8 font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-5xl">
              {t('title')}
            </h2>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-mist-1 lg:self-end">
            <span>
              <span className="text-mist-2">{locale === 'es' ? 'EDICIÓN' : 'EDITION'}</span> · 12
            </span>
            <span>
              <span className="text-mist-2">{locale === 'es' ? 'REVISIÓN' : 'REV'}</span> · 05/26
            </span>
            <span className="inline-flex items-center gap-2 text-acid-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid-2" />
              {locale === 'es' ? 'Auditoría activa' : 'Audit active'}
            </span>
          </div>
        </header>

        {/* Editorial lede + ops fact-list */}
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <p className="font-serif text-xl font-light leading-snug text-mist-3 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-medium first-letter:not-italic first-letter:leading-[0.8] first-letter:text-acid-2 sm:text-2xl">
            {t('desc')}
          </p>

          <dl className="grid grid-cols-1 gap-px self-start bg-ink-4">
            {ops.map((op, i) => (
              <div
                key={op.k}
                className="group grid grid-cols-[28px_1fr] items-baseline gap-4 bg-ink-1 px-5 py-4 transition-colors hover:bg-ink-3"
              >
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1 transition-colors group-hover:text-acid-2">
                  /{String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
                    {op.k}
                  </dt>
                  <dd className="mt-1 font-serif text-base font-light leading-snug text-mist-4">
                    {op.v}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Gallery — keeps original layout */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {gallery.map((g, i) => (
            <figure key={i} className="group relative overflow-hidden border border-ink-4 bg-ink-3">
              <div className={`relative w-full ${g.tall ? 'aspect-[3/4]' : 'aspect-square'}`}>
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                {/* Corner ticks */}
                <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-acid-2/60" />
                <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-acid-2/60" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white text-shadow-deep-dark">
                <span className="text-acid-3 font-medium">/{String(i + 1).padStart(2, '0')}</span> · {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Editorial signature */}
        <footer className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ink-4 pt-6 sm:flex-row sm:items-center">
          <p className="font-serif text-base italic text-mist-2">
            «{locale === 'es'
              ? 'Lo que sale del molde, sale con su etiqueta.'
              : 'Whatever leaves the mold, leaves with its label.'}»
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-mist-1">
            {locale === 'es'
              ? '◆ TÜV Rheinland · ID MIC-ASR2411725'
              : '◆ TÜV Rheinland · ID MIC-ASR2411725'}
          </p>
        </footer>
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */
async function Certs() {
  const t = await getTranslations('about.certs');
  const items = t.raw('items') as {
    code: string;
    name: string;
    body: string;
    desc: string;
  }[];
  return (
    <section className="border-y border-ink-4 bg-ink-3 py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-16 max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
            {t('title')}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2">
          {items.map((c, i) => (
            <article key={c.code} className="bg-ink-3 p-10">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
                CERT / {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-4xl uppercase tracking-tight text-mist-4 sm:text-5xl">
                {c.code}
              </h3>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist-2">
                {c.name}
              </p>
              <p className="mt-8 text-sm leading-relaxed text-mist-2">
                {c.desc}
              </p>
              <div className="mt-10 flex items-center justify-between border-t border-ink-4 pt-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
                  Audited by
                </span>
                <span className="font-display text-lg text-acid-2">
                  {c.body}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ALLIANCE DETAIL ---------------- */
async function AllianceDetail() {
  const t = await getTranslations('about.alliance');
  const facts = t.raw('facts') as { k: string; v: string }[];
  return (
    <section className="bg-ink-1 py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="relative overflow-hidden border border-ink-4 bg-ink-2">
          <div className="absolute inset-0 opacity-15">
            <Image
              src="/images/banner-frey-embler.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center mix-blend-multiply"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-ink-2 via-ink-2/85 to-ink-1/70" />

          <div className="relative grid gap-12 p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:p-16">
            <div>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h2 className="mt-8 font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
                {t('title')}
              </h2>
              <p className="mt-8 max-w-xl text-pretty leading-relaxed text-mist-2">
                {t('desc')}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-center">
              {facts.map((f) => (
                <div key={f.k} className="border-b border-ink-4 pb-2">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
                    {f.k}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-mist-3">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
async function AboutCta() {
  const t = await getTranslations('about.cta');
  return (
    <section className="relative isolate overflow-hidden bg-ink-2 py-28 lg:py-36">
      <Image
        src="/images/warehouse-racks-wide.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-2 via-ink-2/85 to-ink-2" />

      <div className="relative mx-auto max-w-[1100px] px-6 text-center lg:px-10">
        <h2 className="mx-auto max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-7xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-mist-2">
          {t('subtitle')}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all hover:bg-acid-3"
          >
            {t('primary')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 border border-ink-5 bg-ink-3 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-mist-3 transition-all hover:border-mist-3"
          >
            {t('secondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}

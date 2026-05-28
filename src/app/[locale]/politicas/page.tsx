import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { FaqAccordion } from '@/components/policies/faq-accordion';
import { buildPageMetadata } from '@/lib/metadata';

type Item = { k: string; v: string };
type FaqItem = { q: string; a: string };


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'policies.hero' });
  return buildPageMetadata({ locale, section: 'policies.hero', pageTitle: t('title') });
}

export default async function PoliticasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('policies');

  const shippingItems = t.raw('sections.shipping.items') as Item[];
  const returnsItems = t.raw('sections.returns.items') as Item[];
  const warrantyItems = t.raw('sections.warranty.items') as Item[];
  const faqItems = t.raw('faq.items') as FaqItem[];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-ink-4 bg-ink-2 pb-20 pt-40 lg:pt-48">
        <div className="absolute inset-0 -z-10 tech-grid opacity-50" />
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
            <span className="text-acid-2">◆</span>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
              {t('hero.eyebrow')}
            </p>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-tight text-mist-4 sm:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-mist-2">
            {t('hero.subtitle')}
          </p>

          {/* Quick nav */}
          <nav className="mt-12 flex flex-wrap gap-3">
            <a href="#shipping" className="inline-flex items-center gap-2 border border-acid-2/60 bg-transparent px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-acid-2 transition-all hover:bg-acid-2 hover:text-white">
              <Truck className="h-3.5 w-3.5" /> {locale === 'es' ? 'Envíos' : 'Shipping'}
            </a>
            <a href="#returns" className="inline-flex items-center gap-2 border border-acid-2/60 bg-transparent px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-acid-2 transition-all hover:bg-acid-2 hover:text-white">
              <RotateCcw className="h-3.5 w-3.5" /> {locale === 'es' ? 'Devoluciones' : 'Returns'}
            </a>
            <a href="#warranty" className="inline-flex items-center gap-2 border border-acid-2/60 bg-transparent px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-acid-2 transition-all hover:bg-acid-2 hover:text-white">
              <ShieldCheck className="h-3.5 w-3.5" /> {locale === 'es' ? 'Garantía' : 'Warranty'}
            </a>
            <a href="#faq" className="inline-flex items-center gap-2 border border-acid-2/60 bg-transparent px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-acid-2 transition-all hover:bg-acid-2 hover:text-white">
              FAQ
            </a>
          </nav>
        </div>
      </section>

      {/* SHIPPING */}
      <PolicySection
        id="shipping"
        eyebrow={t('sections.shipping.eyebrow')}
        title={t('sections.shipping.title')}
        items={shippingItems}
        bg="bg-ink-1"
      />

      {/* RETURNS */}
      <PolicySection
        id="returns"
        eyebrow={t('sections.returns.eyebrow')}
        title={t('sections.returns.title')}
        items={returnsItems}
        bg="bg-ink-3"
      />

      {/* WARRANTY */}
      <PolicySection
        id="warranty"
        eyebrow={t('sections.warranty.eyebrow')}
        title={t('sections.warranty.title')}
        items={warrantyItems}
        bg="bg-ink-1"
      />

      {/* FAQ ACCORDION */}
      <section id="faq" className="relative border-y border-ink-4 bg-ink-2 py-28 lg:py-36">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
            <span className="text-acid-2">◆</span>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
              {t('faq.eyebrow')}
            </p>
          </div>
          <h2 className="mt-8 font-serif text-4xl font-light italic leading-[1] tracking-tight text-mist-4 sm:text-6xl">
            {t('faq.title')}
          </h2>

          <div className="mt-16">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-1 py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
            ◆ {locale === 'es' ? '¿No encontraste lo que buscabas?' : 'Did not find what you were looking for?'}
          </p>
          <h2 className="mt-6 font-serif text-4xl font-light italic leading-[1] tracking-tight text-mist-4 sm:text-6xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist-2">
            {t('cta.subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contacto"
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

function PolicySection({
  id,
  eyebrow,
  title,
  items,
  bg,
}: {
  id: string;
  eyebrow: string;
  title: string;
  items: Item[];
  bg: string;
}) {
  return (
    <section id={id} className={`${bg} py-24 lg:py-32`}>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Header sticky */}
          <header className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
              {eyebrow}
            </p>
            <h2 className="mt-6 font-serif text-3xl font-light italic leading-[1.05] tracking-tight text-mist-4 sm:text-5xl">
              {title}
            </h2>
          </header>

          {/* Items list */}
          <dl className="divide-y divide-ink-4 border-y border-ink-4">
            {items.map((it, i) => (
              <div
                key={it.k}
                className="grid grid-cols-[36px_minmax(0,1fr)] items-baseline gap-4 py-6 sm:grid-cols-[60px_180px_minmax(0,1fr)] sm:gap-6"
              >
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">
                  /{String(i + 1).padStart(2, '0')}
                </span>
                <dt className="col-span-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1 sm:col-span-1">
                  {it.k}
                </dt>
                <dd className="col-span-2 mt-1 font-serif text-lg font-light leading-snug text-mist-3 sm:col-span-1 sm:mt-0 sm:text-xl">
                  {it.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

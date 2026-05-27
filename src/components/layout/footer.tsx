import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

export async function Footer() {
  const t = await getTranslations('footer');
  const locale = await getLocale();
  const year = new Date().getFullYear();

  const products = t.raw('products') as string[];
  const company = t.raw('company') as string[];
  const support = t.raw('support') as string[];

  return (
    <footer className="relative mt-32 border-t border-ink-4 bg-ink-2">
      {/* Decorative top strip */}
      <div className="absolute inset-x-0 top-0 flex h-1">
        <span className="flex-1 bg-acid-2" />
        <span className="w-12 bg-chrome-1" />
        <span className="flex-[3] bg-ink-5" />
        <span className="w-24 bg-acid-2" />
        <span className="flex-[6] bg-ink-5" />
        <span className="w-2 bg-amber-1" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* CTA strip */}
        <div className="grid gap-10 border-b border-ink-4 py-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
              {t('compliance')}
            </p>
            <h3 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-7xl">
              {t('tagline')}
            </h3>
          </div>
          <Link
            href="/cotizacion"
            className="group inline-flex items-center justify-between border border-ink-5 bg-ink-2 px-6 py-5 text-mist-4 transition-all hover:border-acid-2 hover:bg-acid-2/10"
          >
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1">
                B2B · Quotation desk
              </p>
              <p className="mt-2 font-display text-2xl tracking-tight">
                {locale === 'es' ? 'Solicitar cotización' : 'Request a quote'}
              </p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-acid-2 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-sm bg-ink-3 ring-1 ring-ink-4">
                <Image src="/logo.webp" alt="FREY" fill sizes="48px" className="object-contain p-1 mix-blend-multiply" />
              </div>
              <div>
                <p className="font-display text-2xl tracking-wide">FREY</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">Auto Parts</p>
              </div>
            </div>
            <p className="mt-8 max-w-xs whitespace-pre-line font-mono text-xs leading-relaxed text-mist-2">
              {t('address')}
            </p>
            <p className="mt-4 whitespace-pre-line font-mono text-xs leading-relaxed text-mist-2">
              {t('contact')}
            </p>
          </div>

          <FooterColumn title={t('sections.products')} items={products} />
          <FooterColumn title={t('sections.company')} items={company} />
          <FooterColumn title={t('sections.support')} items={support} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-ink-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1">
            © {year} FREY Auto Parts Co., Ltd. · {t('rights')}
          </p>
          <div className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid-2" />
              System online
            </span>
            <span className="text-ink-5">/</span>
            <Link href="/politicas" className="hover:text-acid-2">Privacy</Link>
            <span className="text-ink-5">/</span>
            <Link href="/politicas" className="hover:text-acid-2">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1">
        {title}
      </p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-mist-3 transition-colors hover:text-acid-2"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

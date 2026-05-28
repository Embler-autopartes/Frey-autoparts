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
    <footer className="relative mt-40 bg-ink-2 text-mist-3">
      {/* Editorial CTA strip — top */}
      <div className="border-t border-ink-4">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid items-end gap-12 py-24 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-acid-2">
                {t('compliance')}
              </p>
              <h3 className="mt-8 font-serif text-5xl font-light italic leading-[1] tracking-tight text-mist-4 sm:text-7xl">
                {t('tagline')}
              </h3>
            </div>
            <Link
              href="/cotizacion"
              className="group inline-flex items-center justify-between border border-ink-4 bg-ink-3 px-7 py-6 transition-all hover:border-acid-2 hover:bg-acid-2 hover:text-white"
            >
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mist-1 group-hover:text-white/75">
                  B2B · Quotation desk
                </p>
                <p className="mt-2 font-serif text-2xl italic text-mist-4 group-hover:text-white">
                  {locale === 'es' ? 'Solicitar cotización' : 'Request a quote'}
                </p>
              </div>
              <ArrowUpRight className="h-6 w-6 text-acid-2 transition-transform group-hover:rotate-45 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="border-t border-ink-4">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-16 py-20 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-sm bg-ink-3 ring-1 ring-ink-4">
                  <Image src="/logo.webp" alt="FREY" fill sizes="48px" className="object-contain p-1.5 mix-blend-multiply" />
                </div>
                <div>
                  <p className="font-display text-2xl tracking-wide text-mist-4">FREY</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">Auto Parts · DE</p>
                </div>
              </div>
              <p className="mt-10 max-w-xs font-serif text-lg italic leading-snug text-mist-2">
                «{locale === 'es'
                  ? 'Refacciones europeas que respetan la tolerancia OEM.'
                  : 'European spare parts that respect OEM tolerance.'}»
              </p>
              <p className="mt-10 whitespace-pre-line font-mono text-[0.7rem] uppercase tracking-[0.18em] leading-relaxed text-mist-2">
                {t('address')}
              </p>
              <p className="mt-3 whitespace-pre-line font-mono text-[0.7rem] uppercase tracking-[0.18em] leading-relaxed text-mist-2">
                {t('contact')}
              </p>
            </div>

            <FooterColumn title={t('sections.products')} items={products} />
            <FooterColumn title={t('sections.company')} items={company} />
            <FooterColumn title={t('sections.support')} items={support} />
          </div>
        </div>
      </div>

      {/* Bottom signature — thin & subtle */}
      <div className="border-t border-ink-4 bg-ink-3">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-mist-1">
            © {year} FREY Auto Parts Co., Ltd. · {t('rights')}
          </p>
          <div className="flex items-center gap-5 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-mist-1">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid-2" />
              System online
            </span>
            <span className="text-ink-4">/</span>
            <Link href="/politicas" className="hover:text-mist-4">Privacy</Link>
            <span className="text-ink-4">/</span>
            <Link href="/politicas" className="hover:text-mist-4">Terms</Link>
          </div>
        </div>
      </div>

      {/* Final accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-acid-2/60 to-transparent" />
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-acid-2">
        {title}
      </p>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="font-serif text-base text-mist-3 transition-colors hover:text-mist-4"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

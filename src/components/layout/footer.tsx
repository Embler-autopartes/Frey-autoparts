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
    <footer className="relative mt-40 bg-acid-2 text-white">
      {/* Editorial CTA strip — top */}
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid items-end gap-12 py-24 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-white/75">
                {t('compliance')}
              </p>
              <h3 className="mt-8 font-serif text-5xl font-light italic leading-[1] tracking-tight text-white sm:text-7xl">
                {t('tagline')}
              </h3>
            </div>
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-between border border-white/30 bg-white/10 px-7 py-6 transition-all hover:border-white hover:bg-white hover:text-acid-2"
            >
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/70 group-hover:text-acid-2/70">
                  B2B · Contact desk
                </p>
                <p className="mt-2 font-serif text-2xl italic text-white group-hover:text-acid-2">
                  {locale === 'es' ? 'Hablar con un asesor' : 'Talk to an advisor'}
                </p>
              </div>
              <ArrowUpRight className="h-6 w-6 text-white transition-transform group-hover:rotate-45 group-hover:text-acid-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-16 py-20 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-sm bg-white ring-1 ring-white/30">
                  <Image src="/logo.webp" alt="FREY" fill sizes="80px" className="object-contain p-1 mix-blend-multiply" />
                </div>
                <div>
                  <p className="font-display text-3xl tracking-wide text-white">FREY</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-white/70">Auto Parts · DE</p>
                </div>
              </div>
              <p className="mt-10 max-w-xs font-serif text-lg italic leading-snug text-white/85">
                «{locale === 'es'
                  ? 'Refacciones europeas que respetan la tolerancia OEM.'
                  : 'European spare parts that respect OEM tolerance.'}»
              </p>
              <p className="mt-10 whitespace-pre-line font-mono text-[0.7rem] uppercase tracking-[0.18em] leading-relaxed text-white/85">
                {t('address')}
              </p>
              <p className="mt-3 whitespace-pre-line font-mono text-[0.7rem] uppercase tracking-[0.18em] leading-relaxed text-white/85">
                {t('contact')}
              </p>
            </div>

            <FooterColumn title={t('sections.products')} items={products} />
            <FooterColumn title={t('sections.company')} items={company} />
            <FooterColumn title={t('sections.support')} items={support} />
          </div>
        </div>
      </div>

      {/* Manufacturing fine print */}
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-[1440px] px-6 py-5 lg:px-10">
          <p className="max-w-4xl font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.18em] text-white/55">
            {t('manufacturing')}
          </p>
        </div>
      </div>

      {/* Bottom signature — thin & subtle */}
      <div className="border-t border-white/15 bg-acid-3">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/75">
            © {year} FREY Auto Parts Co., Ltd. · {t('rights')}
          </p>
          <div className="flex items-center gap-5 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/75">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
              System online
            </span>
            <span className="text-white/30">/</span>
            <Link href="/politicas" className="hover:text-white">Privacy</Link>
            <span className="text-white/30">/</span>
            <Link href="/politicas" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>

      {/* Final accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white">
        {title}
      </p>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="font-serif text-base text-white/80 transition-colors hover:text-white"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

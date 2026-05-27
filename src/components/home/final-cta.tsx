import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

export async function FinalCta() {
  const t = await getTranslations('home.cta');

  return (
    <section className="relative isolate overflow-hidden bg-ink-0 py-32 lg:py-40">
      <Image
        src="/images/warehouse-forklift.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-0 via-ink-0/70 to-ink-0" />
      <div className="absolute inset-0 -z-10 tech-grid opacity-50" />

      <div className="relative mx-auto max-w-[1200px] px-6 text-center lg:px-10">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
          ◆ B2B Quotation Desk
        </p>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-6xl uppercase leading-[0.92] tracking-tight text-mist-4 sm:text-8xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-mist-3">
          {t('subtitle')}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/cotizacion"
            className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-9 py-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-0 transition-all hover:bg-acid-3"
          >
            {t('button')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 px-4 py-5 font-mono text-xs uppercase tracking-[0.2em] text-mist-2 transition-colors hover:text-mist-4"
          >
            Hablar con un asesor →
          </Link>
        </div>

        {/* Bottom signature line */}
        <div className="mt-20 flex items-center justify-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1">
          <span className="h-px w-12 bg-acid-2/50" />
          <span>Respuesta en menos de 24h hábiles</span>
          <span className="h-px w-12 bg-acid-2/50" />
        </div>
      </div>
    </section>
  );
}

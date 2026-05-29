import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export async function WarrantyPromise() {
  const locale = await getLocale();

  const items =
    locale === 'es'
      ? [
          {
            code: '01',
            value: '2',
            unit: 'Años',
            sub: '/ 60,000 km desde factura',
            desc: 'Cobertura general OEM, sin letra chica. Aplica desde la instalación profesional.',
          },
          {
            code: '02',
            value: '24',
            unit: 'h · Diagnóstico',
            sub: 'Soporte técnico bilingüe ES / EN',
            desc: 'El equipo de ingeniería responde dictum documentado dentro del día hábil.',
          },
          {
            code: '03',
            value: '48',
            unit: 'h · Reposición',
            sub: 'Refacción + crédito de mano de obra',
            desc: 'Validado, despachado y rastreado por lote hasta la planta de manufactura.',
          },
        ]
      : [
          {
            code: '01',
            value: '2',
            unit: 'Years',
            sub: '/ 60,000 km from invoice',
            desc: 'General OEM coverage, no fine print. Effective from professional install.',
          },
          {
            code: '02',
            value: '24',
            unit: 'h · Diagnosis',
            sub: 'Bilingual EN / ES tech support',
            desc: 'Engineering team replies with a documented dictum within one business day.',
          },
          {
            code: '03',
            value: '48',
            unit: 'h · Replacement',
            sub: 'Part + labor credit',
            desc: 'Validated, dispatched and lot-tracked back to the manufacturing line.',
          },
        ];

  return (
    <section className="relative isolate overflow-hidden border-y border-ink-4 bg-ink-3 py-24 lg:py-28">
      <div className="absolute inset-0 tech-grid-fine opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid-2/50 to-transparent" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Editorial header — horizontal masthead */}
        <header className="mb-12 flex flex-col gap-8 border-b border-ink-4 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
              <ShieldCheck className="h-3.5 w-3.5 text-acid-2" />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
                {locale === 'es' ? 'Garantía verificable' : 'Verifiable warranty'}
              </p>
            </div>
            <h2 className="mt-7 font-serif text-4xl font-light italic leading-[1.05] tracking-tight text-mist-4 sm:text-[3.25rem]">
              {locale === 'es' ? (
                <>
                  Lo que <span className="text-acid-2">prometemos</span>,
                  <br />
                  lo respaldamos por escrito.
                </>
              ) : (
                <>
                  What we <span className="text-acid-2">promise</span>,
                  <br />
                  we back in writing.
                </>
              )}
            </h2>
          </div>

          <Link
            href="/politicas"
            className="group inline-flex shrink-0 items-center gap-3 self-start border border-acid-2 bg-transparent px-6 py-3.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-acid-2 transition-all hover:bg-acid-2 hover:text-white lg:self-end"
          >
            {locale === 'es' ? 'Leer política completa' : 'Read full policy'}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:rotate-45"
              strokeWidth={2.4}
            />
          </Link>
        </header>

        {/* 3-up stat strip — compact horizontal */}
        <dl className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.code}
              className="group relative bg-ink-3 p-8 transition-colors duration-500 hover:bg-ink-1 lg:p-10"
            >
              {/* Corner brackets */}
              <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-acid-2/0 transition-colors duration-500 group-hover:border-acid-2" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-acid-2/0 transition-colors duration-500 group-hover:border-acid-2" />

              {/* Tick */}
              <span className="absolute right-4 top-3 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-mist-1 transition-colors duration-500 group-hover:text-acid-2">
                / {item.code}
              </span>

              {/* Number + unit on shared baseline */}
              <div className="flex items-baseline gap-3">
                <dt className="font-display text-[4rem] font-medium leading-[0.85] tracking-tight text-mist-4 sm:text-[5rem]">
                  {item.value}
                </dt>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-acid-2">
                  {item.unit}
                </span>
              </div>

              {/* Sub-label */}
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist-2">
                {item.sub}
              </p>

              {/* Description */}
              <dd className="mt-6 border-t border-ink-4 pt-4 font-serif text-base leading-snug text-mist-3 transition-colors duration-500 group-hover:border-acid-2/40">
                {item.desc}
              </dd>

              {/* Hover bottom accent line */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-acid-2 transition-transform duration-700 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </dl>

        {/* Bottom signature row */}
        <div className="mt-10 flex flex-col items-start gap-4 border-t border-ink-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-mist-1">
            <span className="text-acid-2">◆</span>
            {locale === 'es'
              ? 'Auditado por TÜV Rheinland · ID MIC-ASR2411725'
              : 'Audited by TÜV Rheinland · ID MIC-ASR2411725'}
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-mist-1">
            ISO 9001 · IATF 16949 · TecDoc verified
          </p>
        </div>
      </div>
    </section>
  );
}

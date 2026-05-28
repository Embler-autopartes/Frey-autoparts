import { getLocale } from 'next-intl/server';

const partners = [
  {
    name: 'TÜV SÜD',
    cert: 'ISO 9001',
    desc: { es: 'Sistema de gestión de calidad', en: 'Quality management system' },
  },
  {
    name: 'BSI',
    cert: 'IATF 16949',
    desc: { es: 'Estándar automotriz internacional', en: 'International automotive standard' },
  },
  {
    name: 'SGS',
    cert: 'Field Verified',
    desc: { es: 'Auditoría presencial de planta', en: 'On-site plant audit' },
  },
  {
    name: 'EChA',
    cert: 'REACH EU',
    desc: { es: 'Cumplimiento químico UE', en: 'EU chemical compliance' },
  },
  {
    name: 'OEM Tier 1',
    cert: 'Approved supplier',
    desc: { es: 'Proveedor aprobado OEM europeo', en: 'European OEM approved supplier' },
  },
];

export async function QualityPartners() {
  const locale = await getLocale();
  return (
    <section className="relative border-y border-ink-4 bg-ink-3 py-24 lg:py-32">
      <div className="absolute inset-0 tech-grid opacity-25" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Editorial header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
            <span className="text-acid-2">◆</span>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-acid-2">
              {locale === 'es' ? 'Auditado por organismos independientes' : 'Audited by independent bodies'}
            </p>
          </div>
          <h2 className="mt-8 font-serif text-4xl font-light italic leading-[1] tracking-tight text-mist-4 sm:text-6xl">
            {locale === 'es'
              ? <>Los mismos <span className="text-acid-2">estándares</span><br /><span className="text-chrome-2">que tu vehículo europeo.</span></>
              : <>The same <span className="text-acid-2">standards</span><br /><span className="text-chrome-2">as your European vehicle.</span></>}
          </h2>
        </div>

        {/* Compliance strip — alterna acentos */}
        <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-5">
          {partners.map((p, i) => {
            const isGreen = i % 2 === 0; // 1ra, 3ra, 5ta en verde
            return (
              <article
                key={p.name}
                className={`group relative px-6 py-10 transition-all duration-500 ${
                  isGreen
                    ? 'bg-acid-2 text-white hover:bg-acid-3'
                    : 'bg-ink-3 hover:bg-ink-1'
                }`}
              >
                <span
                  className={`absolute right-4 top-3 font-mono text-[0.5rem] uppercase tracking-[0.3em] ${
                    isGreen ? 'text-white/50' : 'text-mist-1'
                  }`}
                >
                  /{String(i + 1).padStart(2, '0')}
                </span>

                {/* Display certification code */}
                <p
                  className={`font-display text-2xl uppercase tracking-tight sm:text-3xl ${
                    isGreen ? 'text-white' : 'text-mist-4'
                  }`}
                >
                  {p.cert}
                </p>

                {/* Issuing body in serif */}
                <p
                  className={`mt-3 font-serif text-base italic ${
                    isGreen ? 'text-white/85' : 'text-acid-2'
                  }`}
                >
                  {p.name}
                </p>

                <p
                  className={`mt-8 text-xs leading-relaxed ${
                    isGreen ? 'text-white/75' : 'text-mist-2'
                  }`}
                >
                  {locale === 'es' ? p.desc.es : p.desc.en}
                </p>

                {/* Hover underline */}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 ${
                    isGreen ? 'bg-white' : 'bg-acid-2'
                  }`}
                />
              </article>
            );
          })}
        </div>

        {/* Bottom editorial line */}
        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-lg italic text-mist-2">
            «{locale === 'es'
              ? 'Toleranzen, die zählen.'
              : 'Toleranzen, die zählen.'}»{' '}
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist-1">
              — {locale === 'es' ? 'Tolerancias que cuentan' : 'Tolerances that matter'}
            </span>
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mist-1">
            Audited annually · since 2013
          </p>
        </div>
      </div>
    </section>
  );
}

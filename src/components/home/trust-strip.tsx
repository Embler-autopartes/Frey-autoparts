import { getTranslations } from 'next-intl/server';

const certs = [
  { code: 'ISO 9001', name: 'Quality Management', body: 'TÜV' },
  { code: 'IATF 16949', name: 'Automotive Standard', body: 'BSI' },
  { code: 'SGS', name: 'Field Verification', body: 'SGS Global' },
  { code: 'REACH', name: 'EU Compliance', body: 'EChA' },
];

export async function TrustStrip() {
  const t = await getTranslations('home.trust');

  return (
    <section className="relative bg-ink-1 py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
              ◆ Quality / Certifications
            </p>
            <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-mist-2">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-ink-4 lg:grid-cols-2">
            {certs.map((cert, i) => (
              <div
                key={cert.code}
                className="group relative overflow-hidden bg-ink-1 p-8 transition-colors hover:bg-ink-2"
              >
                {/* Number */}
                <span className="absolute right-4 top-3 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
                  CERT / {String(i + 1).padStart(2, '0')}
                </span>

                {/* Big code */}
                <p className="font-display text-3xl uppercase tracking-tight text-mist-4 sm:text-4xl">
                  {cert.code}
                </p>
                <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mist-2">
                  {cert.name}
                </p>

                <div className="mt-12 flex items-end justify-between border-t border-ink-4 pt-4">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist-1">
                    Audited by
                  </span>
                  <span className="font-display text-lg text-chrome-2 transition-colors group-hover:text-acid-2">
                    {cert.body}
                  </span>
                </div>

                {/* hover line */}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-acid-2 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

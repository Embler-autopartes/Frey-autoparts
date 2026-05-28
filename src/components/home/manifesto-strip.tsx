import { getLocale } from 'next-intl/server';

const tenets = [
  {
    de: 'Präzision',
    es: 'Precisión',
    en: 'Precision',
    code: 'I',
  },
  {
    de: 'Qualität',
    es: 'Calidad',
    en: 'Quality',
    code: 'II',
  },
  {
    de: 'Verlässlichkeit',
    es: 'Confiabilidad',
    en: 'Reliability',
    code: 'III',
  },
];

export async function ManifestoStrip() {
  const locale = await getLocale();
  return (
    <section className="relative border-y border-ink-4 bg-ink-1">
      <div className="absolute inset-0 tech-grid-fine opacity-30" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 py-14 lg:grid-cols-3 lg:py-20">
          {tenets.map((t) => (
            <article
              key={t.code}
              className="group relative flex items-start gap-5 transition-all duration-700 ease-out hover:translate-x-1"
            >
              <span className="font-serif text-3xl italic text-acid-2/70 transition-colors duration-500 group-hover:text-acid-2">
                {t.code}.
              </span>
              <div>
                <p className="font-serif text-4xl font-light leading-[0.95] tracking-tight text-mist-4 sm:text-5xl">
                  {t.de}
                </p>
                <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mist-1">
                  {locale === 'es' ? t.es : t.en}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      {/* Bottom green accent line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-acid-2/40 to-transparent" />
    </section>
  );
}

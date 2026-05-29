import { getTranslations, getLocale } from 'next-intl/server';

type Stat = { value: string; unit: string; label: string };

export async function Stats() {
  const t = await getTranslations('home.stats');
  const locale = await getLocale();
  const items = t.raw('items') as Stat[];

  return (
    <section className="relative overflow-hidden border-y border-ink-4 bg-ink-2 py-32 lg:py-44">
      <div className="absolute inset-0 tech-grid opacity-25" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Editorial header */}
        <div className="mb-24 max-w-3xl">
          <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
            <span className="text-acid-2">◆</span>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
              {t('eyebrow')}
            </p>
          </div>
          <h2 className="mt-8 font-serif text-5xl font-light italic leading-[1] tracking-tight text-mist-4 sm:text-7xl">
            {locale === 'es' ? (
              <>
                Dos décadas de <span className="text-acid-2">precisión</span>,<br />
                <span className="text-chrome-2">medidas en números.</span>
              </>
            ) : (
              <>
                Two decades of <span className="text-acid-2">precision</span>,<br />
                <span className="text-chrome-2">measured in numbers.</span>
              </>
            )}
          </h2>
        </div>

        {/* Editorial 2x2 grid with breathing room — alterna acento verde */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
          {items.map((stat, i) => {
            const isGreen = i % 2 === 1; // 2da y 4ta con número verde
            return (
              <div
                key={i}
                className="relative grid grid-cols-1 items-start gap-5 sm:grid-cols-[auto_1fr] sm:gap-8"
              >
                {/* Big number column */}
                <div className="flex flex-col">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-acid-2">
                    / {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span
                      className={`font-display text-[3.75rem] font-medium leading-[0.85] tracking-tight sm:text-[5.5rem] lg:text-[7rem] ${
                        isGreen ? 'text-acid-2' : 'text-mist-4'
                      }`}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <span
                    className={`mt-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] ${
                      isGreen ? 'text-mist-2' : 'text-acid-2'
                    }`}
                  >
                    {stat.unit}
                  </span>
                </div>

                {/* Editorial description */}
                <div
                  className={`pt-4 sm:pl-6 sm:pt-2 ${
                    isGreen
                      ? 'border-t-2 border-acid-2 sm:border-t-0 sm:border-l-2'
                      : 'border-t border-ink-4 sm:border-t-0 sm:border-l'
                  }`}
                >
                  <p className="font-serif text-lg font-light leading-snug text-mist-3 sm:text-xl lg:text-2xl">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

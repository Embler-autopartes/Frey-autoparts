import { getTranslations } from 'next-intl/server';

type Stat = { value: string; unit: string; label: string };

export async function Stats() {
  const t = await getTranslations('home.stats');
  const items = t.raw('items') as Stat[];

  return (
    <section className="relative border-y border-ink-4 bg-ink-2 py-28 lg:py-36">
      <div className="absolute inset-0 tech-grid opacity-30" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
          ◆ {t('eyebrow')}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat, i) => (
            <div
              key={i}
              className="relative bg-ink-2 px-6 py-12 transition-colors hover:bg-ink-3"
            >
              <span className="absolute right-3 top-2 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
                / {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl font-medium leading-none tracking-tight text-mist-4 sm:text-7xl">
                  {stat.value}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-acid-2">
                  {stat.unit}
                </span>
              </div>

              <p className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-mist-2">
                {stat.label}
              </p>

              {/* Bottom progress bar */}
              <div className="mt-8 h-px w-full bg-ink-4">
                <span
                  className="block h-full bg-acid-2"
                  style={{ width: `${[88, 72, 98, 64][i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from 'next-intl/server';

export async function Ticker() {
  const t = await getTranslations('home');
  const items = t.raw('ticker') as string[];
  const tape = [...items, ...items, ...items];

  return (
    <section
      aria-label="Compatible brands"
      className="relative overflow-hidden border-y border-ink-4 bg-ink-2 py-6"
    >
      <div className="flex animate-scroll-x gap-12 whitespace-nowrap will-change-transform">
        {tape.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-12 font-display text-xl uppercase tracking-[0.2em] text-mist-1"
          >
            {label}
            <span className="text-acid-2">◆</span>
          </span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-2 to-transparent" />
    </section>
  );
}

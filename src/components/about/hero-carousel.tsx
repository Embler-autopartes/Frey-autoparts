'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export type HeroSlide = {
  src: string;
  alt: string;
  caption: string;
};

type Props = {
  slides: HeroSlide[];
  /** e.g. "Sede" / "HQ" — counter / aria prefix */
  label: string;
};

const AUTOPLAY_MS = 6000;

export function HeroCarousel({ slides, label }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Autoplay — pauses on hover/focus, disabled for reduced-motion users.
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group relative isolate h-full"
    >
      {/* Offset frame accent — gives the panel depth and ties into the
          site's corner-bracket / blueprint language. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-3 -z-10 hidden h-2/3 w-2/3 border-b border-r border-acid-2/35 lg:block"
      />

      {/* Framed media box */}
      <div className="relative h-full overflow-hidden border border-ink-4 bg-ink-2 shadow-[0_28px_64px_-28px_rgba(20,17,15,0.55)]">
        {slides.map((s, i) => (
          <figure
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 90vw, 900px"
              className={`object-cover transition-transform duration-[7000ms] ease-out ${
                i === index ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Bottom wash for caption + top scrim for the counter */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-1 via-ink-1/15 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-1/85 to-transparent" />

            <figcaption className="absolute inset-x-0 bottom-0 p-6 pb-9 lg:p-8 lg:pb-11">
              <span className="mb-3 block h-px w-10 bg-acid-2 lg:w-12" />
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-acid-2 lg:text-[0.7rem]">
                {label}
              </p>
              <p className="mt-2.5 max-w-md text-pretty text-base font-medium leading-snug text-mist-3 lg:text-lg">
                {s.caption}
              </p>
            </figcaption>
          </figure>
        ))}

        {/* Live-capture cue (industrial monitoring vibe) */}
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-acid-2 animate-pulse-dot" />
          <span className="font-mono text-[0.52rem] uppercase tracking-[0.3em] text-mist-2">
            Live
          </span>
        </div>

        {/* Corner ticks */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 h-4 w-4 border-l border-t border-acid-2/60" />
        <span className="pointer-events-none absolute right-3 top-3 z-10 h-4 w-4 border-r border-t border-acid-2/60" />

        {/* Counter */}
        <div className="absolute right-4 top-3.5 z-10 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-2">
          <span className="text-mist-4">{String(index + 1).padStart(2, '0')}</span>
          <span>/ {String(count).padStart(2, '0')}</span>
        </div>

        {/* Indicators */}
        {count > 1 && (
          <div className="absolute inset-x-5 bottom-0 z-20 flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`${label} ${i + 1}`}
                aria-current={i === index}
                className="group/bar relative h-1 flex-1 overflow-hidden bg-mist-1/30"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-acid-2 transition-all duration-300 ${
                    i === index ? 'w-full' : 'w-0 group-hover/bar:w-1/3'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Vertical identity label on the outer edge */}
      <div className="absolute -left-3 bottom-12 hidden lg:block">
        <p className="[writing-mode:vertical-rl] rotate-180 font-mono text-[0.55rem] uppercase tracking-[0.45em] text-mist-1 whitespace-nowrap">
          {label} · Stuttgart, DE
        </p>
      </div>
    </div>
  );
}

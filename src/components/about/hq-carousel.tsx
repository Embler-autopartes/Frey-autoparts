'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type HqSlide = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  meta: string;
};

type Props = {
  slides: HqSlide[];
  /** Localized label for the prev/next controls (aria) */
  prevLabel: string;
  nextLabel: string;
  /** e.g. "Vista" / "View" — counter prefix */
  counterLabel: string;
};

const AUTOPLAY_MS = 6000;

export function HqCarousel({ slides, prevLabel, nextLabel, counterLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Autoplay — pauses on hover/focus and is disabled entirely when the user
  // prefers reduced motion.
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // Keyboard arrows when the carousel region is focused.
  const regionRef = useRef<HTMLDivElement>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  };

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group relative isolate overflow-hidden border border-ink-4 bg-ink-3 outline-none focus-visible:ring-1 focus-visible:ring-acid-2"
    >
      {/* Slides */}
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
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
              sizes="(max-width: 1024px) 100vw, 1440px"
              className={`object-cover transition-transform duration-[7000ms] ease-out ${
                i === index ? 'scale-105' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-1 via-ink-1/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-1/70 via-transparent to-transparent" />

            <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-acid-2">
                {s.meta}
              </p>
              <h3 className="mt-3 max-w-2xl font-display text-2xl uppercase leading-[0.95] tracking-tight text-mist-4 text-shadow-deep sm:text-4xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-mist-2 sm:text-base">
                {s.caption}
              </p>
            </figcaption>
          </figure>
        ))}

        {/* Corner ticks */}
        <span className="pointer-events-none absolute left-4 top-4 z-10 h-4 w-4 border-l border-t border-acid-2/60" />
        <span className="pointer-events-none absolute right-4 top-4 z-10 h-4 w-4 border-r border-t border-acid-2/60" />

        {/* Counter */}
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-mist-1 lg:right-10 lg:top-8">
          <span className="text-acid-2">{counterLabel}</span>
          <span className="text-mist-4">{String(index + 1).padStart(2, '0')}</span>
          <span>/ {String(count).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={prevLabel}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink-5 bg-ink-1/70 text-mist-3 backdrop-blur-sm transition-all hover:border-acid-2 hover:text-acid-2 lg:left-6"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={nextLabel}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink-5 bg-ink-1/70 text-mist-3 backdrop-blur-sm transition-all hover:border-acid-2 hover:text-acid-2 lg:right-6"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </button>

          {/* Progress bars / indicators */}
          <div className="absolute inset-x-6 bottom-0 z-20 flex gap-2 lg:inset-x-10">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`${counterLabel} ${i + 1}`}
                aria-current={i === index}
                className="group/bar relative h-1 flex-1 overflow-hidden bg-ink-5/80"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-acid-2 transition-all duration-300 ${
                    i === index ? 'w-full' : 'w-0 group-hover/bar:w-1/3'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

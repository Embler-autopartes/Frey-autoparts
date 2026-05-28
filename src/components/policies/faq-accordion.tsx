'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

type Item = { q: string; a: string };

export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-4 border-y border-ink-4">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="group">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-7 text-left transition-colors hover:bg-ink-2/40"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-mist-1">
                  /{String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-xl font-light leading-snug text-mist-4 sm:text-2xl">
                  {it.q}
                </h3>
              </div>
              <span
                className={`mt-2 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-500 ${
                  isOpen ? 'border-acid-2 bg-acid-2 text-white rotate-180' : 'border-ink-4 text-mist-2'
                }`}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" strokeWidth={2.4} /> : <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />}
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? 'grid-rows-[1fr] pb-8' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="ml-12 max-w-3xl border-l-2 border-acid-2 pl-6 font-serif text-lg font-light leading-relaxed text-mist-2 sm:text-xl">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

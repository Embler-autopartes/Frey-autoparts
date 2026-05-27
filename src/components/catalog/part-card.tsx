'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Plus, Check } from 'lucide-react';
import { useQuote } from '@/lib/quote-context';
import { brandLabels, type Part } from '@/lib/catalog-data';

export function PartCard({ part }: { part: Part }) {
  const t = useTranslations('catalog');
  const { add } = useQuote();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({
      partNumber: part.partNumber,
      description: part.name,
      brand: brandLabels[part.brand],
      qty: 1,
      notes: part.fitment,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="group flex flex-col bg-ink-3 transition-colors hover:bg-ink-1">
      {/* Image area: real product photo with brand/system tags */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-ink-4 bg-white">
        <Image
          src={part.photo}
          alt={part.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 z-10 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
          {brandLabels[part.brand]}
        </span>
        <span className="absolute right-3 top-3 z-10 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist-1">
          {t(`systems.${part.system}`)}
        </span>
        <span className="absolute bottom-3 left-3 z-10 bg-ink-3/95 px-2 py-1 font-mono text-[0.6rem] tracking-[0.05em] text-mist-3 backdrop-blur-sm">
          {part.partNumber}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-xl uppercase tracking-tight text-mist-4">
          {part.name}
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="grid grid-cols-[80px_1fr] gap-2">
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
              {t('card.fitment')}
            </dt>
            <dd className="text-sm text-mist-2">{part.fitment}</dd>
          </div>
          {part.oemRef && (
            <div className="grid grid-cols-[80px_1fr] gap-2">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
                {t('card.oem')}
              </dt>
              <dd className="font-mono text-xs text-mist-2">{part.oemRef}</dd>
            </div>
          )}
        </dl>

        <button
          type="button"
          onClick={handleAdd}
          disabled={added}
          className={`mt-auto inline-flex items-center justify-center gap-2 border px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-all ${
            added
              ? 'cursor-default border-acid-2 bg-acid-2 text-white'
              : 'border-acid-2 bg-transparent text-acid-2 hover:bg-acid-2 hover:text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
              {t('card.added')}
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              {t('card.add')}
            </>
          )}
        </button>
      </div>
    </article>
  );
}

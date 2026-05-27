'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X, Plus, Check } from 'lucide-react';
import { useQuote } from '@/lib/quote-context';
import {
  parts as catalogParts,
  brandLabels,
  systemSlugs,
  type Part,
  type Brand,
  type System,
} from '@/lib/catalog-data';
import { SystemIcon } from './system-icon';

type Filters = {
  search: string;
  brand: Brand | 'all';
  system: System | 'all';
};

export function CatalogGrid() {
  const t = useTranslations('catalog');
  const [filters, setFilters] = useState<Filters>({
    search: '',
    brand: 'all',
    system: 'all',
  });

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return catalogParts.filter((p) => {
      if (filters.brand !== 'all' && p.brand !== filters.brand) return false;
      if (filters.system !== 'all' && p.system !== filters.system) return false;
      if (q) {
        const hay = `${p.partNumber} ${p.name} ${p.fitment} ${p.oemRef ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  const hasActiveFilters = filters.search || filters.brand !== 'all' || filters.system !== 'all';

  return (
    <div className="space-y-10">
      {/* Filter bar */}
      <div className="border border-ink-4 bg-ink-3 p-6 lg:p-8">
        {/* Search row */}
        <div className="flex items-center gap-3 border-b border-ink-4 pb-6">
          <Search className="h-4 w-4 text-mist-1" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder={t('filters.search')}
            className="w-full bg-transparent text-base text-mist-4 placeholder:text-mist-1 focus:outline-none"
          />
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters({ search: '', brand: 'all', system: 'all' })}
              className="inline-flex shrink-0 items-center gap-1.5 border border-ink-4 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-2 transition-colors hover:border-acid-2 hover:text-acid-2"
            >
              <X className="h-3 w-3" />
              {t('filters.reset')}
            </button>
          )}
        </div>

        {/* Brand chips */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="w-20 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
            {t('filters.brand')}
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={filters.brand === 'all'}
              onClick={() => setFilters({ ...filters, brand: 'all' })}
            >
              {t('filters.all')}
            </Chip>
            {(Object.keys(brandLabels) as Brand[]).map((b) => (
              <Chip
                key={b}
                active={filters.brand === b}
                onClick={() => setFilters({ ...filters, brand: b })}
              >
                {brandLabels[b]}
              </Chip>
            ))}
          </div>
        </div>

        {/* System chips */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="w-20 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
            {t('filters.system')}
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={filters.system === 'all'}
              onClick={() => setFilters({ ...filters, system: 'all' })}
            >
              {t('filters.all')}
            </Chip>
            {systemSlugs.map((s) => (
              <Chip
                key={s}
                active={filters.system === s}
                onClick={() => setFilters({ ...filters, system: s })}
              >
                {t(`systems.${s}`)}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-2">
        {t('filters.resultsCount', { n: filtered.length })}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-ink-4 bg-ink-3 px-6 py-20 text-center">
          <p className="font-display text-2xl uppercase tracking-tight text-mist-4">
            {t('empty.title')}
          </p>
          <p className="mt-3 text-sm text-mist-2">{t('empty.subtitle')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PartCard key={p.id} part={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all ${
        active
          ? 'border-acid-2 bg-acid-2 text-white'
          : 'border-ink-4 bg-ink-1 text-mist-2 hover:border-acid-2 hover:text-acid-2'
      }`}
    >
      {children}
    </button>
  );
}

function PartCard({ part }: { part: Part }) {
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
      {/* Image area: large icon with brand tag */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-ink-4 bg-ink-1">
        <SystemIcon system={part.system} className="h-24 w-24 text-mist-2 transition-colors group-hover:text-acid-2" />
        <span className="absolute left-3 top-3 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1">
          {brandLabels[part.brand]}
        </span>
        <span className="absolute right-3 top-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist-1">
          {t(`systems.${part.system}`)}
        </span>
        <span className="absolute bottom-3 left-3 font-mono text-[0.6rem] tracking-[0.05em] text-mist-3">
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

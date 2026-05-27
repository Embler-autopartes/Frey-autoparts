'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import {
  parts as catalogParts,
  brandLabels,
  systemSlugs,
  type Brand,
  type System,
} from '@/lib/catalog-data';
import { PartCard } from './part-card';

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


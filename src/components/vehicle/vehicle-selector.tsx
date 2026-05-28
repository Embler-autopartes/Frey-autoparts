'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, RotateCcw, ArrowUpRight, ChevronRight } from 'lucide-react';
import {
  brandLabels,
  vehicles,
  partsForVehicle,
  type Brand,
  type VehicleModel,
} from '@/lib/catalog-data';
import { PartCard } from '@/components/catalog/part-card';

const brandPhotos: Record<Brand, string> = {
  mb: '/cars/mercedes.webp',
  bmw: '/cars/bmw.webp',
  landrover: '/cars/landrover.webp',
  sprinter: '/cars/sprinter.webp',
};

export function VehicleSelector() {
  const t = useTranslations('vehicle.selector');
  const tr = useTranslations('vehicle.results');
  const [brand, setBrand] = useState<Brand | null>(null);
  const [model, setModel] = useState<VehicleModel | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const availableYears = useMemo(() => {
    if (!model) return [];
    const years: number[] = [];
    for (let y = model.yearTo; y >= model.yearFrom; y--) years.push(y);
    return years;
  }, [model]);

  const matches = useMemo(() => {
    if (!brand) return [];
    return partsForVehicle(brand, model ?? undefined);
  }, [brand, model]);

  const reset = () => {
    setBrand(null);
    setModel(null);
    setYear(null);
  };

  return (
    <div className="space-y-12">
      {/* Stepper */}
      <div className="grid grid-cols-3 gap-px overflow-hidden border border-ink-4 bg-ink-4">
        <Step n="01" label={t('stepBrand')} done={!!brand} active={!brand} />
        <Step n="02" label={t('stepModel')} done={!!model} active={!!brand && !model} />
        <Step n="03" label={t('stepYear')} done={!!year} active={!!model && !year} />
      </div>

      {/* Step 1: Brand */}
      {!brand && (
        <div>
          <p className="mb-6 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1">
            {t('chooseBrand')}
          </p>
          <div className="grid gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(brandLabels) as Brand[]).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBrand(b)}
                className="group flex flex-col items-center gap-6 bg-ink-3 px-6 py-10 transition-colors hover:bg-ink-1"
              >
                <div className="relative h-32 w-full sm:h-40">
                  <Image
                    src={brandPhotos[b]}
                    alt={brandLabels[b]}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl uppercase tracking-tight text-mist-4 sm:text-3xl">
                    {brandLabels[b]}
                  </p>
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-acid-2">
                    Seleccionar →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Model */}
      {brand && !model && (
        <div>
          <div className="mb-8 flex items-center justify-between">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1">
              {t('chooseModel')} · <span className="text-acid-2">{brandLabels[brand]}</span>
            </p>
            <ResetBtn onClick={reset} label={t('reset')} />
          </div>
          <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles[brand].map((m, i) => (
              <button
                key={`${m.model}-${m.generation}-${i}`}
                type="button"
                onClick={() => setModel(m)}
                className="group flex items-center justify-between gap-3 bg-ink-3 p-6 text-left transition-colors hover:bg-ink-1"
              >
                <div>
                  <p className="font-display text-xl uppercase tracking-tight text-mist-4">
                    {m.model}
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-mist-2">
                    {m.generation}
                  </p>
                  <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
                    {t('years', { from: m.yearFrom, to: m.yearTo })}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-mist-1 transition-colors group-hover:text-acid-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Year + results */}
      {brand && model && (
        <>
          {/* Selected vehicle bar */}
          <div className="grid gap-px bg-ink-4 lg:grid-cols-[1.4fr_1.4fr_1fr_auto]">
            <SelectedTile label={t('stepBrand')} value={brandLabels[brand]} />
            <SelectedTile
              label={t('stepModel')}
              value={`${model.model} · ${model.generation}`}
            />
            <div className="bg-ink-3 px-6 py-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
                {t('stepYear')}
              </p>
              <select
                value={year ?? ''}
                onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
                className="mt-1 w-full bg-transparent font-display text-2xl uppercase tracking-tight text-mist-4 focus:outline-none"
              >
                <option value="">{t('yearAny')}</option>
                {availableYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-ink-3 px-6 py-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist-2 transition-colors hover:bg-acid-2/10 hover:text-acid-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t('reset')}
            </button>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-2">
                {tr('count', { n: matches.length })}
              </p>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-2 hover:text-acid-2"
              >
                {tr('viewAll')} →
              </Link>
            </div>

            {matches.length === 0 ? (
              <div className="border border-dashed border-ink-4 bg-ink-3 px-6 py-16 text-center">
                <p className="mx-auto max-w-2xl text-pretty text-mist-2">
                  {t('noResults')}
                </p>
                <Link
                  href="/cotizacion"
                  className="mt-6 inline-flex items-center gap-2 border border-acid-2 bg-acid-2 px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white transition-all hover:bg-acid-3"
                >
                  {t('noResultsCta')}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((p) => (
                  <PartCard key={p.id} part={p} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Step({
  n,
  label,
  done,
  active,
}: {
  n: string;
  label: string;
  done: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 transition-colors ${
        active ? 'bg-acid-2 text-white' : done ? 'bg-ink-3 text-mist-4' : 'bg-ink-3 text-mist-1'
      }`}
    >
      <span
        className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[0.65rem] ring-1 ${
          active
            ? 'bg-white text-acid-2 ring-white'
            : done
              ? 'bg-acid-2 text-white ring-acid-2'
              : 'bg-transparent ring-ink-4'
        }`}
      >
        {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
      </span>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]">
        {label}
      </span>
    </div>
  );
}

function SelectedTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink-3 px-6 py-5">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl uppercase tracking-tight text-mist-4">
        {value}
      </p>
    </div>
  );
}

function ResetBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-2 transition-colors hover:text-acid-2"
    >
      <RotateCcw className="h-3 w-3" />
      {label}
    </button>
  );
}

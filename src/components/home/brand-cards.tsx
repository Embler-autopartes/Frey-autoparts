import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

type Brand = {
  id: string;
  name: string;
  models: string;
  systems: { name: string; href: string }[];
  silhouette: 'sedan' | 'suv' | 'van';
};

const brands: Brand[] = [
  {
    id: 'mb',
    name: 'Mercedes-Benz',
    models: 'C / E / S · GLE · GLC · Vito · Viano',
    systems: [
      { name: 'Engine system', href: '/catalogo?b=mb&s=engine' },
      { name: 'Electrical system', href: '/catalogo?b=mb&s=electric' },
      { name: 'Chassis system', href: '/catalogo?b=mb&s=chassis' },
    ],
    silhouette: 'sedan',
  },
  {
    id: 'bmw',
    name: 'BMW',
    models: '3-Series · 5-Series · 7-Series · X1 · X3 · X5 · X6',
    systems: [
      { name: 'Engine system', href: '/catalogo?b=bmw&s=engine' },
      { name: 'Electrical system', href: '/catalogo?b=bmw&s=electric' },
      { name: 'Chassis system', href: '/catalogo?b=bmw&s=chassis' },
    ],
    silhouette: 'suv',
  },
  {
    id: 'sprinter',
    name: 'MB Sprinter',
    models: '901 · 902 · 903 · 904 · 905 · 906 · LCV fleet',
    systems: [
      { name: 'Engine system', href: '/catalogo?b=sprinter&s=engine' },
      { name: 'Electrical system', href: '/catalogo?b=sprinter&s=electric' },
      { name: 'Chassis system', href: '/catalogo?b=sprinter&s=chassis' },
    ],
    silhouette: 'van',
  },
];

export async function BrandCards() {
  const t = await getTranslations('home');

  return (
    <section className="relative border-y border-ink-4 bg-ink-3 py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
              ◆ Catálogo por marca
            </p>
            <h2 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
              Soporte completo para tu flota europea
            </h2>
          </div>
        </header>

        <div className="space-y-6">
          {brands.map((brand) => (
            <article
              key={brand.id}
              className="group relative grid items-center gap-8 border border-ink-4 bg-ink-1 px-8 py-10 transition-all hover:border-acid-2/40 hover:shadow-[0_18px_48px_-24px_rgba(0,63,42,0.35)] lg:grid-cols-[1.2fr_1fr_1.4fr] lg:gap-12 lg:px-12"
            >
              {/* Silhouette */}
              <div className="relative h-32 w-full text-mist-2 transition-colors group-hover:text-acid-2 sm:h-40">
                <CarSilhouette kind={brand.silhouette} />
              </div>

              {/* Brand info */}
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-mist-1">
                  Spare parts for
                </p>
                <h3 className="mt-2 font-display text-3xl uppercase tracking-tight text-mist-4 sm:text-4xl">
                  {brand.name}
                </h3>
                <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-mist-2">
                  {brand.models}
                </p>
              </div>

              {/* System buttons */}
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {brand.systems.map((sys) => (
                  <Link
                    key={sys.name}
                    href={sys.href}
                    className="group/btn inline-flex items-center gap-2 border border-acid-2/60 bg-transparent px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-acid-2 transition-all hover:bg-acid-2 hover:text-white"
                  >
                    {sys.name}
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarSilhouette({ kind }: { kind: Brand['silhouette'] }) {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.4,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const fill = { fill: 'currentColor', opacity: 0.08 };

  if (kind === 'sedan') {
    return (
      <svg viewBox="0 0 360 130" className="h-full w-full">
        <path
          d="M30 95 L60 70 L95 50 L150 42 L215 42 L260 50 L300 60 L330 75 L335 95 L300 95 M115 95 L235 95 M30 95 L60 95"
          {...stroke}
        />
        <path
          d="M30 95 L60 70 L95 50 L150 42 L215 42 L260 50 L300 60 L330 75 L335 95 L30 95 Z"
          {...fill}
        />
        <line x1="105" y1="55" x2="155" y2="55" {...stroke} />
        <line x1="160" y1="45" x2="225" y2="45" {...stroke} />
        <circle cx="85" cy="95" r="14" {...stroke} />
        <circle cx="280" cy="95" r="14" {...stroke} />
        <circle cx="85" cy="95" r="6" {...stroke} />
        <circle cx="280" cy="95" r="6" {...stroke} />
      </svg>
    );
  }
  if (kind === 'suv') {
    return (
      <svg viewBox="0 0 360 130" className="h-full w-full">
        <path
          d="M25 95 L40 60 L80 38 L150 32 L240 32 L290 45 L325 60 L340 75 L340 95"
          {...stroke}
        />
        <path
          d="M25 95 L40 60 L80 38 L150 32 L240 32 L290 45 L325 60 L340 75 L340 95 L25 95 Z"
          {...fill}
        />
        <line x1="90" y1="45" x2="155" y2="45" {...stroke} />
        <line x1="160" y1="38" x2="245" y2="38" {...stroke} />
        <line x1="180" y1="32" x2="180" y2="55" {...stroke} />
        <circle cx="85" cy="95" r="16" {...stroke} />
        <circle cx="285" cy="95" r="16" {...stroke} />
        <circle cx="85" cy="95" r="7" {...stroke} />
        <circle cx="285" cy="95" r="7" {...stroke} />
        <rect x="25" y="92" width="315" height="3" {...stroke} />
      </svg>
    );
  }
  // van
  return (
    <svg viewBox="0 0 360 130" className="h-full w-full">
      <path
        d="M22 95 L22 38 L60 22 L260 22 L290 32 L335 60 L340 95"
        {...stroke}
      />
      <path
        d="M22 95 L22 38 L60 22 L260 22 L290 32 L335 60 L340 95 L22 95 Z"
        {...fill}
      />
      <line x1="60" y1="22" x2="60" y2="95" {...stroke} />
      <line x1="150" y1="22" x2="150" y2="95" {...stroke} />
      <line x1="250" y1="22" x2="250" y2="60" {...stroke} />
      <rect x="70" y="30" width="70" height="38" {...stroke} />
      <rect x="160" y="30" width="80" height="38" {...stroke} />
      <rect x="260" y="38" width="55" height="28" {...stroke} />
      <circle cx="95" cy="95" r="16" {...stroke} />
      <circle cx="295" cy="95" r="16" {...stroke} />
      <circle cx="95" cy="95" r="7" {...stroke} />
      <circle cx="295" cy="95" r="7" {...stroke} />
    </svg>
  );
}

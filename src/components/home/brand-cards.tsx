import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

type Brand = {
  id: string;
  name: string;
  models: string;
  systems: { name: string; href: string }[];
  photo: string;
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
    photo: '/cars/mercedes.webp',
  },
  {
    id: 'bmw',
    name: 'BMW',
    models: '3-Series · 4-Series · 5-Series · X1 · X3 · X5',
    systems: [
      { name: 'Engine system', href: '/catalogo?b=bmw&s=engine' },
      { name: 'Electrical system', href: '/catalogo?b=bmw&s=electric' },
      { name: 'Chassis system', href: '/catalogo?b=bmw&s=chassis' },
    ],
    photo: '/cars/bmw.webp',
  },
  {
    id: 'landrover',
    name: 'Land Rover',
    models: 'Range Rover · Sport · Evoque · Discovery · Defender',
    systems: [
      { name: 'Engine system', href: '/catalogo?b=landrover&s=engine' },
      { name: 'Electrical system', href: '/catalogo?b=landrover&s=electric' },
      { name: 'Chassis system', href: '/catalogo?b=landrover&s=chassis' },
    ],
    photo: '/cars/landrover.webp',
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
    photo: '/cars/sprinter.webp',
  },
];

export async function BrandCards() {
  const t = await getTranslations('home');

  return (
    <section className="relative border-y border-ink-4 bg-ink-3 py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
              <span className="text-acid-2">◆</span>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
                Catálogo por marca
              </p>
            </div>
            <h2 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
              Soporte completo para tu <span className="font-serif font-light italic text-acid-2">flota europea</span>
            </h2>
          </div>
        </header>

        <div className="space-y-6">
          {brands.map((brand, idx) => {
            const isGreen = idx % 2 === 1; // alterna: 2da y 4ta card en verde
            return (
              <article
                key={brand.id}
                className={`group relative grid items-center gap-8 border px-8 py-10 transition-all duration-500 lg:grid-cols-[1.2fr_1fr_1.4fr] lg:gap-12 lg:px-12 ${
                  isGreen
                    ? 'border-acid-2/30 bg-acid-2/5 hover:border-acid-2/60 hover:bg-acid-2/10 hover:shadow-[0_18px_48px_-24px_rgba(0,63,42,0.5)]'
                    : 'border-ink-4 bg-ink-1 hover:border-acid-2/40 hover:shadow-[0_18px_48px_-24px_rgba(0,63,42,0.35)]'
                }`}
              >
                {/* Left index ribbon */}
                <span
                  className={`absolute left-0 top-0 h-full w-1 ${
                    isGreen ? 'bg-acid-2' : 'bg-acid-2/0 group-hover:bg-acid-2/50'
                  } transition-all duration-500`}
                />

                {/* Car photo — radial mask para difuminar el fondo studio */}
                <div
                  className="relative h-40 w-full sm:h-48 lg:h-56"
                  style={{
                    maskImage:
                      'radial-gradient(ellipse 85% 78% at center, black 55%, transparent 95%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 85% 78% at center, black 55%, transparent 95%)',
                  }}
                >
                  <Image
                    src={brand.photo}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Brand info */}
                <div>
                  <p
                    className={`font-mono text-[0.6rem] uppercase tracking-[0.25em] ${
                      isGreen ? 'text-acid-2' : 'text-mist-1'
                    }`}
                  >
                    Spare parts for · /{String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 font-display text-3xl uppercase tracking-tight text-mist-4 sm:text-4xl">
                    {brand.name}
                  </h3>
                  <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-mist-2">
                    {brand.models}
                  </p>
                </div>

                {/* System buttons — todos verdes solidos */}
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {brand.systems.map((sys) => (
                    <Link
                      key={sys.name}
                      href={sys.href}
                      className="group/btn inline-flex items-center gap-2 border border-acid-2 bg-acid-2 px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-acid-3"
                    >
                      {sys.name}
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


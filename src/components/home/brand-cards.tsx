import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

type Brand = {
  id: string;
  name: string;
  models: string;
  systems: { es: string; en: string; href: string }[];
  photo: string;
};

const brands: Brand[] = [
  {
    id: 'mb',
    name: 'Mercedes-Benz',
    models: 'C / E / S · GLE · GLC · Vito · Viano',
    systems: [
      { es: 'Sistema motor', en: 'Engine system', href: '/catalogo?b=mb&s=engine' },
      { es: 'Sistema eléctrico', en: 'Electrical system', href: '/catalogo?b=mb&s=electric' },
      { es: 'Sistema chasis', en: 'Chassis system', href: '/catalogo?b=mb&s=chassis' },
    ],
    photo: '/cars/mercedes.webp',
  },
  {
    id: 'bmw',
    name: 'BMW',
    models: '3-Series · 4-Series · 5-Series · X1 · X3 · X5',
    systems: [
      { es: 'Sistema motor', en: 'Engine system', href: '/catalogo?b=bmw&s=engine' },
      { es: 'Sistema eléctrico', en: 'Electrical system', href: '/catalogo?b=bmw&s=electric' },
      { es: 'Sistema chasis', en: 'Chassis system', href: '/catalogo?b=bmw&s=chassis' },
    ],
    photo: '/cars/bmw.webp',
  },
  {
    id: 'landrover',
    name: 'Land Rover',
    models: 'Range Rover · Sport · Evoque · Discovery · Defender',
    systems: [
      { es: 'Sistema motor', en: 'Engine system', href: '/catalogo?b=landrover&s=engine' },
      { es: 'Sistema eléctrico', en: 'Electrical system', href: '/catalogo?b=landrover&s=electric' },
      { es: 'Sistema chasis', en: 'Chassis system', href: '/catalogo?b=landrover&s=chassis' },
    ],
    photo: '/cars/landrover.webp',
  },
  {
    id: 'sprinter',
    name: 'MB Sprinter',
    models: '901 · 902 · 903 · 904 · 905 · 906 · LCV fleet',
    systems: [
      { es: 'Sistema motor', en: 'Engine system', href: '/catalogo?b=sprinter&s=engine' },
      { es: 'Sistema eléctrico', en: 'Electrical system', href: '/catalogo?b=sprinter&s=electric' },
      { es: 'Sistema chasis', en: 'Chassis system', href: '/catalogo?b=sprinter&s=chassis' },
    ],
    photo: '/cars/sprinter.webp',
  },
];

export async function BrandCards() {
  const locale = await getLocale();

  return (
    <section className="relative border-y border-ink-4 bg-ink-3 py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
              <span className="text-acid-2">◆</span>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
                {locale === 'es' ? 'Catálogo por marca' : 'Catalog by brand'}
              </p>
            </div>
            <h2 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
              {locale === 'es' ? (
                <>Soporte completo para tu <span className="font-serif font-light italic text-acid-2">flota europea</span></>
              ) : (
                <>Full coverage for your <span className="font-serif font-light italic text-acid-2">European fleet</span></>
              )}
            </h2>
          </div>
        </header>

        {/* Grid 2x2 — todas las cards uniformes con auto destacado */}
        <div className="grid gap-px bg-ink-4 sm:grid-cols-2">
          {brands.map((brand, idx) => (
            <article
              key={brand.id}
              className="group relative flex flex-col bg-ink-1 p-8 transition-all duration-500 hover:bg-ink-3 lg:p-10"
            >
              {/* Left hover ribbon */}
              <span className="absolute left-0 top-0 h-full w-1 bg-acid-2/0 transition-all duration-500 group-hover:bg-acid-2" />

              {/* Header: index */}
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-acid-2">
                  {locale === 'es' ? 'Refacciones para' : 'Spare parts for'}
                </p>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-mist-1">
                  /{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Car photo — mucho más grande */}
              <div className="relative my-8 h-56 w-full sm:h-64 lg:h-72">
                <Image
                  src={brand.photo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Brand info */}
              <div className="flex flex-1 flex-col">
                <h3 className="font-display text-3xl uppercase tracking-tight text-mist-4 sm:text-4xl">
                  {brand.name}
                </h3>
                <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-mist-2">
                  {brand.models}
                </p>

                {/* System buttons */}
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {brand.systems.map((sys) => (
                    <Link
                      key={sys.en}
                      href={sys.href}
                      className="group/btn inline-flex items-center gap-1.5 border border-acid-2 bg-acid-2 px-3.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-acid-3"
                    >
                      {locale === 'es' ? sys.es : sys.en}
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


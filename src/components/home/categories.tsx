import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

const cats = [
  { id: 'brakes', code: '01', photo: '/systems/brakes.webp' },
  { id: 'engine', code: '02', photo: '/systems/engine.webp' },
  { id: 'suspension', code: '03', photo: '/systems/suspension.webp' },
  { id: 'transmission', code: '04', photo: '/systems/transmission.webp' },
  { id: 'electric', code: '05', photo: '/systems/electric.webp' },
  { id: 'filtration', code: '06', photo: '/systems/filtration.webp' },
  { id: 'cooling', code: '07', photo: '/systems/cooling.webp' },
  { id: 'body', code: '08', photo: '/systems/body.webp' },
];

export async function Categories() {
  const t = await getTranslations('home.categories');

  return (
    <section className="relative border-t border-ink-4 bg-ink-1 py-28 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid-2/40 to-transparent" />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
              ◆ {t('eyebrow')}
            </p>
            <h2 className="mt-6 max-w-2xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-7xl">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mist-2 hover:text-acid-2"
          >
            <span className="h-px w-8 bg-acid-2 transition-all group-hover:w-12" />
            Ver catálogo completo
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat) => (
            <Link
              key={cat.id}
              href="/catalogo"
              className="group relative isolate flex flex-col overflow-hidden bg-ink-1 transition-colors hover:bg-ink-2"
            >
              {/* Photo */}
              <div className="relative aspect-[5/4] w-full overflow-hidden border-b border-ink-4 bg-ink-3">
                <Image
                  src={cat.photo}
                  alt={t(`items.${cat.id}.name`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-0/70 via-ink-0/10 to-transparent" />
                <span className="absolute left-3 top-3 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-white/80">
                  SYS / {cat.code}
                </span>
                <span className="absolute bottom-3 left-3 font-display text-xl uppercase tracking-tight text-white sm:text-2xl">
                  {t(`items.${cat.id}.name`)}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-sm leading-relaxed text-mist-2">
                  {t(`items.${cat.id}.desc`)}
                </p>
                <div className="mt-auto flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1 transition-colors group-hover:text-acid-2">
                  Explorar sistema
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

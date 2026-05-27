import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function Facility() {
  const t = await getTranslations('home.facility');

  return (
    <section className="relative isolate min-h-[80svh] overflow-hidden">
      <Image
        src="/images/warehouse-corridor.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-0 via-ink-0/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-0 via-transparent to-transparent" />

      <div className="mx-auto flex min-h-[80svh] max-w-[1440px] flex-col justify-end px-6 py-24 lg:px-10 lg:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {t('eyebrow')}
          </p>
          <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 text-shadow-deep sm:text-7xl">
            {t('title')}
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist-3">
            {t('desc')}
          </p>
        </div>

        {/* Bottom data strip */}
        <div className="mt-16 grid grid-cols-2 gap-px bg-ink-4/60 backdrop-blur-sm sm:grid-cols-4">
          {[
            ['12,800', 'm² · area'],
            ['24 / 6', 'operation'],
            ['1,400+', 'orders / day'],
            ['98.6%', 'OTIF'],
          ].map(([v, l]) => (
            <div key={l} className="bg-ink-0/70 px-6 py-5 backdrop-blur-sm">
              <p className="font-display text-3xl text-mist-4 sm:text-4xl">{v}</p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-2">
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

const cats = [
  { id: 'brakes', code: '01', icon: BrakeIcon },
  { id: 'engine', code: '02', icon: EngineIcon },
  { id: 'suspension', code: '03', icon: SuspensionIcon },
  { id: 'transmission', code: '04', icon: TransmissionIcon },
  { id: 'electric', code: '05', icon: ElectricIcon },
  { id: 'filtration', code: '06', icon: FilterIcon },
  { id: 'cooling', code: '07', icon: CoolingIcon },
  { id: 'body', code: '08', icon: BodyIcon },
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
          {cats.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href="/catalogo"
                className="group relative isolate overflow-hidden bg-ink-1 p-8 transition-colors hover:bg-ink-2 corner-bracket"
              >
                <span className="absolute right-4 top-3 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist-1 group-hover:text-acid-2">
                  SYS / {cat.code}
                </span>

                <div className="mb-12 mt-4 h-16 w-16 text-mist-2 transition-colors group-hover:text-acid-2">
                  <Icon />
                </div>

                <h3 className="font-display text-2xl uppercase tracking-tight text-mist-4">
                  {t(`items.${cat.id}.name`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-2">
                  {t(`items.${cat.id}.desc`)}
                </p>

                <div className="mt-8 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-1 transition-colors group-hover:text-acid-2">
                  Explorar sistema
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- inline industrial icons ---------- */
const stroke = { stroke: 'currentColor', strokeWidth: 1.4, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function BrakeIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="13" />
      <circle cx="24" cy="24" r="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line key={deg} x1="24" y1="24" x2="24" y2="11" transform={`rotate(${deg} 24 24)`} />
      ))}
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <rect x="8" y="18" width="32" height="20" />
      <rect x="13" y="13" width="6" height="5" />
      <rect x="29" y="13" width="6" height="5" />
      <line x1="13" y1="22" x2="35" y2="22" />
      <line x1="13" y1="28" x2="35" y2="28" />
      <line x1="13" y1="34" x2="35" y2="34" />
      <line x1="4" y1="28" x2="8" y2="28" />
      <line x1="40" y1="28" x2="44" y2="28" />
    </svg>
  );
}

function SuspensionIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <circle cx="24" cy="8" r="3" />
      <line x1="24" y1="11" x2="24" y2="15" />
      <line x1="20" y1="15" x2="28" y2="15" />
      {[16, 19, 22, 25, 28, 31, 34, 37].map((y, i) => (
        <line key={i} x1={i % 2 ? 19 : 29} y1={y} x2={i % 2 ? 29 : 19} y2={y + 1.5} />
      ))}
      <line x1="20" y1="40" x2="28" y2="40" />
      <circle cx="24" cy="42" r="3" />
    </svg>
  );
}

function TransmissionIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <circle cx="16" cy="24" r="9" />
      <circle cx="33" cy="24" r="6" />
      <circle cx="16" cy="24" r="2" />
      <circle cx="33" cy="24" r="1.5" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line key={deg} x1="16" y1="24" x2="16" y2="14" transform={`rotate(${deg} 16 24)`} />
      ))}
      {[0, 90, 180, 270].map((deg) => (
        <line key={deg} x1="33" y1="24" x2="33" y2="17" transform={`rotate(${deg} 33 24)`} />
      ))}
    </svg>
  );
}

function ElectricIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <path d="M26 6 L14 26 L22 26 L20 42 L34 22 L26 22 Z" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <path d="M12 10 L36 10 L30 24 L30 38 L18 42 L18 24 Z" />
      <line x1="14" y1="16" x2="34" y2="16" />
    </svg>
  );
}

function CoolingIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <rect x="10" y="10" width="28" height="28" />
      <line x1="14" y1="10" x2="14" y2="38" />
      <line x1="20" y1="10" x2="20" y2="38" />
      <line x1="26" y1="10" x2="26" y2="38" />
      <line x1="32" y1="10" x2="32" y2="38" />
      <line x1="10" y1="6" x2="38" y2="6" />
      <line x1="10" y1="42" x2="38" y2="42" />
    </svg>
  );
}

function BodyIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke} className="h-full w-full">
      <path d="M6 32 L10 22 L18 18 L30 18 L38 22 L42 32 L42 36 L36 36 L34 33 L14 33 L12 36 L6 36 Z" />
      <circle cx="14" cy="36" r="3" />
      <circle cx="34" cy="36" r="3" />
      <line x1="18" y1="22" x2="30" y2="22" />
    </svg>
  );
}

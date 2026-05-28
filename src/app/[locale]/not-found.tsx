import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-1 px-6 py-32">
      <div className="absolute inset-0 -z-10 tech-grid opacity-40" />
      <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-acid-2/30 to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
          <span className="text-acid-2">◆</span>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
            File · 404 · Not found
          </p>
        </div>

        <p className="mt-12 font-serif text-[clamp(8rem,18vw,16rem)] font-light italic leading-[0.8] tracking-[-0.04em] text-acid-2">
          404
        </p>

        <h1 className="mt-8 font-display text-4xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
          {locale === 'es' ? 'Pieza no encontrada.' : 'Part not found.'}
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-serif text-xl font-light italic leading-snug text-mist-3 sm:text-2xl">
          {locale === 'es'
            ? '«La referencia que buscas no existe en el catálogo. Posiblemente se trasladó, se descontinuó, o el enlace caducó.»'
            : '«The reference you are looking for is not in the catalog. It may have moved, been discontinued, or the link expired.»'}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all hover:bg-acid-3"
          >
            {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
          </Link>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-3 border border-ink-4 bg-ink-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-mist-3 transition-all hover:border-mist-3"
          >
            {locale === 'es' ? 'Explorar catálogo' : 'Browse catalog'}
          </Link>
        </div>

        <p className="mt-16 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-mist-1">
          {locale === 'es'
            ? '¿Necesitas algo específico? Escribe a freymarketing@cnfrey.com'
            : 'Need something specific? Write to freymarketing@cnfrey.com'}
        </p>
      </div>
    </section>
  );
}

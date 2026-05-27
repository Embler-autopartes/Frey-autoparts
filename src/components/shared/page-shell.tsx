import { ReactNode } from 'react';

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-4 bg-ink-2 pb-20 pt-40 lg:pt-48">
        <div className="absolute inset-0 -z-10 tech-grid opacity-50" />
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-acid-2/30 to-transparent" />

        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-6xl uppercase leading-[0.92] tracking-tight text-mist-4 sm:text-8xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-mist-2">
              {intro}
            </p>
          )}
        </div>
      </section>
      {children && (
        <section className="bg-ink-1 py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">{children}</div>
        </section>
      )}
    </>
  );
}

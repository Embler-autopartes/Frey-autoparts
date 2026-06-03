import { cn } from '@/lib/utils';

/**
 * Section eyebrow label. Single source of truth for the recurring
 * "◆ MONO UPPERCASE" kicker used across the site.
 *
 * - variant="boxed"  → bordered chip (border-l-2 + acid tint). Section mastheads.
 * - variant="plain"  → inline diamond + label. Lighter contexts.
 */
export function Eyebrow({
  children,
  variant = 'boxed',
  className,
}: {
  children: React.ReactNode;
  variant?: 'boxed' | 'plain';
  className?: string;
}) {
  if (variant === 'plain') {
    return (
      <p
        className={cn(
          'font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2',
          className,
        )}
      >
        ◆ {children}
      </p>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2',
        className,
      )}
    >
      <span className="text-acid-2">◆</span>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
        {children}
      </p>
    </div>
  );
}

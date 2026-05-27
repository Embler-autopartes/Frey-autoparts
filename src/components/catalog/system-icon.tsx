import type { System } from '@/lib/catalog-data';

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.4,
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function SystemIcon({ system, className = '' }: { system: System; className?: string }) {
  switch (system) {
    case 'brakes':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
          <circle cx="24" cy="24" r="20" />
          <circle cx="24" cy="24" r="13" />
          <circle cx="24" cy="24" r="3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line key={deg} x1="24" y1="24" x2="24" y2="11" transform={`rotate(${deg} 24 24)`} />
          ))}
        </svg>
      );
    case 'engine':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
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
    case 'suspension':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
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
    case 'transmission':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
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
    case 'electric':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
          <path d="M26 6 L14 26 L22 26 L20 42 L34 22 L26 22 Z" />
        </svg>
      );
    case 'filtration':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
          <path d="M12 10 L36 10 L30 24 L30 38 L18 42 L18 24 Z" />
          <line x1="14" y1="16" x2="34" y2="16" />
        </svg>
      );
    case 'cooling':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
          <rect x="10" y="10" width="28" height="28" />
          <line x1="14" y1="10" x2="14" y2="38" />
          <line x1="20" y1="10" x2="20" y2="38" />
          <line x1="26" y1="10" x2="26" y2="38" />
          <line x1="32" y1="10" x2="32" y2="38" />
          <line x1="10" y1="6" x2="38" y2="6" />
          <line x1="10" y1="42" x2="38" y2="42" />
        </svg>
      );
    case 'body':
      return (
        <svg viewBox="0 0 48 48" {...stroke} className={className}>
          <path d="M6 32 L10 22 L18 18 L30 18 L38 22 L42 32 L42 36 L36 36 L34 33 L14 33 L12 36 L6 36 Z" />
          <circle cx="14" cy="36" r="3" />
          <circle cx="34" cy="36" r="3" />
          <line x1="18" y1="22" x2="30" y2="22" />
        </svg>
      );
  }
}

'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';

/**
 * Reveals top-level <section> elements as they scroll into view.
 * Sections start hidden via CSS ([data-reveal-root] section), so there is no
 * flash on first paint; this just toggles `.is-visible` when they intersect.
 * Respects prefers-reduced-motion (the hiding CSS is gated on no-preference).
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector('[data-reveal-root]');
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>(':scope > section'));

    // If the user prefers reduced motion the CSS never hides sections; reveal all.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      sections.forEach((s) => s.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    sections.forEach((s) => {
      // Reveal anything already in view immediately (avoids a stuck-hidden hero area).
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        s.classList.add('is-visible');
      } else {
        observer.observe(s);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

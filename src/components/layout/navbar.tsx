'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: t('home') },
    { href: '/catalogo', label: t('catalog') },
    { href: '/aplicacion', label: t('vehicle') },
    { href: '/acerca', label: t('about') },
    { href: '/descargas', label: t('downloads') },
    { href: '/contacto', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-ink-4/70 bg-ink-1/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-ink-1/70 to-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-sm bg-ink-3 ring-1 ring-ink-4 transition-all group-hover:ring-acid-2">
            <Image
              src="/logo.webp"
              alt="FREY"
              fill
              sizes="36px"
              className="object-contain p-1 mix-blend-multiply"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1.35rem] font-medium tracking-[0.04em] text-mist-4">
              FREY
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist-1">
              Auto Parts · DE
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors',
                  active ? 'text-mist-4' : 'text-mist-2 hover:text-mist-4',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-acid-2 transition-transform duration-500 ease-out',
                    active && 'scale-x-100',
                    'group-hover:scale-x-100',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher current={locale} />
          <Link
            href="/cotizacion"
            className="hidden items-center gap-2 border border-acid-2/60 bg-acid-2/15 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-acid-3 transition-all hover:bg-acid-2 hover:text-ink-3 lg:inline-flex"
          >
            {t('quote')}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-ink-5 text-mist-3 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-4 bg-ink-1/97 px-6 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-4 py-4 font-display text-2xl tracking-tight text-mist-3 hover:text-acid-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cotizacion"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-2 self-start border border-acid-2 bg-acid-2 px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink-3"
            >
              {t('quote')} <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const target = current === 'es' ? 'en' : 'es';
  return (
    <Link
      href={pathname}
      locale={target}
      className="group flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist-2 hover:text-acid-2"
    >
      <span className={current === 'es' ? 'text-mist-4' : ''}>ES</span>
      <span className="text-ink-5">/</span>
      <span className={current === 'en' ? 'text-mist-4' : ''}>EN</span>
    </Link>
  );
}

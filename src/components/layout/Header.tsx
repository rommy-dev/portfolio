'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

import { LanguageSwitcher } from './LanguageSwitcher';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/fr';
import { href, publicPath, type RouteKey } from '@/i18n/routes';

const NAV_KEYS: RouteKey[] = ['home', 'services', 'projects', 'skills', 'contact'];

type Props = {
  lang: Locale;
  t: Pick<Dictionary, 'nav' | 'header' | 'languageSwitcher'>;
};

export function Header({ lang, t }: Props) {
  const navigation = NAV_KEYS.map((key) => ({ name: t.nav[key], href: href(lang, key) }));
  const homeHref = href(lang, 'home');
  const contactHref = href(lang, 'contact');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /* Chemin public : pendant le rendu serveur, usePathname() renvoie le chemin réécrit (/fr/…). */
  const pathname = publicPath(usePathname() ?? '/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav
          className={`mx-auto flex w-full items-center justify-between px-6 transition-all duration-300 md:px-12 lg:px-16 ${
            scrolled ? 'h-14 md:h-16' : 'h-14 md:h-16'
          }`}
        >
          <Link
            href={homeHref}
            onClick={(e) => {
              setIsOpen(false);
              /* Déjà sur l'accueil : on remonte en douceur, comme « Retour en haut » du footer. */
              if (pathname === homeHref) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 text-left"
            aria-label={t.header.homeAria}
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--foreground-muted))]">
                Ny Aina Rommy
              </p>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[hsl(var(--foreground-subtle))]">
                Ramaromilanto
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => {
              const isActive =
                item.href === homeHref
                  ? pathname === homeHref
                  : pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group relative inline-flex items-center py-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-200 ${
                    isActive
                      ? 'text-[hsl(var(--foreground))]'
                      : 'text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute inset-x-0 -bottom-[1px] h-px origin-left bg-white transition-transform duration-500 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher lang={lang} t={t.languageSwitcher} />
            {/* Bouton masqué entre md et lg : la place manque, et « Contact » reste dans la navigation. */}
            <Link
              href={contactHref}
              className="hidden items-center gap-2 rounded-[2px] lg:inline-flex border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[hsl(var(--foreground))] transition-colors duration-200 hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
            >
              {t.header.contactCta}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher lang={lang} t={t.languageSwitcher} onNavigate={() => setIsOpen(false)} />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? t.header.closeMenu : t.header.openMenu}
              aria-expanded={isOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))]"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[hsl(var(--background))] md:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-16">
              <nav className="mt-10 flex flex-1 flex-col gap-2">
                {navigation.map((item, index) => {
                  const isActive =
                    item.href === homeHref
                      ? pathname === homeHref
                      : pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <m.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between border-b border-[hsl(var(--border))] py-3 text-[11px] font-medium uppercase tracking-[0.22em] ${
                          isActive
                            ? 'text-[hsl(var(--foreground))]'
                            : 'text-[hsl(var(--foreground-muted))]'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </m.div>
                  );
                })}
              </nav>

              <div className="border-t border-[hsl(var(--border))] py-5">
                <Link
                  href={contactHref}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[hsl(var(--primary-fg))]"
                >
                  {t.header.contactCta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

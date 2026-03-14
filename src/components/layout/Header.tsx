'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projets' },
  { name: 'Compétences', href: '/competences' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">

          {/* ── Logo / Name ── */}
          <Link href="/" className="group flex items-center gap-3">
            {/* Monogram badge */}
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold tracking-tight select-none">
              R
            </span>
            <span className="hidden sm:block text-sm font-semibold tracking-wide">
              Ny Aina Rommy RAMAROMILANTO
              <span className="block text-[11px] font-normal text-muted leading-none">
                Développeur Full Stack
              </span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive
                      ? 'text-primary'
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface'
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop Right actions ── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors duration-200"
            >
              Me contacter
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* ── Mobile burger ── */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              className="p-2 rounded-lg text-foreground-muted hover:bg-surface hover:text-foreground transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-background border-l border-border shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">
                    R
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Ny Aina Rommy Ramaromilanto</p>
                    <p className="text-[11px] text-muted">Full Stack Dev</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-surface text-foreground-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navigation.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground-muted hover:bg-surface hover:text-foreground'
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA bottom */}
              <div className="px-4 pb-8">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
                >
                  Me contacter
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
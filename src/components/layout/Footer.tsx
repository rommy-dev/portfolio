'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight, Heart } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projets' },
  { name: 'Compétences', href: '/competences' },
  { name: 'Contact', href: '/contact' },
];

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/rommy-dev',
    icon: Github,
    label: 'rommy-dev',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/jeandupont',
    icon: Linkedin,
    label: 'Ny Aina Rommy RAMAROMILANTO',
  },
  {
    name: 'Email',
    href: 'mailto:ram.rommynya@gmail.com',
    icon: Mail,
    label: 'ram.rommynya@gmail.com',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* ── Top row ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Brand block */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold select-none">
                R
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">Ny Aina Rommy RAMAROMILANTO</p>
                <p className="text-[11px] text-foreground-muted">Développeur Full Stack</p>
              </div>
            </Link>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-[240px]">
              Passionné par le web moderne, j'aime créer des expériences rapides et soignées.
            </p>
            {/* Status badge */}
            <div className="flex items-center gap-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-xs text-foreground-muted">Disponible pour de nouveaux projets</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-primary transition-colors duration-200 flex items-center gap-1 group w-fit"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 opacity-0 group-hover:opacity-100 text-primary text-xs">
                      →
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Socials */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
              Me retrouver
            </p>
            <ul className="flex flex-col gap-3">
              {socials.map(({ name, href, icon: Icon, label }) => (
                <li key={name}>
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-sm text-foreground-muted hover:text-primary transition-colors duration-200 w-fit"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-background border border-border group-hover:border-primary/40 group-hover:bg-primary-light transition-all duration-200">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground-subtle">
            © {currentYear} Ny Aina Rommy RAMAROMILANTO — Tous droits réservés.
          </p>
          <p className="text-xs text-foreground-subtle flex items-center gap-1">
            Fait avec
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <Heart className="h-3 w-3 fill-accent text-accent" />
            </motion.span>
            en Next.js & Tailwind
          </p>
        </div>

      </div>
    </footer>
  );
}
'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import type { SVGProps } from 'react';

const EMAIL = 'ram.rommynya@gmail.com';

const NAVIGATION = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projets' },
  { name: 'Compétences', href: '/competences' },
  { name: 'Contact', href: '/contact' },
];

function WhatsApp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

const CONTACTS = [
  { href: `mailto:${EMAIL}`, label: 'Email', icon: Mail },
  { href: 'https://wa.me/261341569729', label: 'WhatsApp', icon: WhatsApp },
  { href: 'https://github.com/rommy-dev', label: 'Github', icon: Github },
  {
    href: 'https://www.linkedin.com/in/ny-aina-rommy-ramaromilanto-50509144b',
    label: 'Linkedin',
    icon: Linkedin,
  },
];

const linkClass =
  'text-[0.95rem] text-[hsl(var(--editorial-foreground))] transition-colors duration-200 hover:text-[hsl(var(--editorial-primary))]';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[hsl(var(--editorial-surface))] text-[hsl(var(--editorial-foreground))]">
      <div className="w-full px-6 pt-24 md:px-12 md:pt-32 lg:px-16">
        {/* ── Signature + liens ── */}
        <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:gap-24">
          <div>
            <p className="text-balance text-[clamp(2.25rem,4vw+0.75rem,3.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
              Du code qui travaille en silence.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-6 inline-flex items-center gap-2 break-all text-lg font-light text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-foreground))] md:text-2xl"
            >
              {EMAIL}
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-5 md:w-5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-[2fr_1fr] lg:w-[34rem]">
            <nav aria-label="Pied de page">
              <p className="border-b border-[hsl(var(--editorial-border))] pb-3 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
                Naviguer
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {NAVIGATION.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="border-b border-[hsl(var(--editorial-border))] pb-3 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
                Me joindre
              </p>
              <ul className="mt-6 grid gap-y-3">
                {CONTACTS.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className={`inline-flex items-center gap-2.5 ${linkClass}`}
                    >
                      <Icon className="h-4 w-4 text-[hsl(var(--editorial-primary))]" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Signature géante ── */}
        <svg
          viewBox="0 66 1000 236"
          className="mt-20 block w-full md:mt-28"
          role="img"
          aria-label="Rommy"
        >
          <text
            x="0"
            y="232"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            className="font-sans"
            style={{ fontSize: 300, fontWeight: 600}}
          >
            rommy
          </text>
        </svg>

        {/* ── Bas de page ── */}
        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-[hsl(var(--editorial-border))] py-8 text-sm text-[hsl(var(--editorial-foreground-muted))] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ny Aina Rommy Ramaromilanto. Tous droits réservés.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[13px] transition-colors hover:text-[hsl(var(--editorial-foreground))]"
          >
            Retour en haut
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

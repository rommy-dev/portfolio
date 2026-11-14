'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { WhatsApp } from '@/components/ui/WhatsAppIcon';

const BASE =
  'inline-flex min-h-11 items-center gap-2 border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--editorial-primary))]';
const VARIANTS = {
  primary:
    'border-[hsl(var(--editorial-primary))] bg-[hsl(var(--editorial-primary))] text-[hsl(var(--editorial-primary-fg))] hover:bg-[hsl(var(--editorial-primary-strong))]',
  ghost:
    'border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] text-[hsl(var(--editorial-foreground))] hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]',
};

/*
 * Bouton magnétique : suit la souris de 8 px au plus dans un rayon de 80 px,
 * puis revient par ressort. Désactivé en reduced-motion et sur écran tactile.
 */
export function MagneticLink({
  href,
  children,
  variant = 'ghost',
  external = false,
  arrow = false,
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  external?: boolean;
  arrow?: boolean;
  icon?: 'mail' | 'whatsapp';
}) {
  const content = (
    <>
      {icon === 'mail' && <Mail className="h-4 w-4" />}
      {icon === 'whatsapp' && <WhatsApp className="h-4 w-4" />}
      {children}
      {arrow && <ArrowUpRight className="h-4 w-4" />}
    </>
  );
  const className = `${BASE} ${VARIANTS[variant]}`;
  const isInternal = href.startsWith('/');

  return isInternal ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}

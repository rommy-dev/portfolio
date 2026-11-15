'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';

/*
 * Fondu + légère montée à l'apparition dans le viewport (une seule fois).
 * Petit îlot client : il permet aux sections qui l'utilisent de rester des composants serveur.
 * `id` identifie l'élément : déjà vu une fois (navigation retour), il s'affiche sans rejouer l'animation.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE },
  }),
} as const;

const viewed = new Set<string>();

type Tag = 'div' | 'article' | 'li' | 'p';

export function Reveal({
  id,
  delay = 0,
  as = 'div',
  className,
  children,
}: {
  id: string;
  delay?: number;
  as?: Tag;
  className?: string;
  children: ReactNode;
}) {
  const Component = m[as] as typeof m.div;
  return (
    <Component
      initial={viewed.has(id) ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      custom={delay}
      onViewportEnter={() => {
        viewed.add(id);
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

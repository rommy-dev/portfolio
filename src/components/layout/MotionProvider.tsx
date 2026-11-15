'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

/*
 * Charge seulement les fonctionnalités d'animation courantes (animate, exit, whileInView, hover…)
 * au lieu du bundle complet de framer-motion. Les composants utilisent `m.*` au lieu de `motion.*`
 * (`strict` le vérifie). Les pages qui ont besoin des animations de layout (Compétences)
 * ajoutent leur propre <LazyMotion features={domMax}>.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { DURATION, EASE, REVEAL_Y, STAGGER } from '@/lib/motion';
import { Draft, isPublishable } from '@/lib/draft';
import type { WorkStep } from '@/data/services';

/* Déroulé d'un projet : une ligne se dessine au défilement, les étapes s'allument à leur passage. */
export function WorkProcess({ steps }: { steps: WorkStep[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (steps.length === 0) return null;

  return (
    <ol ref={listRef} className="relative pl-10">
      {/* Rail fixe, puis la ligne qui se dessine (transform uniquement). */}
      <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-[hsl(var(--editorial-border))]" />
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-[hsl(var(--editorial-primary))]"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
      {steps.map((step, i) => (
        <Step key={step.title} index={i} {...step} />
      ))}
    </ol>
  );
}

function Step({ index, title, summary, outcome }: WorkStep & { index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { once: true, margin: '0px 0px -35% 0px' });
  const reduce = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      className="relative pb-10 last:pb-0"
      initial={{ opacity: 0, y: reduce ? 0 : REVEAL_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: DURATION.normal, delay: index * STAGGER, ease: EASE }}
    >
      {/* Pastille : s'allume quand l'étape passe au milieu de l'écran. */}
      <span
        aria-hidden
        className={`absolute -left-10 top-1 flex h-[23px] w-[23px] items-center justify-center border font-mono text-[10px] transition-colors duration-500 ${
          lit
            ? 'border-[hsl(var(--editorial-primary))] bg-[hsl(var(--editorial-primary))] text-[hsl(var(--editorial-primary-fg))]'
            : 'border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground-muted))]'
        }`}
      >
        {index + 1}
      </span>
      <h3
        className={`text-xl font-bold tracking-[-0.03em] transition-colors duration-500 md:text-2xl ${
          lit ? 'text-[hsl(var(--editorial-foreground))]' : 'text-[hsl(var(--editorial-foreground-muted))]'
        }`}
      >
        <span className="sr-only">Étape {index + 1} : </span>
        {title}
      </h3>
      <p className="mt-2 leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
        <Draft text={summary} />
      </p>
      {isPublishable(outcome) && (
        <p className="mt-3 flex gap-3 text-[0.95rem] leading-relaxed">
          <span className="shrink-0 pt-[3px] font-mono text-[11px] text-[hsl(var(--editorial-primary))]">
            Vous obtenez
          </span>
          <span>
            <Draft text={outcome} />
          </span>
        </p>
      )}
    </motion.li>
  );
}

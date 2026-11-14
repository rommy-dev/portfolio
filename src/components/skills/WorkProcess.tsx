'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { DURATION, EASE, REVEAL_Y, STAGGER } from '@/lib/motion';

const CONTAINER = 'mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12';

/* « Comment je travaille » : une ligne se dessine au défilement, les étapes s'allument à leur passage. */
export function WorkProcess({ steps }: { steps: { title: string; summary: string }[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (steps.length === 0) return null;

  return (
    <section aria-labelledby="methode" className="border-t border-[hsl(var(--editorial-border))]">
      <div className={`${CONTAINER} grid gap-8 py-16 md:py-24 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]">
          Méthode
        </p>
        <div className="min-w-0 max-w-3xl">
          <h2 id="methode" className="text-3xl font-black tracking-[-0.05em] md:text-[2.6rem] md:leading-[1.05]">
            Comment je travaille
          </h2>

          <ol ref={listRef} className="relative mt-12 pl-10">
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
        </div>
      </div>
    </section>
  );
}

function Step({ index, title, summary }: { index: number; title: string; summary: string }) {
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
      <p className="mt-2 leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">{summary}</p>
    </motion.li>
  );
}

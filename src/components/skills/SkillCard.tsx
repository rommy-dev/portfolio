'use client';

import Link from 'next/link';
import { forwardRef, useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { DURATION, EASE, REVEAL_Y } from '@/lib/motion';
import type { LevelInfo, ResolvedSkill } from './types';
import { LevelBadge } from './LevelBadge';

const MAX_TILT = 6;

type Props = {
  skill: ResolvedSkill;
  level: LevelInfo;
  index: number;
  expanded: boolean;
  onOpen: () => void;
};

/*
 * Carte compétence : halo qui suit la souris (--mx / --my), inclinaison 3D légère
 * (6° max, ressort), projets liés révélés au survol ou au focus. Un bouton couvre
 * la carte (clavier : Entrée / Espace) et ouvre le panneau de détail.
 */
export const SkillCard = forwardRef<HTMLButtonElement, Props>(function SkillCard(
  { skill, level, index, expanded, onOpen },
  buttonRef,
) {
  const reduce = useReducedMotion();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 26 });
  const sry = useSpring(ry, { stiffness: 260, damping: 26 });

  useEffect(() => {
    setCanTilt(!reduce && window.matchMedia('(pointer: fine)').matches);
  }, [reduce]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (!canTilt) return;
    ry.set((px - 0.5) * 2 * MAX_TILT);
    rx.set((0.5 - py) * 2 * MAX_TILT);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.li
      layout={reduce ? false : 'position'}
      initial={{ opacity: 0, y: reduce ? 0 : REVEAL_Y }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: DURATION.short } }}
      transition={{ duration: DURATION.normal, ease: EASE, delay: Math.min(index, 8) * 0.06 }}
      className="list-none"
    >
      <motion.div
        layoutId={reduce ? undefined : `skill-${skill.id}`}
        className="h-full [perspective:900px]"
        onPointerLeave={onLeave}
      >
        <motion.div
          ref={surfaceRef}
          onPointerMove={onMove}
          style={canTilt ? { rotateX: srx, rotateY: sry } : undefined}
          className={`group relative flex h-full flex-col overflow-hidden border bg-[hsl(var(--editorial-surface))] p-5 transition-colors duration-300 border-[hsl(var(--editorial-border))] hover:border-[hsl(var(--editorial-foreground-muted)/0.6)]`}
        >
          {/* Halo qui suit la souris. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,149,111,0.14),transparent_65%)]"
          />

          {/* Toute la carte est un bouton ; les liens projets passent au-dessus. */}
          <button
            ref={buttonRef}
            type="button"
            onClick={onOpen}
            aria-expanded={expanded}
            aria-haspopup="dialog"
            aria-label={`${skill.name}, niveau ${level.label} : voir le détail`}
            data-cursor="Voir"
            className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[hsl(var(--editorial-primary))]"
          />

          <div className="pointer-events-none relative flex flex-1 flex-col">
            <LevelBadge level={level} />
            <h4 className="mt-4 text-xl font-black tracking-[-0.04em] text-[hsl(var(--editorial-foreground))]">
              {skill.name}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
              {skill.summary}
            </p>
          </div>

          {/* Projets liés : visibles au survol ou au focus (toujours visibles sur tactile). */}
          <div className="relative z-10 mt-5 min-h-[2.25rem] transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100">
            {skill.evidence.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5" aria-label={`Projets liés à ${skill.name}`}>
                {skill.evidence.map((e) => (
                  <li key={`${e.slug}-${e.label}`}>
                    <Link
                      href={e.href}
                      data-cursor="Ouvrir"
                      className="inline-flex min-h-9 [@media(pointer:coarse)]:min-h-11 items-center gap-1 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-bg))] px-2.5 py-1 font-mono text-[11px] text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--editorial-primary))]"
                    >
                      {e.title}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-[11px] text-[hsl(var(--editorial-foreground-muted))]">
                Pas encore de projet livré.
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.li>
  );
});

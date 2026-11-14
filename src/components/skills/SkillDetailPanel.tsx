'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { DURATION, EASE } from '@/lib/motion';
import type { LevelInfo, ResolvedSkill } from './types';
import { LevelBadge } from './LevelBadge';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/*
 * Panneau de détail d'une compétence (chargé en lazy). Transition d'élément partagé
 * depuis la carte (layoutId), focus piégé, Échap ou clic extérieur pour fermer.
 * Sur mobile, il s'ouvre en bas de l'écran.
 */
export default function SkillDetailPanel({
  skill,
  level,
  domainLabel,
  onClose,
}: {
  skill: ResolvedSkill;
  level: LevelInfo;
  domainLabel: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center md:items-center md:p-6">
      <motion.div
        aria-hidden
        data-cursor="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-[hsl(var(--editorial-bg)/0.8)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION.short }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`skill-title-${skill.id}`}
        layoutId={reduce ? undefined : `skill-${skill.id}`}
        initial={reduce ? { opacity: 0 } : undefined}
        animate={reduce ? { opacity: 1 } : undefined}
        exit={reduce ? { opacity: 0 } : undefined}
        transition={{ duration: DURATION.normal, ease: EASE }}
        className="relative max-h-[85vh] w-full overflow-y-auto border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] p-6 md:max-w-2xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--editorial-primary))]">
              {domainLabel}
            </p>
            <h2
              id={`skill-title-${skill.id}`}
              className="mt-2 text-3xl font-black tracking-[-0.05em] md:text-4xl"
            >
              {skill.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer le détail"
            data-cursor="Fermer"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-[hsl(var(--editorial-border))] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--editorial-primary))]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-5 text-lg font-light leading-relaxed text-[hsl(var(--editorial-foreground))]">
          {skill.summary}
        </p>

        <div className="mt-6 border-l-2 border-[hsl(var(--editorial-primary))] pl-4">
          <LevelBadge level={level} />
          <p className="mt-1 text-sm text-[hsl(var(--editorial-foreground-muted))]">{level.definition}</p>
        </div>

        <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]">
          Ce que j&apos;ai construit avec
        </h3>
        {skill.evidence.length > 0 ? (
          <ul className="mt-3 border-t border-[hsl(var(--editorial-border))]">
            {skill.evidence.map((e) => (
              <li
                key={`${e.slug}-${e.label}`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--editorial-border))] py-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold">{e.label}</p>
                  <p className="text-sm text-[hsl(var(--editorial-foreground-muted))]">
                    {e.title}
                    {e.isStage ? ' · stage, code confidentiel' : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={e.href}
                    data-cursor="Ouvrir"
                    className="inline-flex min-h-11 items-center gap-1.5 border border-[hsl(var(--editorial-border))] px-3 text-sm transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--editorial-primary))]"
                  >
                    Étude de cas <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  {e.codeHref && (
                    <a
                      href={e.codeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Ouvrir"
                      className="inline-flex min-h-11 items-center gap-1.5 border border-[hsl(var(--editorial-border))] px-3 text-sm transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--editorial-primary))]"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-[hsl(var(--editorial-foreground-muted))]">
            Pas encore de projet livré avec cette compétence.
          </p>
        )}

      </motion.div>
    </div>
  );
}

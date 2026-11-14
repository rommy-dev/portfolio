'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import type { DomainId } from '@/data/skills';
import type { DomainInfo, LevelInfo, ResolvedSkill } from './types';
import { SkillCard } from './SkillCard';
import { LevelBadge } from './LevelBadge';

/* Panneau de détail chargé seulement à la première ouverture. */
const SkillDetailPanel = dynamic(() => import('./SkillDetailPanel'), { ssr: false });

const CONTAINER = 'mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12';
const LABEL =
  'font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]';
type Props = {
  skills: ResolvedSkill[];
  domains: DomainInfo[];
  levels: LevelInfo[];
};

export function SkillsBoard({ skills, domains, levels }: Props) {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [visibleDomain, setVisibleDomain] = useState<DomainId>(domains[0].id);
  const cardButtons = useRef(new Map<string, HTMLButtonElement>());
  const sectionRefs = useRef(new Map<DomainId, HTMLElement>());

  const levelById = useMemo(() => new Map(levels.map((l) => [l.id, l])), [levels]);
  const domainById = useMemo(() => new Map(domains.map((d) => [d.id, d])), [domains]);

  const groups = domains
    .map((d) => ({ ...d, items: skills.filter((s) => s.domain === d.id) }))
    .filter((g) => g.items.length > 0);

  /* ── Scroll spy de la barre de domaines ──
     L'observateur se déclenche dès qu'une section change de visibilité ; on retient
     alors la dernière section dont le haut a passé 35 % de l'écran (robuste aux sauts). */
  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.35;
      let current: DomainId | null = null;
      sectionRefs.current.forEach((el, id) => {
        if (el.getBoundingClientRect().top <= line) current = id;
      });
      const first = sectionRefs.current.keys().next().value;
      const next = current ?? first;
      if (next) setVisibleDomain(next);
    };
    const observer = new IntersectionObserver(pick, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups.length]);

  const scrollToDomain = (id: DomainId) => {
    const el = sectionRefs.current.get(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setVisibleDomain(id);
  };

  const openSkill = openId ? skills.find((s) => s.id === openId) : null;
  const closePanel = useCallback(() => {
    const id = openId;
    setOpenId(null);
    // Retour du focus à la carte d'origine.
    if (id) requestAnimationFrame(() => cardButtons.current.get(id)?.focus());
  }, [openId]);

  return (
    <LayoutGroup>
      {/* ── Compétences ── */}
      <section aria-labelledby="competences-liste">
        <div className={`${CONTAINER}`}>
          <div className="w-full">
            <div className="min-w-0">
              <h2
                id="competences-liste"
                className="text-3xl font-black tracking-[-0.05em] md:text-[2.6rem] md:leading-[1.05]"
              >
                Par domaine, avec leurs preuves
              </h2>

              {/* Définition des niveaux, toujours visible. */}
              <dl className="mt-8 grid gap-x-8 border-t border-[hsl(var(--editorial-border))] sm:grid-cols-3">
                {levels.map((l) => (
                  <div key={l.id} className="border-b border-[hsl(var(--editorial-border))] py-4">
                    <dt>
                      <LevelBadge level={l} />
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
                      {l.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Barre de domaines collante, avec scroll spy. */}
        {groups.length > 1 && (
          <nav
            aria-label="Domaines"
            className="sticky top-14 z-30 mt-10 border-y border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-bg)/0.85)] backdrop-blur-md md:top-16"
          >
            <ul className={`${CONTAINER} flex gap-1 overflow-x-auto [scrollbar-width:none]`}>
              {groups.map((g) => (
                <li key={g.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollToDomain(g.id)}
                    aria-current={visibleDomain === g.id ? 'true' : undefined}
                    className={`relative flex min-h-12 cursor-pointer items-center px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[hsl(var(--editorial-primary))] ${
                      visibleDomain === g.id
                        ? 'text-[hsl(var(--editorial-foreground))]'
                        : 'text-[hsl(var(--editorial-foreground-muted))] hover:text-[hsl(var(--editorial-foreground))]'
                    }`}
                  >
                    {g.label}
                    <span className="ml-1.5 font-mono text-[10px] opacity-60">{g.items.length}</span>
                    {visibleDomain === g.id && (
                      <motion.span
                        layoutId="domain-indicator"
                        aria-hidden
                        className="absolute inset-x-3 bottom-0 h-0.5 bg-[hsl(var(--editorial-primary))]"
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className={`${CONTAINER} pb-16 md:pb-24`}>
          {groups.map((g, gi) => (
            <section
              key={g.id}
              ref={(el) => {
                if (el) sectionRefs.current.set(g.id, el);
                else sectionRefs.current.delete(g.id);
              }}
              data-domain={g.id}
              aria-labelledby={`domaine-${g.id}`}
              className="scroll-mt-32 pt-14 md:scroll-mt-36"
            >
              <h3 id={`domaine-${g.id}`} className="flex items-baseline gap-3 text-2xl font-black tracking-[-0.04em] md:text-3xl">
                <span className="font-mono text-xs font-normal text-[hsl(var(--editorial-primary))]">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                {g.label}
              </h3>
              <motion.ul layout={!reduce} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {g.items.map((skill, i) => (
                    <SkillCard
                      key={skill.id}
                      ref={(el) => {
                        if (el) cardButtons.current.set(skill.id, el);
                        else cardButtons.current.delete(skill.id);
                      }}
                      skill={skill}
                      level={levelById.get(skill.level)!}
                      index={i}
                      expanded={openId === skill.id}
                      onOpen={() => setOpenId(skill.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.ul>
            </section>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {openSkill && (
          <SkillDetailPanel
            key={openSkill.id}
            skill={openSkill}
            level={levelById.get(openSkill.level)!}
            domainLabel={domainById.get(openSkill.domain)?.label ?? ''}
            onClose={closePanel}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

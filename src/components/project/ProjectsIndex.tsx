'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectSummary } from '@/lib/projects';
import { ACCESS_LABELS, CONTEXT_LABELS } from '@/lib/project-labels';
import { FadeIn, RevealTitle } from './EditorialMotion';

const EASE = [0.22, 1, 0.36, 1] as const;

const FILTERS: { id: string; label: string; test: (p: ProjectSummary) => boolean }[] = [
  { id: 'tous', label: 'Tous', test: () => true },
  { id: 'demo', label: 'Démo en ligne', test: (p) => Boolean(p.demoUrl) && p.access === 'demo+code' },
  { id: 'code', label: 'Code public', test: (p) => Boolean(p.githubUrl) },
  { id: 'stage', label: 'Stage', test: (p) => p.context === 'stage' },
];

const MUTED = 'text-[hsl(var(--editorial-foreground-muted))]';
const ACCENT = 'text-[hsl(var(--editorial-primary))]';
const LINE = 'border-[hsl(var(--editorial-border))]';
const CONTAINER = 'mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12';

const pad = (n: number) => String(n).padStart(2, '0');

/* En-tête, filtres et liste des projets, sur le modèle d'un index d'articles éditorial. */
export function ProjectsIndex({ projects }: { projects: ProjectSummary[] }) {
  const [filterId, setFilterId] = useState('tous');
  const filter = FILTERS.find((f) => f.id === filterId) ?? FILTERS[0];
  const visible = projects.filter(filter.test);

  return (
    <>
      {/* ── En-tête ── */}
      <header className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.09),transparent_45%),radial-gradient(ellipse_at_10%_10%,rgba(255,149,111,0.08),transparent_40%)]"
        />
        <div className={`${CONTAINER} pb-12 pt-16 md:pb-16 md:pt-28`}>
          <RevealTitle
            text="Projets"
            className="text-[clamp(3rem,6vw+1rem,6rem)] font-black leading-[0.95] tracking-[-0.05em]"
          />
          <FadeIn onMount delay={0.3}>
            <p className={`mt-6 max-w-xl text-lg font-light leading-relaxed md:text-xl ${MUTED}`}>
              Des études de cas qui partent d&apos;un problème, montrent la solution et disent ce qui
              est vérifiable : démo, code, tests, ou ce qui reste confidentiel.
            </p>
          </FadeIn>

          <FadeIn onMount delay={0.45}>
            <div role="group" aria-label="Filtrer les projets" className="mt-10 flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const count = projects.filter(f.test).length;
                if (count === 0) return null;
                const active = f.id === filterId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilterId(f.id)}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                      active
                        ? 'border-[hsl(var(--editorial-foreground))] bg-[hsl(var(--editorial-foreground))] text-[hsl(var(--editorial-bg))]'
                        : `${LINE} ${MUTED} hover:border-[hsl(var(--editorial-foreground-muted))] hover:text-[hsl(var(--editorial-foreground))]`
                    }`}
                  >
                    {f.label}
                    <span className="font-mono text-[10px] opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={filterId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* ── Projets, tous au même niveau ── */}
          {visible.length > 0 && (
            <ol className={`border-t ${LINE}`}>
              {visible.map((project, i) => (
                <li key={project.slug} className={`border-b ${LINE}`}>
                  <Link
                    href={`/projets/${project.slug}`}
                    className="group block transition-colors hover:bg-[hsl(var(--editorial-surface))]"
                  >
                    <div className={`${CONTAINER} grid gap-5 py-9 md:grid-cols-[9rem_minmax(0,1fr)_16rem] md:items-start md:gap-8 md:py-11 lg:grid-cols-[12rem_minmax(0,1fr)_20rem]`}>
                      <p className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.14em] md:pt-2">
                        <span className={ACCENT}>{pad(i + 1)}</span>
                        <span className={ACCENT}>{CONTEXT_LABELS[project.context] ?? project.context}</span>
                      </p>
                      <div className="min-w-0">
                        <h3 className="flex items-start gap-3 text-2xl font-black tracking-[-0.04em] transition-colors group-hover:text-[hsl(var(--editorial-primary))] md:text-[2rem] md:leading-tight">
                          {project.title}
                          <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                        </h3>
                        <p className={`mt-2 max-w-2xl leading-relaxed ${MUTED}`}>{project.description}</p>
                        <p className={`mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] ${MUTED}`}>
                          <span>{project.year}</span>
                          <span>{ACCESS_LABELS[project.access]}</span>
                          <span>{project.category}</span>
                        </p>
                      </div>
                      {project.cover && (
                        <div className={`overflow-hidden border ${LINE} bg-[hsl(var(--editorial-surface))]`}>
                          <Image
                            src={project.cover}
                            alt={project.screenshots.find((s) => s.src === project.cover)?.alt ?? project.title}
                            width={800}
                            height={500}
                            sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, 100vw"
                            loading={i === 0 ? 'eager' : undefined}
                            className="aspect-[16/10] w-full object-cover object-top grayscale transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

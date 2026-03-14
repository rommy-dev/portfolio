'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ArrowUpRight } from 'lucide-react';
import { ALL_PROJECTS } from '@/data/projects';

/* ─── Helpers ────────────────────────────────────────────── */
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Section ────────────────────────────────────────────── */
export function FeaturedProjects() {
  const projects = ALL_PROJECTS.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <motion.div {...inView(0)} className="mb-14 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
            01 — Réalisations
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Projets en vedette
              </h2>
              <p className="mt-2 text-foreground-muted max-w-lg">
                Une sélection de mes travaux récents — du gouvernemental au personnel.
              </p>
            </div>
            <Link href="/projets" className="shrink-0">
              <Button variant="outline" size="sm" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>
                Tous les projets
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} index={i} slug={project.slug} />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          {...inView(0.4)}
          className="mt-12 flex justify-center"
        >
          <Link href="/projets">
            <Button size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
              Voir tous mes projets
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

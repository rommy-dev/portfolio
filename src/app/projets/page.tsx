'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ArrowUpRight, Search, SearchX } from 'lucide-react';
import { ALL_PROJECTS, CATEGORIES } from '@/data/projects';

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE },
  }),
} as const;
const viewed = new Set<string>();
const inView = (key: string, delay = 0) => ({
  initial: viewed.has(key) ? false : 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
  variants: fadeUp,
  custom: delay,
  onViewportEnter: () => {
    viewed.add(key);
  },
});

/* ─── Page ───────────────────────────────────────────────── */
export default function ProjetsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = ALL_PROJECTS.filter((p) => {
    const matchCat = activeCategory === 'Tous' || p.category === activeCategory;
    const matchSearch =
      normalizedSearch === '' ||
      p.title.toLowerCase().includes(normalizedSearch) ||
      p.description.toLowerCase().includes(normalizedSearch) ||
      p.tech.some((t) => t.toLowerCase().includes(normalizedSearch));
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero header ── */}
      <section className="relative pt-2 md:pt-32 pb-16 overflow-hidden">
        {/* Background blobs */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/8 blur-[80px]" />
          <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-secondary/8 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...inView('projects-hero-label', 0)} className="flex flex-col gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
              Réalisations
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div {...inView('projects-hero-title', 0.06)}>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Tous mes projets
              </h1>
              <p className="mt-3 text-foreground-muted max-w-lg">
                {ALL_PROJECTS.length} projets — du gouvernemental au personnel.
                Chaque réalisation raconte une solution à un problème concret.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div {...inView('projects-hero-stats', 0.1)} className="flex items-center gap-6 shrink-0">
              {[
                { value: ALL_PROJECTS.length,                    label: 'projets' },
                { value: ALL_PROJECTS.filter(p => !p.private).length, label: 'open source' },
                { value: [...new Set(ALL_PROJECTS.flatMap(p => p.tech))].length, label: 'technos' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-primary">{value}</p>
                  <p className="text-xs text-foreground-subtle">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          {/* Category tabs */}
          <div className="flex items-start sm:items-center gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg hover:cursor-pointer hover:opacity-50 transition-all duration-200
                  ${activeCategory === cat
                    ? 'text-primary'
                    : 'text-foreground-muted hover:text-foreground hover:bg-surface'}`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground-subtle" />
            <input
              type="text"
              placeholder="Rechercher un projet ou une techno…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-72 rounded-lg border border-border bg-surface pl-9 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {filtered.length > 0 ? (
          <div
            key={activeCategory + search}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={`${project.featured ? 'md:col-span-2 lg:col-span-1' : ''} h-full`}
              >
                <ProjectCard project={project} index={i} slug={project.slug} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-3 text-center"
          >
            <span className="text-4xl"><SearchX size={64} /></span>
            <p className="text-foreground font-semibold">Aucun résultat</p>
            <p className="text-sm text-foreground-muted">
              Essayez un autre filtre ou un autre mot-clé.
            </p>
            <button
              onClick={() => { setActiveCategory('Tous'); setSearch(''); }}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <motion.p
            key="results-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center text-xs text-foreground-subtle"
          >
            {filtered.length} projet{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
          </motion.p>
        )}
      </section>

      {/* ── CTA Banner ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div aria-hidden className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative flex flex-col gap-1">
            <p className="text-lg font-bold text-foreground">Vous avez un projet en tête ?</p>
            <p className="text-sm text-foreground-muted max-w-md">
              Je suis disponible pour de nouvelles missions. Parlons-en.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-1.5 rounded-lg bg-primary text-white text-sm font-semibold px-5 py-3 hover:bg-primary-hover transition-colors shrink-0"
          >
            Me contacter <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}

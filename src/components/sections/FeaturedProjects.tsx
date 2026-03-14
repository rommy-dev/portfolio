'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Github, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'État Civil — Actes de naissance',
    description:
      'Application gouvernementale de saisie rétroactive des actes d\'état civil pour le Ministère de l\'Intérieur malgache. Gestion sécurisée de données sensibles avec authentification par rôles.',
    tech: ['Symfony 7', 'API Platform', 'React', 'TypeScript', 'MySQL'],
    category: 'Fullstack',
    year: '2026',
    status: 'En cours',
    statusColor: 'text-accent bg-accent/10 border-accent/20',
    gradient: 'from-primary/20 via-primary/10 to-secondary/10',
    accentColor: 'text-primary',
    githubUrl: null, // projet privé
    demoUrl: null,
    private: true,
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description:
      'Plateforme e-commerce complète : catalogue produits, panier persistant, paiement Stripe et interface d\'administration.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'MySQL', 'Prisma'],
    category: 'Fullstack',
    year: '2025',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-secondary/20 via-secondary/10 to-primary/10',
    accentColor: 'text-secondary',
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
    private: false,
    featured: false,
  },
  {
    id: 3,
    title: 'Task Manager Temps Réel',
    description:
      'App de gestion de tâches collaborative avec drag & drop, mises à jour temps réel via WebSocket et espaces de travail partagés.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    category: 'Fullstack',
    year: '2024',
    status: 'Livré',
    statusColor: 'text-success bg-success/10 border-success/20',
    gradient: 'from-accent/15 via-accent/5 to-primary/10',
    accentColor: 'text-accent',
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
    private: false,
    featured: false,
  },
];

/* ─── Helpers ────────────────────────────────────────────── */
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Tech pill color map ────────────────────────────────── */
const TECH_COLORS: Record<string, string> = {
  'React':       'bg-sky-500/10 text-sky-500 border-sky-500/20',
  'Next.js':     'bg-foreground/8 text-foreground border-border',
  'TypeScript':  'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Node.js':     'bg-green-500/10 text-green-500 border-green-500/20',
  'MySQL':  'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'Symfony 7':   'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'API Platform':'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'Stripe':      'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'MongoDB':     'bg-green-600/10 text-green-600 border-green-600/20',
  'Socket.io':   'bg-gray-500/10 text-foreground-muted border-border',
  'Prisma':      'bg-teal-500/10 text-teal-500 border-teal-500/20',
  'Framer Motion':'bg-pink-500/10 text-pink-500 border-pink-500/20',
};
const techColor = (t: string) =>
  TECH_COLORS[t] ?? 'bg-surface text-foreground-muted border-border';

/* ─── Card ───────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const isFeatured = project.featured;

  return (
    <motion.article
      {...inView(0.1 + index * 0.09)}
      className={`group relative flex flex-col rounded-2xl border border-border bg-surface overflow-hidden
        hover:border-primary/30 hover:shadow-primary-md transition-all duration-300 h-full
        ${isFeatured ? 'lg:col-span-2' : ''}`}
    >
      {/* ── Gradient header ── */}
      <div
        className={`relative h-36 bg-gradient-to-br ${project.gradient} flex items-end p-5 overflow-hidden`}
      >
        {/* Grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top-right badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {project.private && (
            <span className="flex items-center gap-1 rounded-full bg-background/70 backdrop-blur-sm border border-border px-2.5 py-1 text-[10px] font-semibold text-foreground-muted">
              <Lock className="h-2.5 w-2.5" /> Privé
            </span>
          )}
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${project.statusColor}`}>
            {project.status}
          </span>
        </div>

        {/* Year */}
        <span className="relative font-mono text-xs text-foreground-subtle bg-background/60 backdrop-blur-sm border border-border px-2 py-0.5 rounded">
          {project.year}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={`text-[11px] font-bold uppercase tracking-wider ${project.accentColor}`}>
              {project.category}
            </span>
            <h3 className="mt-0.5 text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
              {project.title}
            </h3>
          </div>
          {/* Arrow icon appears on hover */}
          <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground-subtle opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`text-[11px] font-semibold border rounded-md px-2 py-0.5 ${techColor(t)}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-1 border-t border-border">
          {project.private ? (
            <span className="flex items-center gap-1.5 text-xs text-foreground-subtle">
              <Lock className="h-3 w-3" />
              Code source confidentiel
            </span>
          ) : (
            <>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-background border border-border group-hover/link:border-primary/40 transition-colors">
                    <Github className="h-3 w-3" />
                  </span>
                  Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1.5 text-sm text-foreground-muted hover:text-primary transition-colors"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-background border border-border group-hover/link:border-primary/40 transition-colors">
                    <ExternalLink className="h-3 w-3" />
                  </span>
                  Démo live
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export function FeaturedProjects() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <motion.div {...inView(0)} className="mb-14 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
            02 — Réalisations
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
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} index={i} />
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
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ProjectCard, type Project } from '@/components/ui/ProjectCard';
import { ArrowUpRight } from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */
const PROJECTS: Project[] = [
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

/* ─── Section ────────────────────────────────────────────── */
export function FeaturedProjects() {
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
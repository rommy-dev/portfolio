'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard,
  Server,
  Layers,
  Gauge,
  ShieldCheck,
  Smartphone,
  ArrowUpRight,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Layers,
    title: 'Application Web Fullstack',
    tagline: 'De zéro à la production.',
    description:
      'Conception et développement complet d\'une application web : architecture, base de données, API, interface et déploiement. Un seul interlocuteur, du cahier des charges à la mise en ligne.',
    techs: ['Next.js', 'Symfony', 'PostgreSQL', 'Docker'],
    accent: 'text-primary',
    bg: 'bg-primary/10',
    border: 'hover:border-primary/40',
    shadow: 'hover:shadow-primary-sm',
    featured: true,
  },
  {
    icon: LayoutDashboard,
    title: 'Développement Frontend',
    tagline: 'Des interfaces qui marquent.',
    description:
      'Intégration pixel-perfect de maquettes Figma, composants React réutilisables, animations soignées et optimisation des performances côté client.',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    accent: 'text-sky-500',
    bg: 'bg-sky-500/10',
    border: 'hover:border-sky-500/40',
    shadow: 'hover:shadow-sm',
    featured: false,
  },
  {
    icon: Server,
    title: 'Développement Backend & API',
    tagline: 'La colonne vertébrale de votre app.',
    description:
      'Création d\'APIs REST sécurisées, gestion de l\'authentification, modélisation de base de données et architecture serveur robuste prête pour la montée en charge.',
    techs: ['Symfony 7', 'API Platform', 'Node.js', 'JWT'],
    accent: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'hover:border-violet-500/40',
    shadow: 'hover:shadow-sm',
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: 'Application Métier sur mesure',
    tagline: 'Votre process, numérisé.',
    description:
      'Développement d\'outils internes adaptés à vos besoins spécifiques : formulaires complexes, gestion de workflows, tableaux de bord et rapports. Expérience terrain au Ministère de l\'Intérieur.',
    techs: ['React', 'Symfony', 'PostgreSQL', 'API REST'],
    accent: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'hover:border-emerald-500/40',
    shadow: 'hover:shadow-sm',
    featured: false,
  },
  {
    icon: Gauge,
    title: 'Optimisation des Performances',
    tagline: 'Rapide, fluide, mieux classé.',
    description:
      'Audit et amélioration du score Lighthouse, optimisation des images et bundles, mise en place du cache, amélioration du Core Web Vitals et du référencement technique (SEO).',
    techs: ['Next.js', 'Lighthouse', 'Web Vitals', 'SEO'],
    accent: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'hover:border-amber-500/40',
    shadow: 'hover:shadow-sm',
    featured: false,
  },
  {
    icon: Smartphone,
    title: 'Site Vitrine & Landing Page',
    tagline: 'Votre présence en ligne, soignée.',
    description:
      'Design et développement de sites vitrines ou landing pages rapides, responsives et optimisés pour la conversion. Déployés sur Vercel en quelques jours.',
    techs: ['Next.js', 'Tailwind CSS', 'Vercel', 'MDX'],
    accent: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'hover:border-rose-500/40',
    shadow: 'hover:shadow-sm',
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

/* ─── Component ─────────────────────────────────────────── */
export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <motion.div {...inView(0)} className="mb-14 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
            03 — Services
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Ce que je peux faire pour vous
              </h2>
              <p className="mt-2 text-foreground-muted max-w-xl">
                Du frontend au déploiement — je couvre l'ensemble du cycle de développement
                avec rigueur et attention au détail.
              </p>
            </div>
            <Link href="/contact" className="shrink-0">
              <Button size="sm" iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}>
                Discutons de votre projet
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ── Services grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                {...inView(0.08 + i * 0.07)}
                className={`group relative flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 hover:-translate-y-1
                  ${service.border} ${service.shadow} transition-all duration-300
                  ${service.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Featured badge */}
                {service.featured && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    ✦ Populaire
                  </span>
                )}

                {/* Icon */}
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${service.bg} ${service.accent} border border-current/20`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${service.accent}`}>
                    {service.tagline}
                  </p>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed mt-1">
                    {service.description}
                  </p>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
                  {service.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-background border border-border text-foreground-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA banner ── */}
        <motion.div
          {...inView(0.5)}
          className="mt-12 relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          {/* Blur decoration */}
          <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div aria-hidden className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-1">
            <p className="text-lg font-bold text-foreground">
              Vous avez un projet en tête ?
            </p>
            <p className="text-sm text-foreground-muted max-w-md">
              Que ce soit une idée vague ou un cahier des charges précis, je serais ravi
              d'en discuter et d'évaluer comment je peux vous aider.
            </p>
          </div>

          <div className="relative flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
                Me contacter
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
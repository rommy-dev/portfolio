'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  GraduationCap,
  Briefcase,
  Heart,
  Music,
  Gamepad2,
  BicepsFlexed,
  Plane,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

/* ─── Timeline ────────────────────────────────────────────
   Ne pas répéter les stats du Hero (3+ ans, 20+ projets…)
   Raconter le parcours humain à la place.
────────────────────────────────────────────────────────── */
const TIMELINE = [
  {
    year: '2022 — 2025',
    icon: GraduationCap,
    title: 'Licence — Électronique & Informatique Appliquée',
    place: 'École Supérieure Polytechnique d\'Antananarivo',
    description: 'Formation pluridisciplinaire couvrant l\'électronique, les systèmes embarqués et le développement logiciel appliqué.',
    color: 'text-secondary border-secondary/30 bg-secondary/10',
  },
  {
    year: 'Jan. 2026 — Présent',
    icon: Briefcase,
    title: 'Stagiaire Développeur Web — Ministère de l\'Intérieur et de la Décentralisation',
    place: 'Antananarivo',
    description: 'Conception d\'une application de saisie rétroactive des actes d\'état civil (naissances). Backend Symfony 7 + API Platform, frontend React/TypeScript, APIs REST sécurisées pour données sensibles, modélisation base de données et analyse fonctionnelle.',
    color: 'text-accent border-accent/30 bg-accent/10',
  },
];

/* ─── Valeurs / façon de travailler ─────────────────────── */
const VALUES = [
  { label: 'Code propre avant tout',       desc: 'Lisible, typé, testé.' },
  { label: 'UX-first',                     desc: 'L\'interface doit être évidente.' },
  { label: 'Livraisons itératives',        desc: 'Petit, souvent, solide.' },
  { label: 'Documentation claire',         desc: 'Le futur toi te remerciera.' },
];

/* ─── Centres d'intérêt ──────────────────────────────────── */
const INTERESTS = [
  { icon: Music,    label: 'Musique' },
  { icon: Gamepad2, label: 'Jeux vidéo' },
  { icon: BicepsFlexed, label: 'Basketball' },
  { icon: Plane,    label: 'Voyages' },
];

/* ─── Animation helper ───────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE },
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

/* ─── Component ─────────────────────────────────────────── */
export function AboutSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-6xl px-6">

        {/* ── Section header ── */}
        <motion.div {...inView('about-header', 0)} className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
            04 — À propos
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Le dev derrière le code
          </h2>
          <p className="text-foreground-muted max-w-xl leading-relaxed">
            Pas juste un cursus et une liste de technos — voici qui je suis vraiment, 
            comment je travaille et ce qui me fait avancer.
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* ── Left : Timeline ── */}
          <div>
            <motion.p {...inView('about-parcours', 0.05)} className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mb-6">
              Parcours
            </motion.p>

            <div className="relative flex flex-col gap-0">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-4 bottom-4 w-px bg-border" aria-hidden />

              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    {...inView(`about-timeline-${i}`, 0.1 + i * 0.08)}
                    className="relative flex gap-5 pb-8 last:pb-0 group"
                  >
                    {/* Icon dot */}
                    <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-4 w-4 transition-transform duration-200" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold font-mono text-foreground-subtle bg-background border border-border rounded px-1.5 py-0.5">
                          {item.year}
                        </span>
                        <span className="text-[11px] text-foreground-subtle">{item.place}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-foreground-muted leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right : Values + Interests ── */}
          <div className="flex flex-col gap-10">

            {/* Ma façon de travailler */}
            <motion.div {...inView('about-workstyle', 0.15)}>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mb-5">
                Ma façon de travailler
              </p>
              <div className="flex flex-col gap-3">
                {VALUES.map(({ label, desc }, i) => (
                  <motion.div
                    key={label}
                    {...inView(`about-value-${label}`, 0.2 + i * 0.06)}
                    className="group flex items-start gap-3 rounded-xl bg-background border border-border px-4 py-3 hover:border-primary/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-foreground-muted">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Citation perso */}
            <motion.blockquote
              {...inView('about-quote', 0.35)}
              className="relative rounded-xl border border-border bg-background px-6 py-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform duration-200"
            >
              {/* Accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-linear-to-b from-primary to-secondary" />
              <p className="text-sm text-foreground-muted leading-relaxed italic">
                {"Le meilleur code n'est pas celui qui impressionne — c'est celui que \
                ton équipe comprend à 2h du matin quand le prod tombe."}
              </p>
              <footer className="mt-3 text-xs font-semibold text-foreground-subtle">
                — Ny Aina Rommy Ramaromilanto
              </footer>
            </motion.blockquote>

            {/* En dehors du clavier */}
            <motion.div {...inView('about-offline', 0.42)}>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-3.5 w-3.5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
                  En dehors du clavier
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    {...inView(`about-interest-${label}`, 0.45 + i * 0.05)}
                    className="flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-3 hover:shadow-lg transition-all duration-200 group"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-border group-hover:scale-110 group-hover:rotate-15 transition-transform duration-200">
                      <Icon className="h-3.5 w-3.5 text-foreground-muted group-hover:text-accent transition-colors" />
                    </span>
                    <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors font-medium">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          {...inView('about-cta', 0.5)}
          className="mt-16 relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          {/* Blur decoration */}
          <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div aria-hidden className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-1">
            <p className="text-lg font-bold text-foreground">
              Prêt à collaborer sur votre prochain projet ?
            </p>
            <p className="text-sm text-foreground-muted max-w-md">
              Que vous soyez une entreprise en recherche de talent ou un client avec une idée précise, 
              je serais ravi d&apos;échanger sur vos besoins et comment je peux y répondre.
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

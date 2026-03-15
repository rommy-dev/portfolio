'use client';

import { motion } from 'framer-motion';
import { 
  Atom, 
  Globe, 
  ArrowUp, 
  Code2, 
  Palette, 
  Sparkles, 
  Server, 
  Shield, 
  Zap, 
  Plug, 
  Database, 
  Book, 
  Github, 
  Coffee, 
  Container, 
  Terminal, 
  FileCode 
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'Frontend',
    number: '01',
    description: 'Interfaces modernes, rapides et accessibles.',
    color: 'text-sky-500',
    borderHover: 'hover:border-sky-500/40',
    bgAccent: 'bg-sky-500/10',
    techs: [
      { name: 'React',         icon: Atom },
      { name: 'Vue.js',        icon: Globe },
      { name: 'Next.js',       icon: ArrowUp },
      { name: 'TypeScript',    icon: Code2 },
      { name: 'Tailwind CSS',  icon: Palette },
      { name: 'Framer Motion', icon: Sparkles },
      { name: 'HTML / CSS',    icon: Globe },
    ],
  },
  {
    label: 'Backend',
    number: '02',
    description: 'APIs robustes, sécurisées et bien structurées.',
    color: 'text-violet-500',
    borderHover: 'hover:border-violet-500/40',
    bgAccent: 'bg-violet-500/10',
    techs: [
      { name: 'Symfony 7',    icon: Server },
      { name: 'Laravel 11',   icon: Code2 },
      { name: 'API Platform', icon: Zap },
      { name: 'REST APIs',    icon: Plug },
      { name: 'JWT / Auth',   icon: Shield },
    ],
  },
  {
    label: 'Base de données',
    number: '03',
    description: 'Modélisation rigoureuse et requêtes optimisées.',
    color: 'text-indigo-500',
    borderHover: 'hover:border-indigo-500/40',
    bgAccent: 'bg-indigo-500/10',
    techs: [
      { name: 'MySQL',      icon: Database },
      { name: 'Doctrine',   icon: Book },
    ],
  },
  {
    label: 'Outils & DevOps',
    number: '04',
    description: 'Du code au déploiement, sans friction.',
    color: 'text-emerald-500',
    borderHover: 'hover:border-emerald-500/40',
    bgAccent: 'bg-emerald-500/10',
    techs: [
      { name: 'Git / GitHub', icon: Github },
      { name: 'Postman',      icon: Coffee },
      { name: 'Linux',        icon: Terminal },
      { name: 'VS Code',      icon: FileCode },
    ],
  },
];

const LEARNING = [
  { name: 'GraphQL',       icon: Zap },
  { name: 'MongoDB',       icon: Database },
  { name: 'Express',       icon: Server },
  { name: 'Redis',         icon: Database },
  { name: 'Docker',       icon: Container },
  { name: 'Kubernetes',    icon: Container },
  { name: 'Testing (Jest)', icon: Code2 },
];

/* ─── Helpers ────────────────────────────────────────────── */
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

/* ─── Component ─────────────────────────────────────────── */
export function TechStack() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <motion.div {...inView('techstack-header', 0)} className="mb-14 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
            03 — Stack technique
          </span>
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Mes technologies
            </h2>
            <p className="mt-2 text-foreground-muted max-w-xl">
              Les outils avec lesquels je construis — du design system au déploiement.
            </p>
          </div>
        </motion.div>

        {/* ── Category grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              {...inView(`techstack-cat-${cat.label}`, 0.08 + ci * 0.08)}
              className={`group rounded-2xl border border-border bg-background p-5 flex flex-col gap-4 ${cat.borderHover} hover:shadow-primary-sm transition-all duration-300`}
            >
              {/* Category header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base font-bold text-foreground">
                    {cat.label}
                  </h3>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${cat.bgAccent} ${cat.color}`}>
                  {cat.techs.length} outils
                </span>
              </div>

              <p className="text-xs text-foreground-subtle leading-relaxed">
                {cat.description}
              </p>

              <div className="h-px bg-border" />

              {/* Tech list */}
              <ul className="flex flex-col gap-2">
                {cat.techs.map((tech, ti) => (
                  <motion.li
                    key={tech.name}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 + ci * 0.06 + ti * 0.04 }}
                    className="flex items-center gap-2.5 group/tech"
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold border border-border ${cat.bgAccent} ${cat.color} group-hover/tech:border-current/40 transition-colors`}
                    >
                      <tech.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-foreground-muted group-hover/tech:text-foreground transition-colors font-medium">
                      {tech.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Currently learning ── */}
        <motion.div
          {...inView('techstack-learning', 0.4)}
          className="mt-10 rounded-2xl border border-border bg-background p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="shrink-0 flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="text-xl"
              >
                🌱
              </motion.span>
              <div>
                <p className="text-sm font-bold text-foreground">En cours d&apos;apprentissage</p>
                <p className="text-xs text-foreground-muted">Toujours en veille, toujours en progression.</p>
              </div>
            </div>

            <div className="h-px sm:h-8 sm:w-px bg-border sm:mx-2" />

            <div className="flex flex-wrap gap-2">
              {LEARNING.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 + i * 0.06 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-muted hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                >
                  <tech.icon className="h-3 w-3" />
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

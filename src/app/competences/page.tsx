'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Users,
  Lightbulb,
  Clock,
  MessageSquare,
  RefreshCw,
  Target,
  BookOpen,
  ArrowUpRight,
  Mail,
} from 'lucide-react';

const HARD_SKILLS = [
  {
    category: 'Backend web',
    number: '01',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    borderHover: 'hover:border-violet-500/30',
    skills: [
      {
        name: 'PHP',
        proof: 'Compétence principale : PHP natif, architecture sans framework, sessions, routing, controllers et logique métier.',
        tags: ['Workspace App', 'MVC', 'Sessions'],
      },
      {
        name: 'Laravel',
        proof: 'Développement backend structuré avec MVC, controllers, services, auth et intégration frontend Vue.',
        tags: ['Site DGBF', 'API-first', 'Auth'],
      },
      {
        name: 'Symfony',
        proof: 'API backend pour application métier : routes, controllers, services, sécurité et séparation des responsabilités.',
        tags: ['État civil', 'API Platform', 'Services'],
      },
      {
        name: 'APIs REST',
        proof: "Création d'APIs CRUD, communication frontend/backend, logique métier, auth et gestion des rôles.",
        tags: ['Postman', 'CRUD', 'RBAC'],
      },
      {
        name: 'Authentification web',
        proof: 'JWT, sessions PHP, bcrypt et contrôle des accès par rôles sur des applications orientées métier.',
        tags: ['JWT', 'bcrypt', 'Sessions'],
      },
      {
        name: 'Node ecosystem',
        proof: 'Utilisation pratique de npm, Vite et outils JS pour connecter les interfaces aux APIs backend.',
        tags: ['npm', 'Vite', 'Fetch API'],
      },
    ],
  },
  {
    category: 'Bases de données',
    number: '02',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    borderHover: 'hover:border-indigo-500/30',
    skills: [
      {
        name: 'SQL / MySQL',
        proof: 'Modélisation relationnelle, jointures, clés étrangères, schémas cohérents et requêtes via PDO ou framework.',
        tags: ['Workspace App', 'DGBF', 'État civil'],
      },
      {
        name: 'Conception de schéma',
        proof: 'Structuration de tables métier, relations, contraintes et organisation de données pour applications CRUD.',
        tags: ['Clés étrangères', 'Relations', 'Audit'],
      },
      {
        name: 'PDO / ORM',
        proof: 'Accès base avec PHP PDO, migrations et couche persistence via Laravel ou Symfony selon le contexte.',
        tags: ['PDO', 'Laravel', 'Symfony'],
      },
      {
        name: 'MongoDB',
        proof: 'Exposition réelle en contexte MERN, avec compréhension du modèle document et des échanges API.',
        tags: ['MERN', 'Documents', 'Exposition'],
      },
    ],
  },
  {
    category: 'Frontend web',
    number: '03',
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    borderHover: 'hover:border-sky-500/30',
    skills: [
      {
        name: 'JavaScript',
        proof: "Compétence frontend principale : DOM, fetch API, logique UI et gestion d'état simple.",
        tags: ['Workspace App', 'Fetch API', 'DOM'],
      },
      {
        name: 'React',
        proof: 'Composants, routing basique, interfaces Vite et écrans connectés à des APIs REST.',
        tags: ['État civil', 'Vite', 'UI'],
      },
      {
        name: 'Vue 3',
        proof: "Intégration frontend avec Laravel, composants Vue, Vite et consommation d'APIs backend.",
        tags: ['Site DGBF', 'Laravel', 'Vite'],
      },
      {
        name: 'HTML / CSS',
        proof: 'Structuration UI, responsive design fonctionnel et intégration propre des écrans métier.',
        tags: ['Responsive', 'UI', 'Portfolio'],
      },
      {
        name: 'TypeScript',
        proof: 'Utilisation sur projets React/Vue pour fiabiliser composants, props et échanges de données.',
        tags: ['React', 'Vue', 'Vite'],
      },
    ],
  },
  {
    category: 'Full-stack & architecture',
    number: '04',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    borderHover: 'hover:border-emerald-500/30',
    skills: [
      {
        name: 'Full-stack web',
        proof: 'Assemblage backend PHP/Laravel/Symfony, frontend React/Vue, APIs REST, auth et base de données.',
        tags: ['PHP', 'React', 'Vue'],
      },
      {
        name: 'Architecture MVC',
        proof: 'Organisation controllers, services, vues, modèles et séparation claire des responsabilités.',
        tags: ['MVC', 'Services', 'Routing'],
      },
      {
        name: 'Architecture API',
        proof: 'Séparation backend/frontend, contrats REST, endpoints métier et échanges HTTP structurés.',
        tags: ['REST', 'HTTP', 'Postman'],
      },
      {
        name: 'Routing custom',
        proof: 'Mise en place de routing PHP natif et organisation applicative sans framework dans un projet réel.',
        tags: ['Workspace App', 'PHP natif', 'Routing'],
      },
    ],
  },
  {
    category: 'Tests & qualité',
    number: '05',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    borderHover: 'hover:border-rose-500/30',
    skills: [
      {
        name: 'PHPUnit',
        proof: 'Tests backend PHP sur workspace-app pour sécuriser la logique métier et les comportements critiques.',
        tags: ['Workspace App', 'Backend', 'PHP'],
      },
      {
        name: 'Jest',
        proof: 'Exposition aux tests frontend JavaScript/React, avec bases solides à renforcer en projet.',
        tags: ['JavaScript', 'React', 'Apprentissage'],
      },
      {
        name: 'Postman',
        proof: "Tests manuels d'APIs REST, validation des endpoints, payloads, statuts HTTP et scénarios auth.",
        tags: ['API testing', 'REST', 'Auth'],
      },
    ],
  },
  {
    category: 'Outils & DevOps',
    number: '06',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    borderHover: 'hover:border-cyan-500/30',
    skills: [
      {
        name: 'Git / GitHub',
        proof: 'Versioning quotidien, branches, organisation de repos multiples et historique de projet lisible.',
        tags: ['Branches', 'Repos', 'Versioning'],
      },
      {
        name: 'Docker',
        proof: 'Conteneurisation basique et environnements de développement reproductibles pour applications web.',
        tags: ['Dev env', 'MySQL', 'PHP'],
      },
      {
        name: 'Linux',
        proof: 'Usage pratique de la ligne de commande, gestion des environnements dev et commandes système courantes.',
        tags: ['CLI', 'Shell', 'Dev local'],
      },
      {
        name: 'CI/CD',
        proof: "Compréhension récente de GitHub Actions et des principes d'automatisation build/test/deploy.",
        tags: ['GitHub Actions', 'Débutant', 'Veille'],
      },
      {
        name: 'Réseau & systèmes',
        proof: 'Fondamentaux TCP/IP, communication HTTP et compréhension pratique des échanges client/serveur.',
        tags: ['TCP/IP', 'HTTP', 'REST'],
      },
      {
        name: 'IA & IoT',
        proof: 'Contact réel avec YOLOv8, FastAPI, ESP32 et C++ sur des sujets data, ML ou hardware/software.',
        tags: ['YOLOv8', 'FastAPI', 'ESP32'],
      },
    ],
  },
];

/* ─── Soft Skills ─────────────────────────────────────────── */
const SOFT_SKILLS = [
  {
    icon: Target,
    name: 'Rigueur & précision',
    description:
      'Habitude de travailler sur des données sensibles, zéro tolérance pour les imprécisions.',
  },
  {
    icon: Lightbulb,
    name: 'Résolution de problèmes',
    description:
      'J\'analyse le besoin réel avant de coder. La meilleure solution n\'est pas toujours la plus technique.',
  },
  {
    icon: Users,
    name: 'Travail en équipe',
    description:
      'Collaboration avec des équipes pluridisciplinaires (IT, métier, responsables) dans un contexte institutionnel.',
  },
  {
    icon: MessageSquare,
    name: 'Communication claire',
    description:
      'Présentation de l\'avancement à des interlocuteurs non-techniques, reformuler sans jargon, c\'est aussi une compétence.',
  },
  {
    icon: BookOpen,
    name: 'Apprentissage autonome',
    description:
      'Symfony 7 et API Platform appris en contexte réel, en production. La veille technologique est une habitude quotidienne.',
  },
  {
    icon: Clock,
    name: 'Gestion des priorités',
    description:
      'Livraisons itératives, respect des délais, capacité à dire non à ce qui n\'apporte pas de valeur.',
  },
  {
    icon: RefreshCw,
    name: 'Adaptabilité',
    description:
      'Passé de l\'électronique au développement web, confortable dans l\'inconfort, à l\'aise avec les pivots.',
  },
];

/* ─── Helpers ────────────────────────────────────────────── */
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

/* ─── Page ───────────────────────────────────────────────── */
export default function CompetencesPage() {
  useEffect(() => {
    document.title = 'Compétences | Ny Aina Rommy Ramaromilanto';
  }, []);

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero header ── */}
      <section className="relative md:pt-32 pt-8 pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/8 blur-[80px]" />
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-secondary/8 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <motion.span {...inView(0)} className="text-xs font-bold uppercase tracking-widest text-foreground-subtle block">
            Compétences
          </motion.span>
          <motion.h1 {...inView(0.06)} className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Ce que je sais faire
          </motion.h1>
          <motion.p {...inView(0.1)} className="mt-3 text-foreground-muted max-w-xl">
            Pas de barres de progression abstraites, chaque compétence est
            ancrée dans un projet ou un contexte d&apos;usage réel.
          </motion.p>

          {/* Quick stat strip */}
          <motion.div {...inView(0.14)} className="mt-8 flex flex-wrap gap-4">
            {[
              { value: `${HARD_SKILLS.reduce((a, c) => a + c.skills.length, 0)}+`, label: 'technologies' },
              { value: `${HARD_SKILLS.length}`, label: 'domaines' },
              { value: `${SOFT_SKILLS.length}`, label: 'soft skills' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5">
                <span className="text-xl font-black text-primary">{value}</span>
                <span className="text-sm text-foreground-muted">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Hard Skills ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">

        <motion.p {...inView(0)} className="text-xs font-bold uppercase tracking-widest text-foreground-subtle mb-6">
          Hard skills
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {HARD_SKILLS.map((cat, ci) => (
            <motion.div
              key={cat.category}
              {...inView(0.06 + ci * 0.07)}
              className={`rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5 ${cat.borderHover} hover:shadow-primary-sm transition-all duration-300`}
            >
              {/* Category header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-bold font-mono ${cat.color}`}>
                    {cat.number}
                  </span>
                  <h2 className="text-base font-bold text-foreground">{cat.category}</h2>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${cat.bg} ${cat.color}`}>
                  {cat.skills.length} skills
                </span>
              </div>

              <div className="h-px bg-border" />

              {/* Skills list */}
              <ul className="flex flex-col gap-4">
                {cat.skills.map((skill, si) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + ci * 0.05 + si * 0.04 }}
                    className="flex flex-col gap-1.5 group/skill"
                  >
                    {/* Name + proof */}
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${cat.color}`} />
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-sm font-semibold text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-foreground-muted leading-relaxed">
                          {skill.proof}
                        </span>
                      </div>
                    </div>

                    {/* Project tags */}
                    <div className="flex flex-wrap gap-1.5 pl-6">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background border border-border text-foreground-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Soft Skills ── */}
      <section className="bg-surface border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">

          <motion.div {...inView(0)} className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle block mb-3">
              Soft skills
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
              La façon dont je travaille
            </h2>
            <p className="mt-2 text-foreground-muted max-w-lg">
              Les compétences techniques s&apos;apprennent. Voici ce qui définit
              ma manière d&apos;aborder les projets et les équipes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOFT_SKILLS.map((soft, i) => {
              const Icon = soft.icon;
              return (
                <motion.div
                  key={soft.name}
                  {...inView(0.06 + i * 0.06)}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-background p-5 hover:border-primary/30 hover:shadow-primary-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {soft.name}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {soft.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
            Prêt à collaborer ?
          </h2>
          <p className="text-foreground-muted max-w-lg mb-8">
            Discutons de votre projet. Je suis disponible pour transformer vos idées en solutions web performantes.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex sm:flex-wrap gap-3"
          >
            <Link href="/contact">
              <Button size="lg" className='text-sm md:text-base' iconLeft={<Mail className="h-4 w-4" />}>
                Me contacter
              </Button>
            </Link>
            <Link href="/projets">
              <Button variant="outline" className='hover:bg-gray-300 text-sm md:text-base' size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
                Voir mes projets
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}

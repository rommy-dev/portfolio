'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

const THEMES = [
  {
    label: 'Frontend',
    image: '/images/stack/frontend.jpeg',
    alt: 'Écran affichant une interface web minimaliste, en noir et blanc',
    description: 'Des interfaces rapides, accessibles et faciles à maintenir.',
    techs: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    image: '/images/stack/backend.jpeg',
    alt: 'Baies de serveurs reliées entre elles, en noir et blanc',
    description: 'Des APIs robustes, sécurisées et bien structurées.',
    techs: ['Symfony', 'Laravel', 'PHP', 'API Platform', 'Express', 'JWT'],
  },
  {
    label: 'Données',
    image: '/images/stack/data.jpeg',
    alt: 'Modules de pierre empilés et reliés, en noir et blanc',
    description: 'Une modélisation rigoureuse et des requêtes optimisées.',
    techs: ['MySQL', 'MongoDB', 'Doctrine', 'Eloquent'],
  },
  {
    label: 'Livraison',
    image: '/images/stack/delivery.jpeg',
    alt: 'Portiques alignés en perspective le long d’une chaîne, en noir et blanc',
    description: 'Du commit à la production, testé et sans friction.',
    techs: ['Docker', 'Git / GitHub', 'PHPUnit', 'Jest', 'Postman', 'Linux'],
  },
];

const LEARNING = ['GraphQL', 'Redis', 'Kubernetes', 'GitHub Actions', 'Prisma', 'WebSockets'];

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

const pad = (n: number) => String(n).padStart(2, '0');

/* Fondu des bords de l'image dans le fond noir, comme les visuels de paligan. */
const IMAGE_MASK = 'radial-gradient(ellipse 72% 68% at 50% 46%, #000 52%, transparent 100%)';

/* Visuel d'un thème : image N&B (nette quand le thème est actif) et ses technologies en dessous. */
function ThemeVisual({ theme, active }: { theme: (typeof THEMES)[number]; active: boolean }) {
  return (
    <div className="flex h-full flex-col items-center">
      <div
        className={`relative w-full flex-1 transition-[filter,opacity] duration-700 ${
          active ? 'opacity-100 blur-0' : 'opacity-35 blur-[3px]'
        }`}
        style={{ maskImage: IMAGE_MASK, WebkitMaskImage: IMAGE_MASK }}
      >
        <Image
          src={theme.image}
          alt={theme.alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 60vw, 25vw"
          className="object-cover"
        />
      </div>
      <ul
        className={`mt-5 flex min-h-[4.5em] flex-wrap content-start justify-center gap-x-3 gap-y-1 text-center font-mono text-[11px] leading-relaxed transition-colors duration-500 md:text-xs ${
          active ? 'text-[hsl(var(--editorial-foreground))]' : 'text-[hsl(var(--editorial-foreground-muted))]'
        }`}
      >
        {theme.techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );
}

export function TechStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(THEMES.length - 1, Math.max(0, Math.floor(p * THEMES.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const current = THEMES[active];

  return (
    <section className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32 lg:px-12">
        <motion.div {...inView('techstack-header', 0)} className="grid gap-8 md:grid-cols-[0.3fr_1fr] md:gap-12">
          <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
            <span className="text-[hsl(var(--editorial-primary))]">02</span>
            <span className="ml-2">Stack technique</span>
          </span>
          <div className="max-w-3xl">
            <h2 className="text-balance text-[clamp(1.9rem,3.6vw+0.5rem,3.25rem)] font-medium leading-[1.08] tracking-[-0.04em]">
              Peu d&apos;outils, maîtrisés en profondeur plutôt qu&apos;empilés.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[hsl(var(--editorial-foreground-muted))] md:text-lg">
              Chaque technologie a sa place dans la chaîne : l&apos;interface, la logique métier, les données et la
              livraison. Je choisis ce qui reste maintenable dans cinq ans, pas ce qui est à la mode.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll piloté : la vue reste fixe, le thème change ── */}
      <div ref={trackRef} className="relative" style={{ height: `${THEMES.length * 100}dvh` }}>
        <div className="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col overflow-hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-10 pt-8 md:px-10 md:pb-14 lg:px-12">
            {/* Visuels — desktop : côte à côte */}
            <div className="hidden min-h-0 flex-1 grid-cols-4 gap-6 md:grid">
              {THEMES.map((theme, i) => (
                <ThemeVisual key={theme.label} theme={theme} active={i === active} />
              ))}
            </div>

            {/* Visuels — mobile : carrousel centré sur le thème actif */}
            <div className="relative min-h-0 flex-1 md:hidden">
              {THEMES.map((theme, i) => (
                <div
                  key={theme.label}
                  className="absolute inset-y-0 w-[58%] transition-[left] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ left: `calc(21% + ${(i - active) * 62}%)` }}
                >
                  <ThemeVisual theme={theme} active={i === active} />
                </div>
              ))}
            </div>

            {/* Légendes — desktop : toutes, l'active soulignée */}
            <div className="mt-10 hidden grid-cols-4 gap-6 md:grid">
              {THEMES.map((theme, i) => (
                <div
                  key={theme.label}
                  className={`border-t pt-5 transition-colors duration-500 ${
                    i === active ? 'border-[hsl(var(--editorial-foreground))]' : 'border-[hsl(var(--editorial-border))]'
                  }`}
                >
                  <p className="font-mono text-xs">
                    <span className="text-[hsl(var(--editorial-primary))]">{pad(i + 1)}</span>
                    <span
                      className={`ml-2 transition-colors duration-500 ${
                        i === active ? 'text-[hsl(var(--editorial-foreground))]' : 'text-[hsl(var(--editorial-foreground-muted))]'
                      }`}
                    >
                      {theme.label}
                    </span>
                  </p>
                  <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))] lg:text-[0.95rem]">
                    {theme.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Légende — mobile : seulement le thème actif */}
            <div className="mt-8 h-28 border-t border-[hsl(var(--editorial-foreground))] pt-5 md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="font-mono text-xs">
                    <span className="text-[hsl(var(--editorial-primary))]">{pad(active + 1)}</span>
                    <span className="ml-2">{current.label}</span>
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── En veille ── */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10 md:pb-32 lg:px-12">
        <motion.div
          {...inView('techstack-learning', 0)}
          className="grid gap-6 border-t border-[hsl(var(--editorial-border))] pt-10 md:grid-cols-[0.3fr_1fr] md:gap-12"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--editorial-primary))] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--editorial-primary))]" />
            </span>
            En veille
          </span>
          <div>
            <p className="max-w-2xl text-xl font-medium leading-snug tracking-[-0.03em] md:text-2xl">
              J&apos;apprends en continu. En ce moment, j&apos;explore :
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))] md:text-[13px]">
              {LEARNING.map((tech) => (
                <li key={tech} className="underline decoration-dotted underline-offset-4">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

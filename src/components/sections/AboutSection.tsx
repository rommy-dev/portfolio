'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ─── Contenu ─────────────────────────────────────────────── */
const TIMELINE = [
  {
    period: '2026 · Jan. — Mars',
    place: "Ministère de l'Intérieur et de la Décentralisation",
    role: 'Développeur web · Stage',
    description:
      "Une application de saisie rétroactive des actes de naissance. Symfony 7 et API Platform côté serveur, React et TypeScript côté interface, des API sécurisées pour des données d'état civil sensibles.",
  },
  {
    period: '2026 · Jan. — Mars',
    place: 'Direction Générale du Budget et des Finances',
    role: 'Développeur web · Stage',
    description:
      'La refonte du portail public : architecture API-first en Laravel 11 et Vue 3, administration sécurisée par Sanctum, organigramme interactif, textes réglementaires et transparence budgétaire.',
  },
  {
    period: '2022 — 2025',
    place: "École Supérieure Polytechnique d'Antananarivo",
    role: 'Licence · Électronique et informatique appliquée',
    description:
      "Systèmes embarqués, électronique et logiciel : l'habitude de comprendre une machine jusqu'au bout avant de lui confier quoi que ce soit.",
  },
];

const PRINCIPLES = [
  { label: 'Lisible', text: 'Un code typé, testé et relu, que la prochaine personne reprend sans moi.' },
  { label: 'Évident', text: "Une interface qui se passe de mode d'emploi." },
  { label: 'Itératif', text: 'Livrer petit, souvent, et toujours solide.' },
  { label: 'Documenté', text: "Ce qui n'est pas écrit finit toujours par se perdre." },
];

const INTERESTS = ['Musique', 'Jeux vidéo', 'Basketball', 'Voyages'];

/* Bandes du rideau : position et largeur en %, comme le découpage irrégulier de paligan. */
const STRIPS = [
  { left: 0, width: 37.5 },
  { left: 37.5, width: 23.5 },
  { left: 61, width: 20 },
  { left: 81, width: 19 },
];

/* ─── Animations ──────────────────────────────────────────── */
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

/* ─── Scène 1 : l'introduction, découpée en bandes ────────── */
function IntroScene() {
  return (
    <div className="absolute inset-0 bg-[hsl(var(--editorial-bg))]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 52% 58%, rgba(255,255,255,0.13), transparent 70%)',
        }}
      />
      <Image
        src="/avatar.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_30%] grayscale contrast-[1.08] brightness-[0.85] blur-[1.5px] scale-[1.35] md:object-contain md:scale-[1.15] md:object-[50%_100%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.55)_0%,transparent_35%,transparent_70%,rgba(10,10,10,0.9)_100%)]" />
      <div className="absolute inset-x-0 top-[12%] px-6 text-center md:top-[10%]">
        <p className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
          <span className="text-[hsl(var(--editorial-primary))]">04</span>
          <span className="ml-2">À propos</span>
        </p>
        <h2 className="mt-5 text-balance text-[clamp(2.4rem,6vw+0.5rem,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[hsl(var(--editorial-foreground))]">
          Je construis en coulisses
        </h2>
      </div>
    </div>
  );
}

function CurtainStrip({
  progress,
  index,
  left,
  width,
}: {
  progress: MotionValue<number>;
  index: number;
  left: number;
  width: number;
}) {
  const start = 0.1 + index * 0.08;
  const y = useTransform(progress, [start, start + 0.3], ['0%', '100%']);
  return (
    <motion.div
      aria-hidden={index > 0}
      className="absolute inset-0 will-change-transform"
      style={{ y, clipPath: `inset(0 ${100 - left - width}% 0 ${left}%)` }}
    >
      <IntroScene />
    </motion.div>
  );
}

/* ─── Scène 2 : ce qui se révèle derrière le rideau ───────── */
function StageScene({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0.1, 0.7], [1.12, 1]);
  const textOpacity = useTransform(progress, [0.45, 0.62], [0, 1]);
  const textY = useTransform(progress, [0.45, 0.62], [24, 0]);
  const inset = useTransform(progress, [0.82, 1], [0, 4]);
  const clipPath = useTransform(inset, (v) => `inset(0 ${v}% 0 ${v}%)`);

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        {/* Lumière chaude de scène */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 72%, rgba(255,149,111,0.38), transparent 70%), radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,179,148,0.16), transparent 65%), linear-gradient(180deg, #1a0f0b 0%, #2a1610 55%, #0a0a0a 100%)',
          }}
        />
        {/* Arche architecturale */}
        <div className="absolute bottom-0 left-1/2 h-[78%] w-[min(78vw,640px)] -translate-x-1/2 rounded-t-full border border-b-0 border-[rgba(255,179,148,0.22)] bg-[linear-gradient(180deg,rgba(255,149,111,0.10),rgba(10,10,10,0.2))]" />
        <div className="absolute bottom-0 left-1/2 h-[66%] w-[min(60vw,480px)] -translate-x-1/2 rounded-t-full border border-b-0 border-[rgba(255,179,148,0.14)]" />
        {/* Colonnes latérales */}
        <div className="absolute bottom-0 left-[6%] h-[70%] w-[5%] bg-[linear-gradient(90deg,rgba(255,179,148,0.12),rgba(0,0,0,0.4))]" />
        <div className="absolute bottom-0 right-[6%] h-[70%] w-[5%] bg-[linear-gradient(270deg,rgba(255,179,148,0.12),rgba(0,0,0,0.4))]" />
        {/* Portrait en pied, comme une statue sur scène */}
        <div className="absolute bottom-0 left-1/2 h-[46%] w-[min(70vw,420px)] -translate-x-1/2">
          <Image
            src="/avatar.png"
            alt="Portrait de Ny Aina Rommy Ramaromilanto"
            fill
            sizes="(max-width: 768px) 70vw, 420px"
            className="object-contain object-bottom contrast-[1.05] saturate-[0.85]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,transparent,rgba(10,10,10,0.85))]" />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-[12%] px-6 text-center md:top-[10%]"
        style={{ opacity: textOpacity, y: textY }}
      >
        <p className="text-balance text-[clamp(1.9rem,4.4vw+0.5rem,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-[hsl(var(--editorial-foreground))]">
          pour que vos outils
          <br />
          <span className="font-semibold">fassent avancer vos équipes.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export function AboutSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  return (
    <section className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      {/* ── Rideau piloté par le scroll ── */}
      <div ref={trackRef} className="relative h-[300dvh]">
        <div className="sticky top-0 h-dvh overflow-hidden">
          <StageScene progress={scrollYProgress} />
          {STRIPS.map((strip, i) => (
            <CurtainStrip key={strip.left} progress={scrollYProgress} index={i} {...strip} />
          ))}
        </div>
      </div>

      {/* ── Qui je suis ── */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28 lg:px-12">
        <motion.div {...inView('about-intro', 0)} className="grid gap-8 md:grid-cols-[0.3fr_1fr] md:gap-12">
          <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
            <span className="text-[hsl(var(--editorial-primary))]">04</span>
            <span className="ml-2">Qui je suis</span>
          </span>
          <div className="max-w-3xl">
            <p className="text-xl font-medium leading-snug tracking-[-0.03em] md:text-2xl">
              Développeur fullstack à Antananarivo, je conçois des applications métier là où l&apos;erreur
              coûte cher : état civil, finances publiques, données sensibles.
            </p>
            <p className="mt-10 text-[clamp(1.6rem,2.4vw+0.6rem,2.6rem)] font-light leading-[1.15] tracking-[-0.04em]">
              Je préfère un code que votre équipe comprend à deux heures du matin, quand la production tombe,
              à un code qui impressionne. Je pose les questions qui dérangent avant d&apos;écrire la première
              ligne, parce qu&apos;un logiciel ne vaut que par les décisions qu&apos;il rend possibles.
            </p>
          </div>
        </motion.div>

        {/* ── Parcours ── */}
        <div className="mt-24 md:mt-32">
          <motion.p
            {...inView('about-path-label', 0)}
            className="mb-8 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]"
          >
            Parcours
          </motion.p>
          <ol className="border-b border-[hsl(var(--editorial-border))]">
            {TIMELINE.map((item, i) => (
              <motion.li
                key={item.place}
                {...inView(`about-path-${i}`, 0.06 * i)}
                className="grid gap-4 border-t border-[hsl(var(--editorial-border))] py-8 md:grid-cols-[0.3fr_1fr] md:gap-12 md:py-10"
              >
                <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
                  <span className="text-[hsl(var(--editorial-primary))]">{pad(i + 1)}</span>
                  <span className="ml-2">{item.period}</span>
                </span>
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-medium leading-tight tracking-[-0.04em] md:text-3xl">{item.place}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[hsl(var(--editorial-foreground-muted))]">
                    {item.role}
                  </p>
                  <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ── Méthode ── */}
        <div className="mt-24 md:mt-32">
          <motion.p
            {...inView('about-method-label', 0)}
            className="mb-8 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]"
          >
            Méthode
          </motion.p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((principle, i) => (
              <motion.div
                key={principle.label}
                {...inView(`about-method-${i}`, 0.06 * i)}
                className="border-t border-[hsl(var(--editorial-border))] pt-5"
              >
                <p className="font-mono text-xs">
                  <span className="text-[hsl(var(--editorial-primary))]">{pad(i + 1)}</span>
                  <span className="ml-2">{principle.label}</span>
                </p>
                <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))] lg:text-[0.95rem]">
                  {principle.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Hors écran ── */}
        <motion.div
          {...inView('about-outro-interests', 0)}
          className="mt-24 w-full border-t border-[hsl(var(--editorial-border))] pt-10 md:mt-32"
        >
          <div className="w-full">
            <p className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">Hors écran</p>
            <ul className="mt-4 flex w-full flex-nowrap items-center gap-x-4 overflow-x-auto whitespace-nowrap font-mono text-xs text-[hsl(var(--editorial-foreground-muted))] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {INTERESTS.map((interest) => (
                <li key={interest} className="inline-block border border-transparent text-[hsl(var(--editorial-foreground-muted))] underline decoration-dotted decoration-[1.5px] underline-offset-4">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Contact ── */}
        <motion.div
          {...inView('about-outro-contact', 0)}
          className="mt-10 flex w-full flex-col gap-6 border-t border-[hsl(var(--editorial-border))] pt-10 sm:flex-row sm:items-end sm:justify-between md:mt-14"
        >
          <p className="max-w-xl text-[clamp(1.6rem,2.4vw+0.6rem,2.6rem)] font-light leading-[1.1] tracking-[-0.04em]">
            Un projet en tête ? <span className="font-semibold">Parlons-en.</span>
          </p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-primary))]"
          >
            Me contacter
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

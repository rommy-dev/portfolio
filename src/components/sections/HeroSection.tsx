'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Mail, Github, Linkedin, Download, ArrowUpRight, MapPin, ExternalLink, Lock } from 'lucide-react';
import { getTechnologyColor } from '@/lib/technology-colors';

/* ─── Config ────────────────────────────────────────────── */
const ROLES = ['Développeur Fullstack', 'Développeur Backend', 'Développeur Frontend'];

/**
 * Stack réduite aux technos vraiment maîtrisées et démontrées dans tes projets.
 * Moins = plus de crédibilité.
 */
const STACK = [
  'PHP',
  'Laravel',
  'Symfony',
  'React',
  'Vue.js',
  'TypeScript',
  'MySQL',
  'Docker',
];

/* ─── Animation helpers ─────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE },
  }),
} as const;
const fadeUp = {
  initial: 'hidden',
  animate: 'show',
  variants: fadeUpVariants,
} as const;

/* ─── Component ─────────────────────────────────────────── */
export function HeroSection() {
  /* Typewriter */
  const [roleIdx, setRoleIdx] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    const speed = deleting ? 40 : 90;

    const t = setTimeout(() => {
      if (!deleting) {
        if (display.length < role.length) {
          setDisplay(role.slice(0, display.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 2400);
        }
      } else {
        if (display.length > 0) {
          setDisplay(display.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIdx((p) => (p + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [display, deleting, roleIdx]);

  /* Magnetic tilt on card */
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-60, 60], [5, -5]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(mx, [-60, 60], [-5, 5]), { stiffness: 180, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <section className="relative md:min-h-screen lg:h-screen flex items-center overflow-hidden">

      {/* ── Background ── */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid subtle */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        <motion.div
          animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 h-125 w-125 rounded-full bg-primary/8 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -22, 0], y: [0, 18, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-32 -right-32 h-115 w-115 rounded-full bg-secondary/8 blur-[110px]"
        />
      </div>

      {/* ── Content grid ── */}
      <div className="mx-auto max-w-6xl w-full px-6 py-12 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* ── Left — Text ── */}
        <div className="flex flex-col gap-6">

          {/* Badges */}
          <motion.div {...fadeUp} custom={0.04} className="hidden md:flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success text-xs font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Disponible — open to work
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-foreground-muted text-xs">
              <MapPin className="h-3 w-3" aria-hidden />
              Antananarivo, Madagascar
            </span>
          </motion.div>

          {/* Name + typewriter */}
          <div className="flex flex-col gap-2.5">
            <motion.p {...fadeUp} custom={0.10} className="text-sm font-semibold text-foreground-muted tracking-widest uppercase">
              Bonjour, je suis
            </motion.p>

            <motion.h1
              {...fadeUp}
              custom={0.16}
              className="text-4xl md:text-[3.25rem] xl:text-[3.5rem] font-black tracking-tight leading-[1.05]"
            >
              <span className="text-foreground">Ny Aina Rommy</span>
              <br />
              <span
                className="relative"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ramaromilanto
              </span>
            </motion.h1>

            <motion.div {...fadeUp} custom={0.22} className="h-9 flex items-center">
              <span className="text-lg md:text-xl font-semibold text-foreground-muted">
                {display}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
                className="ml-0.5 inline-block w-0.5 h-5 bg-primary rounded-full"
                aria-hidden
              />
            </motion.div>
          </div>

          {/* Bio — honnête et spécifique */}
          <motion.p {...fadeUp} custom={0.28} className="text-base text-foreground-muted leading-relaxed max-w-lg">
                          Je conçois des applications web métier de bout en bout :
              APIs structurées, interfaces réactives, données sécurisées.
              Expérience en contexte institutionnel gouvernemental malgache.

          </motion.p>

          {/* Stack — réduite, crédible */}
          <motion.div {...fadeUp} custom={0.34} className="flex flex-wrap gap-1.5 ">
            {STACK.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getTechnologyColor(tech)}`}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA — CV en premier pour le recruteur */}
          <motion.div {...fadeUp} custom={0.40} className="flex justify-center items-center flex-wrap md:justify-start md:items-start gap-3">
            <a href="/cv-rommy-ramaromilanto.pdf" download>
              <Button size="lg" className="text-sm md:text-base" iconLeft={<Download className="h-4 w-4" aria-hidden />}>
                Télécharger CV
              </Button>
            </a>
            <Link href="/projets">
              <Button variant="outline" className="hover:bg-gray-300 text-sm md:text-base" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" aria-hidden />}>
                Voir mes projets
              </Button>
            </Link>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp} custom={0.46} className="flex justify-center items-center flex-wrap md:justify-start md:items-start gap-4 pt-1">
            {[
              { href: 'mailto:ram.rommynya@gmail.com', icon: Mail, label: 'Email' },
              { href: 'https://github.com/rommy-dev', icon: Github, label: 'GitHub', external: true },
              // { href: 'https://linkedin.com/in/rommy-dev', icon: Linkedin, label: 'LinkedIn', external: true },
            ].map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={label}
                className="group flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-200">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="inline">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right — Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
          className="flex justify-center"
        >
          <motion.div
            ref={cardRef}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-sm"
          >
            {/* Card principale */}
            <div className="relative md:h-98 md:w-98 rounded-full bg-surface border border-border shadow-primary-lg overflow-hidden flex items-center justify-center flex-col gap-5">

              {/* Top gradient line */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), transparent)' }}
              />

              {/* Avatar + profil */}
              <div className="flex items-center gap-4">
                <div className="relative w-full">
                  <div
                    className="w-full aspect-[1] overflow-hidden"
                  >
                    {/* Placeholder photo */}
                    <img
                      src="/avatar.png"
                      alt="Ny Aina Rommy Ramaromilanto"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                {/* <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm leading-tight">Ny Aina Rommy</p>
                  <p className="font-bold text-foreground text-sm leading-tight">Ramaromilanto</p>
                  <p className="text-xs text-foreground-muted mt-0.5">Développeur Fullstack</p>
                  <p className="text-xs text-foreground-subtle flex items-center gap-1 mt-0.5">
                    <MapPin className="h-2.5 w-2.5" aria-hidden /> Antananarivo, Madagascar
                  </p>
                </div> */}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full bg-surface-raised border border-border shadow-md px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-violet-500 shrink-0" aria-hidden />
              Symfony · React · Docker
            </motion.div>

            <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.6 }}
              className="absolute bottom-1/4 -left-4 flex items-center gap-1.5 rounded-full bg-surface-raised border border-border shadow-md px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" aria-hidden />
              3 projets livrés · 2 institutionnels
            </motion.div>

            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-2 -right-4 flex items-center gap-1.5 rounded-full bg-surface-raised border border-border shadow-md px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" aria-hidden />
              Antananarivo · Fullstack
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground-subtle">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-6 w-4 rounded-full border-2 border-border flex items-start justify-center pt-1"
        >
          <span className="h-1.5 w-1 rounded-full bg-foreground-subtle" />
        </motion.div>
      </motion.div>

    </section>
  );
}
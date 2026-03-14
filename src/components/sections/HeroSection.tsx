'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Github, Linkedin, Download, ArrowUpRight, MapPin, Coffee } from 'lucide-react';

/* ─── Config ────────────────────────────────────────────── */
const ROLES = ['Développeur Frontend', 'Développeur Backend', 'Développeur Fullstack'];

const STATS = [
  { value: '3+',  label: 'ans d\'expérience' },
  { value: '20+', label: 'projets livrés' },
  { value: '8+',  label: 'clients satisfaits' },
];

const STACK = [
  // Frontend
  { name: 'React',      color: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
  { name: 'Vue.js',     color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  { name: 'Next.js',    color: 'bg-foreground/10 text-foreground border-border' },
  { name: 'TypeScript', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { name: 'Tailwind CSS', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
  { name: 'Bootstrap',  color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },

  // Backend
  { name: 'Node.js',    color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  { name: 'PHP',        color: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
  { name: 'Laravel',    color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  { name: 'Symfony',    color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },

  // Base de données
  { name: 'MySQL',      color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },

  // Autres langages
  { name: 'Java',       color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  { name: 'C/C++',      color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
  { name: 'Python', color: 'bg-blue-200/10 text-blue-700 border-blue-200/20' }
];


/* ─── Stagger helpers ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Component ─────────────────────────────────────────── */
export function HeroSection() {
  /* Typewriter */
  const [roleIdx, setRoleIdx]       = useState(0);
  const [display, setDisplay]       = useState('');
  const [deleting, setDeleting]     = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    const speed = deleting ? 45 : 95;

    const t = setTimeout(() => {
      if (!deleting) {
        if (display.length < role.length) {
          setDisplay(role.slice(0, display.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 2200);
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

  /* Magnetic tilt on avatar card */
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-60, 60], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-60, 60], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <section className="relative md:min-h-screen lg:h-screen flex items-center overflow-hidden">

      {/* ── Background blobs ── */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-secondary/10 blur-[100px]"
        />
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl w-full px-6 py-12 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left column — Text */}
        <div className="flex flex-col gap-6">

          {/* Top badges row */}
          <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-3">
            {/* Availability dot */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success text-xs font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Disponible — open to work
            </span>

            {/* Location */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-foreground-muted text-xs">
              <MapPin className="h-3 w-3" />
              Antananarivo, Madagascar
            </span>
          </motion.div>

          {/* Name + title */}
          <div className="flex flex-col gap-3">
            <motion.p {...fadeUp(0.12)} className="text-sm font-semibold text-foreground-muted tracking-widest uppercase">
              Bonjour 👋 je suis
            </motion.p>

            <motion.h1
              {...fadeUp(0.18)}
              className="text-4xl md:text-6xl xl:text-6xl font-black tracking-tight leading-[1.05]"
            >
              <span className="text-foreground">Ny Aina Rommy</span>{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ramaromilanto
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div {...fadeUp(0.24)} className="h-10 flex items-center">
              <span className="text-xl md:text-2xl font-semibold text-foreground-muted">
                {display}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
                className="ml-0.5 inline-block w-[2px] h-6 bg-primary rounded-full"
              />
            </motion.div>
          </div>

          {/* Bio */}
          <motion.p {...fadeUp(0.30)} className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-lg">
            Je conçois et développe des applications web modernes, rapides et accessibles.
            De la maquette au déploiement, je transforme vos idées en produits qui{' '}
            <span className="text-foreground font-medium">marquent les esprits.</span>
          </motion.p>

          {/* Tech stack pills */}
          <motion.div {...fadeUp(0.36)} className="flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span
                key={tech.name}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-3">
            <Link href="/projets">
              <Button size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
                Voir mes projets
              </Button>
            </Link>
            <a href="/cv-rommy-ramaromilanto.pdf" download>
              <Button variant="outline" className='hover:bg-gray-300' size="lg" iconLeft={<Download className="h-4 w-4" />}>
                Télécharger CV
              </Button>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.48)} className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/rommy-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border group-hover:border-primary/40 group-hover:bg-primary-light transition-all duration-200">
                <Github className="h-4 w-4" />
              </span>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/rommy-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border group-hover:border-primary/40 group-hover:bg-primary-light transition-all duration-200">
                <Linkedin className="h-4 w-4" />
              </span>
              LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Right column — Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex justify-center"
        >
          <motion.div
            ref={cardRef}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-sm"
          >
            {/* Main card */}
            <div className="relative rounded-2xl bg-surface border border-border shadow-primary-lg overflow-hidden p-7 flex flex-col gap-6">

              {/* Subtle top gradient line */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), transparent)' }}
              />

              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="h-16 w-16 rounded-xl flex items-center justify-center text-2xl font-black text-white select-none"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
                  >
                    R
                  </div>
                  {/* Online dot */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface border-2 border-surface">
                    <span className="h-2 w-2 rounded-full bg-success" />
                  </span>
                </div>
                <div>
                  <p className="font-bold text-foreground">Ny Aina Rommy Ramaromilanto</p>
                  <p className="text-xs text-foreground-muted">Full Stack Developer</p>
                  <p className="text-xs text-foreground-subtle flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> Antananarivo, Madagascar
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 rounded-xl bg-background border border-border p-3 text-center"
                  >
                    <span className="text-xl font-black text-primary">{value}</span>
                    <span className="text-[10px] text-foreground-subtle leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Current activity */}
              <div className="flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-3">
                <Coffee className="h-4 w-4 text-warning shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">En ce moment</p>
                  <p className="text-xs text-foreground-muted">Travaille sur un SaaS React/Node</p>
                </div>
              </div>

              {/* Code snippet decoration */}
              <div className="rounded-xl bg-background border border-border px-4 py-3 font-mono text-xs text-foreground-muted leading-relaxed">
                <span className="text-secondary">const</span>{' '}
                <span className="text-primary">dev</span>{' '}
                <span className="text-foreground-subtle">= {'{'}</span>
                <br />
                {'  '}<span className="text-foreground">name</span>
                <span className="text-foreground-subtle">:</span>{' '}
                <span className="text-accent">&quot;Ny Aina Rommy Ramaromilanto&quot;</span>
                <span className="text-foreground-subtle">,</span>
                <br />
                {'  '}<span className="text-foreground">open</span>
                <span className="text-foreground-subtle">:</span>{' '}
                <span className="text-success">true</span>
                <br />
                <span className="text-foreground-subtle">{'}'}</span>
              </div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full bg-surface-raised border border-border shadow-md px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              <span className="text-base">⚡</span> Next.js 15
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 flex items-center gap-1.5 rounded-full bg-surface-raised border border-border shadow-md px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              <span className="text-base">🚀</span> Open to work
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground-subtle">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="h-6 w-4 rounded-full border-2 border-border flex items-start justify-center pt-1"
        >
          <span className="h-1.5 w-1 rounded-full bg-foreground-subtle" />
        </motion.div>
      </motion.div>

    </section>
  );
}
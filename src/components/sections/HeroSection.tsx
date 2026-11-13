'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { PointerEvent } from 'react';
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { WhatsApp } from '@/components/ui/WhatsAppIcon';

const profileLinks = [
  { href: 'mailto:ram.rommynya@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://wa.me/261341569729', label: 'WhatsApp', icon: WhatsApp },
  { href: 'https://github.com/rommy-dev', label: 'Github', icon: Github },
  {
    href: 'https://www.linkedin.com/in/ny-aina-rommy-ramaromilanto-50509144b',
    label: 'Linkedin',
    icon: Linkedin,
  },
];

const HEADLINE = ['Architecture et', 'Performance.'];

const EASE = [0.22, 1, 0.36, 1] as const;

const gradientText = {
  background: 'linear-gradient(90deg, #FFB394 0%, #FF956F 18%, #F2C4AF 42%, #FF8B5A 60%, #F2C4AF 78%, #FF956F 100%)',
  backgroundSize: '220% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  animation: 'heroGradientShift 12s ease-in-out infinite alternate',
} as const;

/* Fondu des éléments secondaires, après le titre. */
const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/* Sortie d'un flou sombre vers l'image nette, comme le visuel de paligan. */
const imageReveal = {
  initial: { opacity: 0, scale: 1.18, rotate: -3, filter: 'blur(28px) brightness(0.35)' },
  animate: { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px) brightness(1)' },
  transition: {
    opacity: { duration: 0.9, delay: 0.35, ease: 'easeOut' },
    default: { duration: 2.6, delay: 0.35, ease: EASE },
  },
} as const;

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };

/* Plis de lumière diagonaux qui ondulent lentement, comme un drap derrière le portrait. */
const FOLDS = [
  { left: '-12%', width: '34%', rotate: -24, color: 'rgba(255,255,255,0.16)', duration: 17 },
  { left: '16%', width: '20%', rotate: -18, color: 'rgba(255,255,255,0.28)', duration: 12 },
  { left: '38%', width: '28%', rotate: -27, color: 'rgba(255,149,111,0.12)', duration: 20 },
  { left: '58%', width: '16%', rotate: -21, color: 'rgba(255,255,255,0.24)', duration: 14 },
  { left: '76%', width: '30%', rotate: -25, color: 'rgba(255,255,255,0.14)', duration: 18 },
];

/* Fondu vers le noir sur tous les côtés. */
const EDGE_FADE = 'radial-gradient(closest-side at 50% 46%, #000 35%, transparent 100%)';
const BOTTOM_FADE = 'linear-gradient(to bottom, #000 68%, transparent 98%)';

function Drape({ pointer, className = '' }: { pointer: Pointer; className?: string }) {
  /* Parallaxe légère, à l'opposé du curseur. */
  const x = useTransform(pointer.x, (v) => v * -18);
  const y = useTransform(pointer.y, (v) => v * -12);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ x, y, maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.22),transparent_42%)]" />
      {FOLDS.map((fold) => (
        <motion.div
          key={fold.left}
          className="absolute -top-1/4 h-[150%] blur-2xl"
          style={{
            left: fold.left,
            width: fold.width,
            background: `linear-gradient(90deg, transparent, ${fold.color} 50%, transparent)`,
          }}
          initial={{ rotate: fold.rotate, x: '-6%' }}
          animate={{ rotate: fold.rotate + 5, x: '6%' }}
          transition={{ duration: fold.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  );
}

/* Portrait : son ombre part à l'opposé du curseur. */
function LitAvatar({ pointer, sizes, className = '' }: { pointer: Pointer; sizes: string; className?: string }) {
  const sx = useTransform(pointer.x, (v) => v * -38);
  const sy = useTransform(pointer.y, (v) => v * -26 + 14);
  const shadow = useMotionTemplate`drop-shadow(${sx}px ${sy}px 26px rgba(0,0,0,0.9))`;

  return (
    <motion.div
      className="absolute inset-0 will-change-[filter,transform]"
      style={{ maskImage: BOTTOM_FADE, WebkitMaskImage: BOTTOM_FADE }}
      {...imageReveal}
    >
      <motion.div className="absolute inset-0" style={{ filter: shadow }}>
        <Image
          src="/avatar.png"
          alt="Portrait de Rommy"
          fill
          priority
          sizes={sizes}
          className={`object-cover object-bottom grayscale saturate-0 ${className}`}
        />
      </motion.div>
    </motion.div>
  );
}

/* Chaque ligne du titre monte depuis un masque, l'une après l'autre. */
function Headline({ className }: { className: string }) {
  return (
    <h1 className={`font-black leading-[0.9] tracking-[0.01em] ${className}`}>
      {HEADLINE.map((line, i) => (
        <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className="inline-block"
            style={gradientText}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function Badge() {
  return (
    <span className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--editorial-foreground))]">
      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--editorial-primary))]" />
      Développeur Fullstack
    </span>
  );
}

function Intro({ className = '' }: { className?: string }) {
  return (
    <p className={`max-w-[620px] leading-relaxed text-[hsl(var(--editorial-foreground-muted))] ${className}`}>
      Je transforme des besoins métiers complexes en produits fluides, fiables et orientés croissance. Mon travail
      associe architecture logicielle, interface utilisateur et performance pour livrer des expériences qui inspirent
      confiance.
    </p>
  );
}

function Actions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/projets"
        className="inline-flex items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-primary-fg))] transition-colors hover:bg-[hsl(var(--editorial-primary-strong))] md:px-6"
      >
        Voir les projets
      </Link>
      <a
        href="/cv-rommy-ramaromilanto.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))] md:px-6"
      >
        Télécharger le CV
      </a>
    </div>
  );
}

function ProfileLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 xl:gap-x-8">
      {profileLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          className="group inline-flex items-center gap-2 border-l border-[hsl(var(--editorial-border))] py-2 pl-2 pr-0.5 text-[13px] sm:gap-2.5 sm:pr-1 sm:text-sm font-medium text-[hsl(var(--editorial-foreground))] transition-colors first:border-l-0 first:pl-0 hover:text-[hsl(var(--editorial-primary))] sm:pl-4 lg:pl-5"
        >
          <Icon className="h-4 w-4 text-[hsl(var(--editorial-primary))]" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointer = {
    x: useSpring(rawX, { stiffness: 50, damping: 18 }),
    y: useSpring(rawY, { stiffness: 50, damping: 18 }),
  };

  /* Position du curseur dans la section, ramenée entre -1 et 1. */
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative isolate min-h-dvh overflow-hidden bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]"
      >
        {/* ── Mobile : portrait en fond ── */}
        <div className="absolute inset-0 z-0 overflow-hidden lg:hidden">
          <Drape pointer={pointer} className="-inset-[10%]" />
          <LitAvatar pointer={pointer} sizes="(max-width: 1024px) 100vw, 0vw" className="brightness-[0.55]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />
        </div>

        <div className="relative z-10 mx-auto min-h-dvh w-full px-6 pb-16 pt-12 md:px-12 md:pb-20 lg:px-16 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
            {/* ── Desktop : texte ── */}
            <div className="relative z-10 hidden h-full max-w-[780px] flex-col justify-between pt-10 lg:flex">
              <motion.div {...fadeIn(0.45)}>
                <Badge />
              </motion.div>

              <div>
                <Headline className="text-[clamp(2.5rem,5vw+1rem,6.5rem)]" />
                <motion.div {...fadeIn(0.6)}>
                  <Intro className="mt-8 text-base md:text-lg lg:text-[1.05rem]" />
                </motion.div>
              </div>

              <motion.div {...fadeIn(0.75)} className="flex flex-col gap-8">
                <Actions />
                <ProfileLinks />
              </motion.div>
            </div>

            {/* ── Mobile : texte ── */}
            <div className="relative z-10 flex min-h-[calc(100dvh-10rem)] max-w-[780px] flex-col justify-between lg:hidden">
              <div>
                <motion.div {...fadeIn(0.45)} className="mb-8">
                  <Badge />
                </motion.div>
                <Headline className="text-[clamp(2.5rem,8vw+1rem,6.5rem)]" />
              </div>

              <motion.div {...fadeIn(0.6)} className="mt-8 flex flex-col gap-6">
                <Intro />
                <Actions />
                <ProfileLinks />
              </motion.div>
            </div>

            {/* ── Desktop : portrait sur drapé, sans cadre ── */}
            <div className="relative hidden lg:block">
              <div className="relative h-[74vh] max-h-[780px] w-full">
                <Drape pointer={pointer} className="-inset-x-[30%] -inset-y-[15%]" />
                <LitAvatar pointer={pointer} sizes="(max-width: 1024px) 0vw, 45vw" className="brightness-[0.68] contrast-[1.08]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

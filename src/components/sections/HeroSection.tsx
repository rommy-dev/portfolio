'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
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

/*
 * Les animations d'entrée sont en CSS (globals.css, classes `hero-*`) et non en framer-motion :
 * elles démarrent dès le premier rendu, sans attendre l'hydratation de React. Le texte du hero
 * (élément LCP sur mobile) s'affiche donc sans dépendre du JavaScript.
 */
const gradientText = {
  background: 'linear-gradient(90deg, #FFB394 0%, #FF956F 18%, #F2C4AF 42%, #FF8B5A 60%, #F2C4AF 78%, #FF956F 100%)',
  backgroundSize: '220% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

/* Fondu des éléments secondaires, après le titre. */
const fadeIn = (delay: number) => ({
  className: 'hero-fade',
  style: { animationDelay: `${delay}s` },
});

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
    <m.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ x, y, maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.22),transparent_42%)]" />
      {FOLDS.map((fold) => (
        <div
          key={fold.left}
          className="hero-fold absolute -top-1/4 h-[150%] blur-2xl"
          style={
            {
              left: fold.left,
              width: fold.width,
              background: `linear-gradient(90deg, transparent, ${fold.color} 50%, transparent)`,
              '--fold-from': `${fold.rotate}deg`,
              '--fold-to': `${fold.rotate + 5}deg`,
              animationDuration: `${fold.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </m.div>
  );
}

/* Portrait : son ombre part à l'opposé du curseur. */
function LitAvatar({
  pointer,
  sizes,
  preload = false,
  className = '',
}: {
  pointer: Pointer;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const sx = useTransform(pointer.x, (v) => v * -38);
  const sy = useTransform(pointer.y, (v) => v * -26 + 14);
  const shadow = useMotionTemplate`drop-shadow(${sx}px ${sy}px 26px rgba(0,0,0,0.9))`;

  return (
    /* Sortie d'un flou sombre vers l'image nette (animation CSS `hero-reveal`, composée par le GPU). */
    <div className="hero-reveal absolute inset-0" style={{ maskImage: BOTTOM_FADE, WebkitMaskImage: BOTTOM_FADE }}>
      <m.div className="absolute inset-0" style={{ filter: shadow }}>
        <Image
          src="/avatar.png"
          alt="Portrait de Rommy"
          fill
          priority={preload}
          loading="eager"
          sizes={sizes}
          className={`object-cover object-bottom grayscale saturate-0 ${className}`}
        />
      </m.div>
    </div>
  );
}

/* Chaque ligne du titre monte depuis un masque, l'une après l'autre. */
function Headline({ className }: { className: string }) {
  return (
    <h1 className={`font-black leading-[0.9] tracking-[0.01em] ${className}`}>
      {HEADLINE.map((line, i) => (
        <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <span className="hero-line inline-block" style={{ ...gradientText, animationDelay: `0s, ${0.1 + i * 0.12}s` }}>
            {line}
          </span>
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

  /*
   * Effet de recouvrement : le hero est `sticky`, il ne bouge pas du tout au scroll et la section
   * suivante (placée au-dessus, `z-10`) glisse par-dessus. Le sticky est géré par le navigateur, sans
   * JavaScript, donc sans décalage. Il se fige à sa position de départ (`top-16`, sous le header, comme
   * le `pt-16` du <main>).
   *
   * Si son contenu dépasse la hauteur de l'écran (mobiles courants), il défile d'abord jusqu'à son bas,
   * puis se fige, pour garder l'accès aux boutons et aux liens. Les hauteurs sont en `svh` (écran avec
   * la barre d'adresse affichée) et non en `dvh` : elles ne changent pas quand la barre d'adresse du
   * mobile apparaît ou disparaît au scroll, donc le point de blocage ne saute pas.
   */
  const sectionRef = useRef<HTMLElement>(null);
  const heightRef = useRef(1);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const height = el.offsetHeight;
      heightRef.current = height;
      const overflow = height - parseFloat(getComputedStyle(el).minHeight);
      el.style.top = overflow > 1 ? `calc(100svh - ${height}px)` : '';
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Le hero s'assombrit à mesure qu'il est recouvert (hauteur en cache : aucune lecture du DOM au scroll). */
  const { scrollY } = useScroll();
  const dim = useTransform(scrollY, (v) => Math.min(Math.max(v / heightRef.current, 0), 1) * 0.65);

  /* Une fois entièrement recouvert, le hero n'est plus peint et ses animations sont en pause. */
  useMotionValueEvent(scrollY, 'change', (v) => {
    const el = sectionRef.current;
    if (!el) return;
    const covered = v >= heightRef.current + 64;
    if (covered !== (el.dataset.covered === 'true')) el.dataset.covered = String(covered);
  });

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-sticky sticky top-16 isolate min-h-svh overflow-hidden bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]"
    >
      <div className="relative min-h-svh">
        {/* ── Mobile : portrait en fond ── */}
        <div className="absolute inset-0 z-0 overflow-hidden lg:hidden">
          <Drape pointer={pointer} className="-inset-[10%]" />
          <LitAvatar pointer={pointer} sizes="(max-width: 1023px) 100vw, 0vw" preload className="brightness-[0.55]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />
        </div>

        <div className="relative z-10 mx-auto min-h-svh w-full px-6 pb-16 pt-12 md:px-12 md:pb-20 lg:px-16 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
            {/* ── Desktop : texte ── */}
            <div className="relative z-10 hidden h-full max-w-[780px] flex-col justify-between pt-10 lg:flex">
              <div {...fadeIn(0.45)}>
                <Badge />
              </div>

              <div>
                <Headline className="text-[clamp(2.5rem,5vw+1rem,6.5rem)]" />
                <div {...fadeIn(0.6)}>
                  <Intro className="mt-8 text-base md:text-lg lg:text-[1.05rem]" />
                </div>
              </div>

              <div {...fadeIn(0.75)} className="hero-fade flex flex-col gap-8">
                <Actions />
                <ProfileLinks />
              </div>
            </div>

            {/* ── Mobile : texte ── */}
            <div className="relative z-10 flex min-h-[calc(100svh-10rem)] max-w-[780px] flex-col justify-between lg:hidden">
              <div>
                <div {...fadeIn(0.45)} className="hero-fade mb-8">
                  <Badge />
                </div>
                <Headline className="text-[clamp(2.5rem,8vw+1rem,6.5rem)]" />
              </div>

              <div {...fadeIn(0.6)} className="hero-fade mt-8 flex flex-col gap-6">
                <Intro />
                <Actions />
                <ProfileLinks />
              </div>
            </div>

            {/* ── Desktop : portrait sur drapé, sans cadre ── */}
            <div className="relative hidden lg:block">
              <div className="relative h-[74vh] max-h-[780px] w-full">
                <Drape pointer={pointer} className="-inset-x-[30%] -inset-y-[15%]" />
                <LitAvatar pointer={pointer} sizes="(max-width: 1023px) 0vw, 45vw" className="brightness-[0.68] contrast-[1.08]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voile qui assombrit le hero à mesure qu'il est recouvert. */}
      {!reduceMotion && (
        <m.div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-black" style={{ opacity: dim }} />
      )}
    </section>
  );
}

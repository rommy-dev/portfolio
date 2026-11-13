'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/* Mêmes courbes que la page d'accueil. */
const EASE = [0.22, 1, 0.36, 1] as const;

/* Barre de lecture fine en haut de l'écran, pilotée par le défilement. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-60 h-[2px] origin-left bg-[hsl(var(--editorial-primary))]"
      style={{ scaleX }}
    />
  );
}

const gradientText = {
  background:
    'linear-gradient(90deg, #FFB394 0%, #FF956F 18%, #F2C4AF 42%, #FF8B5A 60%, #F2C4AF 78%, #FF956F 100%)',
  backgroundSize: '220% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  animation: 'heroGradientShift 12s ease-in-out infinite alternate',
} as const;

/* Titre principal : chaque mot monte depuis un masque, comme le titre de l'accueil. */
export function RevealTitle({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="-mb-[0.12em] mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom last:mr-0"
        >
          <motion.span
            className="inline-block"
            style={gradientText}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* Titre de section : monte depuis un masque quand il entre à l'écran. */
export function RevealHeading({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 id={id} className={`scroll-mt-28 ${className}`}>
      {/* Le masque est observé (le texte décalé dessous serait invisible pour l'observateur). */}
      <motion.span
        className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.span
          className="inline-block"
          variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {children}
        </motion.span>
      </motion.span>
    </h2>
  );
}

/* Fondu vers le haut à l'entrée dans l'écran (ou au chargement avec `onMount`). */
export function FadeIn({
  children,
  delay = 0,
  onMount = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  onMount?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const hidden = { opacity: 0, y: reduce ? 0 : 16 };
  const shown = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(onMount
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, amount: 0.15 } })}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Image de couverture : sort d'un flou sombre vers l'image nette, comme le portrait de l'accueil. */
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.06, filter: 'blur(24px) brightness(0.4)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
      transition={{
        opacity: { duration: 0.8, delay: 0.45, ease: 'easeOut' },
        default: { duration: 1.8, delay: 0.45, ease: EASE },
      }}
    >
      {children}
    </motion.div>
  );
}

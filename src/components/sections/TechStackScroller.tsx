'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import type { Dictionary } from '@/i18n/dictionaries/fr';

/* Visuels et technologies ; libellés, descriptions et textes alternatifs viennent du dictionnaire. */
const VISUALS = [
  {
    image: '/images/stack/frontend.jpeg',
    techs: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    image: '/images/stack/backend.jpeg',
    techs: ['Symfony', 'Laravel', 'PHP', 'API Platform', 'Express', 'JWT'],
  },
  {
    image: '/images/stack/data.jpeg',
    techs: ['MySQL', 'MongoDB', 'Doctrine', 'Eloquent'],
  },
  {
    image: '/images/stack/delivery.jpeg',
    techs: ['Docker', 'Git / GitHub', 'PHPUnit', 'Jest', 'Postman', 'Linux'],
  },
];

type Theme = (typeof VISUALS)[number] & Dictionary['techStack']['themes'][number];

const EASE = [0.22, 1, 0.36, 1] as const;

const pad = (n: number) => String(n).padStart(2, '0');

/* Fondu des bords de l'image dans le fond noir, comme les visuels de paligan. */
const IMAGE_MASK = 'radial-gradient(ellipse 72% 68% at 50% 46%, #000 52%, transparent 100%)';

/* Visuel d'un thème : image N&B (nette quand le thème est actif) et ses technologies en dessous. */
function ThemeVisual({ theme, active }: { theme: Theme; active: boolean }) {
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
          sizes="(max-width: 768px) 80vw, 30vw"
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

/* Scroll piloté : la vue reste fixe, le thème change. */
export function TechStackScroller({ themes: texts }: { themes: Dictionary['techStack']['themes'] }) {
  const THEMES: Theme[] = VISUALS.map((visual, i) => ({ ...visual, ...texts[i] }));
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(THEMES.length - 1, Math.max(0, Math.floor(p * THEMES.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const current = THEMES[active];

  return (
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
              <m.div
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
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion';

type CurtainText = {
  eyebrow: string;
  title: string;
  stageLine1: string;
  stageLine2: string;
  portraitAlt: string;
};

/* Bandes du rideau : position et largeur en %, comme le découpage irrégulier de paligan. */
const STRIPS = [
  { left: 0, width: 37.5 },
  { left: 37.5, width: 23.5 },
  { left: 61, width: 20 },
  { left: 81, width: 19 },
];

/* ─── Scène 1 : l'introduction, découpée en bandes ────────── */
function IntroScene({ t }: { t: CurtainText }) {
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
      {/* Gris, contraste et léger flou sont déjà appliqués dans l'image (avatar-curtain.png) :
          la scène est dupliquée dans 4 bandes, ce qui évitait 4 filtres CSS à recalculer. */}
      <Image
        src="/avatar-curtain.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_30%] scale-[1.35] md:object-contain md:scale-[1.15] md:object-[50%_100%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.55)_0%,transparent_35%,transparent_70%,rgba(10,10,10,0.9)_100%)]" />
      <div className="absolute inset-x-0 top-[12%] px-6 text-center md:top-[10%]">
        <p className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
          <span className="text-[hsl(var(--editorial-primary))]">04</span>
          <span className="ml-2">{t.eyebrow}</span>
        </p>
        <h2 className="mt-5 text-balance text-[clamp(2.4rem,6vw+0.5rem,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[hsl(var(--editorial-foreground))]">
          {t.title}
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
  t,
}: {
  t: CurtainText;
  progress: MotionValue<number>;
  index: number;
  left: number;
  width: number;
}) {
  const start = 0.1 + index * 0.08;
  const y = useTransform(progress, [start, start + 0.3], ['0%', '100%']);
  return (
    <m.div
      aria-hidden={index > 0}
      className="absolute inset-0 will-change-transform"
      style={{ y, clipPath: `inset(0 ${100 - left - width}% 0 ${left}%)` }}
    >
      <IntroScene t={t} />
    </m.div>
  );
}

/* ─── Scène 2 : ce qui se révèle derrière le rideau ───────── */
function StageScene({ progress, t }: { progress: MotionValue<number>; t: CurtainText }) {
  const scale = useTransform(progress, [0.1, 0.7], [1.12, 1]);
  const textOpacity = useTransform(progress, [0.45, 0.62], [0, 1]);
  const textY = useTransform(progress, [0.45, 0.62], [24, 0]);
  const inset = useTransform(progress, [0.82, 1], [0, 4]);
  const clipPath = useTransform(inset, (v) => `inset(0 ${v}% 0 ${v}%)`);

  return (
    <m.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
      <m.div className="absolute inset-0" style={{ scale }}>
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
            alt={t.portraitAlt}
            fill
            loading="eager"
            sizes="(max-width: 768px) 70vw, 420px"
            className="object-contain object-bottom contrast-[1.05] saturate-[0.85]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,transparent,rgba(10,10,10,0.85))]" />
      </m.div>

      <m.div
        className="absolute inset-x-0 top-[12%] px-6 text-center md:top-[10%]"
        style={{ opacity: textOpacity, y: textY }}
      >
        <p className="text-balance text-[clamp(1.9rem,4.4vw+0.5rem,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-[hsl(var(--editorial-foreground))]">
          {t.stageLine1}
          <br />
          <span className="font-semibold">{t.stageLine2}</span>
        </p>
      </m.div>
    </m.div>
  );
}

/* ─── Rideau piloté par le scroll ─────────────────────────── */
export function AboutCurtain({ t }: { t: CurtainText }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  return (
    <div ref={trackRef} className="relative h-[300dvh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <StageScene progress={scrollYProgress} t={t} />
        {STRIPS.map((strip, i) => (
          <CurtainStrip key={strip.left} progress={scrollYProgress} index={i} t={t} {...strip} />
        ))}
      </div>
    </div>
  );
}

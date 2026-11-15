import { Reveal } from '@/components/ui/Reveal';
import { TechStackScroller } from './TechStackScroller';

const LEARNING = ['GraphQL', 'Redis', 'Kubernetes', 'GitHub Actions', 'Prisma', 'WebSockets'];

export function TechStack() {
  return (
    <section className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32 lg:px-12">
        <Reveal id="techstack-header" className="grid gap-8 md:grid-cols-[0.3fr_1fr] md:gap-12">
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
        </Reveal>
      </div>

      {/* ── Scroll piloté : la vue reste fixe, le thème change ── */}
      <TechStackScroller />

      {/* ── En veille ── */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10 md:pb-32 lg:px-12">
        <Reveal
          id="techstack-learning"
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
        </Reveal>
      </div>
    </section>
  );
}

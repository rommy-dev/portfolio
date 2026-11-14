import type { LevelInfo } from './types';

/* Niveau écrit en texte (jamais par la seule couleur). Seul « En apprentissage » pulse doucement. */
export function LevelBadge({ level }: { level: LevelInfo }) {
  const dot =
    level.id === 'livre'
      ? 'bg-[hsl(var(--editorial-primary))]'
      : level.id === 'en-projet'
        ? 'bg-[hsl(var(--editorial-foreground))]'
        : 'border border-[hsl(var(--editorial-foreground-muted))] bg-transparent animate-[skillPulse_2.4s_ease-in-out_infinite]';
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[hsl(var(--editorial-foreground-muted))]">
      <span aria-hidden className={`h-2 w-2 rounded-full ${dot}`} />
      {level.label}
    </span>
  );
}

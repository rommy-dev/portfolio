/* Styles partagés des formulaires (contact, brief de projet) : ligne éditoriale Paligan. */

export const labelClass = 'font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]';

export const fieldClass =
  'w-full rounded-[2px] border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-bg))] px-4 text-[0.95rem] text-[hsl(var(--editorial-foreground))] ' +
  'placeholder:text-[hsl(var(--editorial-foreground-muted)/0.45)] transition-colors duration-200 ' +
  'hover:border-[hsl(var(--editorial-foreground-muted)/0.4)] ' +
  'focus:border-[hsl(var(--editorial-primary))] focus:outline-none';

/* Grille de choix à filets fins (objet, budget…). */
export const choiceGridClass =
  'grid gap-px border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-border))]';

export const choiceClass = (active: boolean) =>
  `cursor-pointer px-3 py-3 text-left text-[13px] transition-colors duration-200 focus-visible:relative focus-visible:outline focus-visible:outline-1 focus-visible:outline-[hsl(var(--editorial-primary))] ${
    active
      ? 'bg-[hsl(var(--editorial-primary-soft))] text-[hsl(var(--editorial-primary))]'
      : 'bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground-muted))] hover:bg-[hsl(var(--editorial-surface))] hover:text-[hsl(var(--editorial-foreground))]'
  }`;

export const submitClass =
  'group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[2px] bg-[hsl(var(--editorial-foreground))] text-[0.95rem] font-medium text-[hsl(var(--editorial-bg))] transition-colors duration-200 hover:bg-[hsl(var(--editorial-primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--editorial-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--editorial-bg))] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[hsl(var(--editorial-foreground))]';

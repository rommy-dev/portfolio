/* Couleurs dérivées des données projet (utilisables côté client).
 * Les libellés (accès, contexte) sont traduits dans src/i18n/dictionaries (projectLabels). */

export const accessBadgeClass = (access: string) =>
  access === 'demo+code' || access === 'code'
    ? 'text-primary bg-primary/10 border-primary/25'
    : access === 'site-public'
      ? 'text-secondary-fg bg-secondary/60 border-border'
      : 'text-foreground-muted bg-surface border-border';

export const statusBadgeClass = (status: string) =>
  status === 'Livré'
    ? 'text-success bg-success/10 border-success/20'
    : 'text-warning bg-warning/10 border-warning/20';

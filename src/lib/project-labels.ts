/* Libellés et couleurs dérivés des données projet (utilisables côté client). */

export const ACCESS_LABELS: Record<string, string> = {
  'demo+code': 'Démo + code',
  code: 'Code public',
  'site-public': 'Site public',
  confidentiel: 'Confidentiel',
};

export const ACCESS_DESCRIPTIONS: Record<string, string> = {
  'demo+code': 'Code public et démo en ligne',
  code: 'Code public, pas de démo en ligne',
  'site-public': 'Code confidentiel, site public en ligne',
  confidentiel: 'Code et application confidentiels',
};

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

export const CONTEXT_LABELS: Record<string, string> = {
  personnel: 'Projet personnel',
  stage: 'Stage',
  académique: 'Académique',
};

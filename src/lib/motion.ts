/* Jetons d'animation partagés : n'animer que transform et opacity. */

export const DURATION = {
  short: 0.2,
  normal: 0.4,
  long: 0.7,
} as const;

export const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 26 } as const;

/* Apparition au défilement : décalage de 0,06 s entre éléments, translation Y de 16 px. */
export const STAGGER = 0.06;
export const REVEAL_Y = 16;

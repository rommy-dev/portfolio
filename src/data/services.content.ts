import type { Locale } from '@/i18n/config';
import * as fr from './services';
import * as en from './services.en';

/*
 * Contenu de /services par langue. Le type impose les mêmes exports des deux côtés :
 * un tableau ou un texte oublié dans services.en.ts est une erreur TypeScript.
 */
export type ServicesContent = typeof fr;

const CONTENT: Record<Locale, ServicesContent> = { fr, en };

export const getServices = (locale: Locale): ServicesContent => CONTENT[locale];

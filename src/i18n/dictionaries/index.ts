import type { Locale } from '../config';
import { en } from './en';
import { fr, type Dictionary } from './fr';

/*
 * Côté serveur uniquement : les composants client reçoivent seulement la partie du
 * dictionnaire qui les concerne, en props. Le JavaScript envoyé au navigateur ne
 * contient ainsi qu'une langue.
 */
const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];

export type { Dictionary };

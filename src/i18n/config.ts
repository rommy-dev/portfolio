/*
 * Langues du site. Le français est servi sans préfixe (/services), l'anglais sous /en
 * (/en/services). En interne, toutes les pages vivent sous app/[lang] : le proxy (src/proxy.ts)
 * réécrit les URL publiques vers ces chemins.
 */

export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

/** Cookie posé quand le visiteur choisit une langue avec le sélecteur. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const SITE_URL = 'https://rommy.dev';

export const hasLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** Valeurs `lang` / `hreflang` et Open Graph. */
export const HTML_LANG: Record<Locale, string> = { fr: 'fr', en: 'en' };
export const OG_LOCALE: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' };

/** CV téléchargeable, un fichier par langue dans public/. */
export const CV_PATH: Record<Locale, string> = {
  fr: '/cv-rommy-ramaromilanto-fr.pdf',
  en: '/cv-rommy-ramaromilanto-en.pdf',
};

/** Remplace les `{clé}` d'un texte : format('Projets liés à {name}', { name: 'PHP' }). */
export const format = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

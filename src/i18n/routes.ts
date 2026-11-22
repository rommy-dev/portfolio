import { DEFAULT_LOCALE, LOCALES, SITE_URL, type Locale } from './config';

/*
 * Chemins publics par langue. Le nom des dossiers de app/[lang] est le segment français :
 * /en/projects est servi par app/[lang]/projets. Toute URL interne du site passe par `href()`.
 */

export type RouteKey = 'home' | 'services' | 'projects' | 'skills' | 'contact';

const SEGMENTS: Record<RouteKey, Record<Locale, string>> = {
  home: { fr: '', en: '' },
  services: { fr: 'services', en: 'services' },
  projects: { fr: 'projets', en: 'projects' },
  skills: { fr: 'competences', en: 'skills' },
  contact: { fr: 'contact', en: 'contact' },
};

const prefix = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`);

/** URL publique d'une page : href('en', 'projects', 'tontitrack') → /en/projects/tontitrack. */
export function href(locale: Locale, key: RouteKey, ...rest: string[]): string {
  const path = [SEGMENTS[key][locale], ...rest].filter(Boolean).join('/');
  return `${prefix(locale)}/${path}`.replace(/\/$/, '') || '/';
}

export const projectHref = (locale: Locale, slug: string) => href(locale, 'projects', slug);

const keyForSegment = (locale: Locale, segment: string | undefined): RouteKey | undefined =>
  (Object.keys(SEGMENTS) as RouteKey[]).find((key) => SEGMENTS[key][locale] === (segment ?? ''));

/**
 * Découpe une URL : '/en/projects/x' → { locale: 'en', segments: ['projects', 'x'] }.
 * Accepte aussi le chemin interne réécrit par le proxy ('/fr/services', '/en/projets'),
 * que `usePathname()` renvoie pendant le rendu serveur.
 */
export function parsePath(pathname: string): { locale: Locale; segments: string[] } {
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  if (first && (LOCALES as readonly string[]).includes(first)) {
    return { locale: first as Locale, segments: parts.slice(1) };
  }
  return { locale: DEFAULT_LOCALE, segments: parts };
}

/* Segment public ou interne (nom de dossier) d'une page. */
const keyForPath = (locale: Locale, segment: string | undefined) =>
  keyForSegment(locale, segment) ?? keyForSegment(DEFAULT_LOCALE, segment);

/**
 * Même page dans une autre langue : '/projets/tontitrack' → '/en/projects/tontitrack'.
 * Une page inconnue renvoie vers l'accueil de la langue demandée.
 */
export function localizePath(pathname: string, target: Locale): string {
  const { locale, segments } = parsePath(pathname);
  const key = keyForPath(locale, segments[0]);
  if (!key) return href(target, 'home');
  return href(target, key, ...segments.slice(1));
}

/** URL publique de la page courante, que `pathname` soit public ou interne. */
export function publicPath(pathname: string): string {
  const { locale, segments } = parsePath(pathname);
  const key = keyForPath(locale, segments[0]);
  return key ? href(locale, key, ...segments.slice(1)) : pathname;
}

/** Segment interne (nom de dossier) d'un segment public : 'projects' (en) → 'projets'. */
export function internalSegment(locale: Locale, segment: string): string {
  const key = keyForSegment(locale, segment);
  return key ? SEGMENTS[key][DEFAULT_LOCALE] : segment;
}

/** Segment public d'un segment interne : 'projets' → 'projects' (en). */
export function publicSegment(locale: Locale, segment: string): string | undefined {
  const key = keyForSegment(DEFAULT_LOCALE, segment);
  return key ? SEGMENTS[key][locale] : undefined;
}

/** `alternates` des métadonnées : URL canonique et versions des autres langues. */
export function alternates(locale: Locale, key: RouteKey, ...rest: string[]) {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}${href(l, key, ...rest)}`]),
  ) as Record<Locale, string>;
  return {
    canonical: languages[locale],
    languages: { ...languages, 'x-default': languages[DEFAULT_LOCALE] },
  };
}

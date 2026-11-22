import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/config';

/*
 * Source de vérité unique des projets : le frontmatter des fichiers MDX de
 * src/content/projects. La carte de /projets, la page détail et l'accueil
 * lisent tous ces mêmes données.
 *
 * Version anglaise : src/content/projects/en/<slug>.mdx ne contient que les champs texte
 * (titre, description, légendes, décisions…) et le corps traduit. Il est superposé au
 * fichier français : les champs techniques (stack, URL, images, ordre) restent à un seul
 * endroit. Les tableaux d'objets sont fusionnés élément par élément (metrics[0] anglais
 * complète metrics[0] français). Un fichier anglais manquant fait échouer le build.
 */

export type ProjectAccess = 'demo+code' | 'code' | 'site-public' | 'confidentiel';
export type ProjectContext = 'personnel' | 'stage' | 'académique';

export interface ProjectMetric {
  value: string;
  label: string;
  /** Lien vers le fichier, le dossier ou la commande qui prouve le chiffre. */
  source: string;
  /** Date ou commande de mesure. */
  note?: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
  date: string;
}

export interface ProjectDecision {
  choix: string;
  alternatives: string;
  raison: string;
}

export interface DemoAccount {
  email: string;
  motDePasse: string;
  note?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** Pour qui (ligne « Pour qui » du résumé). */
  audience: string;
  problem: string;
  outcome: string;
  tech: string[];
  hosting: string[];
  category: string;
  year: string;
  status: string;
  period: string;
  context: ProjectContext;
  team: string;
  role: string;
  access: ProjectAccess;
  githubUrl: string | null;
  demoUrl: string | null;
  demoLabel: string | null;
  /** Message affiché quand l'hébergement gratuit ralentit le premier chargement. */
  coldStartNotice: string | null;
  demoAccount: DemoAccount | null;
  metrics: ProjectMetric[];
  screenshots: ProjectScreenshot[];
  cover: string | null;
  diagram: { src: string; alt: string } | null;
  decisions: ProjectDecision[];
  limitations: string[];
  featured: boolean;
  /** false = hors de la grille /projets (ex. portfolio). */
  listed: boolean;
  order: number;
  /** Mentions « [À COMPLÉTER : …] » trouvées dans le fichier. */
  todos: string[];
  /** Corps MDX sans frontmatter. */
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/projects');
const localeDir = (locale: Locale) =>
  locale === DEFAULT_LOCALE ? CONTENT_DIR : path.join(CONTENT_DIR, locale);
const TODO_PATTERN = /\[À COMPLÉTER\s*:\s*([^\]]+)\]/g;

const MAX_TECH = 6;

const asString = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : value == null ? fallback : String(value);

const asNullableString = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? value : null;

const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/* Superpose la traduction au frontmatter de base (voir le commentaire en tête de fichier). */
function overlay(base: unknown, translation: unknown): unknown {
  if (translation === undefined) return base;
  if (Array.isArray(base) && Array.isArray(translation)) {
    return translation.map((item, i) => (isObject(base[i]) && isObject(item) ? { ...base[i], ...item } : item));
  }
  if (isObject(base) && isObject(translation)) return { ...base, ...translation };
  return translation;
}

function readSource(fileName: string, locale: Locale) {
  const slug = fileName.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8');
  const base = matter(raw);
  if (locale === DEFAULT_LOCALE) return { slug, raw, data: base.data, content: base.content };

  const translatedPath = path.join(localeDir(locale), fileName);
  if (!fs.existsSync(translatedPath)) {
    throw new Error(`[projects] ${slug} : traduction manquante (${path.relative(process.cwd(), translatedPath)}).`);
  }
  const translatedRaw = fs.readFileSync(translatedPath, 'utf8');
  const translated = matter(translatedRaw);
  const data: Record<string, unknown> = { ...base.data };
  for (const [key, value] of Object.entries(translated.data)) data[key] = overlay(base.data[key], value);
  /* Les mentions de brouillon des deux fichiers comptent. */
  return { slug, raw: `${raw}\n${translatedRaw}`, data, content: translated.content };
}

function parseProject(fileName: string, locale: Locale): Project {
  const { slug, raw, data, content } = readSource(fileName, locale);

  const todos = [...raw.matchAll(TODO_PATTERN)].map((m) => m[1].trim());
  const tech = asArray<string>(data.tech);

  if (tech.length > MAX_TECH) {
    throw new Error(`[projects] ${slug} : ${tech.length} technologies (max ${MAX_TECH}).`);
  }

  return {
    slug,
    title: asString(data.title),
    description: asString(data.description),
    audience: asString(data.audience),
    problem: asString(data.problem),
    outcome: asString(data.outcome),
    tech,
    hosting: asArray<string>(data.hosting),
    category: asString(data.category),
    year: asString(data.year),
    status: asString(data.status),
    period: asString(data.period),
    context: asString(data.context, 'personnel') as ProjectContext,
    team: asString(data.team),
    role: asString(data.role),
    access: asString(data.access, 'confidentiel') as ProjectAccess,
    githubUrl: asNullableString(data.githubUrl),
    demoUrl: asNullableString(data.demoUrl),
    demoLabel: asNullableString(data.demoLabel),
    coldStartNotice: asNullableString(data.coldStartNotice),
    // Une chaîne (ex. « [À COMPLÉTER : …] ») signifie « pas encore de compte ».
    demoAccount:
      data.demoAccount && typeof data.demoAccount === 'object'
        ? (data.demoAccount as DemoAccount)
        : null,
    metrics: asArray<ProjectMetric>(data.metrics),
    screenshots: asArray<ProjectScreenshot>(data.screenshots),
    cover: asNullableString(data.cover),
    diagram: (data.diagram as Project['diagram'] | undefined) ?? null,
    decisions: asArray<ProjectDecision>(data.decisions),
    limitations: asArray<string>(data.limitations),
    featured: data.featured === true,
    listed: data.listed !== false,
    order: typeof data.order === 'number' ? data.order : 99,
    todos,
    content,
  };
}

/** En production, un projet qui contient encore un [À COMPLÉTER] n'est pas publié. */
export const isPublishable = (project: Project) => project.todos.length === 0;
const showDrafts = process.env.NODE_ENV !== 'production';

const cache = new Map<Locale, Project[]>();

function loadAll(locale: Locale): Project[] {
  const cached = cache.get(locale);
  if (cached && !showDrafts) return cached;
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  const projects = files.map((f) => parseProject(f, locale)).sort((a, b) => a.order - b.order);
  cache.set(locale, projects);
  return projects;
}

/** Tous les projets visibles dans cet environnement (brouillons inclus en dev). */
export function getAllProjects(locale: Locale = DEFAULT_LOCALE): Project[] {
  return loadAll(locale).filter((p) => showDrafts || isPublishable(p));
}

/** Projets de la grille /projets, triés par `order`. */
export function getListedProjects(locale: Locale = DEFAULT_LOCALE): Project[] {
  return getAllProjects(locale).filter((p) => p.listed);
}

export function getFeaturedProjects(locale: Locale = DEFAULT_LOCALE): Project[] {
  return getListedProjects(locale).filter((p) => p.featured);
}

export function getProjectBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): Project | undefined {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return getAllProjects(locale).find((p) => p.slug.toLowerCase() === normalized);
}

/** Version sérialisable (sans le corps MDX) pour les composants client. */
export type ProjectSummary = Omit<Project, 'content'>;
export const toSummary = (project: Project): ProjectSummary => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...rest } = project;
  return rest;
};

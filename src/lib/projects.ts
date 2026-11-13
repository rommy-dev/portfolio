import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/*
 * Source de vérité unique des projets : le frontmatter des fichiers MDX de
 * src/content/projects. La carte de /projets, la page détail et l'accueil
 * lisent tous ces mêmes données.
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
const TODO_PATTERN = /\[À COMPLÉTER\s*:\s*([^\]]+)\]/g;

const MAX_TECH = 6;

const asString = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : value == null ? fallback : String(value);

const asNullableString = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? value : null;

const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

function parseProject(fileName: string): Project {
  const slug = fileName.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);

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

let cache: Project[] | null = null;

function loadAll(): Project[] {
  if (cache && !showDrafts) return cache;
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  cache = files.map(parseProject).sort((a, b) => a.order - b.order);
  return cache;
}

/** Tous les projets visibles dans cet environnement (brouillons inclus en dev). */
export function getAllProjects(): Project[] {
  return loadAll().filter((p) => showDrafts || isPublishable(p));
}

/** Projets de la grille /projets, triés par `order`. */
export function getListedProjects(): Project[] {
  return getAllProjects().filter((p) => p.listed);
}

export function getFeaturedProjects(): Project[] {
  return getListedProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return getAllProjects().find((p) => p.slug.toLowerCase() === normalized);
}

/*
 * Statistiques partagées entre /projets et l'accueil, calculées sur les mêmes
 * données (le portfolio, non listé, n'est jamais compté).
 */
export function getProjectStats() {
  const listed = getListedProjects();
  return {
    total: listed.length,
    delivered: listed.filter((p) => p.status === 'Livré').length,
    verifiable: listed.filter((p) => p.access === 'demo+code').length,
    institutional: listed.filter((p) => p.context === 'stage').length,
  };
}

/** Version sérialisable (sans le corps MDX) pour les composants client. */
export type ProjectSummary = Omit<Project, 'content'>;
export const toSummary = (project: Project): ProjectSummary => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...rest } = project;
  return rest;
};

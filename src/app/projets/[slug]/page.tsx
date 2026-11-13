import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Github, Lock, TriangleAlert } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';
import { getAllProjects, getListedProjects, getProjectBySlug } from '@/lib/projects';
import { ACCESS_DESCRIPTIONS, ACCESS_LABELS, CONTEXT_LABELS } from '@/lib/project-labels';
import { ColdStartNotice, getProjectMdxComponents } from '@/components/project/ProjectSections';
import {
  FadeIn,
  ImageReveal,
  ReadingProgress,
  RevealHeading,
  RevealTitle,
} from '@/components/project/EditorialMotion';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Projet non trouvé' };

  const images = project.cover ? [{ url: project.cover, alt: project.title }] : undefined;
  return {
    // Le suffixe « | Ny Aina Rommy Ramaromilanto » vient du template du layout.
    title: project.title,
    description: project.description,
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.description,
      url: `/projets/${project.slug}`,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

/* ── Découpage du MDX en sections « ## Titre » ── */

type Section = { id: string; title: string; body: string };

const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/* Chaque titre de niveau 2 devient une rangée numérotée ; les blocs de code sont ignorés. */
function splitSections(content: string): { intro: string; sections: Section[] } {
  const sections: Section[] = [];
  const intro: string[] = [];
  let current: Section | null = null;
  let inFence = false;

  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    const heading = !inFence && /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      current = { id: slugify(heading[1]), title: heading[1], body: '' };
      sections.push(current);
    } else if (current) {
      current.body += `${line}\n`;
    } else {
      intro.push(line);
    }
  }
  return { intro: intro.join('\n').trim(), sections };
}

/* ── Classes partagées (palette éditoriale de l'accueil) ── */

const CONTAINER = 'mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12';
const GRID = 'grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16';
const LABEL =
  'font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]';
const BTN_PRIMARY =
  'inline-flex items-center gap-2 border border-[hsl(var(--editorial-primary))] bg-[hsl(var(--editorial-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-primary-fg))] transition-colors hover:bg-[hsl(var(--editorial-primary-strong))]';
const BTN_GHOST =
  'inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]';

const pad = (n: number) => String(n).padStart(2, '0');

export default async function ProjetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const listed = getListedProjects();
  const idx = listed.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? listed[idx - 1] : null;
  const next = idx >= 0 && idx < listed.length - 1 ? listed[idx + 1] : null;

  const { intro, sections } = splitSections(project.content);
  const total = pad(sections.length);
  const components = { ...mdxComponents, ...getProjectMdxComponents(project) };
  const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };

  const facts: [string, string][] = [
    ['Période', project.period],
    ['Contexte', CONTEXT_LABELS[project.context] ?? project.context],
    ['Équipe', project.team],
    ['Accès', ACCESS_DESCRIPTIONS[project.access]],
    ['Hébergement', project.hosting.join(', ')],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <div className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      <ReadingProgress />

      {project.todos.length > 0 && (
        <div className="border-b border-[hsl(var(--warning)/0.3)] bg-[hsl(var(--warning)/0.1)]">
          <div className={`${CONTAINER} py-3 text-sm`}>
            <p className="flex items-center gap-2 font-semibold">
              <TriangleAlert className="h-4 w-4 text-[hsl(var(--warning))]" />
              Brouillon : {project.todos.length} élément(s) à compléter. Page masquée en production.
            </p>
            <ul className="mt-1 list-disc pl-6 text-xs text-[hsl(var(--editorial-foreground-muted))]">
              {project.todos.map((todo, i) => (
                <li key={i}>{todo}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── En-tête ── */}
      <header className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_10%,rgba(255,255,255,0.09),transparent_45%),radial-gradient(ellipse_at_15%_0%,rgba(255,149,111,0.08),transparent_40%)]"
        />
        <div className={`${CONTAINER} pb-14 pt-14 md:pb-20 md:pt-24`}>
          <div className={GRID}>
            <FadeIn onMount delay={0.35} className="flex flex-col gap-1.5 font-mono text-[11px] lg:pt-4">
              <Link
                href="/projets"
                className="group mb-4 inline-flex w-fit items-center gap-1.5 uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-primary))]"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                Tous les projets
              </Link>
              <p className="text-[hsl(var(--editorial-primary))]">
                Projets / {project.category}
              </p>
              <p className="text-[hsl(var(--editorial-foreground-muted))]">{project.year}</p>
              <p className="text-[hsl(var(--editorial-foreground-muted))]">
                {project.status} · {ACCESS_LABELS[project.access]}
              </p>
              <p className="text-[hsl(var(--editorial-foreground-muted))]">
                {CONTEXT_LABELS[project.context] ?? project.context}
              </p>
            </FadeIn>

            <div className="min-w-0">
              <RevealTitle
                text={project.title}
                className="text-[clamp(2.75rem,6vw+1rem,6.25rem)] font-black leading-[0.95] tracking-[-0.05em]"
              />
              <FadeIn onMount delay={0.45}>
                <p className="mt-8 max-w-[44rem] text-lg font-light leading-relaxed text-[hsl(var(--editorial-foreground-muted))] md:text-2xl md:leading-[1.4]">
                  {project.description}
                </p>
              </FadeIn>
              <FadeIn onMount delay={0.6} className="mt-10 flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>
                    <Github className="h-4 w-4" /> Voir le code
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                    {project.demoLabel ?? 'Voir la démo'} <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {!project.githubUrl && (
                  <span className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] px-5 py-3 text-sm text-[hsl(var(--editorial-foreground-muted))]">
                    <Lock className="h-3.5 w-3.5" /> Code source confidentiel
                  </span>
                )}
              </FadeIn>
              {project.coldStartNotice && (
                <FadeIn onMount delay={0.7} className="mt-4 max-w-xl">
                  <ColdStartNotice message={project.coldStartNotice} />
                </FadeIn>
              )}
            </div>
          </div>
        </div>

        {project.cover && (
          <div className={`${CONTAINER} pb-16 md:pb-24`}>
            <ImageReveal className="overflow-hidden border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))]">
              <Image
                src={project.cover}
                alt={
                  project.screenshots.find((s) => s.src === project.cover)?.alt ??
                  `Capture de ${project.title}`
                }
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="aspect-video w-full object-cover object-top"
              />
            </ImageReveal>
          </div>
        )}
      </header>

      {/* ── Fiche projet et sommaire ── */}
      <section className="border-t border-[hsl(var(--editorial-border))]">
        <div className={`${CONTAINER} py-14 md:py-20`}>
          <div className={GRID}>
            <p className={LABEL}>Fiche projet</p>
            <FadeIn className="min-w-0">
              <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 xl:grid-cols-3">
                {facts.map(([label, value]) => (
                  <div key={label} className="border-t border-[hsl(var(--editorial-border))] py-4">
                    <dt className={LABEL}>{label}</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed">{value}</dd>
                  </div>
                ))}
                <div className="border-t border-[hsl(var(--editorial-border))] py-4 sm:col-span-2 xl:col-span-3">
                  <dt className={LABEL}>Rôle</dt>
                  <dd className="mt-1.5 max-w-3xl text-[0.95rem] leading-relaxed">{project.role}</dd>
                </div>
                <div className="border-y border-[hsl(var(--editorial-border))] py-4 sm:col-span-2 xl:col-span-3">
                  <dt className={LABEL}>Stack</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))] px-2.5 py-1 font-mono text-[11px] text-[hsl(var(--editorial-foreground))]"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <nav aria-label="Sommaire" className="mt-12">
                <p className={`${LABEL} mb-4`}>Sommaire</p>
                <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {sections.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-baseline gap-3 border-b border-[hsl(var(--editorial-border)/0.6)] py-2.5 text-[0.95rem] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-foreground))]"
                      >
                        <span className="font-mono text-[11px] text-[hsl(var(--editorial-primary))]">
                          {pad(i + 1)}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </FadeIn>
          </div>
        </div>
      </section>

      {intro && (
        <div className={CONTAINER}>
          <MDXRemote source={intro} components={components} options={mdxOptions} />
        </div>
      )}

      {/* ── Sections numérotées ── */}
      {sections.map((section, i) => (
        <section
          key={section.id}
          aria-labelledby={section.id}
          className="border-t border-[hsl(var(--editorial-border))]"
        >
          <div className={`${CONTAINER} py-16 md:py-24`}>
            <div className={GRID}>
              <div>
                <p className="font-mono text-xs lg:sticky lg:top-28" aria-hidden>
                  <span className="text-[hsl(var(--editorial-primary))]">{pad(i + 1)}</span>
                  <span className="text-[hsl(var(--editorial-foreground-muted))]"> / {total}</span>
                </p>
              </div>
              <div className="min-w-0 max-w-3xl">
                {/* Le bloc de contact porte déjà son propre grand titre. */}
                <RevealHeading
                  id={section.id}
                  className={
                    section.id === 'contact'
                      ? 'sr-only'
                      : 'mb-8 text-3xl font-black tracking-[-0.05em] md:text-[2.6rem] md:leading-[1.05]'
                  }
                >
                  {section.title}
                </RevealHeading>
                <FadeIn delay={0.1}>
                  <MDXRemote source={section.body} components={components} options={mdxOptions} />
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Navigation entre projets ── */}
      {(prev || next) && (
        <nav aria-label="Autres projets" className="border-t border-[hsl(var(--editorial-border))]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
            {prev ? (
              <Link
                href={`/projets/${prev.slug}`}
                className="group flex flex-col gap-3 border-b border-[hsl(var(--editorial-border))] px-6 py-12 transition-colors hover:bg-[hsl(var(--editorial-surface))] md:border-b-0 md:border-r md:px-10 lg:px-12"
              >
                <span className={LABEL}>← Projet précédent</span>
                <span className="text-2xl font-black tracking-[-0.05em] transition-colors group-hover:text-[hsl(var(--editorial-primary))] md:text-4xl">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="hidden md:block md:border-r md:border-[hsl(var(--editorial-border))]" />
            )}
            {next && (
              <Link
                href={`/projets/${next.slug}`}
                className="group flex flex-col items-end gap-3 px-6 py-12 text-right transition-colors hover:bg-[hsl(var(--editorial-surface))] md:px-10 lg:px-12"
              >
                <span className={LABEL}>Projet suivant →</span>
                <span className="text-2xl font-black tracking-[-0.05em] transition-colors group-hover:text-[hsl(var(--editorial-primary))] md:text-4xl">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Lock, Calendar, Tag } from 'lucide-react';
import { ALL_PROJECTS, getProjectBySlug } from '@/data/projects';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';

/* ─── Tech color map (même que ProjectCard) ─────────────── */
const TECH_COLORS: Record<string, string> = {
  'React':        'bg-sky-500/10 text-sky-500 border-sky-500/20',
  'Next.js':      'bg-foreground/8 text-foreground border-border',
  'TypeScript':   'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Node.js':      'bg-green-500/10 text-green-500 border-green-500/20',
  'MySQL':        'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'Symfony 7':    'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'API Platform': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'Stripe':       'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'MongoDB':      'bg-green-600/10 text-green-600 border-green-600/20',
  'Socket.io':    'bg-gray-500/10 text-foreground-muted border-border',
  'Prisma':       'bg-teal-500/10 text-teal-500 border-teal-500/20',
  'Framer Motion':'bg-pink-500/10 text-pink-500 border-pink-500/20',
};
const techColor = (t: string) =>
  TECH_COLORS[t] ?? 'bg-surface text-foreground-muted border-border';

/* ─── generateStaticParams ──────────────────────────────── */
export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function ProjetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const project = getProjectBySlug(normalizedSlug);
  if (!project) notFound();

  /* Projets adjacents */
  const idx = ALL_PROJECTS.findIndex(
    (p) => p.slug.trim().toLowerCase() === normalizedSlug
  );
  const prev = ALL_PROJECTS[idx - 1] ?? null;
  const next = ALL_PROJECTS[idx + 1] ?? null;

  const contentDir = path.join(process.cwd(), 'src/content/projects');
  const mdxPath = path.join(contentDir, `${normalizedSlug}.mdx`);
  const mdPath = path.join(contentDir, `${normalizedSlug}.md`);
  const contentPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(contentPath)) notFound();

  const fileContents = fs.readFileSync(contentPath, 'utf8');
  const { content } = matter(fileContents);

  return (
    <main className="min-h-screen bg-background">

      {/* ── Gradient header ── */}
      <section
        className={`relative pt-2 md:pt-32 pb-16 bg-linear-to-br ${project.gradient} border-b border-border overflow-hidden`}
      >
        {/* Grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6">
          {/* Back link */}
          <Link
            href="/projets"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Retour aux projets
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${project.accentColor}`}>
              {project.category}
            </span>
            <span className="text-foreground-subtle">·</span>
            <span className="inline-flex items-center gap-1 text-xs text-foreground-muted font-mono">
              <Calendar className="h-3 w-3" /> {project.year}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${project.statusColor}`}>
              {project.status}
            </span>
            {project.private && (
              <span className="inline-flex items-center gap-1 rounded-full bg-background/70 border border-border px-2.5 py-0.5 text-[10px] font-semibold text-foreground-muted">
                <Lock className="h-2.5 w-2.5" /> Privé
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl leading-relaxed">
            {project.description}
          </p>

          {/* CTA links */}
          <div className="flex items-center gap-3 mt-8">
            {project.private ? (
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 backdrop-blur-sm px-4 py-2.5 text-sm text-foreground-muted">
                <Lock className="h-3.5 w-3.5" /> Code source confidentiel
              </span>
            ) : (
              <>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Github className="h-4 w-4" /> Voir le code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" /> Voir la démo
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto max-w-4xl px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">

        {/* Main content — MDX ou placeholder */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">

          {/* Stack */}
          <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground-subtle">
              <Tag className="h-3.5 w-3.5" /> Stack technique
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`text-[11px] font-semibold border rounded-md px-2 py-0.5 ${techColor(t)}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Project info */}
          <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">Informations</p>
            <dl className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-foreground-muted">Année</dt>
                <dd className="font-semibold text-foreground font-mono">{project.year}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-muted">Catégorie</dt>
                <dd className={`font-semibold ${project.accentColor}`}>{project.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-muted">Statut</dt>
                <dd>
                  <span className={`text-[11px] font-semibold rounded-full border px-2 py-0.5 ${project.statusColor}`}>
                    {project.status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-muted">Code source</dt>
                <dd className="font-semibold text-foreground">
                  {project.private ? '🔒 Privé' : '✓ Public'}
                </dd>
              </div>
            </dl>
          </div>

        </aside>
      </section>

      {/* ── Prev / Next navigation ── */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="h-px bg-border mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/projets/${prev.slug}`}
              className="group flex flex-col gap-1 rounded-xl border border-border bg-surface p-5 hover:border-primary/40 transition-colors"
            >
              <span className="text-xs text-foreground-subtle">← Projet précédent</span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next && (
            <Link
              href={`/projets/${next.slug}`}
              className="group flex flex-col gap-1 rounded-xl border border-border bg-surface p-5 hover:border-primary/40 transition-colors text-right"
            >
              <span className="text-xs text-foreground-subtle">Projet suivant →</span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </section>

    </main>
  );
}

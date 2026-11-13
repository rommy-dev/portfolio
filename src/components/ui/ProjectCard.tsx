import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import type { ProjectSummary } from '@/lib/projects';
import { ACCESS_LABELS, accessBadgeClass, statusBadgeClass } from '@/lib/project-labels';
import { getTechnologyColor } from '@/lib/technology-colors';

const MAX_CARD_TECH = 4;

/* Carte de /projets : tout vient du frontmatter du MDX. */
export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-primary/30 hover:shadow-primary-md"
    >
      <div className="relative aspect-video overflow-hidden border-b border-border bg-background">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm ${accessBadgeClass(project.access)}`}>
            {project.access === 'confidentiel' && <Lock className="mr-1 inline h-2.5 w-2.5" />}
            {ACCESS_LABELS[project.access]}
          </span>
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm ${statusBadgeClass(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-foreground-muted">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.slice(0, MAX_CARD_TECH).map((t) => (
            <span
              key={t}
              className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${getTechnologyColor(t)}`}
            >
              {t}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1 border-t border-border pt-3 text-sm font-semibold text-primary">
          Lire l&apos;étude de cas
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

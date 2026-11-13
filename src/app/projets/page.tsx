import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { WhatsApp } from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/contact';
import { getListedProjects, getProjectStats, toSummary } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projets',
  description:
    'Études de cas : projets avec démo et code public, et projets réalisés en stage pour des institutions malgaches.',
};

export default function ProjetsPage() {
  const projects = getListedProjects();
  const stats = getProjectStats();

  const groups = [
    {
      title: 'Projets vérifiables (code public)',
      intro: 'Le code est public, et la démo est en ligne quand elle est encore disponible.',
      items: projects.filter((p) => p.access === 'demo+code' || p.access === 'code'),
    },
    {
      title: 'Projets institutionnels (confidentiels)',
      intro: 'Réalisés en stage. Le code reste privé ; seuls les éléments publics sont montrés.',
      items: projects.filter((p) => p.access === 'site-public' || p.access === 'confidentiel'),
    },
  ].filter((group) => group.items.length > 0);

  const statItems = [
    { value: stats.delivered, label: stats.delivered > 1 ? 'projets livrés' : 'projet livré' },
    { value: stats.verifiable, label: 'avec démo et code' },
    { value: stats.institutional, label: stats.institutional > 1 ? 'institutionnels' : 'institutionnel' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/8 blur-[80px]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground-subtle">
            Réalisations
          </span>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
                Projets
              </h1>
              <p className="mt-3 max-w-lg text-foreground-muted">
                Chaque étude de cas part d&apos;un problème, montre la solution et dit ce qui est
                vérifiable : démo, code, tests, ou ce qui reste confidentiel.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              {statItems.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-primary">{value}</p>
                  <p className="text-xs text-foreground-subtle">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <div className="mb-6 border-b border-border pb-3">
            <h2 className="text-xl font-bold text-foreground">{group.title}</h2>
            <p className="mt-1 text-sm text-foreground-muted">{group.intro}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((project) => (
              <ProjectCard key={project.slug} project={toSummary(project)} />
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div className="relative flex flex-col gap-1">
            <p className="text-lg font-bold text-foreground">Vous avez un projet en tête ?</p>
            <p className="max-w-md text-sm text-foreground-muted">
              Je suis disponible pour de nouvelles missions. Parlons-en.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary-hover"
            >
              Me contacter <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
            >
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

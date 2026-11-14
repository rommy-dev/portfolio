import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight, Mail } from 'lucide-react';
import { WhatsApp } from '@/components/ui/WhatsAppIcon';
import { ProjectsIndex } from '@/components/project/ProjectsIndex';
import { FadeIn } from '@/components/project/EditorialMotion';
import { CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/contact';
import { getListedProjects, toSummary } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projets',
  description:
    'Études de cas : projets avec démo et code public, et projets réalisés en stage pour des institutions malgaches.',
};

export default function ProjetsPage() {
  const projects = getListedProjects().map(toSummary);

  return (
    <div className="min-h-screen bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      <ProjectsIndex projects={projects} />

      {/* ── Appel à l'action ── */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <FadeIn className="flex flex-col gap-8">
          <p className="text-3xl font-black tracking-[-0.05em] md:text-5xl">
            Vous avez un projet en tête ?{' '}
            <span className="text-[hsl(var(--editorial-primary))]">Parlons-en.</span>
          </p>
          <p className="-mt-3 max-w-lg text-lg font-light leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
            Je suis disponible pour de nouvelles missions.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-primary))] bg-[hsl(var(--editorial-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-primary-fg))] transition-colors hover:bg-[hsl(var(--editorial-primary-strong))]"
            >
              Me contacter <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]"
            >
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]"
            >
              <Mail className="h-4 w-4" /> E-mail
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

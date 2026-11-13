'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ALL_PROJECTS } from '@/data/projects';

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE },
  }),
} as const;
const viewed = new Set<string>();
const inView = (key: string, delay = 0) => ({
  initial: viewed.has(key) ? false : 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
  variants: fadeUp,
  custom: delay,
  onViewportEnter: () => {
    viewed.add(key);
  },
});

export function FeaturedProjects() {
  const projects = ALL_PROJECTS.slice(0, 3);

  return (
    <section className="bg-[hsl(var(--editorial-bg))] py-24 text-[hsl(var(--editorial-foreground))]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <motion.div {...inView('featured-header', 0)} className="mb-12 flex flex-col gap-4">
          <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
            <span className="text-[hsl(var(--editorial-primary))]">03</span>
            <span className="ml-2">Réalisations</span>
          </span>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.06em] text-[hsl(var(--editorial-foreground))] md:text-4xl">
                Projets en vedette
              </h2>
            </div>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-primary))]"
            >
              Tous les projets
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        <div className="divide-y divide-[hsl(var(--editorial-border))] border-t border-[hsl(var(--editorial-border))]">
          {projects.map((project, index) => {
            const links = [
              project.demoUrl && {
                href: project.demoUrl,
                label: 'Live',
              },
              project.githubUrl && {
                href: project.githubUrl,
                label: 'GitHub',
              },
              { href: `/projets/${project.slug}`, label: 'Case study' },
            ].filter(Boolean) as { href: string; label: string }[];

            return (
              <motion.article
                key={project.id}
                {...inView(`project-${project.slug}`, 0.08 * index)}
                className="group py-8 lg:py-10"
              >
                <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8 lg:grid-cols-[1.4fr_0.9fr]">
                  <div className="overflow-hidden border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface))]">
                    <div className="relative h-64 w-full overflow-hidden bg-[hsl(var(--editorial-surface-strong))] md:h-72 lg:h-80">
                      <Image
                        src={project.headerImage || project.screenshotImages[0]}
                        alt={project.title}
                        width={1200}
                        height={760}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 42vw"
                        className="h-full w-full object-cover grayscale contrast-[1.04] brightness-[0.9] saturate-0 transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="mb-4 flex items-center justify-between gap-3 border-b border-[hsl(var(--editorial-border))] pb-3">
                      <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--editorial-primary))]">
                        {project.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[hsl(var(--editorial-foreground-muted))]">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black tracking-[-0.06em] text-[hsl(var(--editorial-foreground))] md:text-4xl">
                      {project.title}
                    </h3>

                    <div className="mt-5 space-y-4 text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))] md:text-[0.95rem]">
                      <div>
                        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]">
                          Problématique
                        </p>
                        <p className='text-[hsl(var(--editorial-foreground))]'>
                          {project.description.length > 180
                            ? `${project.description.slice(0, 180)}...`
                            : project.description}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]">
                          Solution
                        </p>
                        <p className='text-[hsl(var(--editorial-foreground))]'>
                          Une architecture pensée pour la performance, la fiabilité et une expérience de produit claire,
                          avec un niveau d’automatisation adapté à la réalité métier.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4">
                    <div className="w-full text-sm text-[hsl(var(--editorial-foreground-muted))]">
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground))]">
                        Stack
                      </span>
                      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-[hsl(var(--editorial-foreground-muted))] md:text-[12px]">
                        {project.tech.map((tech, i) => (
                          <span key={tech} className="inline-flex items-center">
                            <span className="underline decoration-dotted underline-offset-4">{tech}</span>
                            {i < project.tech.length - 1 && <span className="ml-2 text-[hsl(var(--editorial-foreground-muted))]"> </span>}
                          </span>
                        ))}
                      </p>
                    </div>

                  <div className="flex w-full flex-wrap items-center justify-between gap-4 pt-8 lg:pt-10">
                    <Link
                      href={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-primary))] transition-colors hover:text-[hsl(var(--editorial-primary-strong))]"
                    >
                      Étude de cas
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>

                    <div className="flex items-center justify-center gap-4">
                      {links
                        .filter(({ label }) => label !== 'Case study')
                        .map(({ href, label }) => (
                          <Link
                            key={label}
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noreferrer' : undefined}
                            className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-primary))]"
                          >
                            {label}
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div {...inView('featured-cta', 0.4)} className="mt-12 flex justify-center">
          <Link
            href="/projets"
            className="inline-flex items-center justify-center border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]"
          >
            Voir tous les projets
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

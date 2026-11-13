import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, Clock, ExternalLink, KeyRound, Lightbulb, Mail } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/contact';
import { WhatsApp } from '@/components/ui/WhatsAppIcon';
import { ProjectGallery } from './ProjectGallery';

/*
 * Blocs utilisés dans les fichiers MDX (<Summary />, <Gallery />, …).
 * Ils lisent le frontmatter du projet : le texte MDX garde les titres et la
 * prose, les données restent à un seul endroit.
 */

/* Palette éditoriale de l'accueil (fond sombre, angles droits, accent orange). */
const FG = 'text-[hsl(var(--editorial-foreground))]';
const MUTED = 'text-[hsl(var(--editorial-foreground-muted))]';
const ACCENT = 'text-[hsl(var(--editorial-primary))]';
const LINE = 'border-[hsl(var(--editorial-border))]';
const LABEL = `font-mono text-[11px] uppercase tracking-[0.2em] ${MUTED}`;
const BTN_PRIMARY =
  'inline-flex items-center gap-2 border border-[hsl(var(--editorial-primary))] bg-[hsl(var(--editorial-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-primary-fg))] transition-colors hover:bg-[hsl(var(--editorial-primary-strong))]';
const BTN_GHOST =
  'inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]';

const pad = (n: number) => String(n).padStart(2, '0');

export function ColdStartNotice({ message }: { message: string }) {
  return (
    <p className={`flex items-start gap-2.5 border-l-2 border-[hsl(var(--warning))] bg-[hsl(var(--editorial-surface))] px-4 py-3 text-xs leading-relaxed ${MUTED}`}>
      <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--warning))]" />
      {message}
    </p>
  );
}

export function DemoAccountCard({ project }: { project: Project }) {
  const account = project.demoAccount;
  if (!account) return null;
  return (
    <div className={`border ${LINE} bg-[hsl(var(--editorial-surface))] p-5 text-sm`}>
      <p className={`mb-3 flex items-center gap-2 ${LABEL}`}>
        <KeyRound className={`h-3.5 w-3.5 ${ACCENT}`} /> Compte de démo
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
        <dt className={MUTED}>E-mail</dt>
        <dd className={`break-all font-mono ${FG}`}>{account.email}</dd>
        <dt className={MUTED}>Mot de passe</dt>
        <dd className={`font-mono ${FG}`}>{account.motDePasse}</dd>
      </dl>
      {account.note && <p className={`mt-3 text-xs ${MUTED}`}>{account.note}</p>}
    </div>
  );
}

function Block({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 first:mt-0 last:mb-0">{children}</div>;
}

export function getProjectMdxComponents(project: Project) {
  return {
    /* Lecture rapide : trois lignes, libellé à gauche, texte de lecture à droite. */
    Summary: () => (
      <Block>
        <dl className={`border-b ${LINE}`}>
          {[
            ['Pour qui', project.audience],
            ['Problème', project.problem],
            ['Résultat', project.outcome],
          ].map(([label, value]) => (
            <div key={label} className={`grid gap-2 border-t ${LINE} py-5 sm:grid-cols-[8rem_1fr] sm:gap-6`}>
              <dt className={`${LABEL} sm:pt-1.5`}>{label}</dt>
              <dd className={`text-lg font-light leading-relaxed md:text-xl ${FG}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </Block>
    ),

    Gallery: () => <ProjectGallery projectTitle={project.title} screenshots={project.screenshots} />,

    /* Chiffres en grand, chacun avec sa source. */
    Metrics: () =>
      project.metrics.length === 0 ? null : (
        <Block>
          <ul className={`grid grid-cols-1 border-t ${LINE} sm:grid-cols-2`}>
            {project.metrics.map((metric) => (
              <li key={metric.label} className={`flex flex-col gap-2 border-b ${LINE} py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6`}>
                <span className={`text-5xl font-black tracking-[-0.05em] ${ACCENT}`}>{metric.value}</span>
                <span className={`text-[0.95rem] leading-snug ${FG}`}>{metric.label}</span>
                <a
                  href={metric.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-1 inline-flex w-fit items-center gap-1 font-mono text-[11px] ${MUTED} underline decoration-dotted underline-offset-4 transition-colors hover:text-[hsl(var(--editorial-primary))]`}
                >
                  Source{metric.note ? ` · ${metric.note}` : ''}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </Block>
      ),

    TryIt: () =>
      !project.demoUrl ? null : (
        <Block>
          <div className="flex max-w-xl flex-col gap-4">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} w-fit`}>
              {project.demoLabel ?? 'Voir la démo'} <ArrowUpRight className="h-4 w-4" />
            </a>
            {project.coldStartNotice && <ColdStartNotice message={project.coldStartNotice} />}
            <DemoAccountCard project={project} />
          </div>
        </Block>
      ),

    /* La décision clé reste visible ; le reste est replié. */
    TechDetails: ({ children }: { children: ReactNode }) => {
      const key = project.decisions[0];
      return (
        <>
          {key && (
            <div className="not-prose my-8 border-l-2 border-[hsl(var(--editorial-primary))] pl-6">
              <p className={`mb-2 flex items-center gap-2 ${LABEL}`}>
                <Lightbulb className={`h-3.5 w-3.5 ${ACCENT}`} /> Décision clé
              </p>
              <p className={`text-xl font-light leading-snug md:text-2xl ${FG}`}>{key.choix}</p>
              <p className={`mt-3 leading-relaxed ${MUTED}`}>{key.raison}</p>
            </div>
          )}
          <details className={`group not-prose my-8 border-y ${LINE}`}>
            <summary className={`flex cursor-pointer list-none items-center justify-between gap-3 py-5 text-sm font-semibold uppercase tracking-[0.18em] ${FG} transition-colors hover:text-[hsl(var(--editorial-primary))] [&::-webkit-details-marker]:hidden`}>
              <span>Afficher les détails techniques</span>
              <span aria-hidden className={`text-xl font-light ${ACCENT} transition-transform duration-300 group-open:rotate-45`}>
                +
              </span>
            </summary>
            <div className={`border-t ${LINE} pb-8 pt-10`}>{children}</div>
          </details>
        </>
      );
    },

    KeyDecisions: () => (
      <Block>
        <ol className={`border-t ${LINE}`}>
          {project.decisions.map((d, i) => (
            <li key={d.choix} className={`grid gap-3 border-b ${LINE} py-6 sm:grid-cols-[3rem_1fr]`}>
              <span className={`font-mono text-xs ${ACCENT}`}>{pad(i + 1)}</span>
              <dl className="grid gap-3 text-[0.95rem] leading-relaxed">
                <div>
                  <dt className={LABEL}>Choix</dt>
                  <dd className={`mt-1 ${FG}`}>{d.choix}</dd>
                </div>
                <div>
                  <dt className={LABEL}>Alternatives écartées</dt>
                  <dd className={`mt-1 ${MUTED}`}>{d.alternatives}</dd>
                </div>
                <div>
                  <dt className={LABEL}>Raison</dt>
                  <dd className={`mt-1 ${MUTED}`}>{d.raison}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </Block>
    ),

    Diagram: () =>
      !project.diagram ? null : (
        <Block>
          <figure className={`overflow-hidden border ${LINE} bg-white`}>
            <Image
              src={project.diagram.src}
              alt={project.diagram.alt}
              width={920}
              height={410}
              className="h-auto w-full"
              unoptimized
            />
          </figure>
        </Block>
      ),

    Limitations: () => (
      <Block>
        <ol className={`border-t ${LINE}`}>
          {project.limitations.map((item, i) => (
            <li key={item} className={`grid grid-cols-[2.5rem_1fr] gap-2 border-b ${LINE} py-4 text-[0.98rem] leading-relaxed ${MUTED}`}>
              <span className={`pt-0.5 font-mono text-xs ${ACCENT}`}>{pad(i + 1)}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </Block>
    ),

    ContactBlock: () => <ContactBlock />,
  };
}

export function ContactBlock() {
  return (
    <div className="not-prose my-2 flex flex-col gap-8">
      <div>
        <p className={`text-3xl font-black tracking-[-0.05em] md:text-5xl ${FG}`}>
          Un besoin similaire ? <span className={ACCENT}>Parlons-en.</span>
        </p>
        <p className={`mt-4 max-w-lg text-lg font-light leading-relaxed ${MUTED}`}>
          Décrivez votre projet via le formulaire, WhatsApp ou e-mail.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/contact" className={BTN_PRIMARY}>
          Me contacter <ArrowUpRight className="h-4 w-4" />
        </Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>
          <WhatsApp className="h-4 w-4" /> WhatsApp
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} className={BTN_GHOST}>
          <Mail className="h-4 w-4" /> E-mail
        </a>
      </div>
    </div>
  );
}

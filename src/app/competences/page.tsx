import type { Metadata } from 'next';
import { getListedProjects } from '@/lib/projects';
import {
  DOMAINS,
  LANGUAGES,
  LEVELS,
  LEVEL_ORDER,
  SKILLS,
  hasTodo,
} from '@/data/skills';
import type { ResolvedSkill } from '@/components/skills/types';
import { SkillsBoard } from '@/components/skills/SkillsBoard';
import { MagneticLink } from '@/components/skills/MagneticLink';
import { FadeIn, RevealTitle } from '@/components/project/EditorialMotion';
import { CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Compétences',
  description:
    'Compétences backend, frontend, données, tests et déploiement, chacune reliée au projet qui la prouve.',
};

const isProd = process.env.NODE_ENV === 'production';
const CONTAINER = 'mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12';
const LABEL =
  'font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))]';

export default function CompetencesPage() {
  /* Titres et liens des projets lus dans les MDX : rien n'est saisi à la main ici. */
  const projects = new Map(getListedProjects().map((p) => [p.slug, p]));

  const projectRef = (slug: string) => {
    const project = projects.get(slug);
    if (!project) {
      // Un projet non publié (brouillon) ne peut pas servir de preuve.
      if (!isProd) console.warn(`[competences] projet introuvable ou non publié : ${slug}`);
      return null;
    }
    return { slug, title: project.title, href: `/projets/${slug}`, isStage: project.context === 'stage' };
  };

  const skills: ResolvedSkill[] = SKILLS.map((skill) => ({
    ...skill,
    evidence: skill.evidence.flatMap((e) => {
      const ref = projectRef(e.projectSlug);
      return ref ? [{ ...ref, label: e.label, codeHref: e.href ?? null }] : [];
    }),
  })).filter((s) => s.level === 'apprentissage' || s.evidence.length > 0);

  /* Brouillon : les langues sont affichées en développement, publiées une fois les niveaux renseignés. */
  const languagesReady = LANGUAGES.every((l) => !hasTodo(l.level));

  return (
    <div className="relative isolate min-h-screen bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">

      {/* ── En-tête (même style que /projets) ── */}
      <header className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.09),transparent_45%),radial-gradient(ellipse_at_10%_10%,rgba(255,149,111,0.08),transparent_40%)]"
        />
        <div className={`${CONTAINER} pb-12 pt-16 md:pb-16 md:pt-28`}>
          <RevealTitle
            text="Compétences"
            className="text-[clamp(3rem,6vw+1rem,6rem)] font-black leading-[0.95] tracking-[-0.05em]"
          />
          <FadeIn onMount delay={0.3}>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[hsl(var(--editorial-foreground-muted))] md:text-xl">
              Chaque compétence renvoie au projet qui la prouve, ou est marquée « En apprentissage ».
            </p>
          </FadeIn>
        </div>
      </header>

      <SkillsBoard
        skills={skills}
        domains={DOMAINS}
        levels={LEVEL_ORDER.map((id) => ({ id, ...LEVELS[id] }))}
      />

      {/* ── Langues : publiées seulement une fois les niveaux renseignés ── */}
      {(languagesReady || !isProd) && (
        <section aria-labelledby="langues" className="border-t border-[hsl(var(--editorial-border))]">
          <div className={`${CONTAINER} grid gap-8 py-16 md:py-24 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16`}>
            <p className={LABEL}>Langues</p>
            <FadeIn>
              <h2 id="langues" className="sr-only">
                Langues
              </h2>
              <ul className="grid gap-x-10 border-t border-[hsl(var(--editorial-border))] sm:grid-cols-3">
                {LANGUAGES.map((lang) => (
                  <li key={lang.name} className="border-b border-[hsl(var(--editorial-border))] py-5">
                    <p className="text-2xl font-black tracking-[-0.04em]">{lang.name}</p>
                    <p className="mt-1 flex items-baseline gap-3 text-[hsl(var(--editorial-foreground-muted))]">
                      {lang.level}
                      {lang.cefr && (
                        <abbr
                          title={`Niveau ${lang.cefr} du Cadre européen commun de référence pour les langues`}
                          className="border border-[hsl(var(--editorial-border))] px-1.5 font-mono text-[11px] no-underline text-[hsl(var(--editorial-primary))]"
                        >
                          {lang.cefr}
                        </abbr>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section className="border-t border-[hsl(var(--editorial-border))]">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <FadeIn className="flex flex-col gap-8">
            <p className="text-3xl font-black tracking-[-0.05em] md:text-5xl">
              Un projet à construire ?{' '}
              <span className="text-[hsl(var(--editorial-primary))]">Parlons-en.</span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticLink href="/contact" variant="primary" arrow>
                Me contacter
              </MagneticLink>
              <MagneticLink href="/services" arrow>
                Offres et tarifs
              </MagneticLink>
              <MagneticLink href={WHATSAPP_URL} external icon="whatsapp">
                WhatsApp
              </MagneticLink>
              <MagneticLink href={`mailto:${CONTACT_EMAIL}`} icon="mail">
                E-mail
              </MagneticLink>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

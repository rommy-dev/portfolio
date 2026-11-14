import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Plus, TriangleAlert } from 'lucide-react';
import { WhatsApp } from '@/components/ui/WhatsAppIcon';
import { BriefForm } from '@/components/services/BriefForm';
import { WorkProcess } from '@/components/services/WorkProcess';
import { FadeIn, RevealHeading, RevealTitle } from '@/components/project/EditorialMotion';
import { getListedProjects } from '@/lib/projects';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/contact';
import { Draft, IS_PROD, countMarkers, isPublishable } from '@/lib/draft';
import * as services from '@/data/services';
import {
  AFTER_DELIVERY,
  BOOKING_LINK,
  BRIEF_INTRO,
  CLIENT_EXPECTATIONS,
  COMMUNICATION,
  FAQ,
  INTERNATIONAL,
  INTERNATIONAL_INTRO,
  LEGAL,
  OFFERS,
  PAYMENT_METHODS,
  PAYMENT_NOTES,
  PAYMENT_SCHEDULE,
  PRICING_NOTES,
  SCOPE,
  WORK_STEPS,
  type Fact,
  type Offer,
} from '@/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Applications de gestion, tableaux de bord et API sur mesure pour PME et organisations, à Madagascar puis à l’international. Devis écrit, paiement par étapes, livraison avec démonstration.',
};

/* ── Classes partagées (mêmes que les pages projet) ── */

const CONTAINER = 'mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12';
const GRID = 'grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16';
const LABEL = 'font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]';
const MUTED = 'text-[hsl(var(--editorial-foreground-muted))]';
const RULE = 'border-[hsl(var(--editorial-border))]';
const LINK =
  'text-[hsl(var(--editorial-primary))] transition-colors hover:text-[hsl(var(--editorial-primary-strong))]';
const BTN_PRIMARY =
  'group inline-flex h-12 items-center gap-2 rounded-[2px] bg-[hsl(var(--editorial-foreground))] px-6 text-[0.95rem] font-medium text-[hsl(var(--editorial-bg))] transition-colors hover:bg-[hsl(var(--editorial-primary))]';
const BTN_GHOST =
  'inline-flex h-12 items-center gap-2 rounded-[2px] border border-[hsl(var(--editorial-border))] px-5 text-[0.95rem] text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]';

const pad = (n: number) => String(n).padStart(2, '0');

const SECTIONS = [
  { id: 'offres', label: 'Ce que je livre', title: 'Ce que je livre.' },
  { id: 'tarifs', label: 'Tarifs', title: 'Tarifs à Madagascar.' },
  { id: 'international', label: 'International', title: 'Missions à l’international.' },
  { id: 'deroule', label: 'Méthode', title: 'Comment se déroule un projet.' },
  { id: 'paiement', label: 'Paiement', title: 'Paiement.' },
  { id: 'engagements', label: 'Engagements', title: 'Périmètre, modifications et propriété du code.' },
  { id: 'apres', label: 'Après la livraison', title: 'Après la livraison.' },
  { id: 'communication', label: 'Communication', title: 'Communication.' },
  { id: 'faq', label: 'Questions', title: 'Questions fréquentes.' },
  { id: 'brief', label: 'Brief', title: 'Parlons de votre projet.' },
] as const;
type SectionId = (typeof SECTIONS)[number]['id'];

/* ── Briques de mise en page ── */

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const index = SECTIONS.findIndex((s) => s.id === id);
  const { label, title } = SECTIONS[index];
  return (
    <section aria-labelledby={id} className={`border-t ${RULE}`}>
      <div className={`${CONTAINER} py-16 md:py-24`}>
        <div className={GRID}>
          <p className="font-mono text-xs lg:sticky lg:top-28 lg:self-start">
            <span className="text-[hsl(var(--editorial-primary))]">{pad(index + 1)}</span>
            <span className={MUTED}>
              {' '}
              / {pad(SECTIONS.length)} · {label}
            </span>
          </p>
          <div className="min-w-0">
            <RevealHeading
              id={id}
              className="mb-10 max-w-3xl text-3xl font-semibold tracking-[-0.05em] md:mb-12 md:text-[2.6rem] md:leading-[1.05]"
            >
              {title}
            </RevealHeading>
            <FadeIn delay={0.1}>{children}</FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Liste « libellé / texte » à filets ; les lignes incomplètes disparaissent en production. */
function FactList({ facts, children }: { facts: Fact[]; children?: ReactNode }) {
  return (
    <dl className={`max-w-3xl border-t ${RULE}`}>
      {children}
      {facts.filter((f) => isPublishable(f.text)).map((fact) => (
        <FactRow key={fact.label} label={fact.label}>
          <Draft text={fact.text} />
        </FactRow>
      ))}
    </dl>
  );
}

function FactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={`grid gap-1 border-b ${RULE} py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6`}>
      <dt className={`${LABEL} sm:pt-[3px]`}>{label}</dt>
      <dd className="text-[0.95rem] leading-relaxed">{children}</dd>
    </div>
  );
}

/* Tableau éditorial : vrai <table> sur écran large, fiches empilées sur mobile. */
function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  const visible = rows.filter((row) => row.every(isPublishable));
  return (
    <>
      <table className="hidden w-full text-left md:table">
        <thead>
          <tr className={`border-y ${RULE}`}>
            {head.map((h, i) => (
              <th key={h} scope="col" className={`${LABEL} py-3 pr-6 font-normal ${i === 0 ? 'w-[38%]' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => (
            <tr key={row[0]} className={`border-b ${RULE} align-top`}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`py-4 pr-6 text-[0.95rem] leading-relaxed ${i === 0 ? 'font-medium' : MUTED}`}
                >
                  <Draft text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className={`border-t ${RULE} md:hidden`}>
        {visible.map((row) => (
          <li key={row[0]} className={`border-b ${RULE} py-4`}>
            <p className="font-medium">
              <Draft text={row[0]} />
            </p>
            <dl className="mt-2 grid gap-1.5">
              {row.slice(1).map((cell, i) => (
                <div key={i} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 text-sm">
                  <dt className={LABEL}>{head[i + 1]}</dt>
                  <dd className={MUTED}>
                    <Draft text={cell} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

function Notes({ notes }: { notes: string[] }) {
  return (
    <ul className="mt-8 grid max-w-3xl gap-3">
      {notes.filter(isPublishable).map((note) => (
        <li key={note} className={`flex gap-3 text-[0.95rem] leading-relaxed ${MUTED}`}>
          <span aria-hidden className="pt-[2px] font-mono text-xs text-[hsl(var(--editorial-primary))]">
            —
          </span>
          <span>
            <Draft text={note} />
          </span>
        </li>
      ))}
    </ul>
  );
}

type ProjectLink = { slug: string; title: string; note: string };

function OfferRow({ offer, index, refs }: { offer: Offer; index: number; refs: ProjectLink[] }) {
  return (
    <article
      id={`offre-${pad(index + 1)}`}
      className={`group relative grid scroll-mt-28 gap-8 border-b ${RULE} py-10 md:grid-cols-[minmax(0,1fr)_17rem] md:gap-12 md:py-12`}
    >
      {/* Ligne orange au survol, comme les offres de l'accueil. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[hsl(var(--editorial-primary))] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />

      <div className="min-w-0">
        <p className="font-mono text-[11px]">
          <span className="text-[hsl(var(--editorial-primary))]">{pad(index + 1)}</span>
          <span className={`ml-2 ${MUTED}`}>{offer.label}</span>
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] md:text-[2rem] md:leading-[1.1]">
          {offer.title}
        </h3>

        <dl className="mt-6 grid gap-5">
          {offer.forWho && (
            <div>
              <dt className={LABEL}>Pour qui</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>
                <Draft text={offer.forWho} />
              </dd>
            </div>
          )}
          {offer.problem && (
            <div>
              <dt className={LABEL}>Le problème</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>{offer.problem}</dd>
            </div>
          )}
          {offer.body && (
            <div>
              <dt className={LABEL}>Ce qui est inclus</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>
                <Draft text={offer.body} />
              </dd>
            </div>
          )}
          {offer.billing && (
            <div>
              <dt className={LABEL}>Mode de facturation</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>{offer.billing}</dd>
            </div>
          )}
          {offer.deliverables && (
            <div>
              <dt className={LABEL}>Ce que vous recevez</dt>
              <dd className="mt-2">
                <ul className="grid gap-2">
                  {offer.deliverables.filter(isPublishable).map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-[hsl(var(--editorial-primary))]" />
                      <span>
                        <Draft text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Fiche prix */}
      <aside className={`flex flex-col gap-5 self-start border-t ${RULE} pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0`}>
        <div>
          <p className={LABEL}>Prix</p>
          <p className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-[hsl(var(--editorial-primary))]">
            <Draft text={offer.price} />
          </p>
          {offer.priceNote && (
            <p className={`mt-1 text-sm leading-relaxed ${MUTED}`}>
              <Draft text={offer.priceNote} />
            </p>
          )}
        </div>
        {offer.duration && (
          <div>
            <p className={LABEL}>Délai indicatif</p>
            <p className="mt-1.5">{offer.duration}</p>
          </div>
        )}
        {refs.length > 0 && (
          <div>
            <p className={LABEL}>{refs.length > 1 ? 'Réalisations comparables' : 'Réalisation comparable'}</p>
            <ul className="mt-2 grid gap-2.5">
              {refs.map((ref) => (
                <li key={ref.slug} className="text-sm leading-snug">
                  <Link href={`/projets/${ref.slug}`} className={`inline-flex items-center gap-1 font-medium ${LINK}`}>
                    {ref.title}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className={`block ${MUTED}`}>
                    <Draft text={ref.note} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </article>
  );
}

/* ── Page ── */

export default function ServicesPage() {
  /* Titres des projets lus dans les MDX ; un projet non publié n'est pas cité. */
  const projects = new Map(getListedProjects().map((p) => [p.slug, p.title]));
  const resolveRefs = (offer: Offer): ProjectLink[] =>
    offer.references.flatMap((r) => {
      const title = projects.get(r.slug);
      return title && isPublishable(r.note) ? [{ slug: r.slug, title, note: r.note }] : [];
    });

  const markers = IS_PROD ? 0 : countMarkers([JSON.stringify(services)]);
  const bookingReady = isPublishable(BOOKING_LINK);

  return (
    <div className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      {markers > 0 && (
        <div className="border-b border-[hsl(var(--warning)/0.3)] bg-[hsl(var(--warning)/0.1)]">
          <p className={`${CONTAINER} flex items-center gap-2 py-3 text-sm font-semibold`}>
            <TriangleAlert className="h-4 w-4 shrink-0 text-[hsl(var(--warning))]" />
            Brouillon : {markers} mention(s) à confirmer ou compléter dans src/data/services.ts. Les lignes « À
            COMPLÉTER » sont masquées en production.
          </p>
        </div>
      )}

      {/* ── En-tête ── */}
      <header className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.09),transparent_45%),radial-gradient(ellipse_at_10%_10%,rgba(255,149,111,0.08),transparent_40%)]"
        />
        <div className={`${CONTAINER} pb-16 pt-16 md:pb-24 md:pt-28`}>
          <div className={GRID}>
            <FadeIn onMount delay={0.3} className="lg:pt-5">
              <p className="font-mono text-xs">
                <span className="text-[hsl(var(--editorial-primary))]">Services</span>
                <span className={`ml-2 ${MUTED}`}>Madagascar · International</span>
              </p>
            </FadeIn>
            <div className="min-w-0">
              <RevealTitle
                text="Travaillons ensemble."
                className="text-[clamp(3rem,6vw+1rem,6rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
              />
              <FadeIn onMount delay={0.4}>
                <p className={`mt-8 max-w-[44rem] text-lg font-light leading-relaxed md:text-2xl md:leading-[1.4] ${MUTED}`}>
                  Je développe des applications web sur mesure qui remplacent les fichiers Excel, les cahiers et
                  les échanges par message : suivi des données, tableaux de bord, exports PDF et Excel, comptes
                  avec rôles.
                </p>
                <p className={`mt-5 max-w-xl leading-relaxed ${MUTED}`}>
                  Cette page indique ce que je livre, à quel prix, comment un projet se déroule et comment le
                  paiement s’organise.
                </p>
              </FadeIn>
              <FadeIn onMount delay={0.55} className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#brief" className={BTN_PRIMARY}>
                  Décrire mon projet
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <a href="#tarifs" className={BTN_GHOST}>
                  Voir les tarifs
                </a>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Sommaire */}
        <nav aria-label="Sommaire de la page" className={`border-t ${RULE}`}>
          <div className={`${CONTAINER} py-10`}>
            <div className={GRID}>
              <p className={LABEL}>Sommaire</p>
              <FadeIn onMount delay={0.65}>
                <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 xl:grid-cols-3">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`group flex items-baseline gap-3 border-b ${RULE} py-2.5 text-[0.95rem] ${MUTED} transition-colors hover:text-[hsl(var(--editorial-foreground))]`}
                      >
                        <span className="font-mono text-[11px] text-[hsl(var(--editorial-primary))]">
                          {pad(i + 1)}
                        </span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </FadeIn>
            </div>
          </div>
        </nav>
      </header>

      {/* ── 01 Offres ── */}
      <Section id="offres">
        <div className={`border-t ${RULE}`}>
          {OFFERS.map((offer, i) => (
            <OfferRow key={offer.id} offer={offer} index={i} refs={resolveRefs(offer)} />
          ))}
        </div>
      </Section>

      {/* ── 02 Tarifs ── */}
      <Section id="tarifs">
        <DataTable
          head={['Offre', 'Prix', 'Délai indicatif']}
          rows={OFFERS.map((o) => [o.title, `${o.price} (${o.priceNote?.split(' · ')[0]})`, o.duration ?? ''])}
        />
        <p className="mt-10 font-mono text-xs text-[hsl(var(--editorial-primary))]">Comment le prix est fixé</p>
        <Notes notes={PRICING_NOTES} />
      </Section>

      {/* ── 03 International ── */}
      <Section id="international">
        <p className={`mb-8 max-w-2xl text-lg font-light leading-relaxed ${MUTED}`}>{INTERNATIONAL_INTRO}</p>
        <FactList facts={INTERNATIONAL} />
      </Section>

      {/* ── 04 Déroulé ── */}
      <Section id="deroule">
        <div className="max-w-3xl">
          <WorkProcess steps={WORK_STEPS} />
          <div className="mt-14 border-l-2 border-[hsl(var(--editorial-primary))] pl-5">
            <p className="font-mono text-xs text-[hsl(var(--editorial-primary))]">Ce que j’attends de vous</p>
            <p className={`mt-2 leading-relaxed ${MUTED}`}>
              <Draft text={CLIENT_EXPECTATIONS} />
            </p>
          </div>
        </div>
      </Section>

      {/* ── 05 Paiement ── */}
      <Section id="paiement">
        <p className="mb-4 font-mono text-xs text-[hsl(var(--editorial-primary))]">Échéancier</p>
        <DataTable
          head={['Montant du projet', 'Échéancier']}
          rows={PAYMENT_SCHEDULE.map((r) => [r.amount, r.schedule])}
        />
        <p className="mb-4 mt-12 font-mono text-xs text-[hsl(var(--editorial-primary))]">Moyens de paiement</p>
        <DataTable head={['Clients', 'Moyens acceptés']} rows={PAYMENT_METHODS.map((r) => [r.clients, r.methods])} />
        <Notes notes={PAYMENT_NOTES} />
      </Section>

      {/* ── 06 Engagements ── */}
      <Section id="engagements">
        <FactList facts={SCOPE} />
      </Section>

      {/* ── 07 Après la livraison ── */}
      <Section id="apres">
        <FactList facts={AFTER_DELIVERY} />
      </Section>

      {/* ── 08 Communication ── */}
      <Section id="communication">
        <FactList facts={COMMUNICATION}>
          <FactRow label="Canaux">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            {' · '}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
              {CONTACT_EMAIL}
            </a>
            {' · '}visioconférence sur demande.
          </FactRow>
        </FactList>
      </Section>

      {/* ── 09 FAQ ── */}
      <Section id="faq">
        <div className={`max-w-3xl border-t ${RULE}`}>
          {FAQ.map((item) => (
            <details key={item.question} className={`group border-b ${RULE}`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-[-0.02em] transition-colors hover:text-[hsl(var(--editorial-primary))] [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus className="h-4 w-4 shrink-0 text-[hsl(var(--editorial-primary))] transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className={`-mt-1 pb-6 pr-10 leading-relaxed ${MUTED}`}>
                <Draft text={item.answer} />
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* ── 10 Brief ── */}
      <Section id="brief">
        <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-16">
          <div className="max-w-2xl">
            <p className={`mb-10 text-lg font-light leading-relaxed ${MUTED}`}>
              <Draft text={BRIEF_INTRO} />
            </p>
            <BriefForm />
          </div>

          <aside className="xl:pt-1">
            <p className={`border-b ${RULE} pb-3 ${LABEL}`}>Contact direct</p>
            <ul>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 border-b ${RULE} py-4`}
                >
                  <WhatsApp className="h-4 w-4 text-[hsl(var(--editorial-primary))]" />
                  <span className="flex-1 transition-colors group-hover:text-[hsl(var(--editorial-primary))]">
                    {WHATSAPP_DISPLAY}
                  </span>
                  <ArrowUpRight className={`h-4 w-4 ${MUTED}`} />
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`group flex items-center gap-3 border-b ${RULE} py-4`}>
                  <Mail className="h-4 w-4 text-[hsl(var(--editorial-primary))]" />
                  <span className="min-w-0 flex-1 break-all transition-colors group-hover:text-[hsl(var(--editorial-primary))]">
                    {CONTACT_EMAIL}
                  </span>
                  <ArrowUpRight className={`h-4 w-4 ${MUTED}`} />
                </a>
              </li>
              {bookingReady && (
                <li className={`border-b ${RULE} py-4 text-sm`}>
                  <span className={LABEL}>Réserver un appel</span>
                  <p className="mt-1">
                    {BOOKING_LINK.startsWith('http') ? (
                      <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" className={LINK}>
                        Choisir un créneau
                      </a>
                    ) : (
                      <Draft text={BOOKING_LINK} />
                    )}
                  </p>
                </li>
              )}
            </ul>
          </aside>
        </div>
      </Section>

      {/* ── Informations légales ── */}
      <footer className={`border-t ${RULE}`}>
        <div className={`${CONTAINER} py-10`}>
          <div className={GRID}>
            <p className={LABEL}>Informations légales</p>
            <div className={`grid gap-1 text-sm ${MUTED}`}>
              {LEGAL.filter(isPublishable).map((line) => (
                <p key={line}>
                  <Draft text={line} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

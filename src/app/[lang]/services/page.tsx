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
import { getServices } from '@/data/services.content';
import type { Fact, Offer } from '@/data/services';
import { format, type Locale } from '@/i18n/config';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';
import { alternates, projectHref } from '@/i18n/routes';
import { resolveLocale, type LangParams } from '@/i18n/server';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { title, description } = getDictionary(lang).meta.services;
  return { title, description, alternates: alternates(lang, 'services') };
}

type ServicesText = Dictionary['services'];

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

/* Ordre des sections ; ancres, libellés et titres viennent du dictionnaire. */
const SECTIONS = [
  'offers',
  'pricing',
  'remote',
  'process',
  'payment',
  'scope',
  'after',
  'communication',
  'faq',
  'brief',
] as const satisfies readonly (keyof ServicesText['sections'])[];
type SectionId = (typeof SECTIONS)[number];

/* ── Briques de mise en page ── */

function Section({ id, t, children }: { id: SectionId; t: ServicesText; children: ReactNode }) {
  const index = SECTIONS.indexOf(id);
  const { anchor, label, title } = t.sections[id];
  return (
    <section aria-labelledby={anchor} className={`border-t ${RULE}`}>
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
              id={anchor}
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
      {facts.filter((f) => isPublishable(f.text)).map((fact) => {
        /* Un texte sur plusieurs lignes (ex. une ligne par langue) devient une liste à puces. */
        const lines = fact.text.split('\n');
        return (
          <FactRow key={fact.label} label={fact.label}>
            {lines.length > 1 ? (
              lines.map((line, i) => (
                <span key={line} className={`block${i > 0 ? ' mt-1' : ''}`}>
                  - <Draft text={line.trim()} />
                </span>
              ))
            ) : (
              <Draft text={fact.text} />
            )}
          </FactRow>
        );
      })}
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

function OfferRow({
  offer,
  index,
  refs,
  lang,
  t,
}: {
  offer: Offer;
  index: number;
  refs: ProjectLink[];
  lang: Locale;
  t: ServicesText['offer'];
}) {
  return (
    <article
      id={`${t.anchor}-${pad(index + 1)}`}
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
              <dt className={LABEL}>{t.forWho}</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>
                <Draft text={offer.forWho} />
              </dd>
            </div>
          )}
          {offer.problem && (
            <div>
              <dt className={LABEL}>{t.problem}</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>{offer.problem}</dd>
            </div>
          )}
          {offer.body && (
            <div>
              <dt className={LABEL}>{t.included}</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>
                <Draft text={offer.body} />
              </dd>
            </div>
          )}
          {offer.billing && (
            <div>
              <dt className={LABEL}>{t.billing}</dt>
              <dd className={`mt-1.5 leading-relaxed ${MUTED}`}>{offer.billing}</dd>
            </div>
          )}
          {offer.deliverables && (
            <div>
              <dt className={LABEL}>{t.deliverables}</dt>
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
          <p className={LABEL}>{t.price}</p>
          <p className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-[hsl(var(--editorial-primary))]">
            <Draft text={offer.price} />
          </p>
          {offer.priceEquiv && (
            <p className={`mt-1 text-sm leading-relaxed ${MUTED}`}>
              <Draft text={offer.priceEquiv} />
            </p>
          )}
          {offer.priceNote && (
            <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
              <Draft text={offer.priceNote} />
            </p>
          )}
        </div>
        {offer.duration && (
          <div>
            <p className={LABEL}>{t.duration}</p>
            <p className="mt-1.5">{offer.duration}</p>
          </div>
        )}
        {refs.length > 0 && (
          <div>
            <p className={LABEL}>{refs.length > 1 ? t.refsMany : t.refsOne}</p>
            <ul className="mt-2 grid gap-2.5">
              {refs.map((ref) => (
                <li key={ref.slug} className="text-sm leading-snug">
                  <Link href={projectHref(lang, ref.slug)} className={`inline-flex items-center gap-1 font-medium ${LINK}`}>
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

export default async function ServicesPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const t = dict.services;
  const services = getServices(lang);
  const {
    AFTER_DELIVERY,
    BRIEF_INTRO,
    BUDGETS,
    CLIENT_EXPECTATIONS,
    COMMUNICATION,
    FAQ,
    LEGAL,
    OFFERS,
    PAYMENT_METHODS,
    PAYMENT_NOTES,
    PAYMENT_SCHEDULE,
    PRICING_INTRO,
    PRICING_NOTES,
    REMOTE,
    REMOTE_INTRO,
    SCOPE,
    WORK_STEPS,
  } = services;

  /* Titres des projets lus dans les MDX ; un projet non publié n'est pas cité. */
  const projects = new Map(getListedProjects(lang).map((p) => [p.slug, p.title]));
  const resolveRefs = (offer: Offer): ProjectLink[] =>
    offer.references.flatMap((r) => {
      const title = projects.get(r.slug);
      return title && isPublishable(r.note) ? [{ slug: r.slug, title, note: r.note }] : [];
    });

  const markers = IS_PROD ? 0 : countMarkers([JSON.stringify(services)]);

  return (
    <div className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      {markers > 0 && (
        <div className="border-b border-[hsl(var(--warning)/0.3)] bg-[hsl(var(--warning)/0.1)]">
          <p className={`${CONTAINER} flex items-center gap-2 py-3 text-sm font-semibold`}>
            <TriangleAlert className="h-4 w-4 shrink-0 text-[hsl(var(--warning))]" />
            {format(t.draft, { count: markers })}
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
                <span className="text-[hsl(var(--editorial-primary))]">{t.eyebrow}</span>
                <span className={`ml-2 ${MUTED}`}>{t.region}</span>
              </p>
            </FadeIn>
            <div className="min-w-0">
              <RevealTitle
                text={t.title}
                className="text-[clamp(3rem,6vw+1rem,6rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
              />
              <FadeIn onMount delay={0.4}>
                <p className={`mt-8 max-w-[44rem] text-lg font-light leading-relaxed md:text-2xl md:leading-[1.4] ${MUTED}`}>
                  {t.lead}
                </p>
                <p className={`mt-5 max-w-xl leading-relaxed ${MUTED}`}>
                  {t.sub}
                </p>
              </FadeIn>
              <FadeIn onMount delay={0.55} className="mt-10 flex flex-wrap items-center gap-3">
                <a href={`#${t.sections.brief.anchor}`} className={BTN_PRIMARY}>
                  {t.ctaBrief}
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <a href={`#${t.sections.pricing.anchor}`} className={BTN_GHOST}>
                  {t.ctaPricing}
                </a>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Sommaire */}
        <nav aria-label={t.tocAria} className={`border-t ${RULE}`}>
          <div className={`${CONTAINER} py-10`}>
            <div className={GRID}>
              <p className={LABEL}>{t.tocLabel}</p>
              <FadeIn onMount delay={0.65}>
                <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 xl:grid-cols-3">
                  {SECTIONS.map((id, i) => (
                    <li key={id}>
                      <a
                        href={`#${t.sections[id].anchor}`}
                        className={`group flex items-baseline gap-3 border-b ${RULE} py-2.5 text-[0.95rem] ${MUTED} transition-colors hover:text-[hsl(var(--editorial-foreground))]`}
                      >
                        <span className="font-mono text-[11px] text-[hsl(var(--editorial-primary))]">
                          {pad(i + 1)}
                        </span>
                        {t.sections[id].label}
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
      <Section id="offers" t={t}>
        <div className={`border-t ${RULE}`}>
          {OFFERS.map((offer, i) => (
            <OfferRow key={offer.id} offer={offer} index={i} refs={resolveRefs(offer)} lang={lang} t={t.offer} />
          ))}
        </div>
      </Section>

      {/* ── 02 Tarifs ── */}
      <Section id="pricing" t={t}>
        <p className={`mb-8 max-w-2xl text-lg font-light leading-relaxed ${MUTED}`}>{PRICING_INTRO}</p>
        <DataTable
          head={t.pricingHead}
          rows={OFFERS.map((o) => [
            o.title,
            o.priceEquiv ? `${o.price} (${o.priceEquiv})` : o.price,
            o.duration ?? '',
          ])}
        />
        <p className="mt-10 font-mono text-xs text-[hsl(var(--editorial-primary))]">{t.howPriceSet}</p>
        <Notes notes={PRICING_NOTES} />
      </Section>

      {/* ── 03 À distance ── */}
      <Section id="remote" t={t}>
        <p className={`mb-8 max-w-2xl text-lg font-light leading-relaxed ${MUTED}`}>{REMOTE_INTRO}</p>
        <FactList facts={REMOTE} />
      </Section>

      {/* ── 04 Déroulé ── */}
      <Section id="process" t={t}>
        <div className="max-w-3xl">
          <WorkProcess steps={WORK_STEPS} t={t.workStep} />
          <div className="mt-14 border-l-2 border-[hsl(var(--editorial-primary))] pl-5">
            <p className="font-mono text-xs text-[hsl(var(--editorial-primary))]">{t.expectations}</p>
            <p className={`mt-2 leading-relaxed ${MUTED}`}>
              <Draft text={CLIENT_EXPECTATIONS} />
            </p>
          </div>
        </div>
      </Section>

      {/* ── 05 Paiement ── */}
      <Section id="payment" t={t}>
        <p className="mb-4 font-mono text-xs text-[hsl(var(--editorial-primary))]">{t.scheduleLabel}</p>
        <DataTable
          head={t.scheduleHead}
          rows={PAYMENT_SCHEDULE.map((r) => [r.amount, r.schedule])}
        />
        <p className="mb-4 mt-12 font-mono text-xs text-[hsl(var(--editorial-primary))]">{t.methodsLabel}</p>
        <DataTable head={t.methodsHead} rows={PAYMENT_METHODS.map((r) => [r.clients, r.methods])} />
        <Notes notes={PAYMENT_NOTES} />
      </Section>

      {/* ── 06 Engagements ── */}
      <Section id="scope" t={t}>
        <FactList facts={SCOPE} />
      </Section>

      {/* ── 07 Après la livraison ── */}
      <Section id="after" t={t}>
        <FactList facts={AFTER_DELIVERY} />
      </Section>

      {/* ── 08 Communication ── */}
      <Section id="communication" t={t}>
        <FactList facts={COMMUNICATION}>
          <FactRow label={t.channelsLabel}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            {' · '}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
              {CONTACT_EMAIL}
            </a>
            {' · '}{t.video}
          </FactRow>
        </FactList>
      </Section>

      {/* ── 09 FAQ ── */}
      <Section id="faq" t={t}>
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
      <Section id="brief" t={t}>
        <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-16">
          <div className="max-w-2xl">
            <p className={`mb-10 text-lg font-light leading-relaxed ${MUTED}`}>
              <Draft text={BRIEF_INTRO} />
            </p>
            <BriefForm lang={lang} t={dict.briefForm} budgets={BUDGETS} />
          </div>

          <aside className="xl:pt-1">
            <p className={`border-b ${RULE} pb-3 ${LABEL}`}>{t.directContact}</p>
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
            </ul>
          </aside>
        </div>
      </Section>

      {/* ── Informations légales ── */}
      <footer className={`border-t ${RULE}`}>
        <div className={`${CONTAINER} py-10`}>
          <div className={GRID}>
            <p className={LABEL}>{t.legalLabel}</p>
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

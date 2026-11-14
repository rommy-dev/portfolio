import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { WhatsApp } from '@/components/ui/WhatsAppIcon';
import { ContactForm } from '@/components/contact/ContactForm';
import { FadeIn, RevealTitle } from '@/components/project/EditorialMotion';
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contacter Ny Aina Rommy Ramaromilanto, développeur fullstack à Antananarivo : missions freelance, collaborations, opportunités.',
};

type Channel = {
  label: string;
  value: string;
  href: string | null;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  note?: string;
};

const CHANNELS: Channel[] = [
  {
    label: 'E-mail',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    note: 'Réponse < 24 h',
  },
  {
    label: 'WhatsApp',
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    icon: WhatsApp,
    note: 'Échange rapide',
  },
  {
    label: 'LinkedIn',
    value: 'Ny Aina Rommy Ramaromilanto',
    href: LINKEDIN_URL,
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/rommy-dev',
    href: GITHUB_URL,
    icon: Github,
  },
  {
    label: 'Localisation',
    value: 'Antananarivo, Madagascar',
    href: null,
    icon: MapPin,
    note: 'UTC+3 · Remote',
  },
];

const eyebrowClass = 'font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]';

function Eyebrow({ index, children }: { index: string; children: string }) {
  return (
    <p className={eyebrowClass}>
      <span className="mr-2 text-[hsl(var(--editorial-primary))]">{index}</span>
      {children}
    </p>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-20 px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-24 lg:px-12">
        {/* ── Colonne formulaire ── */}
        <section aria-labelledby="contact-title" className="max-w-xl">
          <FadeIn onMount>
            <Eyebrow index="01">Contact</Eyebrow>
          </FadeIn>

          <RevealTitle
            text="Parlons-en."
            className="mt-5 text-[clamp(3rem,6vw+1rem,5.5rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
          />

          <FadeIn onMount delay={0.35}>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
              Une mission freelance, une collaboration ou un poste&nbsp;? Décrivez votre besoin, je
              vous réponds personnellement sous 24&nbsp;h.
            </p>

            <p className="mt-6 inline-flex items-center gap-2.5 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
              </span>
              Disponible pour de nouveaux projets
            </p>
          </FadeIn>

          <FadeIn onMount delay={0.5} className="mt-14">
            <ContactForm />
          </FadeIn>
        </section>

        {/* ── Colonne coordonnées ── */}
        <aside aria-labelledby="channels-title">
          <FadeIn onMount delay={0.6}>
            <h2 id="channels-title" className="border-b border-[hsl(var(--editorial-border))] pb-3">
              <Eyebrow index="02">Me joindre</Eyebrow>
            </h2>

            <ul>
              {CHANNELS.map(({ label, value, href, icon: Icon, note }) => {
                const row = (
                  <>
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--editorial-primary))]" />
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
                          {label}
                        </span>
                        {note && (
                          <span className="font-mono text-[11px] text-[hsl(var(--editorial-foreground-muted)/0.6)]">
                            {note}
                          </span>
                        )}
                      </span>
                      <span
                        className={`break-words text-[0.95rem] text-[hsl(var(--editorial-foreground))] ${
                          href ? 'transition-colors duration-200 group-hover:text-[hsl(var(--editorial-primary))]' : ''
                        }`}
                      >
                        {value}
                      </span>
                    </span>
                    {href && (
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--editorial-foreground-muted))] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--editorial-primary))]" />
                    )}
                  </>
                );

                const rowClass =
                  'group flex items-start gap-4 border-b border-[hsl(var(--editorial-border))] py-5';

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={rowClass}
                      >
                        {row}
                      </a>
                    ) : (
                      <div className={rowClass}>{row}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ── Note éditoriale ── */}
            <div className="mt-10 border-l-2 border-[hsl(var(--editorial-primary))] pl-5">
              <p className="text-[0.95rem] leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
                Pour un échange rapide, WhatsApp. Pour un brief détaillé, un cahier des charges ou
                des pièces jointes, préférez l&apos;
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[hsl(var(--editorial-primary))] transition-colors hover:text-[hsl(var(--editorial-primary-strong))]"
                >
                  e-mail
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </aside>
      </div>
    </div>
  );
}

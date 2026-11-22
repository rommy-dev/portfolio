import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { AboutCurtain } from './AboutCurtain';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/fr';
import { href } from '@/i18n/routes';

const pad = (n: number) => String(n).padStart(2, '0');

/* ─── Section ─────────────────────────────────────────────── */
export function AboutSection({ lang, t }: { lang: Locale; t: Dictionary['about'] }) {
  return (
    <section className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      {/* ── Rideau piloté par le scroll ── */}
      <AboutCurtain
        t={{
          eyebrow: t.curtainEyebrow,
          title: t.curtainTitle,
          stageLine1: t.stageLine1,
          stageLine2: t.stageLine2,
          portraitAlt: t.portraitAlt,
        }}
      />

      {/* ── Qui je suis ── */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28 lg:px-12">
        <Reveal id="about-intro" className="grid gap-8 md:grid-cols-[0.3fr_1fr] md:gap-12">
          <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
            <span className="text-[hsl(var(--editorial-primary))]">04</span>
            <span className="ml-2">{t.eyebrow}</span>
          </span>
          <div className="max-w-3xl">
            <p className="text-xl font-medium leading-snug tracking-[-0.03em] md:text-2xl">
              {t.lead}
            </p>
          </div>
        </Reveal>
        <Reveal
          as="p"
          id="about-intro"
          className="mt-10 text-[clamp(1.6rem,2.4vw+0.6rem,2.6rem)] font-light leading-[1.15] tracking-[-0.04em]"
        >
          <span className="inline-block indent-8 mb-2">
            {t.quote[0]}
          </span>
          <br />
          <span className="inline-block indent-8">
            {t.quote[1]}
          </span>
        </Reveal>

        {/* ── Parcours ── */}
        <div className="mt-24 md:mt-32">
          <Reveal
            as="p"
            id="about-path-label"
            className="mb-8 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]"
          >
            {t.pathLabel}
          </Reveal>
          <ol className="border-b border-[hsl(var(--editorial-border))]">
            {t.timeline.map((item, i) => (
              <Reveal
                as="li"
                key={item.place}
                id={`about-path-${i}`}
                delay={0.06 * i}
                className="grid gap-4 border-t border-[hsl(var(--editorial-border))] py-8 md:grid-cols-[0.3fr_1fr] md:gap-12 md:py-10"
              >
                <span className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">
                  <span className="text-[hsl(var(--editorial-primary))]">{pad(i + 1)}</span>
                  <span className="ml-2">{item.period}</span>
                </span>
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-medium leading-tight tracking-[-0.04em] md:text-3xl">{item.place}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[hsl(var(--editorial-foreground-muted))]">
                    {item.role}
                  </p>
                  <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ── Méthode ── */}
        <div className="mt-24 md:mt-32">
          <Reveal
            as="p"
            id="about-method-label"
            className="mb-8 font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]"
          >
            {t.methodLabel}
          </Reveal>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.map((principle, i) => (
              <Reveal
                key={principle.label}
                id={`about-method-${i}`}
                delay={0.06 * i}
                className="border-t border-[hsl(var(--editorial-border))] pt-5"
              >
                <p className="font-mono text-xs">
                  <span className="text-[hsl(var(--editorial-primary))]">{pad(i + 1)}</span>
                  <span className="ml-2">{principle.label}</span>
                </p>
                <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-[hsl(var(--editorial-foreground-muted))] lg:text-[0.95rem]">
                  {principle.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Hors écran ── */}
        <Reveal
          id="about-outro-interests"
          className="mt-24 w-full border-t border-[hsl(var(--editorial-border))] pt-10 md:mt-32"
        >
          <div className="w-full">
            <p className="font-mono text-xs text-[hsl(var(--editorial-foreground-muted))]">{t.offscreenLabel}</p>
            <ul className="mt-4 flex w-full flex-nowrap items-center gap-x-4 overflow-x-auto whitespace-nowrap font-mono text-xs text-[hsl(var(--editorial-foreground-muted))] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {t.interests.map((interest) => (
                <li key={interest} className="inline-block border border-transparent text-[hsl(var(--editorial-foreground-muted))] underline decoration-dotted decoration-[1.5px] underline-offset-4">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ── Contact ── */}
        <Reveal
          id="about-outro-contact"
          className="mt-10 flex w-full flex-col gap-6 border-t border-[hsl(var(--editorial-border))] pt-10 sm:flex-row sm:items-end sm:justify-between md:mt-14"
        >
          <p className="max-w-xl text-[clamp(1.6rem,2.4vw+0.6rem,2.6rem)] font-light leading-[1.1] tracking-[-0.04em]">
            {t.ctaLead} <span className="font-semibold">{t.ctaStrong}</span>
          </p>
          <Link
            href={href(lang, 'contact')}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[hsl(var(--editorial-foreground-muted))] transition-colors hover:text-[hsl(var(--editorial-primary))]"
          >
            {t.contactCta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

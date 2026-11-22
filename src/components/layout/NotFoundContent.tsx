'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/fr';
import { href } from '@/i18n/routes';

type Texts = Record<Locale, Dictionary['notFound'] & { meta: string }>;

export function NotFoundContent({ texts }: { texts: Texts }) {
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang && hasLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = texts[lang];

  return (
    <div className="bg-[hsl(var(--editorial-bg))] text-[hsl(var(--editorial-foreground))]">
      <title>{`${t.meta} | Ny Aina Rommy Ramaromilanto`}</title>
      <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col justify-center px-6 py-24 md:px-10 lg:px-12">
        <p className="font-mono text-xs text-[hsl(var(--editorial-primary))]">{t.eyebrow}</p>
        <h1 className="mt-5 text-[clamp(3rem,6vw+1rem,6rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
          {t.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[hsl(var(--editorial-foreground-muted))]">
          {t.text}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href={href(lang, 'home')}
            className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-primary))] bg-[hsl(var(--editorial-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-primary-fg))] transition-colors hover:bg-[hsl(var(--editorial-primary-strong))]"
          >
            {t.home} <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={href(lang, 'projects')}
            className="inline-flex items-center gap-2 border border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] px-5 py-3 text-sm font-semibold text-[hsl(var(--editorial-foreground))] transition-colors hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]"
          >
            {t.projects}
          </Link>
        </div>
      </div>
    </div>
  );
}

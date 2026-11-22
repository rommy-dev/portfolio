'use client';

import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_COOKIE, HTML_LANG, type Locale } from '@/i18n/config';
import { localizePath } from '@/i18n/routes';
import type { Dictionary } from '@/i18n/dictionaries/fr';

type Props = {
  lang: Locale;
  t: Dictionary['languageSwitcher'];
  className?: string;
  onNavigate?: () => void;
};

/* Mémorise le choix : le proxy redirige ensuite les URL françaises vers l'anglais (et inversement). */
const remember = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
};

/*
 * FR / EN : de vrais liens vers la même page dans l'autre langue. Liens <a> classiques
 * (rechargement complet) : la langue du document change, et aucune page préchargée
 * dans l'ancienne langue n'est réutilisée.
 */
export function LanguageSwitcher({ lang, t, className = '', onNavigate }: Props) {
  const pathname = usePathname() ?? '/';

  return (
    <nav aria-label={t.navAria} className={className}>
      <ul className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em]">
        {LOCALES.map((locale, i) => {
          const active = locale === lang;
          const labels = t[locale];
          return (
            <li key={locale} className="flex items-center gap-1">
              {i > 0 && (
                <span aria-hidden className="text-[hsl(var(--foreground-subtle))]">
                  /
                </span>
              )}
              {active ? (
                <span
                  aria-current="true"
                  lang={HTML_LANG[locale]}
                  className="px-1 py-2 text-[hsl(var(--foreground))]"
                >
                  <span aria-hidden>{labels.short}</span>
                  <span className="sr-only">{labels.name}</span>
                </span>
              ) : (
                <a
                  href={localizePath(pathname, locale)}
                  hrefLang={HTML_LANG[locale]}
                  lang={HTML_LANG[locale]}
                  aria-label={labels.label}
                  onClick={() => {
                    remember(locale);
                    onNavigate?.();
                  }}
                  className="px-1 py-2 text-[hsl(var(--foreground-muted))] transition-colors duration-200 hover:text-[hsl(var(--primary))]"
                >
                  {labels.short}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

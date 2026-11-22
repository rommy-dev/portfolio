import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { alternates, type RouteKey } from '@/i18n/routes';
import { getAllProjects } from '@/lib/projects';

/* Chaque page dans les deux langues, avec ses versions alternatives (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [RouteKey, ...string[]][] = [
    ['home'],
    ['services'],
    ['projects'],
    ['skills'],
    ['contact'],
    ...getAllProjects().map((p): [RouteKey, string] => ['projects', p.slug]),
  ];

  return pages.flatMap(([key, ...rest]) =>
    LOCALES.map((locale) => {
      const { canonical, languages } = alternates(locale, key, ...rest);
      return {
        url: canonical,
        changeFrequency: 'monthly' as const,
        priority: key === 'home' ? 1 : rest.length > 0 ? 0.6 : 0.8,
        alternates: { languages: { fr: languages.fr, en: languages.en } },
      };
    }),
  );
}

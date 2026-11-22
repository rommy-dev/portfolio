import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ServicesSection } from '@/components/sections/ServiceSection';
import { TechStack } from '@/components/sections/TechStack';
import { getFeaturedProjects, toSummary } from '@/lib/projects';
import { getDictionary } from '@/i18n/dictionaries';
import { alternates } from '@/i18n/routes';
import { resolveLocale, type LangParams } from '@/i18n/server';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  return { alternates: alternates(lang, 'home') };
}

/*
 * Parcours prospect : promesse → offre → méthode → preuves → confiance et contact.
 * Les sections à effet fort (hero, scroll piloté, rideau) alternent avec des sections
 * plus calmes, pour laisser respirer entre deux surprises.
 */
export default async function Home({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);

  return (
    <div className="bg-background text-foreground">
      <div>
        <HeroSection lang={lang} t={t.hero} />
        <ServicesSection lang={lang} t={t.homeServices} />
      </div>
      <TechStack t={t.techStack} />
      <FeaturedProjects lang={lang} t={t.featured} projects={getFeaturedProjects(lang).map(toSummary)} />
      <AboutSection lang={lang} t={t.about} />
    </div>
  );
}

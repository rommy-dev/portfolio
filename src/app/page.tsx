import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ServicesSection } from '@/components/sections/ServiceSection';
import { TechStack } from '@/components/sections/TechStack';

/*
 * Parcours prospect : promesse → offre → méthode → preuves → confiance et contact.
 * Les sections à effet fort (hero, scroll piloté, rideau) alternent avec des sections
 * plus calmes, pour laisser respirer entre deux surprises.
 */
export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <ServicesSection />
      <TechStack />
      <FeaturedProjects />
      <AboutSection />
    </div>
  );
}

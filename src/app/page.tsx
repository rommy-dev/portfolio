import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { TechStack } from '@/components/sections/TechStack';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <TechStack />
    </div>
  );
}

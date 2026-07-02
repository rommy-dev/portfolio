import { HeroSection } from '@/components/sections/HeroSection'; 
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ServicesSection } from '@/components/sections/ServiceSection';
import { TechStack } from '@/components/sections/TechStack';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProjects />
      <ServicesSection />
      <TechStack />
      <AboutSection />
    </div>
  );
}

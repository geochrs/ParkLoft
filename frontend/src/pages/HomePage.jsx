import { HeroSection } from '../components/content/HeroSection';
import { AboutSection } from '../components/content/AboutSection';
import { TestimonialSection } from '../components/content/TestimonialSection';
import { FooterSection } from '../components/content/FooterSection';
import { HowSection } from '../components/content/HowSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowSection />
      <AboutSection />
      <TestimonialSection />
      <FooterSection />
    </>
  );
}

import HeroSection from '../components/content/HeroSection';
import AboutSection from '../components/content/AboutSection';
import TestimonialSection from '../components/content/TestimonialSection';
import FooterSection from '../components/content/FooterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div data-aos="fade">
        <AboutSection />
      </div>
      <TestimonialSection />
      <FooterSection />
    </>
  );
}

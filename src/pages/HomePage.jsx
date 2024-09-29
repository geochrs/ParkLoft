import parkImg from '../assets/parkloft.jpg';
import HeroSection from '../components/content/HeroSection';

export default function HomePage() {
  return (
    <HeroSection
      title="Discover Your Perfect Parking Space with ParkLoft"
      imageSrc={parkImg}
    >
      {' '}
      <p>
        ParkLoft helps you find the best parking spots in the city, with ease
        and efficiency.
      </p>
    </HeroSection>
  );
}

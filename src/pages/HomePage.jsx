import parkImg from '../assets/parkloft.jpg';
import aboutStyles from '../components/content/AboutSection.module.css';
import modalStyles from '../components/layout/Modal.module.css';
import HeroSection from '../components/content/HeroSection';
import AboutSection from '../components/content/AboutSection';
import Modal from '../components/layout/Modal';

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Discover Your Perfect Parking Space with ParkLoft"
        imageSrc={parkImg}
      >
        <p>
          ParkLoft helps you find the best parking spots in the city, with ease
          and efficiency.
        </p>
      </HeroSection>
      <AboutSection title="About Parkloft">
        <div className={aboutStyles.card}>
          <h3>Our Mission</h3>
          <p>
            At ParkLoft, we strive to create a harmonious balance between nature
            and urban living, providing beautiful parks and green spaces for
            everyone to enjoy.
          </p>
        </div>
        <div className={aboutStyles.card}>
          <h3>Our History</h3>
          <p>
            Founded in 2024, ParkLoft began as a small community initiative
            aimed at revitalizing neglected urban spaces. Since then, we&apos;ve
            transformed over 10 parks and engaged thousands of community
            members.
          </p>
        </div>
        <div className={aboutStyles.card}>
          <h3>Our Values</h3>
          <ul className={aboutStyles.aboutList}>
            <li>
              <strong>Sustainability</strong>: We prioritize eco-friendly
              practices.
            </li>
            <li>
              <strong>Community Engagement</strong>: We believe in involving the
              community in our projects.
            </li>
            <li>
              <strong>Innovation</strong>: We&apos;re always looking for new
              ways to enhance urban green spaces.
            </li>
          </ul>
        </div>
        <div className={aboutStyles.card}>
          <h3>Meet Our Team</h3>
          <ul className={aboutStyles.aboutList}>
            <li>
              <strong>John Doe</strong>: Founder and CEO with over 10 years of
              experience in urban planning.
            </li>
            <li>
              <strong>Jane Smith</strong>: Community Outreach Coordinator who
              loves connecting with locals.
            </li>
          </ul>
        </div>
        <div className={aboutStyles.card}>
          <h3>Achievements</h3>
          <ul className={aboutStyles.aboutList}>
            <li>Winner of the Green City Award 2024</li>
            <li>Featured in Urban Design Magazine</li>
          </ul>
        </div>
      </AboutSection>
      <Modal className={modalStyles.homeModal}>
        <h3>How It Works</h3>
        <ul>
          <li>
            <span>1</span>
            <div>
              <h4>Find your car park!</h4>
              <p>
                Sign up and check our presence at hotels, restaurants,
                airport...
              </p>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <h4>Book!</h4>
              <p>Select date and time, check availability, see prices...</p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <h4>And Park!</h4>
              <p>Upon arrival, just show your reservation in the car park</p>
            </div>
          </li>
        </ul>
      </Modal>
    </>
  );
}

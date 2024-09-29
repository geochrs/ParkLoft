import parkImg from '../assets/parkloft.jpg';
import classes from '../components/content/AboutSection.module.css';
import HeroSection from '../components/content/HeroSection';
import AboutSection from '../components/content/AboutSection';

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
        <h3>Our Mission</h3>
        <p>
          At ParkLoft, we strive to create a harmonious balance between nature
          and urban living, providing beautiful parks and green spaces for
          everyone to enjoy.
        </p>

        <h3>Our History</h3>
        <p>
          Founded in 2024, ParkLoft began as a small community initiative aimed
          at revitalizing neglected urban spaces. Since then, we&apos;ve
          transformed over 10 parks and engaged thousands of community members.
        </p>

        <h3>Our Values</h3>
        <ul className={classes.aboutList}>
          <li>
            <strong>Sustainability</strong>: We prioritize eco-friendly
            practices.
          </li>
          <li>
            <strong>Community Engagement</strong>: We believe in involving the
            community in our projects.
          </li>
          <li>
            <strong>Innovation</strong>: We&apos;re always looking for new ways
            to enhance urban green spaces.
          </li>
        </ul>

        <h3>Meet Our Team</h3>
        <ul className={classes.aboutList}>
          <li>
            <strong>John Doe</strong>: Founder and CEO with over 10 years of
            experience in urban planning.
          </li>
          <li>
            <strong>Jane Smith</strong>: Community Outreach Coordinator who
            loves connecting with locals.
          </li>
        </ul>

        <h3>Achievements</h3>
        <ul className={classes.aboutList}>
          <li>Winner of the Green City Award 2022</li>
          <li>Featured in Urban Design Magazine</li>
        </ul>

        <h3>Join Us</h3>
        <p>
          If you share our passion for green spaces,{' '}
          <a className={classes.aboutLink} href="#">
            get involved
          </a>{' '}
          today!
        </p>

        <h3>Connect with Us</h3>
        <p>
          Follow us on{' '}
          <a className={classes.aboutLink} href="#">
            social media links
          </a>
          .
        </p>

        <h3>Contact Us</h3>
        <p>
          For more information, please email us at{' '}
          <a className={classes.aboutLink} href="mailto:park@loft.com">
            park@loft.com
          </a>
          .
        </p>
      </AboutSection>
    </>
  );
}

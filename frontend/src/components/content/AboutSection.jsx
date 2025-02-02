import classes from './AboutSection.module.css';
import { SVG1, SVG2, SVG3, SVG4, SVG5 } from '../icons/aboutSVG.jsx';

export default function AboutSection() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2 className={classes.h2}>About Parkloft</h2>
        <div className={classes.cards}>
          <div className={classes.card}>
            <SVG1 />
            <h3>Our Mission</h3>
            <p>
              At ParkLoft, we strive to create a harmonious balance between
              nature and urban living, providing beautiful parks and green
              spaces for everyone to enjoy.
            </p>
          </div>
          <div className={classes.card}>
            <SVG2 />
            <h3>Our History</h3>
            <p>
              Founded in 2024, ParkLoft began as a small community initiative
              aimed at revitalizing neglected urban spaces. Since then,
              we&apos;ve transformed over 10 parks and engaged thousands of
              community members.
            </p>
          </div>
          <div className={classes.card}>
            <SVG3 />
            <h3>Our Values</h3>
            <ul className={classes.aboutList}>
              <li>
                <strong>Sustainability</strong>: We prioritize eco-friendly
                practices.
              </li>
              <li>
                <strong>Community Engagement</strong>: We believe in involving
                the community in our projects.
              </li>
              <li>
                <strong>Innovation</strong>: We&apos;re always looking for new
                ways to enhance urban green spaces.
              </li>
            </ul>
          </div>
          <div className={classes.card}>
            <SVG4 />
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
          </div>
          <div className={classes.card}>
            <SVG5 />
            <h3>Achievements</h3>
            <ul className={classes.aboutList}>
              <li>Winner of the Green City Award 2024</li>
              <li>Featured in Urban Design Magazine</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

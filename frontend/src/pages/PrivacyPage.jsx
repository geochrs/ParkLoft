import classes from './PrivacyPage.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <button className={classes.backButton}>
          <span className={classes.backIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <Link to="/">Back</Link>
        </button>
        <h1>Privacy Policy</h1>
        <div>
          Your privacy is important to us. It is Park Loft's policy to respect
          your privacy regarding any information we may collect from you across
          our website (https://park-loft.vercel.app) and any other sites or
          services we own and operate.
          <br />
          <br />
          1. Information We Collect
          <br /> We only ask for personal information when we truly need it to
          provide a service to you—such as when you make a reservation or sign
          up for an account. This may include:
          <br />
          • Your name
          <br />
          • Email address
          <br />
          • Login information (e.g., if signing in with Google)
          <br />
          • Reservation details
          <br />
          • Payment-related data (processed securely via a third-party provider)
          <br />
          <br />
          2. How We Collect and Use Information
          <br />
          We collect personal information by fair and lawful means, with your
          knowledge and consent. We will also let you know why we’re collecting
          it and how it will be used.
          <br />
          We use the information to:
          <br />
          • Process and manage parking reservations
          <br />
          • Communicate with you regarding your account or bookings
          <br />
          • Improve the functionality and performance of our platform
          <br />
          • Prevent fraud and abuse
          <br />
          <br />
          3. Data Retention and Security
          <br /> We retain collected information only for as long as necessary
          to provide you with your requested service. Any data we store is
          protected using commercially acceptable methods to prevent loss,
          theft, unauthorized access, disclosure, copying, misuse, or
          modification.
          <br />
          <br />
          4. Sharing of Information
          <br /> We do not share personally identifying information publicly or
          with third parties, except:
          <br />
          • When required by law or legal process
          <br />
          • When necessary to fulfill a service you’ve requested (e.g., through
          payment processors or hosting providers)
          <br />
          <br />
          5. External Links
          <br /> Our website may link to third-party sites we do not control.
          Please be aware that we are not responsible for the content or privacy
          practices of those external sites.
          <br />
          <br />
          6. GDPR and Data Protection
          <br /> Park Loft acts as both a data controller and a data processor
          in accordance with applicable data protection laws, including the EU
          General Data Protection Regulation (GDPR).
          <br />
          As a user, you have the right to:
          <br />
          • Access or update your personal data
          <br />
          • Request deletion of your data
          <br />
          • Withdraw consent to data collection
          <br />
          • File a complaint with a data protection authority (if applicable)
          <br />
          <br />
          7. Your Choice
          <br /> You are free to refuse our request for personal information,
          with the understanding that we may be unable to provide certain
          services without it.
          <br />
          <br />
          8. Acceptance
          <br /> Your continued use of our website will be regarded as
          acceptance of our privacy practices and personal data handling as
          described in this policy.
          <br />
          <br/>
          If you have any questions about how we manage user data and personal
          information, please contact us at: 📧 support@park-loft.app
          <br />
        </div>
      </div>
    </section>
  );
}

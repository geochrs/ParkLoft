import classes from './FooterSection.module.css';
import logo from '../../assets/parkloftLogo.png';

export default function FooterSection() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.flexbox}>
          <div>
            <img src={logo} className={classes.logo} />
            <p className={classes.content}>
              Discover Your Perfect Parking Space with ParkLoft <br /> Copyright
              © 2024 - All rights reserved
            </p>
          </div>
          <div>
            <div>
              <h5>Links</h5>
            </div>
            <div className={classes.links}>
              <a>Login</a>
              <a>Support</a>
              <a>Documentation</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

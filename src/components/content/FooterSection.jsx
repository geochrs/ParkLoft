import classes from './FooterSection.module.css';
import logo from '../../assets/parkloftLogo.png';

export default function FooterSection() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div>
          <div>
            <img src={logo} className={classes.logo} />
            <p className={classes.content}>
              Discover Your Perfect Parking Space with ParkLoft <br /> Copyright
              © 2024 - All rights reserved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

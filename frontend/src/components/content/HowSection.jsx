import classes from './HowSection.module.css';
import how1 from '../../assets/how1.webp';
import how2 from '../../assets/how2.webp';
import how3 from '../../assets/how3.webp';

export function HowSection() {
  return (
    <section className={classes.section}>
      <div className={classes.container} data-aos="fade">
        <h2 className={classes.h2}>How It Works</h2>
        <div className={classes.cards}>
          <div className={classes.card}>
            <img src={how1} alt="Look for parking" />
            <h3 className={classes.h3}>Look</h3>
            <p>
              Sign up and check our presence at hotels, restaurants, airports.
            </p>
          </div>
          <div className={classes.card}>
            <img src={how2} alt="Look for parking" />
            <h3 className={classes.h3}>Book</h3>
            <p>Select date and time, check availability, see prices.</p>
          </div>
          <div className={classes.card}>
            <img src={how3} alt="Look for parking" />
            <h3 className={classes.h3}>Park</h3>
            <p>Upon arrival, just show your reservation in the car park.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

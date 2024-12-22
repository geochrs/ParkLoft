import classes from './HeroSection.module.css';
import locations from '../../assets/locations.svg';
import dates from '../../assets/dates.svg';
import money from '../../assets/money.svg';
import line from '../../assets/line.svg';

export default function HeroSection() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes['left-content']}>
          <h1 className={classes.h1}>
            Discover Your Perfect Parking Space with ParkLoft
          </h1>
          <div className={classes.cardContainer}>
            <div className={classes.card}>
              <p className={classes.cardTitle}>
                <span>
                  <img src={locations} className={classes.locationsSVG} />
                </span>
                Locations
              </p>
              <p className={classes.cardContent}>
                Plenty of locations available
              </p>
            </div>
            <div className={classes.card}>
              <img src={line} className={classes.lineSVG} />
            </div>
            <div className={classes.card}>
              <p className={classes.cardTitle}>
                <span>
                  <img src={dates} className={classes.datesSVG} />
                </span>
                Dates
              </p>
              <p className={classes.cardContent}>
                Choose your desired parking time
              </p>
            </div>
            <div className={classes.card}>
              <img src={line} className={classes.lineSVG} />
            </div>
            <div className={classes.card}>
              <p className={classes.cardTitle}>
                <span>
                  <img src={money} className={classes.moneySVG} />
                </span>
                Budget Friendly
              </p>
              <p className={classes.cardContent}>
                Looking for affordable parking options?
              </p>
            </div>
            <div className={classes.card}>
              <button type="submit" className={classes.bookNow}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.decorBottom}></div>
      <div className={classes.scrollDown}>
        <svg
          width="6"
          height="39"
          viewBox="0 0 6 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-ani="fade-up"
          style={{ opacity: 1, transform: 'translate(0px, 0px)' }}
        >
          <rect width="6" height="6" fill="#5469E7" className={classes.dot1} />
          <rect
            y="11"
            width="6"
            height="6"
            fill="#5469E7"
            className={classes.dot2}
          />
          <rect
            y="22"
            width="6"
            height="6"
            fill="#5469E7"
            className={classes.dot3}
          />
          <rect
            y="33"
            width="6"
            height="6"
            fill="#5469E7"
            className={classes.dot4}
          />
        </svg>
      </div>
    </section>
  );
}

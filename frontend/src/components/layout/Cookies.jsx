import classes from './Cookies.module.css';

export function Cookies() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div>
          <h3>We use cookies!</h3>
          <p>
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By accepting,
            you consent to our use of cookies.
          </p>
        </div>
        <div className={classes.actions}>
            <button>Accept All</button>
            <button>Manage Preferences</button>
            <button>Reject Optional</button>
        </div>
      </div>
    </section>
  );
}

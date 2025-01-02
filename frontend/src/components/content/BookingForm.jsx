import classes from './BookingForm.module.css';
import { Form } from 'react-router-dom';

export default function BookingForm() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2>Book your slot now!</h2>
        <Form className={classes.form}>
          <div className={classes.inputGroup}>
            <label>Entry Date</label>
            <input type="date"></input>
          </div>
          <div className={classes.inputGroup}>
            <label>Entry Time</label>
            <input type="time"></input>
          </div>
          <div className={classes.inputGroup}>
            <label>Exit Date</label>
            <input type="date"></input>
          </div>
          <div className={classes.inputGroup}>
            <label>Exit Time</label>
            <input type="time"></input>
          </div>
          <div>
            <button>Search</button>
          </div>
        </Form>
      </div>
    </section>
  );
}

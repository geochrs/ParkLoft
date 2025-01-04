import classes from './BookingForm.module.css';
import { Form } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingForm() {
  const [entryTime, setEntryTime] = useState(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return now;
  });

  const [exitTime, setExitTime] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setMinutes(0, 0, 0);
    return tomorrow;
  });

  const handleDateChange = (type, date) => {
    if (type === 'entry') {
      setEntryTime(date);
    } else if (type === 'exit') {
      setExitTime(date);
    }
  };

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2>Secure Your Spot Today, Budget-Friendly Rates!</h2>
        <Form className={classes.form}>
          <div className={classes.inputGroup}>
            <label>Entry Time</label>
            <DatePicker
              selected={entryTime}
              onChange={(date) => handleDateChange('entry', date)}
              name="entryTime"
              showTimeSelect
              dateFormat="dd-MM-yyyy HH:00"
              timeIntervals={60}
              timeFormat="HH:00"
              calendarStartDay={1}
            />
          </div>
          <div className={classes.inputGroup}>
            <label>Exit Time</label>
            <DatePicker
              selected={exitTime}
              onChange={(date) => handleDateChange('exit', date)}
              name="exitTime"
              showTimeSelect
              dateFormat="dd-MM-yyyy HH:00"
              timeIntervals={60}
              timeFormat="HH:00"
              calendarStartDay={1}
            />
          </div>
          <div className={classes.actions}>
            <button>Search</button>
          </div>
        </Form>
      </div>
    </section>
  );
}

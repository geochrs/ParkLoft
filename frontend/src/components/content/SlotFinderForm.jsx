import classes from './SlotFinderForm.module.css';
import { Form, useActionData } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SlotFinderForm() {
  const data = useActionData();
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
    <section
      className={`${classes.section} ${data ? classes.sectionWithResults : ''}`}
    >
      <div className={classes.container}>
        {!data && (
          <>
            <Form
              className={classes.form}
              method="POST"
              action="/slots-available"
            >
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
                <button type="submit">Search</button>
              </div>
            </Form>
            <h2 className={classes.h2}>Secure Your Spot Today!</h2>
          </>
        )}

        {data && (
          <div className={classes.results}>
            {data.length === 0 ? (
              <p>No slots available for the selected times.</p>
            ) : (
              data.map((location) => (
                <div
                  key={location.location_id}
                  className={classes.locationCard}
                >
                  <h3>{location.name}</h3>
                  <p>{location.address}</p>
                  <ul>
                    {location.Slots.map((slot) => (
                      <li key={slot.slot_id}>Slot #{slot.slot_number}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

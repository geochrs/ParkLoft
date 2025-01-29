import classes from './SlotFinderForm.module.css';
import cardImg from '../../assets/parkloft.jpg';
import { Form, useActionData, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingIndicator from '../layout/LoadingIndicator';

export default function SlotFinderForm() {
  // const data = useLoaderData();
  const { slots, user } = useLoaderData();

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleBook = (location) => () => {
    setSelectedLocation(location);
  };

  // const data = useActionData();
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

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     setIsLoading(false);
  //   }
  // }, [data]);

  const handleDateChange = (type) => (date) => {
    if (type === 'entry') {
      setEntryTime(date);
    } else if (type === 'exit') {
      setExitTime(date);
    }
  };

  // const handleSubmit = () => {
  //   setIsLoading(true);
  // };

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        {/* {isLoading && <LoadingIndicator />}

        {!isLoading && !data && (
          <>
            <Form
              className={classes.form}
              method="POST"
              action="/slots-available"
              onSubmit={handleSubmit}
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
        )} */}
        {!selectedLocation && (
          <div className={classes.results}>
            {slots.length === 0 ? (
              <p>No slots available for the selected times.</p>
            ) : (
              slots.map((location) => (
                <div
                  key={location.location_id}
                  className={classes.locationCard}
                >
                  <img src={cardImg} className={classes.cardImg} />
                  <div className={classes.cardContent}>
                    <h3>{location.name}</h3>
                    <p>{location.address}</p>
                    <p className={classes.availableSlots}>
                      {location.Slots.length} available slots
                    </p>
                    <button
                      type="submit"
                      className={classes.bookButton}
                      onClick={handleBook(location)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Show the booking form only for the selected location */}
        {selectedLocation && (
          <Form className={classes.form} method="POST" action="/booking">
            <div className={classes.inputGroup}>
              <label>Full Name</label>
              <input type="text" />
            </div>
            <div className={classes.row}>
              <div className={classes.inputGroup}>
                <label>Phone</label>
                <input type="tel" required />
              </div>
              <div className={classes.inputGroup}>
                <label>License Plate</label>
                <input type="text" required />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.inputGroup}>
                <label>Entry Time</label>
                <DatePicker
                  selected={entryTime}
                  onChange={handleDateChange('entry')}
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
                  onChange={handleDateChange('exit')}
                  name="exitTime"
                  showTimeSelect
                  dateFormat="dd-MM-yyyy HH:00"
                  timeIntervals={60}
                  timeFormat="HH:00"
                  calendarStartDay={1}
                />
              </div>
            </div>
            <div className={classes.inputGroup}>
              <button type="submit" className={classes.confirmButton}>
                Confirm
              </button>
            </div>
          </Form>
        )}
      </div>
    </section>
  );
}

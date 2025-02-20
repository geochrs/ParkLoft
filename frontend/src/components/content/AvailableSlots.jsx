import classes from './AvailableSlots.module.css';
import cardImg from '../../assets/parkloft.jpg';
import {
  Form,
  useLoaderData,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Skeleton from '../layout/Skeleton.jsx';

export default function AvailableSlots() {
  const { slots, user } = useLoaderData();
  const actionData = useActionData();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (actionData?.success) {
      setBookingDetails(actionData.bookingDetails);
      setBookingConfirmed(true);
    }
  }, [actionData]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBook = (location) => () => {
    setSelectedLocation(location);
  };

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

  const handleDateChange = (type) => (date) => {
    if (type === 'entry') {
      setEntryTime(date);
    } else if (type === 'exit') {
      setExitTime(date);
    }
  };

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        {isLoading ? (
          <div className={classes.results}>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={classes.locationCard}>
                  <Skeleton
                    className={classes.cardImg}
                    width="100%"
                    height="220px"
                  />
                  <div className={classes.cardContent}>
                    <Skeleton
                      width="60%"
                      height="40px"
                      margin="0.5rem auto 0"
                    />
                    <Skeleton
                      width="80%"
                      height="45px"
                      margin="0.5rem auto 0"
                    />
                    <Skeleton
                      width="50%"
                      height="40px"
                      margin="0.5rem auto 0"
                    />
                    <Skeleton
                      width="100%"
                      height="50px"
                      margin="0.5rem auto 0"
                      className={classes.bookButton}
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          !bookingConfirmed &&
          !selectedLocation && (
            <>
              {slots.length === 0 ? (
                <p>
                  No slots available because all locations are fully booked.
                </p>
              ) : (
                <div className={classes.results}>
                  {slots.map((location) => (
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
                  ))}
                </div>
              )}
            </>
          )
        )}
        {/* Show the booking form only for the selected location */}
        {selectedLocation && !bookingConfirmed && (
          <Form
            className={classes.form}
            method="POST"
            action="/slots-available"
          >
            <input
              type="hidden"
              name="location_id"
              value={selectedLocation.location_id}
            />
            <input type="hidden" name="entryTime" value={entryTime} />
            <input type="hidden" name="exitTime" value={exitTime} />
            <div className={classes.inputGroup}>
              <label>Full Name</label>
              <input type="text" name="fullName" />
            </div>
            <div className={classes.row}>
              <div className={classes.inputGroup}>
                <label>Phone</label>
                <input type="tel" name="phone" required />
              </div>
              <div className={classes.inputGroup}>
                <label>License Plate</label>
                <input type="text" name="licensePlate" required />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.inputGroup}>
                <label>Entry Time</label>
                <DatePicker
                  selected={entryTime}
                  onChange={handleDateChange('entry')}
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

        {bookingConfirmed && bookingDetails && (
          <div className={classes.confirmation}>
            <h2>Booking Confirmed!</h2>
            <p className={classes.thanks}>Thank you for your booking, {bookingDetails.fullName}!</p>
            <p>
              <strong>Ticket Id:</strong> {bookingDetails.ticketId}
            </p>
            <p>
              <strong>Location:</strong> {selectedLocation.name}
            </p>
            <p>
              <strong>Entry Time:</strong>{' '}
              {new Date(bookingDetails.entryTime).toLocaleString()}
            </p>
            <p>
              <strong>Exit Time:</strong>{' '}
              {new Date(bookingDetails.exitTime).toLocaleString()}
            </p>
            <p className={classes.help}>Need help? Contact our customer support for assistance.</p>
          </div>
        )}
      </div>
    </section>
  );
}

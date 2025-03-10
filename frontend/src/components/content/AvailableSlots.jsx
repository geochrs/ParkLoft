import classes from './AvailableSlots.module.css';
import cardImg from '../../assets/parkloft.jpg';
import logo from '../../assets/parkloftLogo.png';
import arrow from '../../assets/arrow.svg';
import confirm from '../../assets/confirm.svg';
import LoadingIndicator from '../layout/LoadingIndicator.jsx';

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
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const isSubmitting = navigation.state === 'submitting';

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (isSubmitting) {
      setIsConfirming(true);
    } else {
      setIsConfirming(false);
    }
  }, [isSubmitting]);

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

  const formattedDateEntry = entryTime.toLocaleDateString('en-GB'); // "22/01/2025"
  const formattedTimeEntry = entryTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDateExit = exitTime.toLocaleDateString('en-GB'); // "22/01/2025"
  const formattedTimeExit = exitTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

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
        {selectedLocation && !bookingConfirmed && !isConfirming && (
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
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder=" "
                defaultValue={user?.username || ''}
              />
              <label htmlFor="fullName">Full Name</label>
            </div>
            <div className={classes.row}>
              <div className={classes.inputGroup}>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder=" "
                  defaultValue={user?.phone || ''}
                  required
                />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className={classes.inputGroup}>
                <input
                  id="licensePlate"
                  type="text"
                  name="licensePlate"
                  placeholder=" "
                  required
                />
                <label htmlFor="licensePlate">License Plate</label>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.datePickerWrapper}>
                <label htmlFor="entryTime">Entry Time</label>
                <DatePicker
                  id="entryTime"
                  selected={entryTime}
                  onChange={handleDateChange('entry')}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy HH:00"
                  timeIntervals={60}
                  timeFormat="HH:00"
                  calendarStartDay={1}
                  className={classes.dateInput}
                />
              </div>
              <div className={classes.datePickerWrapper}>
                <label htmlFor="exitTime">Exit Time</label>
                <DatePicker
                  id="exitTime"
                  selected={exitTime}
                  onChange={handleDateChange('exit')}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy HH:00"
                  timeIntervals={60}
                  timeFormat="HH:00"
                  calendarStartDay={1}
                  className={classes.dateInput}
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
        {isConfirming && <LoadingIndicator />}
        {bookingConfirmed && bookingDetails && (
          <>
            <div className={classes.bookingTitle}>
              <h1>Booking Confirmed</h1>
              <img src={confirm} alt="booking confirm" />
            </div>
            <div className={classes.bookConfirm}>
              <div className={classes.cardHeader}>
                <img src={logo} className={classes.bookLogo} />
                <div className={classes.ticket}>
                  <p>Booking locator</p>
                  <p>{bookingDetails.ticketId}</p>
                </div>
              </div>
              <div className={classes.cardBody}>
                <div className={classes.personalData}>
                  <h3>Personal Data</h3>
                  <div className={classes.innerData}>
                    <div className={classes.name}>
                      <p>Name</p>
                      {bookingDetails.fullName}
                    </div>
                    <div className={classes.number}>
                      <p>Number</p>
                      {bookingDetails.phone}
                    </div>
                  </div>
                </div>
                <div className={classes.bookingDetails}>
                  <h3>Booking Details</h3>
                  <div className={classes.innerDetails}>
                    <div className={classes.arrival}>
                      <p>Arrival to the Parking</p>
                      <p>
                        {formattedDateEntry} <br /> {formattedTimeEntry}
                      </p>
                    </div>
                    <img src={arrow} alt="arrow" />
                    <div className={classes.depart}>
                      <p>Departure from car park</p>
                      <p>
                        {formattedDateExit} <br /> {formattedTimeExit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className={classes.location}>{selectedLocation.name}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

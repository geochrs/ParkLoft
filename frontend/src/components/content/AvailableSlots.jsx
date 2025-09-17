import classes from './AvailableSlots.module.css';
import cardImg from '../../assets/parkloft.jpg';
import logo from '../../assets/parkloftLogo.png';
import arrow from '../../assets/arrow.svg';
import confirm from '../../assets/confirm.svg';
import LoadingIndicator from '../layout/LoadingIndicator.jsx';

import { Form, useLoaderData, useActionData, Await } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Skeleton from '../layout/Skeleton.jsx';
import { validateBookInputs } from '../../utils/validateForm.js';

export function AvailableSlots() {
  const { slots, user } = useLoaderData();
  const data = useActionData();

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  const [formServerError, setFormServerError] = useState(false);

  const handleClientValidation = (event) => {
    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('fullName');
    const phone = formData.get('phone');
    const licensePlate = formData.get('licensePlate');
    const vehicleId = formData.get('vehicle_id');

    const errors = validateBookInputs(fullName, phone, licensePlate, vehicleId);

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setFormErrors(errors);
    } else {
      setFormErrors({});
    }
  };

  const handleInputChange = () => {
    if (formServerError) setFormServerError(false);
    if (Object.keys(formErrors).length > 0) setFormErrors({});
  };

  useEffect(() => {
    if (data?.message) {
      setFormServerError(true);
    } else {
      setFormServerError(false);
    }
  }, [data]);

  const showFormServerError =
    !Object.keys(formErrors).length && data?.message && formServerError;

  const handlePhoneInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
  };

  useEffect(() => {
    if (data?.success) {
      setBookingConfirmed(true);
      setBookingDetails(null);
      const timer = setTimeout(() => {
        setBookingDetails(data.bookingDetails);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleBook = (location) => () => {
    setSelectedLocation(location);
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
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
        <Suspense
          fallback={
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
          }
        >
          <Await resolve={slots}>
            {(slotsResolved) =>
              !bookingConfirmed && !selectedLocation ? (
                slotsResolved.length === 0 ? (
                  <p>
                    No slots available because all locations are fully booked.
                  </p>
                ) : (
                  <div className={classes.results}>
                    {slotsResolved.map((location) => (
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
                )
              ) : null
            }
          </Await>
        </Suspense>
        {/* Show the booking form only for the selected location */}
        {selectedLocation && !bookingConfirmed && (
          <Form
            className={classes.form}
            method="POST"
            onSubmit={handleClientValidation}
            noValidate
            action="/slots-available"
          >
            <input
              type="hidden"
              name="location_id"
              value={selectedLocation.location_id}
            />
            <input type="hidden" name="entryTime" value={entryTime} />
            <input type="hidden" name="exitTime" value={exitTime} />
            {showFormServerError && (
              <ul className={classes.errorList}>
                {Array.isArray(data.message) ? (
                  data.message.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))
                ) : (
                  <li>{data.message}</li>
                )}
              </ul>
            )}
            <div className={classes.inputGroup}>
              <Suspense fallback={null}>
                <Await resolve={user}>
                  {(userResolved) => (
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder=" "
                      defaultValue={userResolved?.username || ''}
                      onChange={handleInputChange}
                    />
                  )}
                </Await>
              </Suspense>
              <label htmlFor="fullName">Full Name</label>
              {formErrors.fullName && (
                <span className={classes.errorValidation}>
                  {formErrors.fullName}
                </span>
              )}
            </div>
            <div className={classes.row}>
              <div className={classes.inputGroup}>
                <Suspense fallback={null}>
                  <Await resolve={user}>
                    {(userResolved) => (
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder=" "
                        defaultValue={userResolved?.phone || ''}
                        required
                        maxLength={10}
                        onInput={handlePhoneInput}
                        onChange={handleInputChange}
                      />
                    )}
                  </Await>
                </Suspense>
                <label htmlFor="phone">Phone</label>
                {formErrors.phone && (
                  <span className={classes.errorValidation}>
                    {formErrors.phone}
                  </span>
                )}
              </div>
              <Suspense fallback={null}>
                <Await resolve={user}>
                  {(userResolved) => {
                    if (userResolved?.vehicles?.length > 0) {
                      // Dropdown for logged-in users
                      return (
                        <div className={classes.inputGroup}>
                          <label
                            id={classes.droplistVehicle}
                            htmlFor="vehicle_id"
                          >
                            Select Vehicle
                          </label>
                          <select
                            id="vehicle_id"
                            name="vehicle_id"
                            defaultValue=""
                            onChange={handleInputChange}
                            required
                          >
                            {userResolved.vehicles.map((v) => (
                              <option key={v.vehicle_id} value={v.vehicle_id}>
                                {v.licensePlate}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    } else {
                      // Input for guests
                      return (
                        <div className={classes.inputGroup}>
                          <input
                            id="licensePlate"
                            type="text"
                            name="licensePlate"
                            placeholder=" "
                            maxLength={7}
                            required
                            onChange={handleInputChange}
                          />
                          <label htmlFor="licensePlate">License Plate</label>
                          {formErrors.licensePlate && (
                            <span className={classes.errorValidation}>
                              {formErrors.licensePlate}
                            </span>
                          )}
                        </div>
                      );
                    }
                  }}
                </Await>
              </Suspense>
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
            <div className={classes.inputGroupButtons}>
              <button
                type="button"
                className={classes.backButton}
                onClick={handleBackClick}
              >
                Back
              </button>
              <button type="submit" className={classes.confirmButton}>
                Confirm
              </button>
            </div>
          </Form>
        )}
        {bookingConfirmed && !bookingDetails && <LoadingIndicator />}
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

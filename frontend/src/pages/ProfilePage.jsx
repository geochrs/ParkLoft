import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modal';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { ProfileSection } from '../components/content/ProfileSection';
import classes from '../components/content/ProfileSection.module.css';

export default function ProfilePage() {
  const { profile, bookings } = useLoaderData();
  const dispatch = useDispatch();

  const [view, setView] = useState('active');

  const handleEditClick = () => {
    dispatch(
      modalActions.openModal({
        key: 'editProfile',
      })
    );
  };

  const handleManageClick = () => {
    dispatch(
      modalActions.openModal({
        key: 'editVehicles',
      })
    );
  };

  const now = new Date();
  const activeBookings = bookings.filter((b) => new Date(b.exitTime) >= now);
  const pastBookings = bookings.filter((b) => new Date(b.exitTime) < now);

  const displayedBookings = view === 'active' ? activeBookings : pastBookings;

  return (
    <div data-aos="fade">
      <ProfileSection>
        <div className={classes.card}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            className={classes.profileImg}
          />
          <p className={classes.textBold}>{profile.username}</p>
          <div className={classes.row}>
            <div className={classes.textMuted}>Email:</div>
            <div>{profile.email}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.textMuted}>Phone:</div>
            <div>{profile.phone}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.textMuted}>Date of Birth:</div>
            <div>{profile.dateOfBirth}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.textMuted}>Vehicles:</div>
            <div>
              {profile.vehicles && profile.vehicles.length > 0
                ? profile.vehicles.map((v, index) => (
                    <div key={v.vehicle_id}>
                      {index + 1}. {v.licensePlate}
                    </div>
                  ))
                : 'No vehicles added'}
            </div>
          </div>
          <div className={classes.rowButtons}>
            <button className={classes.editButton} onClick={handleEditClick}>
              Edit Profile
            </button>
            <button
              className={classes.manageButton}
              onClick={handleManageClick}
            >
              Manage Vehicles
            </button>
          </div>
        </div>
        {/* Booking section */}
        <div className={classes.bookingCard}>
          <div className={classes.bookingHeader}>
            <h3>{view === 'active' ? 'Active Bookings' : 'Past Bookings'}</h3>
            <div>
              <button
                className={classes.toggleButton}
                onClick={() => setView(view === 'active' ? 'past' : 'active')}
              >
                {view === 'active' ? 'Past Bookings' : 'Active Bookings'}
              </button>
            </div>
          </div>
          {displayedBookings.length === 0 ? (
            <div className={classes.noData}>
              {view === 'active' ? 'No active bookings.' : 'No past bookings.'}
            </div>
          ) : (
            <div className={classes.table}>
              <div className={`${classes.tableRow} ${classes.tableHeader}`}>
                <div>TICKET ID</div>
                <div>LICENSE PLATE</div>
                <div>PLACE</div>
                <div>ENTRY TIME</div>
                <div>EXIT TIME</div>
              </div>

              {displayedBookings.map((booking) => {
                const entry = new Date(booking.entryTime);
                const exit = new Date(booking.exitTime);

                const formattedDateEntry = entry.toLocaleDateString('en-GB', {
                  timeZone: 'UTC',
                });
                const formattedTimeEntry = entry.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC',
                });

                const formattedDateExit = exit.toLocaleDateString('en-GB', {
                  timeZone: 'UTC',
                });
                const formattedTimeExit = exit.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC',
                });

                return (
                  <div key={booking.id} className={classes.tableRow}>
                    <div>{booking.ticketId}</div>
                    <div>{booking.licensePlate}</div>
                    <div>{booking.Location?.name}</div>
                    <div>
                      {formattedDateEntry} <br /> {formattedTimeEntry}
                    </div>
                    <div>
                      {formattedDateExit} <br /> {formattedTimeExit}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className={classes.bookNowContainer}>
            <Link to="/slots-available" className={classes.bookNowButton}>
              Book Now
            </Link>
          </div>
        </div>
      </ProfileSection>
    </div>
  );
}

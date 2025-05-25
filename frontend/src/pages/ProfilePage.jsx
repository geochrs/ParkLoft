import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modal';

import ProfileSection from '../components/content/ProfileSection';
import classes from '../components/content/ProfileSection.module.css';

export default function ProfilePage() {
  const { profile, bookings } = useLoaderData();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(
      modalActions.openModal({
        key: 'editProfile',
      })
    );
  };

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
          <button className={classes.editButton} onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
        <div className={classes.bookingCard}>
          <h3>Your Bookings</h3>
          <div className={classes.table}>
            <div className={`${classes.tableRow} ${classes.tableHeader}`}>
              <div>TICKET ID</div>
              <div>LICENSE PLATE</div>
              <div>PLACE</div>
              <div>ENTRY TIME</div>
              <div>EXIT TIME</div>
            </div>
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              bookings.map((booking) => {
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
                      {formattedDateEntry} {formattedTimeEntry}
                    </div>
                    <div>
                      {formattedDateExit} {formattedTimeExit}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className={classes.bookNowContainer}>
            <button className={classes.bookNowButton}>Book Now</button>
          </div>
        </div>
      </ProfileSection>
    </div>
  );
}

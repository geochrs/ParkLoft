import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modal';

import ProfileSection from '../components/content/ProfileSection';
import classes from '../components/content/ProfileSection.module.css';

export default function ProfilePage() {
  const data = useLoaderData();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(
      modalActions.openModal({
        key: 'editProfile',
      })
    );
  };
  return (
    <ProfileSection>
      <div className={classes.card}>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          className={classes.profileImg}
        />
        <p className={classes.textBold}>{data.username}</p>
        <div className={classes.row}>
          <div className={classes.textMuted}>Email:</div>
          <div>{data.email}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.textMuted}>Phone:</div>
          <div></div>
        </div>
        <div className={classes.row}>
          <div className={classes.textMuted}>Date of Birth:</div>
          <div> </div>
        </div>
        <button className={classes.editButton} onClick={handleEditClick}>
          Edit Profile
        </button>
      </div>
      <div className={classes.card}>
        <h3>Your Bookings</h3>
        <div className={classes.bookingRow}>
          <div>TICKET ID</div>
          <div>LICENSE PLATE</div>
          <div>PLACE</div>
          <div>ENTRY TIME</div>
          <div>EXIT TIME</div>
        </div>
      </div>
    </ProfileSection>
  );
}

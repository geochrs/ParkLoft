import ProfileSection from '../components/content/ProfileSection';
import classes from '../components/content/ProfileSection.module.css';
export default function ProfilePage() {
  return (
    <ProfileSection>
      <div className={classes.card}>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          className={classes.profileImg}
        />
        <p className={classes.textBold}>John Smith</p>
        <div className={classes.row}>
          <div className={classes.textMuted}>Email:</div>
          <div>gogos-chr@hotmail.com</div>
        </div>
        <div className={classes.row}>
          <div className={classes.textMuted}>Phone:</div>
          <div>+306986487131</div>
        </div>
        <div className={classes.row}>
          <div className={classes.textMuted}>Date of Birth:</div>
          <div>12-05-1995</div>
        </div>
        <button className={classes.editButton}>Edit Profile</button>
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

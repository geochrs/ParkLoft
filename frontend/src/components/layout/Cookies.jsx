import { modalActions } from '../../store/modal';
import classes from './Cookies.module.css';
import { useDispatch } from 'react-redux';

export function Cookies() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(modalActions.openModal({ key: 'editCookies' }));
  };

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div>
          <h3 className={classes.h3}>We use cookies!</h3>
          <p>
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By accepting,
            you consent to our use of cookies.
          </p>
        </div>
        <div className={classes.actions}>
          <button className={classes.acceptButton}>Accept All</button>
          <button className={classes.editButton} onClick={handleOpenModal}>Manage Preferences</button>
          <button className={classes.editButton}>Reject Optional</button>
        </div>
      </div>
    </section>
  );
}

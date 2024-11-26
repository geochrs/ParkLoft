import { Form, useRouteLoaderData, useNavigation } from 'react-router-dom';
import classes from './EditProfileForm.module.css';
import { modalActions } from '../../store/modal';
import { useDispatch } from 'react-redux';

export default function EditProfileForm() {
  const data = useRouteLoaderData('profile');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isSubmitting = navigation.state === 'submitting';

  const handleAfterSubmit = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Form
      method="put"
      className={classes.form}
      action="/profile"
      onSubmit={handleAfterSubmit}
    >
      <h2 className={classes.title}>Edit Profile</h2>
      <div className={classes.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          defaultValue={data.username}
        />
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="phone">Phone</label>
        <input id="phone" type="tel" name="phone" defaultValue={data.phone} />
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          defaultValue={data.dateOfBirth}
        />
      </div>

      <div className={classes.actions}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </Form>
  );
}

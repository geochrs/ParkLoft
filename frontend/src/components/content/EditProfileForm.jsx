import { Form, useRouteLoaderData, useNavigation } from 'react-router-dom';
import classes from './EditProfileForm.module.css';
import { modalActions } from '../../store/modal';
import { useDispatch } from 'react-redux';
import LoadingIndicator from '../layout/LoadingIndicator';
import { useState, useEffect } from 'react';

export function EditProfileForm() {
  const data = useRouteLoaderData('profile');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(data);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (navigation.state === 'submitting') {
      setIsSubmitting(true);
    } else if (isSubmitting && navigation.state === 'idle') {
      setTimeout(() => {
        dispatch(modalActions.closeModal());
        setIsSubmitting(false);
      }, 1000);
    }
  }, [navigation.state, isSubmitting, dispatch]);

  return (
    <Form method="put" className={classes.form} action="/profile">
      <h2 className={classes.title}>Edit Profile</h2>
      {isSubmitting && <LoadingIndicator />}
      {!isSubmitting && (
        <>
          <div className={classes.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={data.profile.username}
            />
          </div>

          <div className={classes.inputGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              defaultValue={data.profile.phone}
            />
          </div>

          <div className={classes.inputGroup}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              defaultValue={data.profile.dateOfBirth}
            />
          </div>
        </>
      )}
      <div className={classes.actions}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </Form>
  );
}

import { Form, useRouteLoaderData, useNavigation } from 'react-router-dom';
import classes from './EditProfileForm.module.css';

export default function EditProfileForm() {
  const data = useRouteLoaderData('profile');
  console.log(data);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className={classes.form} noValidate>
      <h2 className={classes.title}>Edit Profile</h2>
      {data?.message && (
        <ul className={classes.errorList}>
          {Array.isArray(data.message) ? (
            data.message.map((error, index) => <li key={index}>{error}</li>)
          ) : (
            <li>{data.message}</li>
          )}
        </ul>
      )}
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

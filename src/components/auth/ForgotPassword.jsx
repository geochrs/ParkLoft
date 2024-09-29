import { Form, useActionData, useNavigation } from 'react-router-dom';
import classes from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className={classes.form}>
      <h2 className={classes.title}>Forgot Your Password?</h2>
      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className={classes.inputGroup}>
        <input id="email" type="email" name="email" required placeholder=" " />
        <label htmlFor="email">Email</label>
      </div>
      <div className={classes.actions}>
        <button type="submit" disabled={isSubmitting}>
          {' '}
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </Form>
  );
}

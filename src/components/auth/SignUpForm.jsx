import { Form, useActionData, useNavigation, Link } from 'react-router-dom';
import classes from './SignUpForm.module.css';

export default function SignUpForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form method="post" className={classes.form}>
      <h2 className={classes.title}>Create an Account</h2>
      {data?.errors && (
        <ul className={classes.errorList}>
          {Object.values(data.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className={classes.inputGroup}>
        <input
          id="username"
          type="text"
          name="username"
          required
          placeholder=" "
        />
        <label htmlFor="username">Username</label>
      </div>
      <div className={classes.inputGroup}>
        <input id="email" type="email" name="email" required placeholder=" " />
        <label htmlFor="email">Email</label>
      </div>
      <div className={classes.inputGroup}>
        <input
          id="password"
          type="password"
          name="password"
          required
          placeholder=" "
        />
        <label htmlFor="password">Password</label>
      </div>
      <div className={classes.actions}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>
      <p className={classes.loginPrompt}>
        Already on ParkLoft?{' '}
        <Link to="/login" className={classes.loginLink}>
          Log in
        </Link>
      </p>
    </Form>
  );
}

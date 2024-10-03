import { Form, useActionData, useNavigation, Link } from 'react-router-dom';
import classes from './LoginForm.module.css';

export default function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className={classes.form}>
      <h2 className={classes.title}>Log in</h2>
      {data?.errors && (
        <ul className={classes.errorList}>
          {Object.values(data.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
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
      <div className>
        <p className={classes.forgotPassword}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </div>
      <div className={classes.actions}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </div>
      <p className={classes.signupPrompt}>
        New to ParkLoft? <br />
        <Link to="/signup" className={classes.signupLink}>
          Create an account
        </Link>
      </p>
    </Form>
  );
}

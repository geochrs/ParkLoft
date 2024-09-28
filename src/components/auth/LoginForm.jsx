import {
  Form,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import classes from './LoginForm.module.css';


export default function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post"  className={classes.form}>
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
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </Form>
  );
}
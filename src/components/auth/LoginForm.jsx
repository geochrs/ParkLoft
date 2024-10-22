import { Form, useActionData, useNavigation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './LoginForm.module.css';
import { formActions } from '../../store/form';
import { validateInputs } from './validateForm';

export default function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useSelector((state) => state.form.errors);

  const isSubmitting = navigation.state === 'submitting';

  const handleClientValidation = (event) => {
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const errors = validateInputs(null, email, password, 'login');

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      dispatch(formActions.setErrors(errors));
    } else {
      dispatch(formActions.clearErrors());
    }
  };

  return (
    <Form
      method="post"
      className={classes.form}
      onSubmit={handleClientValidation}
      noValidate
    >
      <h2 className={classes.title}>Log in</h2>
      {data?.errors && (
        <ul className={classes.errorList}>
          {Array.isArray(data.errors) ? (
            data.errors.map((error, index) => <li key={index}>{error}</li>)
          ) : (
            <li>{data.errors}</li>
          )}
        </ul>
      )}
      <div className={classes.inputGroup}>
        <input id="email" type="email" name="email" placeholder=" " />
        <label htmlFor="email">Email</label>
        {formErrors.email && (
          <span className={classes.errorValidation}>{formErrors.email}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <input id="password" type="password" name="password" placeholder=" " />
        <label htmlFor="password">Password</label>
        {formErrors.password && (
          <span className={classes.errorValidation}>{formErrors.password}</span>
        )}
      </div>
      <div>
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

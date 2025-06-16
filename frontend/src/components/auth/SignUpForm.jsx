import { Form, useActionData, useNavigation, Link } from 'react-router-dom';
import classes from './SignUpForm.module.css';
import { validateInputs } from '../../utils/validateForm';
import { useState, useEffect } from 'react';

export function SignUpForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [formErrors, setFormErrors] = useState({});
  const [formServerError, setFormServerError] = useState(false);

  const isSubmitting = navigation.state === 'submitting';

  const handleClientValidation = (event) => {
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const errors = validateInputs(username, email, password, 'signup');

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setFormErrors(errors);
    } else {
      setFormErrors({});
    }
  };

  const handleInputChange = () => {
    if (formServerError) setFormServerError(false);
    if (Object.keys(formErrors).length > 0) setFormErrors({});
  };

  useEffect(() => {
    if (data?.message) {
      setFormServerError(true);
    } else {
      setFormServerError(false);
    }
  }, [data]);

  const showFormServerError =
    !Object.keys(formErrors).length && data?.message && formServerError;

  return (
    <Form
      method="post"
      className={classes.form}
      onSubmit={handleClientValidation}
      noValidate
      action="/signup"
    >
      <h2 className={classes.title}>Create an Account</h2>
      {showFormServerError && (
        <ul className={classes.errorList}>
          {Array.isArray(data.message) ? (
            data.message.map((error, index) => <li key={index}>{error}</li>)
          ) : (
            <li>{data.message}</li>
          )}
        </ul>
      )}
      <div className={classes.inputGroup}>
        <input
          id="username"
          type="text"
          name="username"
          placeholder=" "
          onChange={handleInputChange}
        />
        <label htmlFor="username">Username</label>
        {formErrors.username && (
          <span className={classes.errorValidation}>{formErrors.username}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <input
          id="email"
          type="email"
          name="email"
          placeholder=" "
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        {formErrors.email && (
          <span className={classes.errorValidation}>{formErrors.email}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <input
          id="password"
          type="password"
          name="password"
          placeholder=" "
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        {formErrors.password && (
          <span className={classes.errorValidation}>{formErrors.password}</span>
        )}
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

  // EditProfileForm.js
  import { Form, useNavigation } from 'react-router-dom';
  import { useState } from 'react';
  import classes from './EditProfileForm.module.css';

  export default function EditProfileForm({ profileData }) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const [formErrors, setFormErrors] = useState({});

    const handleClientValidation = (event) => {
      const formData = new FormData(event.currentTarget);
      const username = formData.get('username');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const dateOfBirth = formData.get('dateOfBirth');

      if (Object.keys(errors).length > 0) {
        event.preventDefault();
        setFormErrors(errors);
      } else {
        setFormErrors({});
      }
    };

    return (
      <Form
        method="post"
        className={classes.form}
        onSubmit={handleClientValidation}
        noValidate
      >
        <h2 className={classes.title}>Edit Profile</h2>
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
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={profileData.username}
            placeholder=" "
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
            defaultValue={profileData.email}
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
          {formErrors.email && (
            <span className={classes.errorValidation}>{formErrors.email}</span>
          )}
        </div>

        <div className={classes.inputGroup}>
          <input
            id="phone"
            type="tel"
            name="phone"
            defaultValue={profileData.phone}
            placeholder=" "
          />
          <label htmlFor="phone">Phone</label>
          {formErrors.phone && (
            <span className={classes.errorValidation}>{formErrors.phone}</span>
          )}
        </div>

        <div className={classes.inputGroup}>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            defaultValue={profileData.dateOfBirth}
            placeholder=" "
          />
          <label htmlFor="dateOfBirth">Date of Birth</label>
          {formErrors.dateOfBirth && (
            <span className={classes.errorValidation}>
              {formErrors.dateOfBirth}
            </span>
          )}
        </div>

        <div className={classes.actions}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </Form>
    );
  }

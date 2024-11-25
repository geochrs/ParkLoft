import { useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from './EditProfileForm.module.css';
import { useState } from 'react';
import { modalActions } from '../../store/modal';
import { useDispatch } from 'react-redux';

export default function EditProfileForm() {
  const data = useRouteLoaderData('profile');
  const submit = useSubmit();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: data.username,
    phone: data.phone,
    dateOfBirth: data.dateOfBirth,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.target;
    const formData = new FormData(form);

    submit(formData, {
      method: 'put',
      action: '/profile',
    });

    dispatch(modalActions.closeModal());
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <h2 className={classes.title}>Edit Profile</h2>
      <div className={classes.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className={classes.inputGroup}>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>

      <div className={classes.actions}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

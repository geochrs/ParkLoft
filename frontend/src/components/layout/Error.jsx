import { NavLink, useRouteError } from 'react-router-dom';
import classes from './Error.module.css';

export default function Error() {
  const error = useRouteError();

  const errorMessage = error?.message || 'An unknown error occurred';
  const errorStatus = error?.status || 500;

  return (
    <div className={classes.errorContainer}>
      <h1 className={classes.errorH1}>
        {errorStatus === 404 ? '404' : errorMessage}
      </h1>
      <p className={classes.errorMessage}>
        {"Looks like the page you're looking for doesn't exist." ||
          'Something went wrong!'}
      </p>
      <NavLink to="/" className={classes.errorHomeButton}>
        go to homepage
      </NavLink>
    </div>
  );
}

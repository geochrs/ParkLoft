import { modalActions } from '../../store/modal';
import { useState, useEffect } from 'react';
import classes from './Cookies.module.css';
import { useDispatch } from 'react-redux';
import {
  getCookiePreferences,
  saveCookiePreferences,
  applyCookiePreferences,
} from '../../utils/cookieConsent';

export function Cookies() {
  const dispatch = useDispatch();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const prefs = getCookiePreferences();
    if (!prefs) {
      setShowBanner(true);
    } else {
      applyCookiePreferences(prefs);
    }
  }, []);

  const acceptAll = () => {
    const prefs = { essential: true, analytics: true };
    saveCookiePreferences(prefs);
    applyCookiePreferences(prefs);
    setShowBanner(false);
  };

  const rejectOptional = () => {
    const prefs = { essential: true, analytics: false };
    saveCookiePreferences(prefs);
    applyCookiePreferences(prefs);
    setShowBanner(false);
  };

  const openPreferences = () => {
    dispatch(modalActions.openModal({ key: 'editCookies' }));
  };

  if (!showBanner) return null;

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div>
          <h3 className={classes.h3}>We use cookies!</h3>
          <p>
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By accepting,
            you consent to our use of cookies.
          </p>
        </div>
        <div className={classes.actions}>
          <button className={classes.acceptButton} onClick={acceptAll}>
            Accept All
          </button>
          <button className={classes.editButton} onClick={openPreferences}>
            Manage Preferences
          </button>
          <button className={classes.editButton} onClick={rejectOptional}>
            Reject Optional
          </button>
        </div>
      </div>
    </section>
  );
}

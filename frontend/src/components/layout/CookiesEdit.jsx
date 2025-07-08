import { useState } from 'react';
import classes from './CookiesEdit.module.css';

const cookieSections = [
  {
    id: 'essential',
    label: 'Essential',
    description:
      'These cookies are necessary for the website to function and cannot be switched off.',
    required: true,
    checked: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description:
      'Analytics cookies allow us to analyze your visits and actions, serve personalized ads or content, and make our service better.',
    required: false,
    checked: true,
  },
];

export function CookiesEdit() {
  const [openSection, setOpenSection] = useState(null);
  const [cookieSettings, setCookieSettings] = useState(() =>
    cookieSections.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr.checked }),
      {}
    )
  );

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const toggleCookie = (id) => {
    setCookieSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={classes.container}>
      <h3>Preferences</h3>
      <h4>Cookies usage</h4>
      <p>
        We use cookies to ensure the basic functionalities of the website and to
        enhance your online experience. You can choose for each category to
        opt-in or opt-out.
      </p>
      {cookieSections.map((section) => (
        <div className={classes.accordionItem} key={section.id}>
          <div className={classes.accordionHeader}>
            <div
              className={classes.labelWithIcon}
              onClick={() => toggleSection(section.id)}
            >
              <svg
                className={`${classes.icon} ${
                  openSection === section.id ? classes.open : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#666"
              >
                <path d="M5.23 7.21a1 1 0 0 1 1.41 0L10 10.59l3.36-3.38a1 1 0 1 1 1.41 1.42l-4.07 4.09a1 1 0 0 1-1.41 0L5.23 8.63a1 1 0 0 1 0-1.42z" />
              </svg>
              <span className={classes.label}>{section.label}</span>
            </div>
            <div className={classes.switch}>
              <label className={classes.toggle}>
                <input
                  type="checkbox"
                  checked={cookieSettings[section.id]}
                  disabled={section.required}
                  onChange={() => toggleCookie(section.id)}
                />
                <span className={classes.slider}></span>
              </label>
            </div>
          </div>
          {openSection === section.id && (
            <div className={classes.accordionContent}>
              <p>{section.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

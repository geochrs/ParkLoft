import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import logo from '../../assets/parkloftLogo.png';

export default function Navbar() {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${classes.header} ${isSticky ? classes.sticky : ''}`}>
      <div className={classes.innerContainer}>
        <Link to="/" className="siteLogo">
          <img src={logo} alt="site logo" className={classes.logo} />
        </Link>
        {!isAuthPage && (
          <nav>
            <ul className={classes.navList}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works">How it works</NavLink>
              </li>
            </ul>
          </nav>
        )}
        {!isAuthPage && (
          <div>
            <ul className={classes.authList}>
              <li>
                <Link to="/login" className={classes.loginLink}>
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/signup" className={classes.signupLink}>
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import logo from '../../assets/parkloftLogo.png';

export default function Navbar() {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`${classes.header} ${
        isSticky && !menuOpen ? classes.sticky : undefined
      }`}
    >
      <div className={classes.innerContainer}>
        <Link to="/" className={menuOpen ? classes.hideLogo : undefined}>
          <img src={logo} alt="site logo" className={classes.logo} />
        </Link>
        {!isAuthPage && (
          <nav
            className={`${
              menuOpen ? `${classes.navActive} ${classes.navbarMobile}` : ''
            } ${classes.navBar}`}
          >
            <div
              className={`${classes.hamburger} ${
                menuOpen ? classes.hamburgerActive : ''
              }`}
              onClick={toggleMenu}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
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
          </nav>
        )}
      </div>
    </header>
  );
}

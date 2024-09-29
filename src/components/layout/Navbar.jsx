import { NavLink, Link, useLocation } from 'react-router-dom';
import classes from './Navbar.module.css';
import logo from '../../assets/parkloftLogo.png';

export default function Navbar() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className={classes.header}>
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
              <NavLink to="/about">About</NavLink>
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
    </header>
  );
}

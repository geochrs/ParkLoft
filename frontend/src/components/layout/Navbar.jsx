import { NavLink, Link, useLocation, Form } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import logo from '../../assets/parkloftLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../../store/menu';
import { tokenLoader } from '../../utils/auth';

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isMenuOpen = useSelector((state) => state.menu.isOpen);
  const [token, setToken] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password';

  useEffect(() => {
    const fetchToken = async () => {
      const authData = await tokenLoader();
      setToken(authData);
    };

    fetchToken();
  }, [location.pathname]);

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
    dispatch(menuActions.closeMenu());
  }, [location.pathname, dispatch]);

  const toggleMenu = () => {
    dispatch(menuActions.toggleMenu());
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <header
      className={`${classes.header} ${
        isSticky && !isMenuOpen ? classes.sticky : undefined
      }`}
    >
      <div className={classes.innerContainer}>
        <Link to="/" className={isMenuOpen ? classes.hideLogo : undefined}>
          <img src={logo} alt="site logo" className={classes.logo} />
        </Link>
        {!isAuthPage && (
          <nav
            className={`${
              isMenuOpen ? `${classes.navActive} ${classes.navbarMobile}` : ''
            } ${classes.navBar}`}
          >
            <div
              className={`${classes.hamburger} ${
                isMenuOpen ? classes.hamburgerActive : ''
              }`}
              onClick={toggleMenu}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className={classes.navList}>
              <div className={classes.leftLinks}>
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
                  <NavLink
                    to="/slots-available"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    Available Slots
                  </NavLink>
                </li>
              </div>

              <div className={classes.rightLinks}>
                {!token && (
                  <li>
                    <Link to="/login" className={classes.loginButton}>
                      Log in
                    </Link>
                  </li>
                )}
                {!token && (
                  <li>
                    <Link to="/signup" className={classes.signupButton}>
                      Get Started
                    </Link>
                  </li>
                )}
                {token && (
                  <li>
                    <Form
                      action="/logout"
                      method="post"
                      onSubmit={handleLogout}
                    >
                      <button className={classes.logoutButton}>Log out</button>
                    </Form>
                  </li>
                )}
                {token && (
                  <li>
                    <Link to="/profile" className={classes.profileButton}>
                      My Profile
                    </Link>
                  </li>
                )}
              </div>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

import {
  NavLink,
  Link,
  useLocation,
  Form,
  useRouteLoaderData,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import logo from '../../assets/parkloftLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';
import { menuActions } from '../../store/menu';

export default function Navbar() {
  const token = useRouteLoaderData('root');
  const dispatch = useDispatch();
  const location = useLocation();
  const isMenuOpen = useSelector((state) => state.menu.isOpen);

  const [isSticky, setIsSticky] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.openModal());
    dispatch(menuActions.closeMenu());
  };

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
    dispatch(menuActions.closeMenu());
  }, [location.pathname, dispatch]);

  const toggleMenu = () => {
    dispatch(menuActions.toggleMenu());
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
                <NavLink to="/" onClick={handleOpenModal}>
                  How it works
                </NavLink>
              </li>
              {!token && (
                <li>
                  <Link to="/login" className={classes.loginLink}>
                    Log in
                  </Link>
                </li>
              )}
              {!token && (
                <li>
                  <Link to="/signup" className={classes.signupLink}>
                    Get Started
                  </Link>
                </li>
              )}
              {token && (
                <li>
                  <Form action="/logout" method="post">
                    <button className={classes.logoutButton}>Log out</button>
                  </Form>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

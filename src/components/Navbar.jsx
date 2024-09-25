import { NavLink, Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import logo from '../assets/parkloftLogo.png'

export default function Navbar() {
  return (
    <header className={classes.header}>
      <a className='siteLogo'>
        <img src={logo} alt='site logo' className={classes.logo}/>
      </a>
      <nav>
        <ul className={classes.list}>
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
      <div>
        <ul>
          <li>
            <Link to='/login'
            >
            Get Started 
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Modal from '../components/layout/Modal';
import modalStyles from '../components/layout/Modal.module.css';

export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <Modal className={modalStyles.homeModal}>
          <h3>How It Works</h3>
          <ul>
            <li>
              <span>1</span>
              <div>
                <h4>Find your car park!</h4>
                <p>
                  Sign up and check our presence at hotels, restaurants,
                  airport...
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h4>Book!</h4>
                <p>Select date and time, check availability, see prices...</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h4>And Park!</h4>
                <p>Upon arrival, just show your reservation in the car park</p>
              </div>
            </li>
          </ul>
        </Modal>
      </main>
    </>
  );
}

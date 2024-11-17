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
        <Modal className={modalStyles.homeModal} />
      </main>
    </>
  );
}

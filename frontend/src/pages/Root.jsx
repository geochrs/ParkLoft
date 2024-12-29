import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Modal from '../components/layout/Modal';

export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <Modal />
      </main>
    </>
  );
}

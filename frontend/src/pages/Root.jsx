import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Modal from '../components/layout/Modal';
import ScrollToTop from '../components/layout/ScrollToTop';

export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollToTop />
        <Outlet />
        <Modal />
      </main>
    </>
  );
}

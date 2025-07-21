import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Modal from '../components/layout/Modal';
import ScrollToTop from '../components/layout/ScrollToTop';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Cookies } from '../components/layout/Cookies';
import { usePageTracking } from '../hooks/usePageTracking';

export default function Root() {
  usePageTracking();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <ScrollToTop />
        <Outlet />
        <Modal />
        <Cookies />
      </main>
    </>
  );
}

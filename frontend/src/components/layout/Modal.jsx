import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';
import EditProfileForm from '../content/EditProfileForm';

export default function Modal({ className }) {
  const { isOpen, contentKey } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const dialog = useRef();

  const getModalContent = (key) => {
    switch (key) {
      case 'editCookies':
        return (
          <div className={classes.homeModal}>
            <h3>Preferences</h3>
            <h4>Cookies usage</h4>
            <p>
              We use cookies to ensure the basic functionalities of the website
              and to enhance your online experience. You can choose for each
              category to opt-in or opt-out.
            </p>
          </div>
        );
      case 'editProfile':
        return <EditProfileForm />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const modal = dialog.current;
    if (isOpen) {
      modal.showModal();
    }

    return () => {
      if (isOpen) modal.close();
    };
  }, [isOpen]);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  return createPortal(
    <dialog
      ref={dialog}
      className={`${classes.modal} ${className || ''} `}
      onClose={handleClose}
    >
      <button className={classes.closeButton} onClick={handleClose}>
        &times;
      </button>
      {getModalContent(contentKey)}
    </dialog>,
    document.getElementById('modal')
  );
}

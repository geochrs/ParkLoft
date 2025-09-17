import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';
import { EditProfileForm } from '../content/EditProfileForm';
import { EditVehiclesForm } from '../content/EditVehiclesForm';
import { CookiesEdit } from './CookiesEdit';

export default function Modal() {
  const { isOpen, contentKey } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const dialog = useRef();

  const getModalContent = (key) => {
    switch (key) {
      case 'editCookies':
        return <CookiesEdit />;
      case 'editProfile':
        return <EditProfileForm />;
      case 'editVehicles':
        return <EditVehiclesForm />;
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
    <dialog ref={dialog} className={classes.modal} onClose={handleClose}>
      <button className={classes.closeButton} onClick={handleClose}>
        &times;
      </button>
      {getModalContent(contentKey)}
    </dialog>,
    document.getElementById('modal')
  );
}

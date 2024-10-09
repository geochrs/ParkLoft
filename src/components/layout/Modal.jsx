import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';

export default function Modal({ children }) {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (isOpen) {
      modal.showModal();
    }
    return () => modal.close();
  }, [isOpen]);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  return createPortal(
    <dialog ref={dialog} className={classes.modal} onClose={handleClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

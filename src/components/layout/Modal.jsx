import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';

export default function Modal({ className }) {
  const { isOpen, contentKey } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const dialog = useRef();

  const getModalContent = (key) => {
    switch (key) {
      case 'howItWorks':
        return (
          <div>
            <h3>How It Works</h3>
            <ul>
              <li>
                <span>1</span>
                <div>
                  <h4>Find your car park!</h4>
                  <p>
                    Sign up and check our presence at hotels, restaurants,
                    airports...
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
                  <p>
                    Upon arrival, just show your reservation in the car park
                  </p>
                </div>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

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

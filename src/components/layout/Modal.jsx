import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';
import EditProfileForm from '../content/EditProfileForm';
import { useNavigation } from 'react-router-dom';

export default function Modal({ className }) {
  const { isOpen, contentKey } = useSelector((state) => state.modal);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dialog = useRef();

  const isSubmitting = navigation.state === 'submitting';

  console.log('Modal State:', isOpen, 'Is Submitting:', isSubmitting);  // Add this line to debug


  const getModalContent = (key) => {
    switch (key) {
      case 'howItWorks':
        return (
          <div className={classes.homeModal}>
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
      case 'editProfile':
        return <EditProfileForm />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const modal = dialog.current;
    if (isOpen && !isSubmitting) {
      modal.showModal();
    }
    return () => modal.close();
  }, [isOpen, isSubmitting]);

  const handleClose = () => {
    if (!isSubmitting) {
      console.log("Closing modal");  // Check if modal is closing prematurely
      dispatch(modalActions.closeModal());
    }
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

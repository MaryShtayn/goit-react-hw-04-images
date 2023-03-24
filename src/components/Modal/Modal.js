import { Overlay, Modal } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export const ImageModal = ({ url, onCloseModal }) => {
  useEffect(() => {
    const handelKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handelKeyDown);
    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  }, [onCloseModal]);

  const handelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handelBackdropClick}>
      <Modal>
        <img src={url} alt="large img in modal window" />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

ImageModal.propTypes = {
  url: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

import { Overlay, Modal } from './Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export class ImageModal extends Component {
  componentDidMount(prevProps) {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handelBackdropClick = evn => {
    if (evn.target === evn.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handelBackdropClick}>
        <Modal>
          <img src={this.props.url} alt="large img in modal window" />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}

ImageModal.propTypes = {
  url: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

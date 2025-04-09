import React from 'react';
import Modal from 'react-modal';
import s from './ModalContainer.module.css';
import { MdOutlineClose } from 'react-icons/md';

Modal.setAppElement('#root');

const ModalContainer = ({ isOpen, onClose, children, title }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      contentLabel={title || 'Modal'}
    >
      <button onClick={onClose} className={s.closeButton}>
        <MdOutlineClose className={s.myIcon} />
      </button>
      <div className={`${s.container} ${s.adaptive}`}>
        {title && <h3 className={s.title}>{title}</h3>}
        {children}
      </div>
    </Modal>
  );
};

export default ModalContainer;

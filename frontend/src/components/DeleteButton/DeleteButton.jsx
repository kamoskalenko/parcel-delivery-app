import React from 'react';
import s from './DeleteButton.module.css';
import { MdDeleteForever } from 'react-icons/md';

const DeleteButton = ({ onClick }) => {
  return (
    <button className={s.deleteBtn} onClick={onClick} title="Delete request">
      <MdDeleteForever className={s.myIcon} />
    </button>
  );
};

export default DeleteButton;

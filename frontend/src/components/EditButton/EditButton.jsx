import React from 'react';
import s from './EditButton.module.css';
import { MdEdit } from 'react-icons/md';

const EditButton = ({ onClick }) => {
  return (
    <button className={s.editBtn} onClick={onClick} title="Edit request">
      <MdEdit className={s.myIcon} />
    </button>
  );
};

export default EditButton;

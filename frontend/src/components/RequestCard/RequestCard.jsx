import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './RequestCard.module.css';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

const RequestCard = ({ request, onDelete }) => {
  const location = useLocation();
  const {
    _id,
    fromCity,
    toCity,
    dispatchDate,
    parcelType,
    parcelDescription,
    createdAt,
  } = request;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };


  return (
    <div className={s.card}>
      <div className={s.logoContainer}>
        <img src="/logo.svg" alt="Parcel Logo" className={s.logo} />
      </div>

      <div className={s.info}>
        <p className={s.fromTo}>
          <span className={s.label}>From:</span> {fromCity}
        </p>
        <p className={s.fromTo}>
          <span className={s.label}>To:</span> {toCity}
        </p>
        <p className={s.dispatchDate}>
          <span className={s.label}>Date:</span> {formatDate(dispatchDate)}
        </p>
        <p className={s.details}>
          <strong>Parcel type:</strong> {parcelType}
        </p>
        <p className={s.details}>
          <strong>Description:</strong> {parcelDescription}
        </p>
        <p className={s.details}>
          <strong>Created at:</strong> {formatDate(createdAt)}
        </p>
        <div className={s.buttons}>
          <Link
            to={`/requests/${_id}/edit`}
            state={{ backgroundLocation: location }}
            className={s.editLink}
          >
            <EditButton />
          </Link>
          <DeleteButton onClick={() => onDelete(_id)} />
        </div>
      </div>
    </div>
  );
};

export default RequestCard;

import React from 'react';
import s from './RequestList.module.css';
import RequestCard from '../RequestCard/RequestCard';
import { useDispatch } from 'react-redux';
import { deleteRequest } from '../../redux/operations';
import { success as toastSuccess } from '../../utils/toast';
import { error as toastError } from '../../utils/toast';

const RequestList = ({ requests }) => {
  const dispatch = useDispatch();
  const items = Array.isArray(requests) ? requests : [];

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRequest(id)).unwrap();
      toastSuccess('Request deleted');
    } catch {
      toastError('Failed to delete request');
    }
  };

  return (
    <div className={s.requestList}>
      {items.map((request) => (
        <RequestCard
          key={request._id}
          request={request}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default RequestList;

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ModalContainer from './ModalContainer/ModalContainer';
import RequestForm from '../RequestForm/RequestForm';
import { addRequest } from '../../redux/operations';
import { success as toastSuccess } from '../../utils/toast';
import { error as toastError } from '../../utils/toast';

const RequestFormModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const formattedData = {
      ...data,
      parcelDescription: data.parcelDescription,
    };

    try {
      await dispatch(addRequest(formattedData)).unwrap();
      toastSuccess('Request added successfully!');
      navigate(-1);
    } catch {
      toastError('Error adding request!');
    }
  };

  return (
    <ModalContainer
      isOpen={true}
      onClose={() => navigate(-1)}
      title="Create request"
    >
      <RequestForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default RequestFormModal;

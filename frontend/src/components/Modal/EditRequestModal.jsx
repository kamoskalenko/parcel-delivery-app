import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ModalContainer from './ModalContainer/ModalContainer';
import RequestForm from '../RequestForm/RequestForm';
import { API } from '../../redux/operations';
import { updateRequest } from '../../redux/operations';
import { success as toastSuccess } from '../../utils/toast';
import { error as toastError } from '../../utils/toast';
import Loader from '../Loader/Loader';

const EditRequestModal = () => {
  const { requestId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await API.get(`/requests/${requestId}`);
        setInitialData(res.data.data);
      } catch {
        toastError('Failed to fetch request!');
        navigate(-1);
      }
    };

    fetchRequest();
  }, [requestId, navigate]);

  const handleUpdate = async (formData) => {
    const payload = {
      fromCity: formData.fromCity,
      toCity: formData.toCity,
      parcelType: formData.parcelType,
      dispatchDate: formData.dispatchDate,
      parcelDescription: formData.parcelDescription,
    };

    try {
      await dispatch(updateRequest({ id: requestId, body: payload })).unwrap();
      toastSuccess('Request edited successfully!');
      navigate(-1);
    } catch {
      toastError('Error editing request!');
    }
  };

  return (
    <ModalContainer
      isOpen={true}
      onClose={() => navigate(-1)}
      title="Edit request"
    >
      {initialData ? (
        <RequestForm onSubmit={handleUpdate} initialValues={initialData} />
      ) : (
        <Loader />
      )}
    </ModalContainer>
  );
};

export default EditRequestModal;

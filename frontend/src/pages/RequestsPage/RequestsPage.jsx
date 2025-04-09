import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../../redux/operations';
import {
  selectRequests,
  selectPagination,
  selectLoading,
  selectError,
} from '../../redux/selectors';
import RequestList from '../../components/RequestList/RequestList';
import Loader from '../../components/Loader/Loader';
import { error as toastError } from '../../utils/toast';
import MainButton from '../../components/MainButton/MainButton';
import s from './RequestsPage.module.css';

const RequestsPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    dispatch(fetchRequests({ page: 1, perPage: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toastError(error);
    }
  }, [error]);

  const loadMore = () => {
    if (pagination.hasNextPage) {
      dispatch(
        fetchRequests({
          page: pagination.page + 1,
          perPage: pagination.perPage,
        }),
      );
    }
  };

  return (
    <div className={s.container}>
      {loading && <Loader />}
      <RequestList requests={requests} />
      {pagination.hasNextPage && (
        <MainButton onClick={loadMore} className={s.loadBtn}>
          Load More
        </MainButton>
      )}
    </div>
  );
};

export default RequestsPage;

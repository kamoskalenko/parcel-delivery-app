import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRequests } from '../redux/operations';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';

const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const RequestsPage = lazy(() => import('../pages/RequestsPage/RequestsPage'));
const Layout = lazy(() => import('../components/Layout/Layout'));
const RequestFormModal = lazy(() => import('./Modal/RequestFormModal'));
const EditRequestModal = lazy(() => import('./Modal/EditRequestModal'));

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/requests"
            element={
              <Layout>
                <RequestsPage />
              </Layout>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route path="/requests/new" element={<RequestFormModal />} />
            <Route
              path="/requests/:requestId/edit"
              element={<EditRequestModal />}
            />
          </Routes>
        )}
        <ToastContainer />
      </Suspense>
    </div>
  );
};

export default App;

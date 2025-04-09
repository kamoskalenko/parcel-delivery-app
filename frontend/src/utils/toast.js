import { toast } from 'react-toastify';

export const success = (message = 'Operation successful!', options = {}) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    ...options,
  });
};

export const error = (message = 'An error occurred!', options = {}) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    ...options,
  });
};

export const info = (message = 'Here is some information.', options = {}) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 5000,
    ...options,
  });
};

export const warn = (message = 'Warning!', options = {}) => {
  toast.warn(message, {
    position: 'top-right',
    autoClose: 5000,
    ...options,
  });
};

import { configureStore } from '@reduxjs/toolkit';
import requestsReducer from './slice';

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
  },
});

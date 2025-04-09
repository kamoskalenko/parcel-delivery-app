import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchRequests,
  addRequest,
  updateRequest,
  deleteRequest,
} from './operations';

const initialState = {
  items: [],
  pagination: {
    page: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  loading: false,
  error: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.fulfilled, (state, action) => {
        const {
          data: requestsArray,
          page,
          perPage,
          totalItems,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        } = action.payload;
        const itemsArray = Array.isArray(requestsArray) ? requestsArray : [];
        if (page === 1) {
          state.items = itemsArray;
        } else {
          state.items = [...state.items, ...itemsArray];
        }
        state.pagination = {
          page,
          perPage,
          totalItems,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        const updatedRequest = action.payload;
        const index = state.items.findIndex(
          (item) => item._id === updatedRequest._id,
        );
        if (index !== -1) {
          state.items[index] = updatedRequest;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          fetchRequests.pending,
          addRequest.pending,
          updateRequest.pending,
          deleteRequest.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchRequests.rejected,
          addRequest.rejected,
          updateRequest.rejected,
          deleteRequest.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export default requestsSlice.reducer;

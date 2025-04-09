import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async ({ page, perPage }, thunkAPI) => {
    try {
      const response = await API.get('/requests', {
        params: { page, perPage },
      });
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addRequest = createAsyncThunk(
  'requests/addRequest',
  async (body, thunkAPI) => {
    try {
      const response = await API.post('/requests', body);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const updateRequest = createAsyncThunk(
  'requests/updateRequest',
  async ({ id, body }, thunkAPI) => {
    try {
      const response = await API.put(`/requests/${id}`, body);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteRequest = createAsyncThunk(
  'requests/deleteRequest',
  async (id, thunkAPI) => {
    try {
      await API.delete(`/requests/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../services/axiosClient'; 

export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchFeedbacks', async (centreId) => {
  const response = await axiosClient.get(`Feedback/GetListByCenterId?id=${centreId}`);
  return response.data;
});

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default feedbackSlice.reducer;

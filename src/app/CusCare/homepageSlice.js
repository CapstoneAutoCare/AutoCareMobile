import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCentreData } from '../../api/homepageService';

export const getCentre = createAsyncThunk('centre/getCentre', async (centreId) => {
  const response = await fetchCentreData(centreId);
  return response.data;
});

const homepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    centre: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCentre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCentre.fulfilled, (state, action) => {
        state.loading = false;
        state.centre = action.payload;
      })
      .addCase(getCentre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default homepageSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../services/axiosClient';

export const fetchRequests = createAsyncThunk('requests/fetchRequests', async (centreId) => {
  try {
    const response = await axiosClient.get(`Bookings/GetListByCenterId?id=${centreId}`, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    const requestsWithNames = await Promise.all(response.data.map(async (request) => {
      const clientName = `${request.responseClient.firstName} ${request.responseClient.lastName}`;
      const vehicleNumber = request.responseVehicles.licensePlate;
      const maintenanceCenterName = request.responseCenter.maintenanceCenterName;
      
      return {
        ...request,
        clientName,
        vehicleNumber,
        maintenanceCenterName,
      };
    }));

    return requestsWithNames;
  } catch (error) {
    throw new Error('Failed to fetch requests');
  }
});


const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    loading: false,
    error: null,
    requests: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default requestSlice.reducer;

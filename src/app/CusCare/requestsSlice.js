import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchRequests = createAsyncThunk('requests/fetchRequests', async () => {
  const response = await Axios.get('http://autocare.runasp.net/api/Bookings/GetAll');
  const requestsWithNames = await Promise.all(response.data.map(async (request) => {
    const clientName = await fetchClientName(request.clientId);
    const vehicleNumber = await fetchVehicleNumber(request.vehicleId);
    const maintenanceCenterName = await fetchMaintenanceCenterName(request.maintenanceCenterId);
    return {
      ...request,
      clientName,
      vehicleNumber,
      maintenanceCenterName,
    };
  }));
  return requestsWithNames;
});

const fetchClientName = async (clientId) => {
  const response = await Axios.get(`http://autocare.runasp.net/api/Clients/GetById?id=${clientId}`);
  return `${response.data.firstName} ${response.data.lastName}`;
};

const fetchVehicleNumber = async (vehicleId) => {
  const response = await Axios.get(`http://autocare.runasp.net/api/Vehicles/GetById?id=${vehicleId}`);
  return response.data.licensePlate;
};

const fetchMaintenanceCenterName = async (maintenanceCenterId) => {
  const response = await Axios.get(`http://autocare.runasp.net/api/MaintenanceCenters/GetById?id=${maintenanceCenterId}`);
  return response.data.maintenanceCenterName;
};

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

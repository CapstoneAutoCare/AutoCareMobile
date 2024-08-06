import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchRequests = createAsyncThunk('requests/fetchRequests', async (centreId) => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  const response = await Axios.get(
    `https://autocareversion2.tryasp.net/api/Bookings/GetListByCenterId?id=${centreId}`,{
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const requestsWithNames = await Promise.all(response.data.map(async (request) => {
    const clientName = request.responseClient.firstName + " " + request.responseClient.lastName;
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
});

const fetchClientName = async (clientId) => {
  const response = await Axios.get(`https://autocareversion2.tryasp.net/api/Clients/GetById?id=${clientId}`);
  return `${response.data.firstName} ${response.data.lastName}`;
};

const fetchVehicleNumber = async (vehicleId) => {
  const response = await Axios.get(`https://autocareversion2.tryasp.net/api/Vehicles/GetById?id=${vehicleId}`);
  return response.data.licensePlate;
};

const fetchMaintenanceCenterName = async (maintenanceCenterId) => {
  const response = await Axios.get(`https://autocareversion2.tryasp.net/api/MaintenanceCenters/GetById?id=${maintenanceCenterId}`);
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

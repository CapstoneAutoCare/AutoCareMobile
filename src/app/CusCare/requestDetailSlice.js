import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchClientName,
  fetchVehicleNumber,
  fetchMaintenanceCenterName,
  fetchRequestDetail as fetchRequestDetailAPI,
  updateStatus as updateStatusAPI,
  fetchStaffByCenterId,
} from '../../api/requestDetailService';
import axiosClient from '../../services/axiosClient';

// Async thunk to fetch request detail
export const fetchRequestDetail = createAsyncThunk(
  'requestDetail/fetchRequestDetail',
  async (requestId, thunkAPI) => {
    try {
      const data = await fetchRequestDetailAPI(requestId);
      const clientName = await fetchClientName(data.clientId);
      const vehicleNumber = await fetchVehicleNumber(data.vehicleId);
      const maintenanceCenterName = await fetchMaintenanceCenterName(data.maintenanceCenterId);
      return {
        ...data,
        clientName,
        vehicleNumber,
        maintenanceCenterName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to update status
export const updateStatus = createAsyncThunk(
  'requestDetail/updateStatus',
  async ({ cuscareId, requestId, newStatus }, thunkAPI) => {
    try {
      await updateStatusAPI(cuscareId, requestId, newStatus);
      return { cuscareId, requestId, newStatus };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch staff by center
export const fetchStaffByCenter = createAsyncThunk(
  'requestDetail/fetchStaffByCenter', 
  async (centreId) => {
    const response = await fetchStaffByCenterId(centreId);
    return response;
  }
);

export const assignTask = createAsyncThunk(
  'requestDetail/assignTask',
  async ({ id, technicianId }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        'MaintenanceTasks/Post',
        {
          informationMaintenanceId: id,
          technicianId: technicianId,
          maintenanceTaskName: `Bàn giao xe cho nhân viên`
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Failed to assign task');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchMaintenanceTasks = createAsyncThunk(
  'requestDetail/fetchMaintenanceTasks',
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get('MaintenanceTasks/GetListByCustomerCare');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Creating the requestDetail slice
const requestDetailSlice = createSlice({
  name: 'requestDetail',
  initialState: {
    loading: false,
    request: null,
    staffList: [], 
    error: null,
    isTaskAssigned: false,
    maintenanceTasks: [], 
  },
  reducers: {
    setIsTaskAssigned: (state, action) => {
      state.isTaskAssigned = action.payload;
    },
    clearStaffList: (state) => {
      state.staffList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Case for fetchRequestDetail
      .addCase(fetchRequestDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(fetchRequestDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Case for fetchStaffByCenter
      .addCase(fetchStaffByCenter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaffByCenter.fulfilled, (state, action) => {
        state.staffList = action.payload;
        state.loading = false;
      })
      .addCase(fetchStaffByCenter.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(assignTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignTask.fulfilled, (state) => {
        state.loading = false;
        state.isTaskAssigned = true;
      })
      .addCase(assignTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cases for fetchMaintenanceTasks
      .addCase(fetchMaintenanceTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaintenanceTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.maintenanceTasks = action.payload;
      })
      .addCase(fetchMaintenanceTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setIsTaskAssigned, clearStaffList } = requestDetailSlice.actions;

export default requestDetailSlice.reducer;

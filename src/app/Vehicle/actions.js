import { createAsyncThunk } from "@reduxjs/toolkit";
import { vehicleService } from "../../services/vehicleService";

export const getListVehicleByClient = createAsyncThunk(
  "vehicle/getListVehicleByClient",
  async (_, { rejectWithValue }) => {
    try {
      const response = await vehicleService.getListVehicleByClient();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
import { createSlice } from "@reduxjs/toolkit";
import { getListVehicleByClient, getListVehicleModel } from "./actions";

const accountSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicleListByClient: [],
    vehicleModel: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListVehicleByClient.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleListByClient = action.payload;
    });
    builder.addCase(getListVehicleModel.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleModel = action.payload;
    });
  },
});

export default accountSlice.reducer;

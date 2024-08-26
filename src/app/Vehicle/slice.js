import { createSlice } from "@reduxjs/toolkit";
import { getListVehicleByClient, getListVehicleModel, getListVehicleBrand, getListVehicleModelByBrandId } from "./actions";

const accountSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicleListByClient: [],
    vehicleModel: [],
    loading: null,
    vehicleBrand: [],
    vehicleModelByBrandId:[],
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
    builder.addCase(getListVehicleBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleBrand = action.payload;
    });
    builder.addCase(getListVehicleModelByBrandId.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleModelByBrandId = action.payload;
    });
  },
});

export default accountSlice.reducer;

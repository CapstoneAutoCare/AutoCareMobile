import { createSlice } from "@reduxjs/toolkit";
import { getListVehicleByClient } from "./actions";

const accountSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicleListByClient: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListVehicleByClient.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleListByClient = action.payload;
    });
  },
});

export default accountSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getListCenter, getListService, getListServiceById } from "./actions";

const accountSlice = createSlice({
  name: "center",
  initialState: {
    centerList: [],
    serviceList: [],
    serviceById: null,
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListCenter.fulfilled, (state, action) => {
      state.loading = false;
      state.centerList = action.payload;
    });
    builder.addCase(getListService.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceList = action.payload;
    });
    builder.addCase(getListServiceById.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceById = action.payload;
    });
  },
});

export default accountSlice.reducer;

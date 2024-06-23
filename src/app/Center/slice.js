import { createSlice } from "@reduxjs/toolkit";
import { getListCenter, getListService, getListServiceById, getListStaff, getListStaffById } from "./actions";

const accountSlice = createSlice({
  name: "center",
  initialState: {
    centerList: [],
    serviceList: [],
    serviceById: null,
    staffList: [],
    staffById: null,
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
    builder.addCase(getListStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.staffList = action.payload;
    });
    builder.addCase(getListStaffById.fulfilled, (state, action) => {
      state.loading = false;
      state.staffById = action.payload;
    });
  },
});

export default accountSlice.reducer;

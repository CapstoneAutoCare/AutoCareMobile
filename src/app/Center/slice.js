import { createSlice } from "@reduxjs/toolkit";
import { getCenterById, getListCare, getListCareById, getListCenter, getListInformations, getListService, getListServiceById, getListStaff, getListStaffById, getPackageById, getReceiptById, getService, getServiceByCenter } from "./actions";

const accountSlice = createSlice({
  name: "center",
  initialState: {
    centerList: [],
    informationsList: [],
    serviceList: [],
    service: [],
    serviceById: null,
    packageById: null,
    centerById: null,
    receiptById: null,
    serviceByCenter: [],
    staffList: [],
    careList: [],
    staffById: null,
    careById: null,
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListCenter.fulfilled, (state, action) => {
      state.loading = false;
      state.centerList = action.payload;
    });
    builder.addCase(getListInformations.fulfilled, (state, action) => {
      state.loading = false;
      state.informationsList = action.payload;
    });
    builder.addCase(getCenterById.fulfilled, (state, action) => {
      state.loading = false;
      state.centerById = action.payload;
    });
    builder.addCase(getPackageById.fulfilled, (state, action) => {
      state.loading = false;
      state.packageById = action.payload;
    });
    builder.addCase(getReceiptById.fulfilled, (state, action) => {
      state.loading = false;
      state.receiptById = action.payload;
    });

    builder.addCase(getListService.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceList = action.payload;
    });
    builder.addCase(getService.fulfilled, (state, action) => {
      state.loading = false;
      state.service = action.payload;
    });
    builder.addCase(getServiceByCenter.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceByCenter = action.payload;
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
    builder.addCase(getListCare.fulfilled, (state, action) => {
      state.loading = false;
      state.careList = action.payload;
    });
    builder.addCase(getListCareById.fulfilled, (state, action) => {
      state.loading = false;
      state.careById = action.payload;
    });
  },
});

export default accountSlice.reducer;

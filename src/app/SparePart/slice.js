import { createSlice } from "@reduxjs/toolkit";
import {
  getListSparePart,
  getSparePartById,
  getSparePartByCenter,
  getSparePart,
} from "./actions";

const accountSlice = createSlice({
  name: "sparePart",
  initialState: {
    sparePartList: [],
    sparePartAllList: [],
    sparePartById: null,
    sparePartByCenter: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListSparePart.fulfilled, (state, action) => {
      state.loading = false;
      state.sparePartList = action.payload;
    });
    builder.addCase(getSparePart.fulfilled, (state, action) => {
      state.loading = false;
      state.sparePartAllList = action.payload;
    });
    builder.addCase(getSparePartById.fulfilled, (state, action) => {
      state.loading = false;
      state.sparePartById = action.payload;
    });
    builder.addCase(getSparePartByCenter.fulfilled, (state, action) => {
      state.loading = false;
      state.sparePartByCenter = action.payload;
    });
  },
});

export default accountSlice.reducer;

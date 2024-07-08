import { createSlice } from "@reduxjs/toolkit";
import {
  getListSparePart,
  getSparePartById,
  getSparePartByCenter,
} from "./actions";

const accountSlice = createSlice({
  name: "sparePart",
  initialState: {
    sparePartList: [],
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

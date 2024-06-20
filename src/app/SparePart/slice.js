import { createSlice } from "@reduxjs/toolkit";
import { getListSparePart, getSparePartById } from "./actions";

const accountSlice = createSlice({
  name: "sparePart",
  initialState: {
    sparePartList: [],
    sparePartById: null,
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
  },
});

export default accountSlice.reducer;

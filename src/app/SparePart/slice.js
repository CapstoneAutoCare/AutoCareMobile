import { createSlice } from "@reduxjs/toolkit";
import { getListSparePart } from "./actions";

const accountSlice = createSlice({
  name: "sparePart",
  initialState: {
    sparePartList: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListSparePart.fulfilled, (state, action) => {
      state.loading = false;
      state.sparePartList = action.payload;
    });
  },
});

export default accountSlice.reducer;

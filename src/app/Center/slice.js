import { createSlice } from "@reduxjs/toolkit";
import { getListCenter } from "./actions";

const accountSlice = createSlice({
  name: "center",
  initialState: {
    centerList: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListCenter.fulfilled, (state, action) => {
      state.loading = false;
      state.centerList = action.payload;
    });
  },
});

export default accountSlice.reducer;

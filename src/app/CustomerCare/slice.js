import { createSlice } from "@reduxjs/toolkit";
import { getListCustomerCare } from "./actions";

const accountSlice = createSlice({
  name: "customerCare",
  initialState: {
    customerCareList: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListCustomerCare.fulfilled, (state, action) => {
      state.loading = false;
      state.customerCareList = action.payload;
    });
  },
});

export default accountSlice.reducer;

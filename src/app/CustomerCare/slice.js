import { createSlice } from "@reduxjs/toolkit";
import { getListCustomerCareByCenterId } from "./actions";

const accountSlice = createSlice({
  name: "customerCare",
  initialState: {
    customerCareListByCenterId: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getListCustomerCareByCenterId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.customerCareListByCenterId = action.payload;
      }
    );
  },
});

export default accountSlice.reducer;

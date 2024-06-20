import { createSlice } from "@reduxjs/toolkit";
import { getListBooking, getListBookingByClient } from "./actions";

const accountSlice = createSlice({
  name: "booking",
  initialState: {
    bookingList: [],
    bookingListByClient: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingList = action.payload;
    });
    builder.addCase(getListBookingByClient.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingListByClient = action.payload;
    });
  },
});

export default accountSlice.reducer;

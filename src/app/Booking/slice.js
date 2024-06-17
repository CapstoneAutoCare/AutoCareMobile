import { createSlice } from "@reduxjs/toolkit";
import { getListBooking } from "./actions";

const accountSlice = createSlice({
  name: "booking",
  initialState: {
    bookingList: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingList = action.payload;
    });
  },
});

export default accountSlice.reducer;

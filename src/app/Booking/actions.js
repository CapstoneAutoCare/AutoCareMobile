import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingService } from "../../services/bookingService";

export const getListBooking = createAsyncThunk(
  "booking/getListBooking",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getListBooking();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

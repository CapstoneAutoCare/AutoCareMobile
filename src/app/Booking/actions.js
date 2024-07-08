import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingService } from "../../services/bookingService";

export const getListBooking = createAsyncThunk(
  "booking/GetListByCenter",
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
export const getListBookingByClient = createAsyncThunk(
  "booking/getListBookingByClient",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getListBookingByClient();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getListBookingById = createAsyncThunk(
  "booking/getListBookingById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingService.getListBookingById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
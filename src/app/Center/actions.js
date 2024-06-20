import { createAsyncThunk } from "@reduxjs/toolkit";
import { centerService } from "../../services/centerService";

export const getListCenter = createAsyncThunk(
  "center/GetListByCenter",
  async (_, { rejectWithValue }) => {
    try {
      const response = await centerService.getListCenter();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getListCenterByClient = createAsyncThunk(
  "center/getListCenterByClient",
  async (_, { rejectWithValue }) => {
    try {
      const response = await centerService.getListCenterByClient();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
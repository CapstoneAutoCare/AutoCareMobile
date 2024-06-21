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
export const getListService = createAsyncThunk(
  "center/getListService",
  async (_, { rejectWithValue }) => {
    try {
      const response = await centerService.getListService();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getListServiceById = createAsyncThunk(
  "center/getListServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.getListServiceById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
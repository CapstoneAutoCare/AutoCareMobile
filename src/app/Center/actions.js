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
export const postService = createAsyncThunk(
  "center/postService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await centerService.postService(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const postServiceCost = createAsyncThunk(
  "center/postServiceCost",
  async (data, { rejectWithValue }) => {
    try {
      const responseId = await centerService.postServiceCost(data);
      const response = await centerService.patchServiceCost(
        responseId.data.maintenanceServiceCostId
      );
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const postSparePartCost = createAsyncThunk(
  "center/postSparePartCost",
  async (data, { rejectWithValue }) => {
    try {
      const responseId = await centerService.postSparePartCost(data);
      const response = await centerService.patchSparePartCost(
        responseId.data.sparePartsItemCostId
      );
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const patchServiceCost = createAsyncThunk(
  "center/patchServiceCost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.patchServiceCost(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getListStaff = createAsyncThunk(
  "center/getListStaff",
  async (_, { rejectWithValue }) => {
    try {
      const response = await centerService.getListStaff();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getListStaffById = createAsyncThunk(
  "center/getListStaffById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.getListStaffById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getListCare = createAsyncThunk(
  "center/getListCare",
  async (_, { rejectWithValue }) => {
    try {
      const response = await centerService.getListCare();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getListCareById = createAsyncThunk(
  "center/getListCareById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.getListCareById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
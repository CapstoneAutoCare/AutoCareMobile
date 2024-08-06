import { createAsyncThunk } from "@reduxjs/toolkit";
import { centerService } from "../../services/centerService";

export const getListCenter = createAsyncThunk(
  "MaintenanceCenters/GetAll",
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
export const getListInformations = createAsyncThunk(
  "MaintenanceInformations/GetAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await centerService.getListInformations();
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
export const getService = createAsyncThunk(
  "center/getService",
  async (_, { rejectWithValue }) => {
    try {
      const response = await centerService.getService();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getServiceByCenter = createAsyncThunk(
  "center/getServiceByCenter",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.getServiceByCenter(id);
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
export const getReceiptById = createAsyncThunk(
  "center/getReceiptById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.getReceiptById(id);
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
export const deleteServiceById = createAsyncThunk(
  "center/deleteServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.deleteServiceById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const deleteSparePartById = createAsyncThunk(
  "center/deleteSparePartById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.deleteSparePartById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getCenterById = createAsyncThunk(
  "sparePart/getCenterById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await centerService.getCenterById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sparePartService } from "../../services/sparePartService";

export const getListSparePart = createAsyncThunk(
  "sparePart/getListSparePart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sparePartService.getListSparePart();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getSparePartById = createAsyncThunk(
  "sparePart/getSparePartById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await sparePartService.getSparePartById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

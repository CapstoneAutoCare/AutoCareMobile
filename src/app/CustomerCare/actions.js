import { createAsyncThunk } from "@reduxjs/toolkit";
import { customerCareService } from "../../services/customerCareService";

export const getListCustomerCare = createAsyncThunk(
  "customerCare/GetListByCustomerCare",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customerCareService.getListCustomerCare();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
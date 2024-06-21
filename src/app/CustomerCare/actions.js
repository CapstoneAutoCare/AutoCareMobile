import { createAsyncThunk } from "@reduxjs/toolkit";
import { customerCareService } from "../../services/customerCareService";

export const getListCustomerCareByCenterId = createAsyncThunk(
  "customerCare/getListCustomerCareByCenterId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await customerCareService.getListCustomerCareByCenterId(
        id
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
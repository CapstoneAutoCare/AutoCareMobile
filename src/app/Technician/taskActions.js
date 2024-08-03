import { createAsyncThunk } from "@reduxjs/toolkit";
import { taskService } from "../../api/taskService";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskService.getTasks();
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

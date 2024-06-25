import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/userSevice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
const initialState = {
  role: "CLIENT",
  accessToken: "",
  data: [],
  authenticated: false,
  accountId: null,
  profile: null,
  loading: false,
  error: null,
};
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await userService.login({ email, password });
      const jwtCode = jwtDecode(response?.data?.token);
      await AsyncStorage.setItem("ACCESS_TOKEN", response?.data?.token);
      await AsyncStorage.setItem(
        "ROLE",
        jwtCode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
      await AsyncStorage.setItem("ACCOUNT_ID", jwtCode["sub"]);
      return jwtCode;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("ACCESS_TOKEN");
      await AsyncStorage.removeItem("ROLE");
      await AsyncStorage.removeItem("ACCOUNT_ID");
      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const loadAuthState = createAsyncThunk(
  "user/loadAuthState",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const role = await AsyncStorage.getItem("ROLE");
      const accountId = await AsyncStorage.getItem("ACCOUNT_ID");
      if (accessToken) {
        return {
          authenticated: true,
          role,
          accountId,
        };
      }
      return {
        authenticated: false,
        role: "CLIENT",
        accountId: null,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getProfile = createAsyncThunk(
  "user/getSparePartById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.getProfile(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accountId = action.payload["sub"];
        state.role =
          action.payload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = null;
        state.authenticated = false;
        state.accountId = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadAuthState.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.accountId = action.payload.accountId;
        state.role = action.payload.role;
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        state.loading = true;
      })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
  },
});
export default userSlice.reducer;

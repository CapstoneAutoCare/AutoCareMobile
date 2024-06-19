import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/userSevice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
const initialState = {
  role: "CLIENT",
  userInfo: null,
  profile: null,
  accessToken: "",
  data: [],
  authenticated: false,
  isExitIntro: false,
  loadingIntro: false,
  accountId: null,
  loading: false,
  error: null,
  email: null,
};
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await userService.login({ email, password });
      console.log("<UserSlice>: " + response?.data);
      await AsyncStorage.setItem("ACCESS_TOKEN", response?.data?.token);
    //   await AsyncStorage.setItem("EMAIL", response?.data?.email);
    //   await AsyncStorage.setItem(
    //     "ACCOUNT_ID",
    //     JSON.stringify(response?.data?.accountId)
    //   );
    const role = jwtDecode(response?.data?.token);
      return role[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
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
      if (accessToken) {
        return {
          authenticated: true,
        };
      }
      return {
        authenticated: false,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
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
        // state.userInfo = action.payload;
        state.role = action.payload;
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
        state.userInfo = null;
        state.profile = null;
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
        state.userInfo = action.payload;
        // Load userInfo from AsyncStorage
        // const userInfoFromStorage = AsyncStorage.getItem("USER_INFO");
        // if (userInfoFromStorage) {
        //   state.userInfo = JSON.parse(userInfoFromStorage);
        // }
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        state.loading = true;
      })
  },
});
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  },
  reducers: {
    setCredentials: (state, action) => {
      const credentials = action.payload;
      if (credentials?.access) state.accessToken = credentials.access;
      if (credentials?.refresh) state.refreshToken = credentials.refresh;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    logOut: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) =>
  state.auth.refreshToken;

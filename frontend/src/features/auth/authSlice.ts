import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: "", refreshToken: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.accessToken = "";
      state.refreshToken ="";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;

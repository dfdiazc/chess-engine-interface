import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";

const initialState = {
    loading: false,
    accessToken: null,
    refreshToken: null,
    success: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => (
        builder.addCase(registerUser.pending, (state, action)  => {
            state.loading = true
        }),
        builder.addCase(registerUser.fulfilled, (state, action)  => {
            state.loading = false
            state.success = true
        }),
        builder.addCase(registerUser.rejected, (state, action)  => {
            state.loading = false
            state.success = false
        })
    ),
})

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authActions";

const initialState = {
    loading: false,
    accessToken: null,
    refreshToken: null,
    success: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action)  => {
            state.loading = true
        }),
        builder.addCase(register.fulfilled, (state, action)  => {
            state.loading = false
            state.success =  true
        }),
        builder.addCase(register.rejected, (state, action)  => {
            state.loading = false
            state.success =  false
        })
    },
})

export default authSlice.reducer;
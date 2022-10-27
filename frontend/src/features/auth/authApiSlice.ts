import { apiSlice } from "app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/users/login",
                method: "POST",
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: "/users/create",
                method: "POST",
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useLoginMutation, useRegisterMutation
} = authApiSlice
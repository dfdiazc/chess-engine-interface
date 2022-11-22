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
        logout: builder.mutation({
            query: credentials => ({
                url: "/users/logout",
                method: "POST",
                body: { ...credentials }
            })
        }),
        profile: builder.query({
            query: (args:void) => ({
              url: "/users/profile",
            }),
          }),
    })
})

export const {
    useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileQuery
} = authApiSlice
/* import { apiSlice } from "@/lib/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/users/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: "/users/logout",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getProfile: builder.query({
      query: (args: void) => ({
        url: "/users/profile",
      }),
    }),
    updateProfile: builder.mutation({
        query: (credentials) => ({
          url: "/users/update",
          method: "PUT",
          body: { ...credentials },
        }),
      }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation
} = authApiSlice;
 */
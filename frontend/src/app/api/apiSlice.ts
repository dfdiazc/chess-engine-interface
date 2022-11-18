import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "features/auth/authSlice";
import type { RootState } from "app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://146.190.33.159:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const accessToken = (api.getState() as RootState).auth.accessToken;
    const refreshResult = await baseQuery({url: "/users/refresh", method: "POST", body: {accessToken}}, api, extraOptions);
    if (refreshResult?.data) {
      const accessToken = (api.getState() as RootState).auth.accessToken;
      api.dispatch(setCredentials({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

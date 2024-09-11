import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}`,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  reducerPath: "api",
  endpoints: (builder) => ({}),
});

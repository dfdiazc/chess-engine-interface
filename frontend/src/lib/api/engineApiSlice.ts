import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const engineQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ENGINE_API_URL}`,
});

export const engineSlice = createApi({
  baseQuery: engineQuery,
  reducerPath: "engine",
  endpoints: (builder) => ({}),
});

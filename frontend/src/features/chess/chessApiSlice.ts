import { apiSlice } from "app/api/apiSlice";

export const chessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    suggestions: builder.query({
      query: (fen) => ({ url: `/api/play/stockfish/suggest/${fen.replaceAll("/", "-")}` }),
    }),
  }),
});

export const { useSuggestionsQuery } = chessApiSlice;

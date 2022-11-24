import { apiSlice } from "app/api/apiSlice";

export const chessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    engineMove: builder.query({
      query: ({ engine, difficulty = 1, fen }) => ({
        url: `/api/play/${engine}/${difficulty}/${fen.replaceAll("/", "-")}`,
      }),
    }),
    suggestions: builder.query({
      query: (fen) => ({
        url: `/api/play/stockfish/suggest/${fen.replaceAll("/", "-")}`,
      }),
    }),
  }),
});

export const { useSuggestionsQuery, useLazyEngineMoveQuery } = chessApiSlice;

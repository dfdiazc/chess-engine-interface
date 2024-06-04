import { engineSlice } from "@/lib/api/engineApiSlice";

export const engineApiSlice = engineSlice.injectEndpoints({
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

export const { useSuggestionsQuery, useLazyEngineMoveQuery } = engineApiSlice;

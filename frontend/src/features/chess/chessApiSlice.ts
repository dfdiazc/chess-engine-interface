import { apiSlice } from "app/api/apiSlice";

export const chessApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        suggestions: builder.mutation({
            query: fen => ({
                url: `/api/play/stockfish/suggest/${fen}`,
                method: "GET",
            })
        }),
    })
})

export const {
    useSuggestionsMutation
} = chessApiSlice
import { apiSlice } from "@/lib/api/apiSlice";
import Cookies from "js-cookie";

let ws: WebSocket;

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
    createMatch: builder.mutation({
      query: (playerColor) => ({
        url: "/api/match",
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: { player_color: playerColor },
      }),
    }),
    joinMatch: builder.mutation({
      query: (id) => ({
        url: "/api/match",
        method: "PATCH",
        credentials: "include",
        mode: "cors",
        body: { match_id: id },
      }),
    }),
    getMatch: builder.query({
      query: (id) => ({
        url: `/api/match?id=${id}`,
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const playerId = Cookies.get("player_id");
        ws = new WebSocket(
          `ws://localhost:8000/api/ws/match/${arg}?player_id=${playerId}`
        );
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData((draft) => {
              console.log(data);
              if (data.command === "move") {
                if (!draft.moves) {
                  draft.moves = [];
                }
                draft.moves.push(data.move);
              } else if (data.command === "start_game") {
                draft.game_state = data.status;
              }
            });
          };
          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    move: builder.mutation({
      queryFn: async ({ matchId, move }) => {
        return new Promise((resolve, reject) => {
          if (ws) {
            const message = JSON.stringify({
              move: move,
            });
            const listener = (event: MessageEvent) => {
              const data = JSON.parse(event.data);
              if (data.command === "move" && data.move === move) {
                ws.removeEventListener("message", listener);
                resolve({ data: data });
              }
            };

            ws.addEventListener("message", listener);
            ws.send(message);
          } else {
            reject("No websocket connection");
          }
        });
      },
    }),
  }),
});

export const {
  useSuggestionsQuery,
  useLazyEngineMoveQuery,
  useCreateMatchMutation,
  useGetMatchQuery,
  useJoinMatchMutation,
  useMoveMutation,
} = chessApiSlice;

import { apiSlice } from "@/lib/api/apiSlice";
import Cookies from "js-cookie";

let ws: WebSocket;

export const chessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMatch: builder.mutation({
      query: ({ playerColor, variant }) => ({
        url: "/api/match",
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: { player_color: playerColor, variant: variant },
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
          `${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}/api/ws/match/${arg}?player_id=${playerId}`
        );
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData((draft) => {
              if (data.command === "move") {
                if (!draft.moves) {
                  draft.moves = [];
                }
                draft.moves.push(data.move);
              } else if (data.command === "start_game") {
                draft.game_state = data.status;
                if (!draft.whites_player) {
                  draft.whites_player = data.whites_player;
                } else if (!draft.blacks_player) {
                  draft.blacks_player = data.blacks_player;
                }
              } else if (data.command === "game_over") {
                draft.game_state = data.status;
                draft.winner = data.winner;
                draft.outcome = data.outcome;
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
      queryFn: async ({ move }) => {
        return new Promise((resolve, reject) => {
          if (ws) {
            const message = JSON.stringify({
              command: "move",
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
    resign: builder.mutation({
      queryFn: async (playerId) => {
        return new Promise((resolve, reject) => {
          if (ws) {
            const message = JSON.stringify({
              command: "resign",
              player_id: playerId,
            });
            const listener = (event: MessageEvent) => {
              const data = JSON.parse(event.data);
              if (data.command === "game_over") {
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
  useCreateMatchMutation,
  useGetMatchQuery,
  useJoinMatchMutation,
  useMoveMutation,
  useResignMutation,
} = chessApiSlice;

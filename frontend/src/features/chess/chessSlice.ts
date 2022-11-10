import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

const chessSlice = createSlice({
  name: "chess",
  initialState: {
    playerColor: "w",
    engine: "Stockfish",
    gameStart: false,
    gameOver: false,
  },
  reducers: {
    setPlayerColor: (state, action) => {
      const playerColor = action.payload;
      state.playerColor = playerColor;
    },
    setEngine: (state, action) => {
      const engine = action.payload;
      state.engine = engine;
    },
    setGameStart: (state, action) => {
      const gameStart = action.payload;
      state.gameStart = gameStart;
    },
    setGameOver: (state, action) => {
      const gameOver = action.payload;
      state.gameOver = gameOver;
    },
  },
});

export const { setPlayerColor, setEngine, setGameStart, setGameOver } =
  chessSlice.actions;

export default chessSlice.reducer;

export const selectCurrentPlayerColor = (state: RootState) =>
  state.chess.playerColor;
export const selectCurrentEngine = (state: RootState) => state.chess.engine;
export const selectCurrentGameStart = (state: RootState) =>
  state.chess.gameStart;
export const selectCurrentGameOver = (state: RootState) => state.chess.gameOver;

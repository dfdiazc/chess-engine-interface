import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

const chessSlice = createSlice({
  name: "chess",
  initialState: {
    playerColor: "w",
    turn: "w",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    engine: "Stockfish",
    gameStart: false,
    gameOver: false,
  },
  reducers: {
    setPlayerColor: (state, action) => {
      const playerColor = action.payload;
      state.playerColor = playerColor;
    },
    setTurn: (state, action) => {
      const turn = action.payload;
      state.turn = turn;
    },
    setFen: (state, action) => {
      const fen = action.payload;
      state.fen = fen;
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

export const { setPlayerColor, setTurn, setFen, setEngine, setGameStart, setGameOver } =
  chessSlice.actions;

export default chessSlice.reducer;

export const selectCurrentPlayerColor = (state: RootState) =>
  state.chess.playerColor;
export const selectCurrentTurn = (state: RootState) => state.chess.turn;
export const selectCurrentFen = (state: RootState) => state.chess.fen;
export const selectCurrentEngine = (state: RootState) => state.chess.engine;
export const selectCurrentGameStart = (state: RootState) =>
  state.chess.gameStart;
export const selectCurrentGameOver = (state: RootState) => state.chess.gameOver;

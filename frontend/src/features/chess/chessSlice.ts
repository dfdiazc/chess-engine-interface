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
    elo: 1350,
    areSuggestionsShown: false,
    suggestionShown: {1: false, 2: false, 3: false},
    suggestionMoves: { 1: "e1e1", 2: "e1e1", 3: "e1e1" },
    suggestionPieces: { 1: "p", 2: "p", 3: "p" },
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
    setElo: (state, action) => {
      const elo = action.payload;
      state.elo = elo;
    },
    setAreSuggestionsShown: (state, action) => {
      const areSuggestionsShown = action.payload;
      state.areSuggestionsShown = areSuggestionsShown;
    },
    setSuggestionMoves: (state, action) => {
      const suggestionMoves = action.payload;
      state.suggestionMoves = suggestionMoves;
    },
    setSuggestionPieces: (state, action) => {
      const suggestionPieces = action.payload;
      state.suggestionPieces = suggestionPieces;
    },
    setSuggestionShown: (state, action) => {
      const suggestionShown = action.payload;
      state.suggestionShown = suggestionShown;
    },
  },
});

export const {
  setPlayerColor,
  setTurn,
  setFen,
  setEngine,
  setGameStart,
  setGameOver,
  setElo,
  setAreSuggestionsShown,
  setSuggestionMoves,
  setSuggestionPieces,
  setSuggestionShown,
} = chessSlice.actions;

export default chessSlice.reducer;

export const selectCurrentPlayerColor = (state: RootState) =>
  state.chess.playerColor;
export const selectCurrentTurn = (state: RootState) => state.chess.turn;
export const selectCurrentFen = (state: RootState) => state.chess.fen;
export const selectCurrentEngine = (state: RootState) => state.chess.engine;
export const selectCurrentGameStart = (state: RootState) =>
  state.chess.gameStart;
export const selectCurrentGameOver = (state: RootState) => state.chess.gameOver;
export const selectCurrentElo = (state: RootState) => state.chess.elo;
export const selectCurrentAreSuggestionsShown = (state: RootState) =>
  state.chess.areSuggestionsShown;
export const selectCurrentSuggestionMoves = (state: RootState) =>
  state.chess.suggestionMoves;
export const selectCurrentSuggestionPieces = (state: RootState) =>
  state.chess.suggestionPieces;
  export const selectCurrentSuggestionShown = (state: RootState) =>
  state.chess.suggestionShown;

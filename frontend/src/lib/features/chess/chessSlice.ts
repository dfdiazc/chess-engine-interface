import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

interface ChessState {
  initialRender: boolean;
  playerColor: string;
  turn: string;
  fen: string;
  gameHistory: string[];
  engine: string;
  creatingGame: boolean;
  gamestate: string;
  difficulty: number;
  engineDifficultyValues: { min: number; max: number };
  areSuggestionsShown: boolean;
  suggestionShown: { [key: number]: boolean };
  suggestionMoves: { [key: number]: string };
  suggestionPieces: { [key: number]: string };
  pieceStyle: string;
  areSettingsOpen: boolean;
  isMoveSoundActive: boolean;
  isTurnIndicatorShown: boolean;
}

const initialState: ChessState = {
  initialRender: true,
  playerColor: "w",
  turn: "w",
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  gameHistory: [],
  engine: "Stockfish",
  creatingGame: true,
  gamestate: "waiting",
  difficulty: 1500,
  engineDifficultyValues: { min: 1350, max: 2850 },
  areSuggestionsShown: false,
  suggestionShown: { 1: false, 2: false, 3: false },
  suggestionMoves: { 1: "", 2: "", 3: "" },
  suggestionPieces: { 1: "", 2: "", 3: "" },
  pieceStyle: "staunty",
  areSettingsOpen: false,
  isMoveSoundActive: true,
  isTurnIndicatorShown: true,
};

const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    setInitialRender: (state, action) => {
      const initialRender = action.payload;
      state.initialRender = initialRender;
    },
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
    setGameHistory: (state, action) => {
      const gameHistory = action.payload;
      state.gameHistory = gameHistory;
    },
    appendToGameHistory: (state, action) => {
      const newMove = action.payload;
      state.gameHistory.push(newMove);
    },
    setEngine: (state, action) => {
      const engine = action.payload;
      state.engine = engine;
    },
    setCreatingGame: (state, action) => {
      const creatingGame = action.payload;
      state.creatingGame = creatingGame;
    },
    setGameState: (state, action) => {
      const gamestate = action.payload;
      state.gamestate = gamestate;
    },
    setDifficulty: (state, action) => {
      const difficulty = action.payload;
      state.difficulty = difficulty;
    },
    setEngineDifficultyValues: (state, action) => {
      const engineDifficultyValues = action.payload;
      state.engineDifficultyValues = engineDifficultyValues;
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
    setPieceStyle: (state, action) => {
      const pieceStyle = action.payload;
      state.pieceStyle = pieceStyle;
    },
    setAreSettingOpen: (state, action) => {
      const areSettingsOpen = action.payload;
      state.areSettingsOpen = areSettingsOpen;
    },
    setIsMoveSoundActive: (state, action) => {
      const isMoveSoundActive = action.payload;
      state.isMoveSoundActive = isMoveSoundActive;
    },
    setIsTurnIndicatorShown: (state, action) => {
      const isTurnIndicatorShown = action.payload;
      state.isTurnIndicatorShown = isTurnIndicatorShown;
    },
  },
});

export const {
  setInitialRender,
  setPlayerColor,
  setTurn,
  setFen,
  setGameHistory,
  appendToGameHistory,
  setEngine,
  setCreatingGame,
  setGameState,
  setDifficulty,
  setAreSuggestionsShown,
  setSuggestionMoves,
  setSuggestionPieces,
  setSuggestionShown,
  setPieceStyle,
  setAreSettingOpen,
  setIsMoveSoundActive,
  setIsTurnIndicatorShown,
} = chessSlice.actions;

export default chessSlice.reducer;

export const selectCurrentInitialRender = (state: RootState) =>
  state.chess.initialRender;
export const selectCurrentPlayerColor = (state: RootState) =>
  state.chess.playerColor;
export const selectCurrentTurn = (state: RootState) => state.chess.turn;
export const selectCurrentFen = (state: RootState) => state.chess.fen;
export const selectCurrentGameHistory = (state: RootState) =>
  state.chess.gameHistory;
export const selectCurrentEngine = (state: RootState) => state.chess.engine;
export const selectCurrentCreatingGame = (state: RootState) =>
  state.chess.creatingGame;
export const selectCurrentGameState = (state: RootState) =>
  state.chess.gamestate;
export const selectCurrentDifficulty = (state: RootState) =>
  state.chess.difficulty;
export const selectCurrentEngineDifficultyValues = (state: RootState) =>
  state.chess.engineDifficultyValues;
export const selectCurrentAreSuggestionsShown = (state: RootState) =>
  state.chess.areSuggestionsShown;
export const selectCurrentSuggestionMoves = (state: RootState) =>
  state.chess.suggestionMoves;
export const selectCurrentSuggestionPieces = (state: RootState) =>
  state.chess.suggestionPieces;
export const selectCurrentSuggestionShown = (state: RootState) =>
  state.chess.suggestionShown;
export const selectCurrentPieceStyle = (state: RootState) =>
  state.chess.pieceStyle;
export const selectCurrentAreSettingsOpen = (state: RootState) =>
  state.chess.areSettingsOpen;
export const selectCurrentIsMoveSoundActive = (state: RootState) =>
  state.chess.isMoveSoundActive;
export const selectCurrentIsTurnIndicatorShown = (state: RootState) =>
  state.chess.isTurnIndicatorShown;

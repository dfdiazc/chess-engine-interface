import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

interface Move {
  from: string;
  to: string;
  promotion: string;
}

interface ChessState {
  initialRender: boolean;
  playerColor: string;
  turn: string;
  fen: string;
  variant: string;
  timeControl: string;
  moves: Move[];
  gameHistory: string[];
  hasJoinedGame: boolean;
  engine: string;
  creatingGame: boolean;
  gameState: string;
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
  variant: "standard",
  timeControl: "unlimited",
  moves: [],
  gameHistory: [],
  engine: "Stockfish",
  hasJoinedGame: false,
  creatingGame: true,
  gameState: "waiting",
  difficulty: 1500,
  engineDifficultyValues: { min: 1350, max: 2850 },
  areSuggestionsShown: false,
  suggestionShown: { 1: false, 2: false, 3: false },
  suggestionMoves: { 1: "", 2: "", 3: "" },
  suggestionPieces: { 1: "", 2: "", 3: "" },
  pieceStyle: "staunty",
  areSettingsOpen: false,
  isMoveSoundActive: true,
  isTurnIndicatorShown: false,
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
    setVariant: (state, action) => {
      const variant = action.payload;
      state.variant = variant;
    },
    setTimeControl: (state, action) => {
      const timeControl = action.payload;
      state.timeControl = timeControl;
    },
    addMove: (state, action) => {
      state.moves.push(action.payload);
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
    setHasJoinedGame: (state, action) => {
      const hasJoinedGame = action.payload;
      state.hasJoinedGame = hasJoinedGame;
    },
    setCreatingGame: (state, action) => {
      const creatingGame = action.payload;
      state.creatingGame = creatingGame;
    },
    setGameState: (state, action) => {
      const gameState = action.payload;
      state.gameState = gameState;
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
  setVariant,
  setTimeControl,
  setGameHistory,
  appendToGameHistory,
  setEngine,
  setHasJoinedGame,
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
  addMove,
} = chessSlice.actions;

export default chessSlice.reducer;

export const selectCurrentInitialRender = (state: RootState) =>
  state.chess.initialRender;
export const selectCurrentPlayerColor = (state: RootState) =>
  state.chess.playerColor;
export const selectCurrentTurn = (state: RootState) => state.chess.turn;
export const selectCurrentFen = (state: RootState) => state.chess.fen;
export const selectCurrentVariant = (state: RootState) => state.chess.variant;
export const selectCurrentTimeControl = (state: RootState) => state.chess.timeControl;
export const selectCurrentGameHistory = (state: RootState) =>
  state.chess.gameHistory;
export const selectCurrentEngine = (state: RootState) => state.chess.engine;
export const selectCurrentHasJoinedGame = (state: RootState) => state.chess.hasJoinedGame;
export const selectCurrentCreatingGame = (state: RootState) =>
  state.chess.creatingGame;
export const selectCurrentGameState = (state: RootState) =>
  state.chess.gameState;
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
export const selectCurrentMoves = (state: RootState) => state.chess.moves;

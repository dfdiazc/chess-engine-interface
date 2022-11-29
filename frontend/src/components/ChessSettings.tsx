import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayerColor,
  setPlayerColor,
  selectCurrentGameStart,
  setGameStart,
  setGameRestart,
  selectCurrentGameOver,
  selectCurrentPieceStyle,
  selectCurrentAreSettingsOpen,
  setAreSettingOpen,
} from "features/chess/chessSlice";
import EngineSelector from "./EngineSelector";
import DifficultySelector from "./DifficultySelector";
import { IconContext } from "react-icons";
import { AiFillSetting, AiOutlineReload } from "react-icons/ai";

const ChessSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const gameStart = useSelector(selectCurrentGameStart);
  const gameOver = useSelector(selectCurrentGameOver);
  const areSettingsOpen = useSelector(selectCurrentAreSettingsOpen);
  return (
    <div className="px-3 py-3 w-full lg:max-w-sm gap-5">
      <div className="px-3 py-3 bg-[#252729] drop-shadow-xl flex flex-col rounded grow shrink-0 w-full lg:max-w-sm">
        <div className="flex flex-col self-center w-full">
          <EngineSelector />
          <DifficultySelector />
        </div>
        <div className="flex flex-col self-center w-full">
          {!gameStart ? (
            <>
              <span className="font-roboto font-medium text-lg text-white text-center mt-10 select-none">
                Piece Color
              </span>
              <span className="w-full mr-3 mt-3 h-px bg-white"></span>
              <div className="flex flex-row gap-5 self-center mt-2">
                <button
                  className={
                    playerColor === "w"
                      ? "px-2 pt-1 pb-3 rounded-lg ring-2 ring-flamingo-100 bg-flamingo-100/50"
                      : "px-2 pt-1 pb-3 rounded-lg"
                  }
                  onClick={() => {
                    dispatch(setPlayerColor("w"));
                  }}
                >
                  <div
                    className="bg-center bg-no-repeat h-10 w-10"
                    style={{
                      backgroundImage: `url(https://unrealchess.live/static/chess/pieces/${pieceStyle}/wP.svg)`,
                      backgroundSize: "100%",
                    }}
                  />
                </button>
                <button
                  className={
                    playerColor === "b"
                      ? "px-2 pt-1 pb-3 rounded-lg ring-2 ring-flamingo-100 bg-flamingo-100/50"
                      : "px-2 pt-1 pb-3 rounded-lg"
                  }
                  onClick={() => {
                    dispatch(setPlayerColor("b"));
                  }}
                >
                  <div
                    className="bg-center bg-no-repeat h-10 w-10"
                    style={{
                      backgroundImage: `url(https://unrealchess.live/static/chess/pieces/${pieceStyle}/bP.svg)`,
                      backgroundSize: "100%",
                    }}
                  />
                </button>
              </div>
            </>
          ) : null}
          {gameStart ? (
            <div className="flex gap-2 mt-10">
              <button
                onClick={() => {
                  dispatch(setGameRestart(true));
                }}
                className={
                  !gameOver
                    ? "w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-flamingo-100 transition duration-300 hover:bg-flamingo-100 text-center"
                    : "w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-flamingo-100 transition duration-300 bg-flamingo-100/30 text-center"
                }
                disabled={!gameOver ? false : true}
              >
                <IconContext.Provider
                  value={{ className: "h-6 w-6 fill-white" }}
                >
                  <AiOutlineReload />
                </IconContext.Provider>
              </button>
              <button
                onClick={() => {
                  dispatch(setAreSettingOpen(true));
                }}
                className="w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-flamingo-100 transition duration-300 hover:bg-flamingo-100 text-center"
              >
                <IconContext.Provider
                  value={{ className: "h-6 w-6 fill-white" }}
                >
                  <AiFillSetting />
                </IconContext.Provider>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                dispatch(setGameStart(true));
              }}
              className={
                gameStart
                  ? "block grow whitespace-nowrap self-center text-xl text-white/50 font-roboto font-medium select-none px-10 py-3 bg-flamingo-100/50 rounded-full border-b-4 border-flamingo-300/30 transition duration-300 text-center mt-10"
                  : "block grow whitespace-nowrap self-center text-xl text-white font-roboto font-medium select-none px-10 py-3 bg-flamingo-100 rounded-full border-b-4 border-flamingo-200 transition duration-300 hover:bg-flamingo-200/80 hover:border-flamingo-300/80 hover:shadow text-center mt-10"
              }
            >
              Start Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessSettings;

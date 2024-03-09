"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
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
} from "@/lib/features/chess/chessSlice";
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
  return (
    <div className="m-3 w-full h-full gap-5">
      <div className="p-6 bg-neutral-800 drop-shadow-xl flex flex-col rounded-xl grow shrink-0 w-full">
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
                      ? "px-2 pt-1 pb-3 rounded-lg ring-2 ring-aquamarine-300 bg-aquamarine-400/50"
                      : "px-2 pt-1 pb-3 rounded-lg"
                  }
                  onClick={() => {
                    dispatch(setPlayerColor("w"));
                  }}
                >
                  <div
                    className="bg-center bg-no-repeat h-10 w-10"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/wP.svg)`,
                      backgroundSize: "100%",
                    }}
                  />
                </button>
                <button
                  className={
                    playerColor === "b"
                      ? "px-2 pt-1 pb-3 rounded-lg ring-2 ring-aquamarine-300 bg-aquamarine-400/50"
                      : "px-2 pt-1 pb-3 rounded-lg"
                  }
                  onClick={() => {
                    dispatch(setPlayerColor("b"));
                  }}
                >
                  <div
                    className="bg-center bg-no-repeat h-10 w-10"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/bP.svg)`,
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
                    ? "w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-aquamarine-300 transition duration-300 hover:bg-aquamarine-400 text-center"
                    : "w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-aquamarine-300 transition duration-300 bg-aquamarine-400/30 text-center"
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
                className="w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-aquamarine-300 transition duration-300 hover:bg-aquamarine-400 text-center"
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
                  ? "block grow whitespace-nowrap self-center text-xl text-white/50 font-roboto font-medium select-none px-16 py-3 bg-flamingo-100/50 rounded-full border-b-4 border-flamingo-300/30 transition duration-300 text-center mt-10"
                  : "block grow whitespace-nowrap self-center text-xl text-white font-roboto font-medium select-none px-16 py-3 bg-aquamarine-300 rounded-full border-b-4 border-aquamarine-400 transition duration-300 hover:bg-aquamarine-300/80 hover:border-aquamarine-400/80 hover:shadow text-center mt-10"
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

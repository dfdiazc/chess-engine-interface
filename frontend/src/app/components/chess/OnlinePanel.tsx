"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayerColor,
  setPlayerColor,
  selectCurrentPieceStyle,
  selectCurrentEngine,
  selectCurrentDifficulty,
  selectCurrentGameState,
  selectCurrentCreatingGame,
  setCreatingGame,
  setGameState,
} from "@/lib/features/chess/chessSlice";
import { Button } from "@/components/ui/button";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import {
  ChessSettings,
  GameHistory,
  ResignGame,
} from ".";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export default function OnlinePanel() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const creatingGame = useSelector(selectCurrentCreatingGame);
  const gameState = useSelector(selectCurrentGameState);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  function restartGame() {
    dispatch(setCreatingGame(true));
    dispatch(setGameState("reset"));
  }
  function rematch() {
    dispatch(setGameState("rematch"));
  }
  return (
    <div className="flex flex-col gap-2">
      <GameHistory />
      <Separator className="dark:bg-neutral-700" />
      <div className="flex justify-between">
        <div className="flex gap-0.5">
          <ChessSettings />
          <ResignGame />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <button
              className={`px-2 pt-1.5 pb-2.5 rounded-lg disabled:opacity-60 ${
                playerColor === "w" &&
                "ring-2 ring-aquamarine-300 bg-aquamarine-400/50"
              }`}
              onClick={() => {
                dispatch(setPlayerColor("w"));
              }}
              disabled={gameState !== "waiting"}
            >
              <div
                className="bg-center bg-no-repeat h-6 w-6"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/wP.svg)`,
                  backgroundSize: "100%",
                }}
              />
            </button>
            <button
              className={`px-2 pt-1.5 pb-2.5 rounded-lg disabled:opacity-60 ${
                playerColor === "b" &&
                "ring-2 ring-aquamarine-300 bg-aquamarine-400/50"
              }`}
              onClick={() => {
                dispatch(setPlayerColor("b"));
              }}
              disabled={gameState !== "waiting"}
            >
              <div
                className="bg-center bg-no-repeat h-6 w-6"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/bP.svg)`,
                  backgroundSize: "100%",
                }}
              />
            </button>
          </div>
        </div>
      </div>
      {gameState === "over" && (
        <div className="flex gap-2 mt-4">
          <Button
            variant="default"
            type="submit"
            className="w-full"
            onClick={restartGame}
          >
            <FaPlus className="w-5 h-5 stroke-neutral-200 mr-2" />
            {t("play.game.newGame")}
          </Button>
          <Button
            variant="default"
            type="submit"
            className="w-full"
            onClick={rematch}
          >
            <VscDebugRestart className="w-5 h-5 scale-x-[-1] stroke-neutral-200 mr-2" />
            {t("play.game.rematch")}
          </Button>
        </div>
      )}
    </div>
  );
}

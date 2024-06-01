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
  setAreSuggestionsShown,
  selectCurrentAreSuggestionsShown,
} from "@/lib/features/chess/chessSlice";
import { Button } from "@/components/ui/button";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import EngineSelector from "./EngineSelector";
import { ChessSettings, ChessSuggestions, GameHistory, RestartGame } from ".";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export default function GamePanel() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const creatingGame = useSelector(selectCurrentCreatingGame);
  const gameState = useSelector(selectCurrentGameState);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const engine = useSelector(selectCurrentEngine);
  const difficulty = useSelector(selectCurrentDifficulty);
  function restartGame() {
    dispatch(setCreatingGame(true));
    dispatch(setGameState("reset"));
  }
  function rematch() {
    dispatch(setGameState("rematch"));
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {engine === "Stockfish" ? (
          <div className="w-16 h-16 bg-[url('/images/stockfish.png')] bg-cover self-center rounded-lg" />
        ) : engine === "Lc0" ? (
          <div className="flex w-16 h-16 self-center justify-center">
            <div className="flex bg-neutral-200 rounded-lg w-14 h-14 self-center">
              <div className="self-center bg-[url('/images/leela.svg')] w-12 h-12 bg-cover" />
            </div>
          </div>
        ) : engine === "Komodo" ? (
          <div className="w-16 h-16 bg-[url('/images/komodo.png')] bg-cover self-center rounded-lg" />
        ) : engine === "Critter" ? (
          <div className="flex w-16 h-16 self-center rounded-lg justify-center items-center">
            <div className="flex justify-center bg-white rounded-lg w-14 h-14">
              <div className="self-center bg-[url('/images/critter.png')] bg-center w-12 h-12 bg-cover" />
            </div>
          </div>
        ) : engine === "Arasan" ? (
          <div className="flex w-16 h-16 self-center rounded-lg justify-center items-center">
            <div className="flex justify-center bg-white rounded-lg w-14 h-14">
              <div className="self-center bg-[url('/images/arasan.svg')] bg-center w-12 h-12 bg-cover" />
            </div>
          </div>
        ) : engine === "SlowChess" ? (
          <div className="flex w-16 h-16 self-center rounded-lg justify-center items-center">
            <div className="flex justify-center bg-white rounded-lg w-14 h-14">
              <div className="self-center bg-[url('/images/slowchess.svg')] bg-center w-12 h-12 bg-contain bg-no-repeat" />
            </div>
          </div>
        ) : engine === "Koivisto" ? (
          <div className="flex w-16 h-16 self-center rounded-lg justify-center items-center">
            <div className="flex justify-center bg-white rounded-lg w-14 h-14">
              <div className="self-center bg-[url('/images/koivisto.png')] bg-center w-12 h-12 bg-contain bg-no-repeat" />
            </div>
          </div>
        ) : engine === "Berserk" ? (
          <div className="flex w-16 h-16 self-center rounded-lg justify-center">
            <div className="flex bg-red-900 rounded-lg w-14 h-14 self-center justify-center">
              <div className="self-center bg-[url('/images/berserk.svg')] w-10 h-10 bg-cover" />
            </div>
          </div>
        ) : engine === "Wasp" ? (
          <div className="flex w-16 h-16 self-center rounded-lg justify-center">
            <div className="flex bg-[#85A843] rounded-lg w-14 h-14 self-center justify-center">
              <div className="self-center bg-[url('/images/wasp.svg')] w-12 h-12 bg-contain bg-no-repeat bg-center" />
            </div>
          </div>
        ) : engine === "Ethereal" ? (
          <div className="flex w-16 h-16 self-center rounded-lg justify-center">
            <div className="flex bg-neutral-800 rounded-lg w-14 h-14 self-center justify-center">
              <div className="self-center bg-[url('/images/ethereal.svg')] w-12 h-12 bg-contain bg-no-repeat bg-center" />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col md:flex-row items-start md:items-center md:gap-2 text-base text-neutral-200 font-medium">
          <p>{engine}</p>
          {(engine === "Stockfish" || engine === "Arasan") && (
            <>
              <div className="hidden md:block">&middot;</div>
              <div className="flex gap-2 items-center">
                <p className="text-sm">{difficulty}</p>
                <span className="text-xs uppercase">
                  {t("play.settings.difficulty.elo")}
                </span>
              </div>
            </>
          )}
          {engine === "Komodo" && (
            <>
              <div className="hidden md:block">&middot;</div>
              <div className="flex gap-2 items-center">
                <p className="text-sm">{difficulty}</p>
                <span className="text-xs uppercase">
                  {t("play.settings.difficulty.skillLevel")}
                </span>
              </div>
            </>
          )}
        </div>
        <EngineSelector />
      </div>
      <GameHistory />
      <Separator className="dark:bg-neutral-700" />
      <div className="flex justify-between">
        <div className="flex gap-0.5">
          <ChessSettings />
          <RestartGame />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Toggle
                    pressed={useSelector(selectCurrentAreSuggestionsShown)}
                    onPressedChange={(e) => {
                      dispatch(setAreSuggestionsShown(e));
                    }}
                    disabled={
                      (creatingGame && gameState !== "playing") ||
                      gameState === "over"
                    }
                  >
                    <FaRegLightbulb className="w-4 h-4 fill-neutral-200" />
                  </Toggle>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("play.settings.showSuggestions")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              disabled={!creatingGame && gameState !== "waiting"}
            >
              <div
                className="bg-center bg-no-repeat h-6 w-6"
                style={{
                  backgroundImage: `url(https://${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/wP.svg)`,
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
              disabled={!creatingGame && gameState !== "waiting"}
            >
              <div
                className="bg-center bg-no-repeat h-6 w-6"
                style={{
                  backgroundImage: `url(https://${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/bP.svg)`,
                  backgroundSize: "100%",
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <ChessSuggestions />
      {creatingGame && (
        <Button
          variant={"default"}
          className="w-full mt-4"
          onClick={() => {
            dispatch(setCreatingGame(false));
            dispatch(setGameState("playing"));
          }}
        >
          <p>{t("play.game.startGame")}</p>
        </Button>
      )}
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

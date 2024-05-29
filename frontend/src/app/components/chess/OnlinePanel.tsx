"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayerColor,
  selectCurrentPieceStyle,
  selectCurrentGameState,
  setCreatingGame,
  setGameState,
  selectCurrentTurn,
  selectCurrentHasJoinedGame,
} from "@/lib/features/chess/chessSlice";
import { Button } from "@/components/ui/button";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { ChessSettings, GameHistory, ResignGame } from ".";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useGetMatchQuery } from "@/lib/features/chess/chessApiSlice";
import Cookies from "js-cookie";
import Link from "next/link";

export default function OnlinePanel() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const gameState = useSelector(selectCurrentGameState);
  const turn = useSelector(selectCurrentTurn);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const hasJoinedGame = useSelector(selectCurrentHasJoinedGame);
  function restartGame() {
    dispatch(setCreatingGame(true));
    dispatch(setGameState("reset"));
  }
  function rematch() {
    dispatch(setGameState("rematch"));
  }
  const { id: matchId } = useParams();
  const [players, setPlayers] = useState({ current: "", opponent: "" });
  const { data: matchQueryData, refetch } = useGetMatchQuery(matchId, {
    skip: !hasJoinedGame,
  });
  useEffect(() => {
    setPlayers({
      current: getUsername("current"),
      opponent: getUsername("opponent"),
    });
  }, [matchQueryData?.whites_player, matchQueryData?.blacks_player]);
  useEffect(() => {
    if (matchQueryData) {
      dispatch(setGameState(matchQueryData.game_state));
    }
  }, [matchQueryData?.game_state]);
  const playerId = Cookies.get("player_id");
  function getUsername(player: "current" | "opponent") {
    if (player === "current") {
      if (playerId === matchQueryData?.whites_player?.anonymous_id) {
        return matchQueryData?.whites_player?.username;
      } else if (playerId === matchQueryData?.blacks_player?.anonymous_id) {
        return matchQueryData?.blacks_player?.username;
      }
    } else if (player === "opponent") {
      if (playerId !== matchQueryData?.whites_player?.anonymous_id) {
        return (
          matchQueryData?.whites_player?.username || "Waiting for opponent..."
        );
      } else if (playerId !== matchQueryData?.blacks_player?.anonymous_id) {
        return (
          matchQueryData?.blacks_player?.username || "Waiting for opponent..."
        );
      }
    }
  }
  const [currentPlayerTime, setCurrentPlayerTime] = useState(60 * 10);
  const [opponentPlayerTime, setOpponentPlayerTime] = useState(60 * 10);
  useEffect(() => {
    const timer = setInterval(() => {
      if (turn === playerColor) {
        setCurrentPlayerTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      } else {
        setOpponentPlayerTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }
    }, 1000);

    if (currentPlayerTime === 0 || opponentPlayerTime === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [turn, currentPlayerTime, opponentPlayerTime]);
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
              disabled
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
              disabled
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
          <Button variant="default" className="w-full" asChild>
            <Link href="/play">
              <FaPlus className="w-5 h-5 stroke-neutral-200 mr-2" />
              {t("play.game.newGame")}
            </Link>
          </Button>
          {/* <Button
            variant="default"
            type="submit"
            className="w-full"
            onClick={rematch}
          >
            <VscDebugRestart className="w-5 h-5 scale-x-[-1] stroke-neutral-200 mr-2" />
            {t("play.game.rematch")}
          </Button> */}
        </div>
      )}
    </div>
  );
}

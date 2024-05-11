"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { OnlineChessboard, OnlinePanel } from "@/app/components/chess";
import {
  useGetMatchQuery,
  useJoinMatchMutation,
} from "@/lib/features/chess/chessApiSlice";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentGameState,
  setFen,
  setGameState,
  setTurn,
} from "@/lib/features/chess/chessSlice";

export default function OnlineGame() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const playerId = Cookies.get("player_id");
  const router = useRouter();
  const { id: matchId } = useParams();
  const [initialState, setInitialState] = useState(false);
  const [joinMatch, { data }] = useJoinMatchMutation();
  const { data: matchQueryData, refetch } = useGetMatchQuery(matchId, {
    skip: !data,
  });
  const gameState = useSelector(selectCurrentGameState);
  useEffect(() => {
    joinMatch(matchId);
    setLoaded(true);
  }, []);
  if (!loaded) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center relative md:h-screen px-4 pt-4 md:pt-12 pb-4">
      <div className="hidden md:block w-full" />
      <div className="relative flex justify-center p-2">
        {matchQueryData?.fen && <OnlineChessboard />}
      </div>
      <div className="w-full lg:min-w-[20rem] max-w-md">
        <OnlinePanel />
      </div>
    </div>
  );
}

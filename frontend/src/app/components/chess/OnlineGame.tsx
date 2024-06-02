"use client";
import React, { useEffect, useState } from "react";
import { OnlineChessboard, OnlinePanel } from "@/app/components/chess";
import {
  useGetMatchQuery,
  useJoinMatchMutation,
} from "@/lib/features/chess/chessApiSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentGameState,
  setHasJoinedGame,
} from "@/lib/features/chess/chessSlice";

export default function OnlineGame() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { id: matchId } = useParams();
  const [joinMatch, { data }] = useJoinMatchMutation();
  const { data: matchQueryData, refetch } = useGetMatchQuery(matchId, {
    skip: !data,
  });
  const gameState = useSelector(selectCurrentGameState);
  async function join() {
    await joinMatch(matchId);
    dispatch(setHasJoinedGame(true));
  }
  useEffect(() => {
    join();
    setLoaded(true);
  }, []);
  if (!loaded) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center relative md:h-screen px-4 pt-4 md:pt-10 pb-4 gap-4">
      <div className="hidden lg:block w-full" />
      <div className="relative flex justify-center p-2">
        {matchQueryData?.fen && <OnlineChessboard />}
      </div>
      <div className="w-full lg:min-w-[20rem] max-w-lg">
        <OnlinePanel />
      </div>
    </div>
  );
}

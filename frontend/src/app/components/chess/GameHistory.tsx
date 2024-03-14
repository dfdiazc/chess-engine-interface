"use client";
import { Separator } from "@/components/ui/separator";
import {
  selectCurrentGameHistory,
  selectCurrentGameState,
  selectCurrentPieceStyle,
  selectCurrentPlayerColor,
} from "@/lib/features/chess/chessSlice";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function GameHistory() {
  const gameHistory = useSelector(selectCurrentGameHistory);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const gameState = useSelector(selectCurrentGameState);
  const moves: string[][] = [];
  for (let i = 0; i < gameHistory.length; i += 2) {
    moves.push([gameHistory[i], gameHistory[i + 1]]);
  }
  function getPieceColor(index: number) {
    return index % 2 === 0 ? "w" : "b";
  }

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight;
    }
  }, [moves]);
  return (
    <>
      {gameState !== "waiting" && (
        <div className="flex flex-col gap-2 w-full text-neutral-200 h-32">
          <p className="text-xs uppercase">Game History</p>
          <Separator className="dark:bg-neutral-700" />
          <div
            className="flex flex-col text-sm overflow-y-auto moves-scroll"
            ref={scrollContainerRef}
          >
            {moves.map((move, index) => (
              <div
                className={`flex items-center gap-4 p-0.5 ${
                  index * 2 === gameHistory.length - 1 ||
                  index * 2 + 1 === gameHistory.length - 1
                    ? "bg-aquamarine-300/10"
                    : ""
                }`}
                key={index}
              >
                <p className="w-4 text-neutral-500 font-light">{index + 1}</p>
                <div className="flex items-center font-medium text-neutral-400 w-full">
                  {move[0] &&
                  move[0].charAt(0) === move[0].charAt(0).toUpperCase() &&
                  !move[0].startsWith("O-") ? (
                    <div className="flex items-center w-1/2">
                      <Image
                        width={16}
                        height={16}
                        src={`${
                          process.env.NEXT_PUBLIC_API_URL
                        }/static/chess/pieces/${pieceStyle}/${getPieceColor(
                          index * 2
                        )}${move[0].charAt(0)}.svg`}
                        alt={move[0].charAt(0)}
                      />
                      <span>{move[0].substring(1)}</span>
                    </div>
                  ) : (
                    <span className="w-1/2">{move[0]}</span>
                  )}
                  {move[1] &&
                  move[1].charAt(0) === move[1].charAt(0).toUpperCase() &&
                  !move[1].startsWith("O-") ? (
                    <div className="flex items-center w-1/2">
                      <Image
                        width={16}
                        height={16}
                        src={`${
                          process.env.NEXT_PUBLIC_API_URL
                        }/static/chess/pieces/${pieceStyle}/${getPieceColor(
                          index * 2 + 1
                        )}${move[1].charAt(0)}.svg`}
                        alt={move[1].charAt(0)}
                      />
                      <span>{move[1].substring(1)}</span>
                    </div>
                  ) : (
                    <span className="w-1/2">{move[1]}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

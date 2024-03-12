"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useSuggestionsQuery } from "@/lib/features/chess/chessApiSlice";
import { useSelector } from "react-redux";
import {
  selectCurrentAreSuggestionsShown,
  selectCurrentSuggestionMoves,
  selectCurrentSuggestionPieces,
  selectCurrentSuggestionShown,
  setSuggestionShown,
  selectCurrentFen,
  selectCurrentTurn,
  selectCurrentPlayerColor,
  selectCurrentGameState,
  selectCurrentPieceStyle,
} from "@/lib/features/chess/chessSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ChessSuggestions() {
  const dispatch = useDispatch<AppDispatch>();
  const areSuggestionShown = useSelector(selectCurrentAreSuggestionsShown);
  const suggestionMoves = useSelector(selectCurrentSuggestionMoves);
  const suggestionPieces = useSelector(selectCurrentSuggestionPieces);
  const suggestionShown = useSelector(selectCurrentSuggestionShown);
  const gameState = useSelector(selectCurrentGameState);
  const fen = useSelector(selectCurrentFen);
  const turn = useSelector(selectCurrentTurn);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const { isFetching } = useSuggestionsQuery(fen);
  return (
    <div className="w-full">
      {areSuggestionShown && gameState === "playing" && (
        <div className="flex p-2 w-full relative">
          <>
            {isFetching && turn === playerColor ? (
              <div className="flex flex-col gap-4 w-full animate-pulse justify-center grow my-3 lg:my-1.5">
                <div className="flex gap-2">
                  <Skeleton className="w-2/3 h-4 rounded-md bg-neutral-300 self-center" />
                  <Skeleton className="w-1/3 h-4 rounded-md bg-neutral-300 self-center" />
                </div>
                <div className="flex xl:hidden gap-2">
                  <Skeleton className="w-1/3 h-4 rounded-md bg-neutral-300 self-center" />
                  <Skeleton className="w-2/3 h-4 rounded-md bg-neutral-300 self-center" />
                </div>
              </div>
            ) : (
              <div className="flex items-center flex-wrap gap-4 -ml-2.5">
                {[1, 2, 3].map((i) => {
                  if (
                    i === 1 ||
                    (i === 2 && suggestionMoves[2] !== suggestionMoves[1]) ||
                    (i === 3 &&
                      suggestionMoves[3] !== suggestionMoves[2] &&
                      suggestionMoves[3] !== suggestionMoves[1])
                  ) {
                    return (
                      <button
                        key={i}
                        className={
                          suggestionShown[i]
                            ? "rounded-md ring-2 ring-aquamarine-300 bg-aquamarine-300/50"
                            : ""
                        }
                        onClick={() => {
                          dispatch(
                            setSuggestionShown({
                              1: i === 1 ? !suggestionShown[1] : false,
                              2: i === 2 ? !suggestionShown[2] : false,
                              3: i === 3 ? !suggestionShown[3] : false,
                            })
                          );
                        }}
                      >
                        <div className="flex gap-1 px-2.5 py-1">
                          <Image
                            key={
                              playerColor +
                              suggestionPieces[i].toLocaleUpperCase()
                            }
                            src={`${
                              process.env.NEXT_PUBLIC_API_URL
                            }/static/chess/pieces/${pieceStyle}/${playerColor}${suggestionPieces[
                              i
                            ].toLocaleUpperCase()}.svg`}
                            width={20}
                            height={20}
                            alt="chessPiece"
                          />
                          <div className="flex items-center gap-2 text-xs text-neutral-200">
                            <span className="font-roboto font-normal text-white text-md select-none">
                              {suggestionMoves[i].substring(0, 2)}
                            </span>
                            <FaArrowRightLong className="fill-white w-4 h-4" />
                            <span className="font-roboto font-normal text-white text-md select-none">
                              {suggestionMoves[i].substring(2, 4)}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

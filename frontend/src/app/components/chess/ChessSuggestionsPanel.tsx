"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import ReactTooltip from "react-tooltip";
import { useSuggestionsQuery } from "@/lib/features/chess/chessApiSlice";
import { useSelector } from "react-redux";
import {
  selectCurrentAreSuggestionsShown,
  setAreSuggestionsShown,
  selectCurrentSuggestionMoves,
  selectCurrentSuggestionPieces,
  selectCurrentSuggestionShown,
  setSuggestionShown,
  selectCurrentFen,
  selectCurrentTurn,
  selectCurrentPlayerColor,
  selectCurrentGameStart,
} from "@/lib/features/chess/chessSlice";
import { IconContext } from "react-icons";
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";
import { AiFillQuestionCircle } from "react-icons/ai";
import ChessSuggestion from "./ChessSuggestion";

const ChessSuggestionsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const areSuggestionShown = useSelector(selectCurrentAreSuggestionsShown);
  const suggestionMoves = useSelector(selectCurrentSuggestionMoves);
  const suggestionPieces = useSelector(selectCurrentSuggestionPieces);
  const suggestionShown = useSelector(selectCurrentSuggestionShown);
  const gameStart = useSelector(selectCurrentGameStart);
  const fen = useSelector(selectCurrentFen);
  const turn = useSelector(selectCurrentTurn);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const { isFetching } = useSuggestionsQuery(fen);
  const selectedClass =
    "rounded-lg ring-2 ring-flamingo-100 bg-flamingo-100/50";
  if (!gameStart) return null;
  return (
    <div className="w-full gap-5">
      <div className="flex flex-row gap-5 px-5 py-3 h-36 bg-neutral-800 drop-shadow-xl rounded-xl grow shrink-0 w-full relative">
        {areSuggestionShown ? (
          <button
            className="flex p-1 rounded-full justify-self-start h-fit self-center"
            onClick={() => {
              dispatch(setAreSuggestionsShown(false));
            }}
          >
            <IconContext.Provider
              value={{ className: "h-8 w-8 text-amber-300 self-center" }}
            >
              <BsLightbulbFill />
            </IconContext.Provider>
          </button>
        ) : (
          <button
            className="flex p-1 rounded-full justify-self-start h-fit self-center"
            onClick={() => {
              dispatch(setAreSuggestionsShown(true));
            }}
          >
            <IconContext.Provider
              value={{ className: "h-8 w-8 text-neutral-200 self-center" }}
            >
              <BsLightbulbOffFill />
            </IconContext.Provider>
          </button>
        )}
        {areSuggestionShown ? (
          <>
            {isFetching && turn === playerColor ? (
              <div className="flex flex-col gap-2 w-full animate-pulse duration-75 justify-center mr-8 grow">
                <div className="flex gap-3 h-8">
                  <div className="w-2/3 h-2 rounded-full bg-neutral-300 self-center"></div>
                  <div className="w-1/3 h-2 rounded-full bg-neutral-300 self-center"></div>
                </div>
                <div className="flex gap-3 h-8">
                  <div className="w-1/3 h-2 rounded-full bg-neutral-300 self-center"></div>
                  <div className="w-2/3 h-2 rounded-full bg-neutral-300 self-center"></div>
                </div>
                <div className="flex gap-3 h-8">
                  <div className="w-1/2 h-2 rounded-full bg-neutral-300 self-center"></div>
                  <div className="w-1/2 h-2 rounded-full bg-neutral-300 self-center"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between relative mr-8">
                <div className="flex flex-col gap-2 self-center justify-center">
                  <button
                    className={suggestionShown[1] ? selectedClass : ""}
                    onClick={() => {
                      dispatch(
                        setSuggestionShown({
                          1: !suggestionShown[1],
                          2: false,
                          3: false,
                        })
                      );
                    }}
                  >
                    <ChessSuggestion
                      move={suggestionMoves[1]}
                      piece={suggestionPieces[1]}
                    />
                  </button>
                  {suggestionMoves[2] !== suggestionMoves[1] ? (
                    <button
                      className={suggestionShown[2] ? selectedClass : ""}
                      onClick={() => {
                        dispatch(
                          setSuggestionShown({
                            1: false,
                            2: !suggestionShown[2],
                            3: false,
                          })
                        );
                      }}
                    >
                      <ChessSuggestion
                        move={suggestionMoves[2]}
                        piece={suggestionPieces[2]}
                      />
                    </button>
                  ) : null}
                  {suggestionMoves[3] !== suggestionMoves[2] &&
                  suggestionMoves[3] !== suggestionMoves[1] ? (
                    <button
                      className={suggestionShown[3] ? selectedClass : ""}
                      onClick={() => {
                        dispatch(
                          setSuggestionShown({
                            1: false,
                            2: false,
                            3: !suggestionShown[3],
                          })
                        );
                      }}
                    >
                      <ChessSuggestion
                        move={suggestionMoves[3]}
                        piece={suggestionPieces[3]}
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            )}
            {/* <div className="absolute top-0 right-0 px-5 py-3">
              <div className="relative">
                <div data-tip data-for="suggestedTip">
                  <IconContext.Provider
                    value={{ className: "h-5 w-5 text-white cursor-pointer" }}
                  >
                    <AiFillQuestionCircle />
                  </IconContext.Provider>
                </div>
                <ReactTooltip
                  id="suggestedTip"
                  place="top"
                  effect="solid"
                  type="info"
                >
                  <span className="font-roboto font-normal text-sm text-white/80 self-center select-none relative">
                    Click on a move to show it on the board.
                  </span>
                </ReactTooltip>
              </div>
            </div> */}
          </>
        ) : (
          <div className="flex">
            <span className="self-center font-roboto font-normal text-base text-white select-none">
              Click on the lightbulb to see suggested moves.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChessSuggestionsPanel;

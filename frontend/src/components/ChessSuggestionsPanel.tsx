import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { useSelector } from "react-redux";
import {
  selectCurrentAreSuggestionsShown,
  setAreSuggestionsShown,
  selectCurrentSuggestionMoves,
  selectCurrentSuggestionPieces,
  selectCurrentSuggestionShown,
  setSuggestionShown,
} from "features/chess/chessSlice";
import { IconContext } from "react-icons";
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";
import ChessSuggestion from "./ChessSuggestion";

const ChessSuggestionsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const areSuggestionShown = useSelector(selectCurrentAreSuggestionsShown);
  const suggestionMoves = useSelector(selectCurrentSuggestionMoves);
  const suggestionPieces = useSelector(selectCurrentSuggestionPieces);
  const suggestionShown = useSelector(selectCurrentSuggestionShown);
  const selectedClass = "bg-flamingo-200 rounded"
  return (
    <div className="px-5 py-3 w-full lg:max-w-sm gap-5">
      <div className="flex flex-row gap-5 px-5 py-3 bg-[#2B3133] drop-shadow-xl rounded grow shrink-0 w-full lg:max-w-sm">
        {areSuggestionShown ? (
          <button
            className="flex p-1 rounded"
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
            className="flex p-1 rounded"
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
            <div className="flex flex-col gap-1 self-center">
              <button
              className={suggestionShown[1] ? selectedClass : ""}
                onClick={() => {
                  dispatch(setSuggestionShown({ 1: !suggestionShown[1], 2: false, 3: false }));
                }}
              >
                <ChessSuggestion
                  move={suggestionMoves[1]}
                  piece={suggestionPieces[1]}
                />
              </button>
              <button
              className={suggestionShown[2] ? selectedClass : ""}
                onClick={() => {
                  dispatch(setSuggestionShown({ 1: false, 2: !suggestionShown[2], 3: false }));
                }}
              >
                <ChessSuggestion
                  move={suggestionMoves[2]}
                  piece={suggestionPieces[2]}
                />
              </button>
              <button
              className={suggestionShown[3] ? selectedClass : ""}
                onClick={() => {
                  dispatch(setSuggestionShown({ 1: false, 2: false, 3: !suggestionShown[3] }));
                }}
              >
                <ChessSuggestion
                  move={suggestionMoves[3]}
                  piece={suggestionPieces[3]}
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1 w-full">
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
          )}
      </div>
    </div>
  );
};

export default ChessSuggestionsPanel;

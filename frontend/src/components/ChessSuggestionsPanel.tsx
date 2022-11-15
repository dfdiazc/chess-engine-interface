import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { useSelector } from "react-redux";
import {
  selectCurrentAreSuggestionShown,
  setAreSuggestionShown,
} from "features/chess/chessSlice";
import { IconContext } from "react-icons";
import { FaLightbulb } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ChessSuggestion from "./ChessSuggestion";

const ChessSuggestionsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const areSuggestionShown = useSelector(selectCurrentAreSuggestionShown);
  return (
    <div className="px-5 py-3 w-full lg:max-w-sm gap-5">
      <div className="relative px-5 py-3 bg-[#2B3133] drop-shadow-xl flex flex-row gap-5 rounded grow shrink-0 w-full lg:max-w-sm">
        <div className="fixed top-0 right-0 p-1">
          {areSuggestionShown ? (
            <button
              className="flex p-1 rounded"
              onClick={() => {
                dispatch(setAreSuggestionShown(false));
              }}
            >
              <IconContext.Provider
                value={{
                  className: "h-5 w-5 text-neutral-300 self-center",
                }}
              >
                <AiOutlineEye />
              </IconContext.Provider>
            </button>
          ) : (
            <button
              className="flex p-1 rounded"
              onClick={() => {
                dispatch(setAreSuggestionShown(true));
              }}
            >
              <IconContext.Provider
                value={{
                  className: "h-5 w-5 text-neutral-300 self-center",
                }}
              >
                <AiOutlineEyeInvisible />
              </IconContext.Provider>
            </button>
          )}
        </div>
        <IconContext.Provider
          value={{ className: "h-8 w-8 text-amber-300 self-center" }}
        >
          <FaLightbulb />
        </IconContext.Provider>
        <div className="flex flex-col gap-1">
          <ChessSuggestion from="e3" to="e5" piece="p" />
          <ChessSuggestion from="b5" to="c3" piece="r" />
          <ChessSuggestion from="f6" to="h3" piece="q" />
        </div>
      </div>
    </div>
  );
};

export default ChessSuggestionsPanel;

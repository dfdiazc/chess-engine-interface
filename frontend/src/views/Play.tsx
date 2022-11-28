import React, { useEffect, useState } from "react";
import {
  ChessSettings,
  ChessSuggestionsPanel,
  CustomChessboard,
  Header,
} from "components";
import { useSelector } from "react-redux";
import {
  selectCurrentAreSuggestionsShown,
  selectCurrentGameStart,
} from "features/chess/chessSlice";
import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";
import ReactTooltip from "react-tooltip";

const Play = () => {
  const gameStart = useSelector(selectCurrentGameStart);
  const [boardWidth, setBoardWidth] = useState(initialBoardSize);
  const areSuggestionShown = useSelector(selectCurrentAreSuggestionsShown);
  function initialBoardSize() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    if (windowWidth < 768) return windowWidth * 0.8;
    else return windowHeight * 0.75;
  }
  const handleResize = () => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    if (windowWidth < 768) setBoardWidth(windowWidth * 0.8);
    else setBoardWidth(windowHeight * 0.75);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center">
        <div className="w-full max-w-[1920px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Helmet>
                <style>
                  {"body {background-color: #1d1d1f; overflow-x: hidden}"}
                </style>
              </Helmet>
              <Header />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row justify-center items-center h-full shrink-0 relative">
            <div className="relative flex flex-row pl-10 pr-3">
              <CustomChessboard boardWidth={boardWidth} />
            </div>
            <div className="flex flex-col gap-1 w-full lg:max-w-sm">
              <ChessSettings />
              {gameStart ? <ChessSuggestionsPanel /> : null}
              {areSuggestionShown ? (
                <ReactTooltip
                  id="suggestedTip"
                  place="top"
                  effect="solid"
                  type="info"
                >
                  <span className="font-roboto font-normal text-sm text-white/80 self-center select-none">
                    Click on a move to show it on the board.
                  </span>
                </ReactTooltip>
              ) : null}
            </div>
            {/*<div className="hidden lg:flex w-[200px] h-[600px]">
              <Adsense
                client="ca-pub-7640562161899788"
                slot="7259870550"
                format=""
              />
                  </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;

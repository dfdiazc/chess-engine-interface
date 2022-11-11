import React, { useEffect, useState } from "react";
import { ChessSettings, CustomChessboard, Header } from "components";
import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";

const Play = () => {
  const [boardWidth, setBoardWidth] = useState(initialBoardSize);
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
                  {"body {background-color: #1C2021; overflow-x: hidden}"}
                </style>
              </Helmet>
              <Header />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row justify-center items-center h-full shrink-0 relative ">
            <div className="flex flex-row pl-10 pr-3">
              <CustomChessboard boardWidth={boardWidth} />
            </div>
            <ChessSettings />
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

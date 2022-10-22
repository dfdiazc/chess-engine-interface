import React, { useEffect, useState } from "react";
import { CustomChessBoard, Header } from "components";
import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";

const Play = () => {
  const [boardWidth, setBoardWidth] = useState(initialBoardSize);
  function initialBoardSize() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 768) return windowWidth * 0.8;
    else return 600;
  }
  const handleResize = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth < 768) setBoardWidth(windowWidth * 0.8);
    else setBoardWidth(600);
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
                <style>{"body {background-color: #121B1E}"}</style>
              </Helmet>
              <Header />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center h-full shrink-0 relative">
            <div className="px-3 py-10">
              <CustomChessBoard boardWidth={boardWidth} />
            </div>
            <div className="hidden lg:flex w-[200px]  h-[600px]">
            <Adsense
              client="ca-pub-7640562161899788"
              slot="7259870550"
              format=""
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;

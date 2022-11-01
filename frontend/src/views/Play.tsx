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
  const [elo, setElo] = useState<string>("1350");
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
          <div className="flex flex-col gap-5 lg:flex-row justify-center items-center h-full shrink-0 relative">
            <div className="pl-10 pr-3 py-10">
              <CustomChessBoard boardWidth={boardWidth} elo={elo} />
            </div>
            <div className="px-5 py-3 bg-[#102B34] flex flex-col rounded grow shrink-0 max-w-sm">
              <span className="font-roboto font-normal text-white text-center">
                Difficulty
              </span>
              <span className="w-full mr-3 mt-3 h-px bg-white"></span>
              <input
                type="range"
                className="w-full mt-5 hover:cursor-pointer"
                min="1350"
                max="2850"
                step="1"
                defaultValue={elo}
                onChange={(event) => {
                  setElo((event.target as HTMLInputElement).value);
                }}
              />
              <span className="font-roboto font-normal text-white text-center">{elo}</span>
            </div>
            <div className="hidden lg:flex w-[200px] h-[600px]">
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

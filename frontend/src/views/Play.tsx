import React, { useEffect, useState } from "react";
import { CustomChessBoard, Header } from "components";

const Play = () => {
  const [boardWidth, setBoardWidth] = useState(initialSize);
  function initialSize() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 1024) return windowWidth * 0.8;
    else return 800;
  }
  const handleResize = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth < 1024) setBoardWidth(windowWidth * 0.8);
    else setBoardWidth(800);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="grid grid-flow-col grid-cols-8 bg-neutral-800 h-full py-3 pl-36">
        <div className="col-span-5">
          <CustomChessBoard boardWidth={boardWidth} />
        </div>
        <div className="flex flex-col p-5 w-full bg-neutral-900 rounded-xl col-span-2">
          <span className="font-roboto font-normal text-white text-2xl">
            Moves
          </span>
          <div className="mt-10">
            <div className="font-roboto font-normal text-md">
              <span className="text-white/50">1.</span>
              <span className="text-white/80 ml-5">e4</span>
              <span className="text-white/80 ml-5">d5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;

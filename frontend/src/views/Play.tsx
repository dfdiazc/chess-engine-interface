import React, { useEffect, useState } from "react";
import { CustomChessBoard, Header } from "components";
import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";

const Play = () => {
  const [boardWidth, setBoardWidth] = useState(initialSize);
  function initialSize() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 1024) return windowWidth * 0.8;
    else return 600;
  }
  const handleResize = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth < 1024) setBoardWidth(windowWidth * 0.8);
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
          <div className="flex justify-center items-center h-[calc(100vh-4rem)] shrink-0 relative">
            <div className="px-3 py-10">
              <CustomChessBoard boardWidth={boardWidth} />
            </div>
            <Adsense
              client="ca-pub-7640562161899788"
              slot="7259870550"
              style={{ width: 200, height: 600 }}
              format=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;

import React, { useEffect, useState } from "react";
import { CustomChessBoard, Header } from "components";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8455605191106104"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <Helmet>
        <style>{"body {background-color: #121B1E}"}</style>
      </Helmet>
      <Header />
      <div className="grid grid-flow-col grid-cols-8 h-full py-3 pl-36">
        <div className="col-span-5">
          <CustomChessBoard boardWidth={boardWidth} />
        </div>
      </div>
    </div>
  );
};

export default Play;

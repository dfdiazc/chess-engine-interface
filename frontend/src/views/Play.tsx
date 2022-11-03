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
  const [startGame, setStartGame] = useState(false);
  const [playerColor, setPlayerColor] = useState<string>("w");
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  const activeButtonStyle =
    "block grow whitespace-nowrap self-center text-xl text-white font-roboto font-medium select-none px-10 py-3 bg-blue-500 rounded-full border-b-4 border-blue-600 transition duration-300 hover:bg-blue-500/80 hover:border-blue-600/80 hover:shadow text-center mt-10";
  const disabledButtonStyle =
    "block grow whitespace-nowrap self-center text-xl text-white/50 font-roboto font-medium select-none px-10 py-3 bg-blue-500/50 rounded-full border-b-4 border-blue-800/50 transition duration-300 text-center mt-10";
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center">
        <div className="w-full max-w-[1920px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Helmet>
                <style>{"body {background-color: #1C2021; overflow-x: hidden}"}</style>
              </Helmet>
              <Header />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row justify-center items-center h-full shrink-0 relative ">
            <div className="pl-10 pr-3 py-10">
              <CustomChessBoard
                boardWidth={boardWidth}
                elo={elo}
                startGame={startGame}
                setStartGame={setStartGame}
                playerColor={playerColor}
              />
            </div>
            <div className="px-5 py-3 w-full lg:max-w-sm gap-5">
              <div className="px-5 py-3 bg-[#102B34] flex flex-col rounded grow shrink-0 w-full lg:max-w-sm">
                <div className="flex flex-col self-center w-full">
                  <span className="font-roboto font-medium text-lg text-white text-center">
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
                  <span className="font-roboto font-normal text-white text-center mt-2">
                    {elo} Elo
                  </span>
                </div>
                <div
                  className="flex flex-col self-center w-full"
                  style={
                    startGame
                      ? { pointerEvents: "none" }
                      : { pointerEvents: "all" }
                  }
                >
                  <span className="font-roboto font-medium text-lg text-white text-center mt-10">
                    Piece Color
                  </span>
                  <span className="w-full mr-3 mt-3 h-px bg-white"></span>
                  <div className="flex flex-row gap-5 self-center mt-2">
                    <span className="font-roboto font-normal text-md text-white">
                      White
                    </span>
                    <input
                      type="radio"
                      value="White"
                      checked={playerColor === "w"}
                      onChange={() => {
                        setPlayerColor("w");
                      }}
                    />
                    <span className="font-roboto font-normal text-md text-white">
                      Black
                    </span>
                    <input
                      type="radio"
                      value="Black"
                      checked={playerColor === "b"}
                      onChange={() => {
                        setPlayerColor("b");
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setStartGame(true);
                    }}
                    className={
                      startGame ? disabledButtonStyle : activeButtonStyle
                    }
                  >
                    Start Game
                  </button>
                </div>
              </div>
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  selectCurrentPlayerColor,
  setPlayerColor,
  selectCurrentEngine,
  setEngine,
  selectCurrentGameStart,
  setGameStart,
  selectCurrentElo,
  setElo,
} from "features/chess/chessSlice"
import { IconContext } from "react-icons";
import { FaChessPawn } from "react-icons/fa";

const ChessSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const playerColor = useSelector(selectCurrentPlayerColor);
  const engine = useSelector(selectCurrentEngine);
  const elo = useSelector(selectCurrentElo);
  const [eloSlider, setEloSlider] = useState(elo);
  const gameStart = useSelector(selectCurrentGameStart);
  const engineVariants = {
    hidden: { display: "none" },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
    selected: {
      scale: 1.5,
      "margin-bottom": "25px",
      "margin-top": "10px",
      x: 0,
      y: 0,
      cursor: "default",
    },
  };
  const titleVariants = {
    hidden: { display: "none" },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  };
  return (
    <div className="px-5 py-3 w-full lg:max-w-sm gap-5">
      <div className="px-5 py-3 bg-[#2B3133] drop-shadow-xl flex flex-col rounded grow shrink-0 w-full lg:max-w-sm">
        <div className="flex flex-col self-center w-full">
          <AnimatePresence>
            {!gameStart && (
              <motion.span
                className="self-center font-roboto font-medium text-2xl text-white mb-3"
                variants={titleVariants}
                initial="visible"
                animate="visible"
                exit="hidden"
              >
                Play Against...
              </motion.span>
            )}
          </AnimatePresence>
          <div className="flex gap-2 mt-3 self-center relative">
            <AnimatePresence>
              {((engine === "Stockfish" && gameStart) || !gameStart) && (
                <motion.div
                  onClick={() => {
                    dispatch(setEngine("Stockfish"));
                  }}
                  className={
                    engine === "Stockfish"
                      ? "w-16 h-16 bg-[url('assets/images/stockfish.png')] bg-cover self-center rounded-lg cursor-pointer ring-2 ring-flamingo-100"
                      : "w-16 h-16 bg-[url('assets/images/stockfish.png')] bg-cover self-center rounded-lg cursor-pointer"
                  }
                  variants={engineVariants}
                  initial="visible"
                  animate={
                    engine === "Stockfish" && gameStart ? "selected" : "visible"
                  }
                  exit="hidden"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {((engine === "Leela" && gameStart) || !gameStart) && (
                <motion.div
                  className={
                    engine === "Leela"
                      ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                      : "flex w-16 h-16 self-center rounded-lg justify-center"
                  }
                  variants={engineVariants}
                  initial="visible"
                  animate={
                    engine === "Leela" && gameStart ? "selected" : "visible"
                  }
                  exit="hidden"
                >
                  <button
                    onClick={() => {
                      dispatch(setEngine("Leela"));
                    }}
                    className="flex bg-white rounded-lg w-14 h-14 self-center"
                  >
                    <div className="self-center bg-[url('assets/images/leela.svg')] -m-1.5 w-14 h-14 bg-cover" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {((engine === "Komodo" && gameStart) || !gameStart) && (
                <motion.div
                  onClick={() => {
                    dispatch(setEngine("Komodo"));
                  }}
                  className={
                    engine === "Komodo"
                      ? "w-16 h-16 bg-[url('assets/images/komodo.png')] bg-cover self-center rounded-lg cursor-pointer ring-2 ring-flamingo-100"
                      : "w-16 h-16 bg-[url('assets/images/komodo.png')] bg-cover self-center rounded-lg cursor-pointer"
                  }
                  variants={engineVariants}
                  initial="visible"
                  animate={
                    engine === "Komodo" && gameStart ? "selected" : "visible"
                  }
                  exit="hidden"
                />
              )}
            </AnimatePresence>
          </div>
          <span className="font-roboto font-medium text-xl text-white text-center select-none mt-5">
            {engine}
          </span>
          <span className="font-roboto font-medium text-lg text-white text-center select-none mt-10">
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
              setEloSlider(
                (event.target as HTMLInputElement).value as unknown as number
              );
            }}
            onMouseUp={(event) => {
              dispatch(setElo((event.target as HTMLInputElement).value));
            }}
          />
          <span className="font-roboto font-normal text-white text-center mt-2 select-none">
            {eloSlider} Elo
          </span>
        </div>
        <div
          className="flex flex-col self-center w-full"
          style={
            gameStart ? { pointerEvents: "none" } : { pointerEvents: "all" }
          }
        >
          <span className="font-roboto font-medium text-lg text-white text-center mt-10 select-none">
            Piece Color
          </span>
          <span className="w-full mr-3 mt-3 h-px bg-white"></span>
          <div className="flex flex-row gap-5 self-center mt-2">
            <button
              className={
                playerColor === "w"
                  ? "px-2 pt-1 pb-3 rounded-lg ring-2 ring-flamingo-100 bg-flamingo-100/50"
                  : "px-2 pt-1 pb-3 rounded-lg"
              }
              onClick={() => {
                dispatch(setPlayerColor("w"));
              }}
            >
              <div
                className="bg-center bg-no-repeat h-10 w-10"
                style={{
                  backgroundImage: `url(https://unrealchess.pythonanywhere.com/static/chess/pieces/staunty/wP.svg)`,
                  backgroundSize: "100%",
                }}
              />
            </button>
            <button
              className={
                playerColor === "b"
                  ? "px-2 pt-1 pb-3 rounded-lg ring-2 ring-flamingo-100 bg-flamingo-100/50"
                  : "px-2 pt-1 pb-3 rounded-lg"
              }
              onClick={() => {
                dispatch(setPlayerColor("b"));
              }}
            >
              <div
                className="bg-center bg-no-repeat h-10 w-10"
                style={{
                  backgroundImage: `url(https://unrealchess.pythonanywhere.com/static/chess/pieces/staunty/bP.svg)`,
                  backgroundSize: "100%",
                }}
              />
            </button>
          </div>
          <button
            onClick={() => {
              dispatch(setGameStart(true));
            }}
            className={
              gameStart
                ? "block grow whitespace-nowrap self-center text-xl text-white/50 font-roboto font-medium select-none px-10 py-3 bg-flamingo-100/50 rounded-full border-b-4 border-flamingo-300/30 transition duration-300 text-center mt-10"
                : "block grow whitespace-nowrap self-center text-xl text-white font-roboto font-medium select-none px-10 py-3 bg-flamingo-100 rounded-full border-b-4 border-flamingo-200 transition duration-300 hover:bg-flamingo-200/80 hover:border-flamingo-300/80 hover:shadow text-center mt-10"
            }
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChessSettings;

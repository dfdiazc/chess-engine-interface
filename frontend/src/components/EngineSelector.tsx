import { AppDispatch } from "app/store";
import {
  selectCurrentEngine,
  setEngine,
  selectCurrentGameStart,
} from "features/chess/chessSlice";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const EngineSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const engine = useSelector(selectCurrentEngine);
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
  return (
    <>
      <div className="flex gap-2 mt-3 self-center relative">
        <AnimatePresence>
          {(engine === "Stockfish" && gameStart) || !gameStart ? (
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
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {(engine === "Leela" && gameStart) || !gameStart ? (
            <motion.div
              className={
                engine === "Leela"
                  ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                  : "flex w-16 h-16 self-center rounded-lg justify-center"
              }
              variants={engineVariants}
              initial="visible"
              animate={engine === "Leela" && gameStart ? "selected" : "visible"}
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
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {(engine === "Komodo" && gameStart) || !gameStart ? (
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
          ) : null}
        </AnimatePresence>
      </div>
      <span className="font-roboto font-medium text-xl text-white text-center select-none mt-5">
        {engine}
      </span>
    </>
  );
};

export default EngineSelector;

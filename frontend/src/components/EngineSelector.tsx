import { AppDispatch } from "app/store";
import {
  selectCurrentEngine,
  setEngine,
  selectCurrentGameStart,
} from "features/chess/chessSlice";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const EngineSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
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
  useEffect(() => {
    if (currentPage === 1) {
      dispatch(setEngine("Stockfish"));
    } else if (currentPage === 2) {
      dispatch(setEngine("Koivisto"));
    }
  }, [currentPage]);
  return (
    <>
      <div
        className={
          !gameStart
            ? "flex gap-1 justify-between"
            : "flex gap-1 justify-center pt-5"
        }
      >
        {!gameStart ? (
          <button
            className="flex justify-center"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1 ? true : false}
          >
            <IconContext.Provider
              value={{ className: "h-4 w-4 text-white self-center" }}
            >
              <BsChevronLeft />
            </IconContext.Provider>
          </button>
        ) : null}
        {currentPage === 1 ? (
          <div className="flex flex-col">
            <div className="flex gap-2 self-center relative flex-wrap justify-center">
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
                      engine === "Stockfish" && gameStart
                        ? "selected"
                        : "visible"
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
              <AnimatePresence>
                {(engine === "Critter" && gameStart) || !gameStart ? (
                  <motion.div
                    className={
                      engine === "Critter"
                        ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                        : "flex w-16 h-16 self-center rounded-lg justify-center"
                    }
                    variants={engineVariants}
                    initial="visible"
                    animate={
                      engine === "Critter" && gameStart ? "selected" : "visible"
                    }
                    exit="hidden"
                  >
                    <button
                      onClick={() => {
                        dispatch(setEngine("Critter"));
                      }}
                      className="flex bg-white rounded-lg w-14 h-14 self-center"
                    >
                      <div className="self-center bg-[url('assets/images/critter.png')] bg-center w-14 h-14 bg-cover" />
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <AnimatePresence>
                {(engine === "Arasan" && gameStart) || !gameStart ? (
                  <motion.div
                    onClick={() => {
                      dispatch(setEngine("Arasan"));
                    }}
                    className={
                      engine === "Arasan"
                        ? "w-16 h-16 bg-[url('assets/images/stockfish.png')] bg-cover rounded-lg cursor-pointer ring-2 ring-flamingo-100"
                        : "w-16 h-16 bg-[url('assets/images/stockfish.png')] bg-cover rounded-lg cursor-pointer"
                    }
                    variants={engineVariants}
                    initial="visible"
                    animate={
                      engine === "Arasan" && gameStart ? "selected" : "visible"
                    }
                    exit="hidden"
                  />
                ) : null}
              </AnimatePresence>
              <AnimatePresence>
                {(engine === "SlowChess" && gameStart) || !gameStart ? (
                  <motion.div
                    className={
                      engine === "SlowChess"
                        ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                        : "flex w-16 h-16 self-center rounded-lg justify-center"
                    }
                    variants={engineVariants}
                    initial="visible"
                    animate={
                      engine === "SlowChess" && gameStart
                        ? "selected"
                        : "visible"
                    }
                    exit="hidden"
                  >
                    <button
                      onClick={() => {
                        dispatch(setEngine("SlowChess"));
                      }}
                      className="flex bg-white rounded-lg w-14 h-14 self-center justify-center"
                    >
                      <div className="self-center bg-[url('assets/images/slowchess.svg')] bg-center bg-contain bg-no-repeat w-12 h-12" />
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        ) : null}
        {currentPage === 2 ? (
          <div className="flex flex-col">
            <div className="flex gap-2 self-center relative flex-wrap justify-center">
              <AnimatePresence>
                {(engine === "Koivisto" && gameStart) || !gameStart ? (
                  <motion.div
                    className={
                      engine === "Koivisto"
                        ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                        : "flex w-16 h-16 self-center rounded-lg justify-center"
                    }
                    variants={engineVariants}
                    initial="visible"
                    animate={
                      engine === "Koivisto" && gameStart
                        ? "selected"
                        : "visible"
                    }
                    exit="hidden"
                  >
                    <button
                      onClick={() => {
                        dispatch(setEngine("Koivisto"));
                      }}
                      className="flex bg-white rounded-lg w-14 h-14 self-center justify-center"
                    >
                      <div className="self-center bg-[url('assets/images/koivisto.png')] bg-contain bg-no-repeat bg-center w-12 h-12" />
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <AnimatePresence>
                {(engine === "Berserk" && gameStart) || !gameStart ? (
                  <motion.div
                    className={
                      engine === "Berserk"
                        ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                        : "flex w-16 h-16 self-center rounded-lg justify-center"
                    }
                    variants={engineVariants}
                    initial="visible"
                    animate={
                      engine === "Berserk" && gameStart ? "selected" : "visible"
                    }
                    exit="hidden"
                  >
                    <button
                      onClick={() => {
                        dispatch(setEngine("Berserk"));
                      }}
                      className="flex bg-red-900 rounded-lg w-14 h-14 self-center justify-center"
                    >
                      <div className="self-center bg-[url('assets/images/berserk.svg')] w-10 h-10 bg-cover" />
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <AnimatePresence>
                {(engine === "Wasp" && gameStart) || !gameStart ? (
                  <motion.div
                    className={
                      engine === "Wasp"
                        ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                        : "flex w-16 h-16 self-center rounded-lg justify-center"
                    }
                    variants={engineVariants}
                    initial="visible"
                    animate={
                      engine === "Wasp" && gameStart ? "selected" : "visible"
                    }
                    exit="hidden"
                  >
                    <button
                      onClick={() => {
                        dispatch(setEngine("Wasp"));
                      }}
                      className="flex bg-[#85A843] rounded-lg w-14 h-14 self-center justify-center"
                    >
                      <div className="self-center bg-[url('assets/images/wasp.svg')] w-12 h-12 bg-contain bg-no-repeat bg-center" />
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <AnimatePresence>
                {(engine === "Ethereal" && gameStart) || !gameStart ? (
                  <motion.div
                    className={
                      engine === "Ethereal"
                        ? "flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100"
                        : "flex w-16 h-16 self-center rounded-lg justify-center"
                    }
                    variants={engineVariants}
                    initial="visible"
                    animate={
                      engine === "Ethereal" && gameStart
                        ? "selected"
                        : "visible"
                    }
                    exit="hidden"
                  >
                    <button
                      onClick={() => {
                        dispatch(setEngine("Ethereal"));
                      }}
                      className="flex bg-neutral-900 rounded-lg w-14 h-14 self-center justify-center"
                    >
                      <div className="self-center bg-[url('assets/images/ethereal.svg')] w-12 h-12 bg-contain bg-no-repeat bg-center" />
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        ) : null}
        {!gameStart ? (
          <button
            className="flex justify-center"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            disabled={currentPage === 2 ? true : false}
          >
            <IconContext.Provider
              value={{ className: "h-4 w-4 text-white self-center" }}
            >
              <BsChevronRight />
            </IconContext.Provider>
          </button>
        ) : null}
      </div>
      <span className="font-roboto font-medium text-xl text-white text-center self-center select-none mt-5">
        {engine}
      </span>
    </>
  );
};

export default EngineSelector;

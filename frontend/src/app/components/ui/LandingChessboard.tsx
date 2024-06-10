"use client";
/* import React, { useState, useEffect } from "react";

function calculateSquaresPerRow(windowWidth: number) {
  if (windowWidth < 425) {
    return 4;
  } else if (windowWidth < 768) {
    return 8;
  } else {
    return 12;
  }
}

export default function LandingChessboard() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [squaresPerRow, setSquaresPerRow] = useState(
    calculateSquaresPerRow(window.innerWidth)
  );
  const squares = [];
  const squareSize = windowSize.width / squaresPerRow;
  const totalRows = Math.ceil(windowSize.height / squareSize);
  const totalSquares = squaresPerRow * totalRows;

  useEffect(() => {
    const handleResize = () => {
      const newSize = { width: window.innerWidth, height: window.innerHeight };
      setWindowSize(newSize);
      setSquaresPerRow(calculateSquaresPerRow(newSize.width));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  for (let i = 0; i < totalSquares; i++) {
    const row = Math.floor(i / squaresPerRow);
    const col = i % squaresPerRow;
    const isAquamarine = (row + col) % 2 === 0;

    squares.push(
      <div
        key={i}
        style={{
          width: `${squareSize}px`,
          height: `${squareSize}px`,
        }}
        className={`transition-colors duration-200 ${
          isAquamarine ? "bg-aquamarine-300" : "bg-white"
        } bg-opacity-50 hover:bg-opacity-80`}
      />
    );
  }
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${squaresPerRow}, 1fr)`,
      }}
      className="absolute w-screen top-0 left-0 grid z-10 max-h-screen overflow-hidden"
    >
      {squares}
    </div>
  );
} */

/* import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LandingChessboard() {
  const [boardWidth, setBoardWidth] = useState(initialBoardSize);
  function initialBoardSize() {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      return windowWidth < 768 ? windowWidth * 0.8 : windowHeight * 0.8;
    }
    return 0;
  }
  const handleResize = () => {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      setBoardWidth(windowWidth < 768 ? windowWidth * 0.8 : windowHeight * 0.8);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const rows = Array.from({ length: 8 });
  const cols = Array.from({ length: 8 });
  return (
    <AnimatePresence>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
        <motion.div
          style={{
            width: `${boardWidth}px`,
          }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 40,
            duration: 0.5,
          }}
        >
          <div
            className="grid grid-cols-8 rounded-md overflow-hidden"
            style={{
              width: `${boardWidth}px`,
              height: `${boardWidth}px`,
            }}
          >
            {rows.map((_, i) =>
              cols.map((_, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    width: `${boardWidth / 8}px`,
                    height: `${boardWidth / 8}px`,
                  }}
                  className={`${
                    i % 2 === j % 2
                      ? "bg-white bg-opacity-50 hover:bg-opacity-80 transition-colors duration-200"
                      : "bg-aquamarine-300 bg-opacity-50 hover:bg-opacity-80 transition-colors duration-200"
                  }`}
                />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function LandingChessboard({
  game,
}: {
  game: {
    moves: Array<string>;
  };
}) {
  const [boardWidth, setBoardWidth] = useState(initialBoardSize);
  function initialBoardSize() {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;  
      let windowHeight = window.innerHeight;
      return windowWidth < 768
        ? Math.min(windowWidth * 0.9, 500)
        : windowWidth < 1024
        ? Math.min(windowWidth * 0.55, windowHeight * 0.75)
        : windowHeight * 0.8;
    }
    return 0;
  }
  const handleResize = () => {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      setBoardWidth(
        windowWidth < 768
          ? Math.min(windowWidth * 0.9, 500)
          : windowWidth < 1024
          ? Math.min(windowWidth * 0.55, windowHeight * 0.75)
          : windowHeight * 0.8
      );
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const customPieces = (pieceType: string) => {
    const pieces = [
      "wP",
      "wN",
      "wB",
      "wR",
      "wQ",
      "wK",
      "bP",
      "bN",
      "bB",
      "bR",
      "bQ",
      "bK",
    ];
    const returnPieces = {} as any;
    pieces.map((p) => {
      returnPieces[p] = ({ squareWidth }: any) => (
        <div
          className="bg-center bg-no-repeat"
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceType}/${p}.svg)`,
            backgroundSize: "100%",
          }}
        />
      );
      return null;
    });
    if (returnPieces) {
      return returnPieces;
    }
    return undefined;
  };

  const chess = new Chess();
  const [fen, setFen] = useState(chess.fen());
  useEffect(() => {
    let moveIndex = 0;
    const interval = setInterval(() => {
      if (moveIndex < game.moves.length) {
        chess.move(game.moves[moveIndex]);
        setFen(chess.fen());
        moveIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [game.moves]);
  return (
    <AnimatePresence>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] opacity-50">
        <motion.div
          style={{
            width: `${boardWidth}px`,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 40,
            duration: 0.5,
          }}
        >
          <Chessboard
            position={fen}
            boardWidth={boardWidth}
            customBoardStyle={{ userSelect: "none", borderRadius: "5px" }}
            customPieces={customPieces("staunty")}
            customDarkSquareStyle={{ backgroundColor: "#517879" }}
            customLightSquareStyle={{ backgroundColor: "#E6E1D6" }}
            arePiecesDraggable={false}
            boardOrientation={"white"}
            animationDuration={350}
            customDropSquareStyle={{
              boxShadow: "0px 0px 0px 5px #F5FAF8 inset",
            }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

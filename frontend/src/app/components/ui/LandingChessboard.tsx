"use client";

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

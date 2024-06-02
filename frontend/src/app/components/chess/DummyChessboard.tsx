"use client";
import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayerColor,
  selectCurrentPieceStyle,
} from "@/lib/features/chess/chessSlice";

export default function DummyChessboard() {
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
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const [boardOrientation, setBoardOrientation] = useState<
    "white" | "black" | undefined
  >(playerColor === "w" ? "white" : "black");
  useEffect(() => {
    if (playerColor === "w") {
      setBoardOrientation("white");
    } else {
      setBoardOrientation("black");
    }
  }, [playerColor]);
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
  return (
    <div className="my-6">
      <Chessboard
        position={"start"}
        boardWidth={boardWidth}
        customBoardStyle={{ userSelect: "none", borderRadius: "5px" }}
        customPieces={customPieces(pieceStyle)}
        customDarkSquareStyle={{ backgroundColor: "#517879" }}
        customLightSquareStyle={{ backgroundColor: "#E6E1D6" }}
        arePiecesDraggable={false}
        boardOrientation={boardOrientation}
        animationDuration={350}
        customDropSquareStyle={{
          boxShadow: "0px 0px 0px 5px #F5FAF8 inset",
        }}
        customArrowColor="#DC5A41"
      />
    </div>
  );
}

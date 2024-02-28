"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentPlayerColor } from "@/lib/features/chess/chessSlice";
import { IconContext } from "react-icons";
import ReactTooltip from "react-tooltip";
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";

interface ChessSuggestionProps {
  move: string,
  piece: string;
}

const Pieces = {
  p: <FaChessPawn />,
  n: <FaChessKnight />,
  b: <FaChessBishop />,
  r: <FaChessRook />,
  k: <FaChessKing />,
  q: <FaChessQueen />,
};

const ChessSuggestion = (props: ChessSuggestionProps) => {
  const playerColor = useSelector(selectCurrentPlayerColor);
  return (
    <div className="flex gap-2 px-3 py-1">
      {playerColor === "w" ? (
        <IconContext.Provider value={{ className: "h-5 w-5 text-white" }}>
          {Pieces[props.piece as keyof typeof Pieces]}
        </IconContext.Provider>
      ) : (
        <IconContext.Provider
          value={{ className: "h-5 w-5 text-black stroke-[15] stroke-white" }}
        >
          {Pieces[props.piece as keyof typeof Pieces]}
        </IconContext.Provider>
      )}
      <span className="font-roboto font-normal text-white text-md select-none">
        {props.move.substring(0, 2)}
      </span>
      <span className="font-roboto font-normal text-white text-md select-none">
        {props.move.substring(2, 4)}
      </span>
    </div>
  );
};

export default ChessSuggestion;

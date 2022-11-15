import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentPlayerColor } from "features/chess/chessSlice";
import { IconContext } from "react-icons";
import {
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";

interface ChessSuggestionProps {
  from: string;
  to: string;
  piece: string;
}

const Pieces = {
  p: <FaChessPawn />,
  n: <FaChessKnight />,
  b: <FaChessBishop />,
  r: <FaChessRook />,
  k: <FaChessKnight />,
  q: <FaChessQueen />,
};

const ChessSuggestion = (props: ChessSuggestionProps) => {
  const playerColor = useSelector(selectCurrentPlayerColor);
  return (
    <div className="flex gap-2">
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
      <span className="font-roboto font-normal text-white text-md">
        {props.from}
      </span>
      <span className="font-roboto font-normal text-white text-md">
        {props.to}
      </span>
    </div>
  );
};

export default ChessSuggestion;

"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayerColor,
  selectCurrentTurn,
} from "@/lib/features/chess/chessSlice";

interface TurnIndicatorProps {
  boardWidth: number;
}

const TurnIndicator = (props: TurnIndicatorProps) => {
  const playerColor = useSelector(selectCurrentPlayerColor);
  const turn = useSelector(selectCurrentTurn);
  let styleTop = {
    transform: `translateY(-${props.boardWidth - 16}px)`,
  };
  let styleBottom = {
    transform: "translateY(0%)",
  };
  function classTop() {
    let className =
      "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full absolute transition-all duration-300 bottom-0";

    if (playerColor === "w") {
      className += " bg-neutral-800 border border-neutral-400";
    } else {
      className += " bg-neutral-200 border border-neutral-800";
    }
    return className;
  }
  function classBottom() {
    let className =
      "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full absolute transition-all duration-300 bottom-0";

    if (playerColor === "w") {
      className += " bg-neutral-200 border border-neutral-800";
    } else {
      className += " bg-neutral-800 border border-neutral-400";
    }
    return className;
  }
  return (
    <div className="flex justify-center w-5 relative">
      <div
        className={turn === playerColor ? classBottom() : classTop()}
        style={turn === playerColor ? styleBottom : styleTop}
      ></div>
    </div>
  );
};

export default TurnIndicator;

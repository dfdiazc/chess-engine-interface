import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayerColor,
  selectCurrentTurn,
} from "features/chess/chessSlice";

interface TurnIndicatorProps {
  boardWidth: number;
}

const TurnIndicator = (props: TurnIndicatorProps) => {
  const playerColor = useSelector(selectCurrentPlayerColor);
  const turn = useSelector(selectCurrentTurn);
  let styleTop = {
    transform: `translateY(-${props.boardWidth - 16}px)`,
    borderWidth: "1px",
  };
  let styleBottom = {
    transform: "translateY(0%)",
    borderWidth: "1px",
  };
  function classTop() {
    let className =
      "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full absolute transition-all duration-300 bottom-0";

    if (playerColor === "w") {
      className += " bg-black";
    } else {
      className += " bg-white";
    }
    return className;
  }
  function classBottom() {
    let className =
      "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full absolute transition-all duration-300 bottom-0";

    if (playerColor === "w") {
      className += " bg-white";
    } else {
      className += " bg-black";
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

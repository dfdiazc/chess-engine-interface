import React, { useState } from "react";
import { Header } from "components";
import { Chessboard, Square } from "react-chessboard";
import { Chess } from "chess.js";
import axios from "axios";

const Play = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [turn, setTurn] = useState(game.turn());
  interface response {
    response: string | "No Response";
  }
  const [response, setResponse] = useState<response>();

  function onDrop(source: Square, target: Square) {
    let result = game.move({ from: source, to: target });
    if (result != null) {
      axios
        .get<response>(
          `https://unrealchess.pythonanywhere.com/api/mods/${game
            .fen()
            .replaceAll("/", "-")}$`
        )
        .then((response) => {
          setResponse(response.data);
          console.log(response.data);
        });
      setFen(game.fen());
      setTurn(game.turn());
      console.log(turn)
      return true;
    }
    return false;
  }
  let styleTop = {
    transform: "translateY(-536px)",
    backgroundColor: "black",
    borderWidth: "1px",
    border: "solid 1px white",
  };
  let styleBottom = {
    transform: "translateY(0%)",
    backgroundColor: "white",
    borderWidth: "1px",
    border: "solid 1px black",
  };

  return (
    <div className="h-full">
      <Header />
      <div className="flex px-24 py-12">
        <Chessboard position={fen} onPieceDrop={onDrop} />
        <div className="flex justify-center w-10 relative">
          <div
            className="w-6 h-6 bg-blue-600 rounded-full absolute transition-all bottom-0"
            style={turn === "w" ? styleBottom : styleTop}
          ></div>
        </div>
        <span></span>
      </div>
    </div>
  );
};

export default Play;

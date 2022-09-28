import React, { useState } from "react";
import { Header } from "components";
import { Chessboard, Square } from "react-chessboard";
import { Chess } from "chess.js";
import axios from "axios";

const Play = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  interface response {
    response: string | "No Response";
  }
  const [response, setResponse] = useState<response>();

  function onDrop(source: Square, target: Square) {
    let result = game.move({ from: source, to: target });
    if (result != null) {
      axios.get<response>(`https://unrealchess.pythonanywhere.com/api/mods/${game.fen().replaceAll('/', '-')}$`)
      .then((response) => {
        setResponse(response.data)
      console.log(response.data)
    })
      setFen(game.fen());
      return true;
    }
    return false;
  }

  return (
    <div className="h-full">
      <Header />
      <div className="flex gap-5 px-24 py-12">
        <Chessboard position={fen} onPieceDrop={onDrop} />
        <span></span>
      </div>
    </div>
  );
};

export default Play;

import React, { useState } from "react";
import { Header } from "components";
import { Chessboard, Square } from "react-chessboard";
import { Chess } from "chess.js";

const Play = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  function onDrop(source: Square, target: Square) {
    let result = game.move({ from: source, to: target });
    if (result != null) {
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
      </div>
    </div>
  );
};

export default Play;

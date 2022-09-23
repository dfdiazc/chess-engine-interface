import React, { useState } from "react";
import { Header } from "components";
import { Chessboard } from "react-chessboard";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js");

const Play = () => {
  const [game, setGame] = useState(new Chess());
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  return (
    <div className="h-full">
      <Header />
      <div className="flex gap-5 px-24 py-12">
        <Chessboard position={"start"} />
      </div>
    </div>
  );
};

export default Play;

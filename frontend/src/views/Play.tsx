import React, { useState } from "react";
import { Header } from "components";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const Play = () => {
    const [game, setGame] = useState(new Chess());
  
    function makeAMove(move:any) {
      const gameCopy:any = { ...game };
      const result = gameCopy.move(move);
      setGame(gameCopy);
      return result; // null if the move was illegal, the move object if the move was legal
    }
  
    function makeRandomMove() {
      const possibleMoves = game.moves();
      if (game.isGameOver() || possibleMoves.length === 0)
        return; // exit if the game is over
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      makeAMove(possibleMoves[randomIndex]);
    }
  
    function onDrop(sourceSquare:any, targetSquare:any) {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      });
  
      // illegal move
      if (move === null) return false;
      
      setTimeout(makeRandomMove, 200);
      return true;
    }
    

  return (
    <div className="h-full">
      <Header />
      <div className="flex gap-5 px-24 py-12">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>
    </div>
  );
};

export default Play;

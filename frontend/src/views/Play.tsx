import React, { useState, useEffect } from "react";
import { Header } from "components";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const Play = () => {
  const [game, setGame] = useState(new Chess());
  const [latestTimeout, setLatestTimeout] = useState();

  function safeGameMutate(modify:any) {
    setGame((g:any) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  useEffect(() => {
    setTimeout(makeRandomMove, 1000);
    return () => {
      clearTimeout(latestTimeout);
    };
  }, []);

  function makeRandomMove() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.isGameOver() === true || game.isDraw() === true || possibleMoves.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate(() => {
      game.move(possibleMoves[randomIndex]);
    });

    const timeout:any = setTimeout(makeRandomMove, 300);
    setLatestTimeout(timeout);
    console.log(game.fen())
  }

  return (
    <div className="h-full">
      <Header />
      <div className="flex gap-5 px-24 py-12">
      <Chessboard
        arePiecesDraggable={false}
        position={game.fen()}
        animationDuration={200}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
      />
      </div>
    </div>
  );
};

export default Play;

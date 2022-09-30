import React, { useState } from "react";
import { Header } from "components";
import { Chessboard, Square } from "react-chessboard";
import { Chess } from "chess.js";
import axios from "axios";
import { IconContext } from "react-icons";
import { FaChessBishop, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa";

const Play = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [turn, setTurn] = useState(game.turn());
  interface pieces {
    r: 0;
    n: 0;
    b: 0;
    q: 0;
    k: 0;
    p: 0;
    P: 0;
    R: 0;
    N: 0;
    B: 0;
    Q: 0;
    K: 0;
  }
  const [lostPieces, setLostPieces] = useState<pieces>({
    r: 0,
    n: 0,
    b: 0,
    q: 0,
    k: 0,
    p: 0,
    P: 0,
    R: 0,
    N: 0,
    B: 0,
    Q: 0,
    K: 0,
  });

  function onDrop(source: Square, target: Square) {
    let result = game.move({ from: source, to: target });
    if (result != null) {
      axios
        .get<pieces>(
          `https://unrealchess.pythonanywhere.com/api/mods/${game
            .fen()
            .replaceAll("/", "-")}$`
        )
        .then((response) => {
          setLostPieces(response.data);
          console.log(response.data);
        });
      setFen(game.fen());
      setTurn(game.turn());
      console.log(turn);
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
        <div className="flex flex-col gap-2">
        <div className="flex h-5">
            <IconContext.Provider
              value={{ className: "h-5 w-5 text-gray-300" }}
            >
              <div className="flex gap-2">
              {lostPieces.P !== 0 && (<div className="flex gap-1"><FaChessPawn /><span className="font-roboto font-normal text-gray-800">{lostPieces.P}</span></div>)}
              {lostPieces.N !== 0 && (<div className="flex gap-1"><FaChessKnight /><span className="font-roboto font-normal text-gray-800">{lostPieces.N}</span></div>)}
              {lostPieces.B !== 0 && (<div className="flex gap-1"><FaChessBishop /><span className="font-roboto font-normal text-gray-800">{lostPieces.B}</span></div>)}
              {lostPieces.Q !== 0 && (<div className="flex gap-1"><FaChessQueen /><span className="font-roboto font-normal text-gray-800">{lostPieces.Q}</span></div>)}
              {lostPieces.R !== 0 && (<div className="flex gap-1"><FaChessRook /><span className="font-roboto font-normal text-gray-800">{lostPieces.R}</span></div>)}
              </div>
            </IconContext.Provider>
          </div>
          <div className="flex">
            <Chessboard position={fen} onPieceDrop={onDrop} />
            <div className="flex justify-center w-10 relative">
              <div
                className="w-6 h-6 bg-blue-600 rounded-full absolute transition-all duration-300 bottom-0"
                style={turn === "w" ? styleBottom : styleTop}
              ></div>
            </div>
          </div>
          <div className="flex">
            <IconContext.Provider
              value={{ className: "h-5 w-5 text-gray-800" }}
            >
              <div className="flex gap-2">
              {lostPieces.p !== 0 && (<div className="flex gap-1"><FaChessPawn /><span className="font-roboto font-normal text-gray-800">{lostPieces.p}</span></div>)}
              {lostPieces.n !== 0 && (<div className="flex gap-1"><FaChessKnight /><span className="font-roboto font-normal text-gray-800">{lostPieces.n}</span></div>)}
              {lostPieces.b !== 0 && (<div className="flex gap-1"><FaChessBishop /><span className="font-roboto font-normal text-gray-800">{lostPieces.b}</span></div>)}
              {lostPieces.q !== 0 && (<div className="flex gap-1"><FaChessQueen /><span className="font-roboto font-normal text-gray-800">{lostPieces.q}</span></div>)}
              {lostPieces.r !== 0 && (<div className="flex gap-1"><FaChessRook /><span className="font-roboto font-normal text-gray-800">{lostPieces.r}</span></div>)}
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
};

export default Play;

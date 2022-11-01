import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { IconContext } from "react-icons";
import { Howl } from "howler";
import chessMoveSound from "assets/sounds/chess-move.mp3";
import {
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import axios from "axios";

interface CustomChessBoardProps {
  boardWidth: number;
  elo: string;
}

const CustomChessBoard = (props: CustomChessBoardProps) => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [turn, setTurn] = useState(game.turn());
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState<string>();
  const moveSound = new Howl({
    src: [chessMoveSound],
  });
  const [arePiecesDragable, setArePiecesDragable] = useState(true);
  const [newTimeout, setNewTimeout] = useState<null | ReturnType<
    typeof setTimeout
  >>(null);
  interface pieces {
    r: number;
    n: number;
    b: number;
    q: number;
    k: number;
    p: number;
    P: number;
    R: number;
    N: number;
    B: number;
    Q: number;
    K: number;
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
  interface BestMove {
    best_move: string;
  }
  function showLostPieces() {
    setArePiecesDragable(false);
    axios
      .get<pieces>(
        `https://unrealchess.pythonanywhere.com/api/mods/${game
          .fen()
          .replaceAll("/", "-")}$`
      )
      .then((response) => {
        setLostPieces(response.data);
      });
  }
  function gameOverState() {
    const checkmate = game.isCheckmate();
    const draw = game.isDraw();

    if (checkmate) {
      setGameState("Checkmate");
    } else if (draw) {
      setGameState("Draw");
    }
  }
  async function computerMove() {
    await axios
      .get<BestMove>(
        `https://unrealchess.pythonanywhere.com/api/play/stockfish/${
          props.elo
        }/${game.fen().replaceAll("/", "-")}`
      )
      .then((response) => {
        const source = response.data.best_move.substring(0, 2);
        const target = response.data.best_move.substring(2, 4);
        game.move({ from: source, to: target });
      });
    showLostPieces();
    setFen(game.fen());
    setTurn(game.turn());
    moveSound.play();
    setArePiecesDragable(true);
    setGameOver(game.isGameOver());
    gameOverState();
  }
  function onDrop(source: Square, target: Square) {
    let result = game.move({ from: source, to: target });
    if (result != null) {
      showLostPieces();
      setFen(game.fen());
      setTurn(game.turn());
      moveSound.play();

      const newTimeout = setTimeout(computerMove, 1000);
      setNewTimeout(newTimeout);
      return true;
    }
    return false;
  }
  let styleTop = {
    transform: `translateY(-${props.boardWidth - 16}px)`,
    backgroundColor: "black",
    borderWidth: "1px",
  };
  let styleBottom = {
    transform: "translateY(0%)",
    backgroundColor: "white",
    borderWidth: "1px",
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center h-5">
        <IconContext.Provider value={{ className: "h-5 w-5 text-white" }}>
          <div className="flex gap-2">
            {lostPieces.P > 0 && (
              <div className="flex gap-1">
                <FaChessPawn />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.P}
                </span>
              </div>
            )}
            {lostPieces.N > 0 && (
              <div className="flex gap-1">
                <FaChessKnight />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.N}
                </span>
              </div>
            )}
            {lostPieces.B > 0 && (
              <div className="flex gap-1">
                <FaChessBishop />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.B}
                </span>
              </div>
            )}
            {lostPieces.Q > 0 && (
              <div className="flex gap-1">
                <FaChessQueen />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.Q}
                </span>
              </div>
            )}
            {lostPieces.R > 0 && (
              <div className="flex gap-1">
                <FaChessRook />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.R}
                </span>
              </div>
            )}
          </div>
        </IconContext.Provider>
      </div>
      <div className="flex">
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardWidth={props.boardWidth}
          arePiecesDraggable={arePiecesDragable}
        />
        {gameOver && (
          <div className="flex h-10 p-10 z-10 absolute top-24 left-1/2 bg-white/10 rounded">
            <span className="font-roboto font-normal text-white">{gameState}</span>
          </div>
        )}
        <div className="flex justify-center w-5 relative">
          <div
            className="w-3 h-3 bg-blue-600 rounded-full absolute transition-all duration-300 bottom-0"
            style={turn === "w" ? styleBottom : styleTop}
          ></div>
        </div>
      </div>
      <div className="flex">
        <IconContext.Provider
          value={{ className: "h-5 w-5 text-black stroke-[10] stroke-white" }}
        >
          <div className="flex gap-2">
            {lostPieces.p > 0 && (
              <div className="flex gap-1">
                <FaChessPawn />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.p}
                </span>
              </div>
            )}
            {lostPieces.n > 0 && (
              <div className="flex gap-1">
                <FaChessKnight />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.n}
                </span>
              </div>
            )}
            {lostPieces.b > 0 && (
              <div className="flex gap-1">
                <FaChessBishop />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.b}
                </span>
              </div>
            )}
            {lostPieces.q > 0 && (
              <div className="flex gap-1">
                <FaChessQueen />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.q}
                </span>
              </div>
            )}
            {lostPieces.r > 0 && (
              <div className="flex gap-1">
                <FaChessRook />
                <span className="font-roboto font-normal text-white/50">
                  {lostPieces.r}
                </span>
              </div>
            )}
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default CustomChessBoard;

import React, { useEffect, useState } from "react";
import { Chessboard, Pieces } from "react-chessboard";
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
import axiosRetry from "axios-retry";
import LostPieces from "./LostPieces";

interface CustomChessBoardProps {
  boardWidth: number;
  elo: string;
  startGame: boolean;
  playerColor: string;
}

const CustomChessBoard = (props: CustomChessBoardProps) => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [turn, setTurn] = useState(game.turn());
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState<string>();
  const [computerColor, setComputerColor] = useState<string>(() => {
    if (props.playerColor === "w") {
      return "b";
    }
    return "w";
  });
  const moveSound = new Howl({
    src: [chessMoveSound],
  });
  const [arePiecesDragable, setArePiecesDragable] = useState(false);
  const [newTimeout, setNewTimeout] = useState<null | ReturnType<
    typeof setTimeout
  >>(null);
  const [boardOrientation, setBoardOrientation] = useState<
    "white" | "black" | undefined
  >(() => {
    if (props.playerColor === "w") {
      return "white";
    }
    return "black";
  });

  useEffect(() => {
    if (props.playerColor === "w") {
      setBoardOrientation("white");
      setComputerColor("b");
    } else {
      setBoardOrientation("black");
      setComputerColor("w");
    }
  }, [props.playerColor]);
  useEffect(() => {
    if (props.startGame) {
      if (turn === props.playerColor) {
        setArePiecesDragable(true);
      } else if (turn === computerColor) {
        computerMove();
      }
    }
  }, [turn, props.startGame]);
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
  axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount: number) => {
      return retryCount * 2000;
    },
    retryCondition: (error) => {
      return error.response?.status === 502;
    },
  });
  function showLostPieces() {
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
        if (response.data.best_move.length === 5) {
          const promoPiece = response.data.best_move.substring(4);
          game.move({ from: source, to: target, promotion: promoPiece });
        } else {
          game.move({ from: source, to: target });
        }
      });
    showLostPieces();
    setFen(game.fen());
    setTurn(game.turn());
    moveSound.play();
    setArePiecesDragable(true);
    setGameOver(game.isGameOver());
    gameOverState();
  }
  function onDrop(source: Square, target: Square, piece: Pieces) {
    let result = null;
    if (piece === "wP" || piece === "bP") {
      result = game.move({ from: source, to: target, promotion: "q" });
      if (result === null) result = game.move({ from: source, to: target });
    } else {
      result = game.move({ from: source, to: target });
    }
    if (result != null) {
      showLostPieces();
      setFen(game.fen());
      setTurn(game.turn());
      moveSound.play();
      setArePiecesDragable(false);
      setGameOver(game.isGameOver());
      return true;
    }
    return false;
  }
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
      "w-3 h-3 rounded-full absolute transition-all duration-300 bottom-0";

    if (props.playerColor === "w") {
      className += " bg-black";
    } else {
      className += " bg-white";
    }
    return className;
  }
  function classBottom() {
    let className =
      "w-3 h-3 rounded-full absolute transition-all duration-300 bottom-0";

    if (props.playerColor === "w") {
      className += " bg-white";
    } else {
      className += " bg-black";
    }
    return className;
  }
  return (
    <div className="flex flex-col gap-2">
      <LostPieces
        r={lostPieces.r}
        n={lostPieces.n}
        b={lostPieces.b}
        q={lostPieces.q}
        k={lostPieces.k}
        p={lostPieces.p}
        P={lostPieces.P}
        R={lostPieces.R}
        N={lostPieces.N}
        B={lostPieces.B}
        Q={lostPieces.Q}
        K={lostPieces.K}
        color={computerColor}
      />
      <div className="flex">
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardWidth={props.boardWidth}
          arePiecesDraggable={arePiecesDragable}
          boardOrientation={boardOrientation}
        />
        {gameOver && (
          <div className="flex h-10 p-10 z-10 absolute top-24 left-1/2 bg-white/10 rounded">
            <span className="font-roboto font-normal text-white">
              {gameState}
            </span>
          </div>
        )}
        <div className="flex justify-center w-5 relative">
          <div
            className={turn === props.playerColor ? classBottom() : classTop()}
            style={turn === props.playerColor ? styleBottom : styleTop}
          ></div>
        </div>
      </div>
      <LostPieces
        r={lostPieces.r}
        n={lostPieces.n}
        b={lostPieces.b}
        q={lostPieces.q}
        k={lostPieces.k}
        p={lostPieces.p}
        P={lostPieces.P}
        R={lostPieces.R}
        N={lostPieces.N}
        B={lostPieces.B}
        Q={lostPieces.Q}
        K={lostPieces.K}
        color={props.playerColor}
      />
    </div>
  );
};

export default CustomChessBoard;

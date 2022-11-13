import React, { useEffect, useRef, useState } from "react";
import { Chessboard, Pieces } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { Howl } from "howler";
import chessMoveSound from "assets/sounds/chess-move.mp3";
import axios from "axios";
import axiosRetry from "axios-retry";
import LostPieces from "./LostPieces";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import {
  selectCurrentPlayerColor,
  selectCurrentEngine,
  selectCurrentGameStart,
  setGameStart,
  selectCurrentTurn,
  setTurn,
  selectCurrentFen,
  setFen,
  selectCurrentElo,
} from "features/chess/chessSlice";
import { Piece, Color } from "chess.js";
import TurnIndicator from "./TurnIndicator";

interface CustomChessboardProps {
  boardWidth: number;
}

const CustomChessboard = (props: CustomChessboardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [game] = useState(new Chess());
  const fen = useSelector(selectCurrentFen);
  const [gameState, setGameState] = useState<string>();
  const playerColor = useSelector(selectCurrentPlayerColor);
  const turn = useSelector(selectCurrentTurn);
  const engine = useSelector(selectCurrentEngine).toLowerCase();
  const elo = useSelector(selectCurrentElo);
  const gameStart = useSelector(selectCurrentGameStart);
  const [computerColor, setComputerColor] = useState<string>(() => {
    if (playerColor === "w") {
      return "b";
    }
    return "w";
  });
  const chessboardRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const moveSound = new Howl({
    src: [chessMoveSound],
  });
  const [arePiecesDragable, setArePiecesDragable] = useState(false);
  const [boardOrientation, setBoardOrientation] = useState<
    "white" | "black" | undefined
  >(() => {
    if (playerColor === "w") {
      return "white";
    }
    return "black";
  });
  const [rightClickedSquares, setRightClickedSquares] = useState<any>({});
  const [moveSquares, setMoveSquares] = useState<any>({});
  const [optionSquares, setOptionSquares] = useState<any>({});
  const [checkSquares, setCheckSquares] = useState<any>({});
  const [moveFrom, setMoveFrom] = useState("");
  function resetGame() {
    game.reset();
    (chessboardRef.current as any).clearPremoves();
    dispatch(setFen(game.fen()));
    dispatch(setTurn(game.turn()));
    showLostPieces();
    setMoveSquares({});
    setCheckSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
    dispatch(setGameStart(false));
  }
  useEffect(() => {
    if (playerColor === "w") {
      setBoardOrientation("white");
      setComputerColor("b");
    } else {
      setBoardOrientation("black");
      setComputerColor("w");
    }
  }, [playerColor]);
  useEffect(() => {
    if (gameStart && !game.isGameOver()) {
      if (turn === playerColor) {
        setArePiecesDragable(true);
      } else if (turn === computerColor) {
        setArePiecesDragable(true);
        computerMove();
      }
    } else if (game.isGameOver()) {
      gameOverState();
      setArePiecesDragable(false);
    }
  }, [turn, gameStart]);
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
  const getPiecePositions = (piece: Piece) => {
    return ([] as any)
      .concat(...game.board())
      .map((p: Piece, index: number) => {
        if (p !== null && p.type === piece.type && p.color === piece.color) {
          return index;
        }
      })
      .filter(Number.isInteger)
      .map((piece_index: number) => {
        const row = "abcdefgh"[piece_index % 8];
        const column = Math.ceil((64 - piece_index) / 8);
        return row + column;
      });
  };
  function gameOverState() {
    if (game.isGameOver()) {
      const checkmate = game.isCheckmate();
      const draw = game.isDraw();

      if (checkmate) {
        setGameState("Checkmate");
      } else if (draw) {
        setGameState("Draw");
      }
      setArePiecesDragable(false);
    }
  }
  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      return;
    }

    const newSquares: any = {};
    moves.map((move: any) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,0.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
  }
  function addCheckSquares(square: Square) {
    checkSquares[square] = {
      background: "rgba(222, 53, 62, 0.9)",
    };
    setCheckSquares(checkSquares);
  }

  function onSquareRightClick(square: any) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square as keyof typeof rightClickedSquares] &&
        rightClickedSquares[square as keyof typeof rightClickedSquares]
          .backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }
  function onMouseOverSquare(square: Square) {
    if (gameStart && !moveFrom && turn === playerColor) {
      getMoveOptions(square);
    }
  }
  function onMouseOutSquare() {
    if (
      Object.keys(optionSquares).length !== 0 &&
      !moveFrom &&
      turn === playerColor
    )
      setOptionSquares([]);
  }
  function onSquareClick(square: Square) {
    function resetFirstMove(square: Square) {
      setMoveFrom(square);
      getMoveOptions(square);
    }
    if (gameStart && turn === playerColor) {
      setRightClickedSquares({});
      setOptionSquares({});
      if (!moveFrom) {
        resetFirstMove(square);
        return;
      }
      const piece = game.get(square);
      let result = null;
      if (piece.type === "p") {
        result = game.move({ from: moveFrom, to: square, promotion: "q" });
        if (result === null) result = game.move({ from: moveFrom, to: square });
      } else {
        result = game.move({ from: moveFrom, to: square });
      }
      if (result != null) {
        setMoveSquares({
          [moveFrom]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          [square]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        });
        setOptionSquares({});
        showLostPieces();
        dispatch(setFen(game.fen()));
        if (game.isCheck()) {
          const computerKingSquare: Square = getPiecePositions({
            color: computerColor as Color,
            type: "k",
          })[0];
          addCheckSquares(computerKingSquare);
        } else {
          setCheckSquares({});
        }
        dispatch(setTurn(game.turn()));
        setMoveFrom("");
        moveSound.play();
      } else {
        resetFirstMove(square);
        return;
      }
    }
  }
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  async function computerMove() {
    await timeout(1000);
    const url = () => {
      if (engine === "stockfish") {
        return `https://unrealchess.pythonanywhere.com/api/play/stockfish/${elo}/${game
          .fen()
          .replaceAll("/", "-")}`;
      } else if (engine === "komodo") {
        return `https://unrealchess.pythonanywhere.com/api/play/komodo/15/${game
          .fen()
          .replaceAll("/", "-")}`;
      }
      return `https://unrealchess.pythonanywhere.com/api/play/stockfish/${elo}/${game
        .fen()
        .replaceAll("/", "-")}`;
    };
    await axios.get<BestMove>(url()).then((response) => {
      const source = response.data.best_move.substring(0, 2);
      const target = response.data.best_move.substring(2, 4);
      if (response.data.best_move.length === 5) {
        const promoPiece = response.data.best_move.substring(4);
        game.move({ from: source, to: target, promotion: promoPiece });
      } else {
        game.move({ from: source, to: target });
      }
      setMoveSquares({
        [source]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        [target]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      });
    });
    showLostPieces();
    dispatch(setFen(game.fen()));
    if (game.isCheck()) {
      const playerKingSquare: Square = getPiecePositions({
        color: playerColor as Color,
        type: "k",
      })[0];
      addCheckSquares(playerKingSquare);
    } else {
      setCheckSquares({});
    }
    dispatch(setTurn(game.turn()));
    moveSound.play();
  }
  function onDrop(source: Square, target: Square, piece: Pieces) {
    if (turn === playerColor) {
      let result = null;
      if (piece === "wP" || piece === "bP") {
        result = game.move({ from: source, to: target, promotion: "q" });
        if (result === null) result = game.move({ from: source, to: target });
      } else {
        result = game.move({ from: source, to: target });
      }
      if (result != null) {
        setMoveSquares({
          [source]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          [target]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        });
        setOptionSquares({});
        showLostPieces();
        dispatch(setFen(game.fen()));
        if (game.isCheck()) {
          const computerKingSquare: Square = getPiecePositions({
            color: computerColor as Color,
            type: "k",
          })[0];
          addCheckSquares(computerKingSquare);
        } else {
          setCheckSquares({});
        }
        dispatch(setTurn(game.turn()));
        moveSound.play();
        return true;
      }
      return false;
    }
    return false;
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
          customBoardStyle={{ userSelect: "none", borderRadius: "5px" }}
          customDarkSquareStyle={{ backgroundColor: "#517879" }}
          customLightSquareStyle={{ backgroundColor: "#E6E1D6" }}
          arePiecesDraggable={arePiecesDragable}
          arePremovesAllowed={true}
          boardOrientation={boardOrientation}
          animationDuration={350}
          customDropSquareStyle={{ boxShadow: "0px 0px 0px 5px #F5FAF8 inset" }}
          onMouseOverSquare={onMouseOverSquare}
          onMouseOutSquare={onMouseOutSquare}
          onSquareRightClick={onSquareRightClick}
          onSquareClick={onSquareClick}
          customSquareStyles={{
            ...moveSquares,
            ...optionSquares,
            ...rightClickedSquares,
            ...checkSquares,
          }}
          ref={chessboardRef}
        />
        <TurnIndicator boardWidth={props.boardWidth} />
        {game.isGameOver() && (
          <div className="flex flex-col gap-3 p-10 z-10 absolute self-center top-24 inset-x-0 mx-auto max-w-sm bg-[#3D4547]/95 rounded-xl justify-center">
            <span className="font-roboto font-medium text-white text-3xl self-center text-center select-none">
              {gameState}
            </span>
            {game.isCheckmate() && (
              <span className="font-roboto font-normal text-white text-xl self-center text-center select-none">
                You {turn === playerColor ? "Lost" : "Won"}!
              </span>
            )}
            <button
              onClick={() => {
                resetGame();
              }}
              className={
                "block grow whitespace-nowrap self-center text-xl text-white font-roboto font-medium select-none px-10 py-3 bg-flamingo-100 rounded-full border-b-4 border-flamingo-200 transition duration-300 hover:bg-flamingo-200/80 hover:border-flamingo-300 hover:shadow text-center mt-10"
              }
            >
              Play Again!
            </button>
          </div>
        )}
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
        color={playerColor}
      />
    </div>
  );
};

export default CustomChessboard;

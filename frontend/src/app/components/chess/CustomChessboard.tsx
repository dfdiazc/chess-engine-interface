"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chessboard, Pieces } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { Howl } from "howler";
import { LostPieces } from "@/app/components/chess";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  useLazyEngineMoveQuery,
  useSuggestionsQuery,
} from "@/lib/features/chess/chessApiSlice";
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
  selectCurrentSuggestionMoves,
  setSuggestionMoves,
  setSuggestionPieces,
  selectCurrentAreSuggestionsShown,
  selectCurrentSuggestionShown,
  selectCurrentGameOver,
  setGameOver,
  selectCurrentDifficultyMeasure,
  selectCurrentSkillLevel,
  setPromoPiece,
  selectCurrentPromoPiece,
  selectCurrentGameRestart,
  setGameRestart,
  selectCurrentPieceStyle,
  selectCurrentIsTurnIndicatorShown,
  selectCurrentIsMoveSoundActive,
} from "@/lib/features/chess/chessSlice";
import { Piece, Color } from "chess.js";
import { TurnIndicator } from "@/app/components/chess";
import { PromotionPieceSelector } from "@/app/components/chess";

const CustomChessboard = () => {
  const [boardWidth, setBoardWidth] = useState(initialBoardSize);
  function initialBoardSize() {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      return windowWidth < 768 ? windowWidth * 0.8 : windowHeight * 0.75;
    }
    return 0;
  }
  const handleResize = () => {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      setBoardWidth(
        windowWidth < 768 ? windowWidth * 0.8 : windowHeight * 0.75
      );
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const fen = useSelector(selectCurrentFen);
  const [game] = useState(new Chess(fen));
  const [gameState, setGameState] = useState<string>();
  const playerColor = useSelector(selectCurrentPlayerColor);
  const [hasPlayerMoved, setHasPlayerMoved] = useState(false);
  const [computerColor, setComputerColor] = useState<string>(() => {
    if (playerColor === "w") {
      return "b";
    }
    return "w";
  });
  const turn = useSelector(selectCurrentTurn);
  const isTurnIndicatorShown = useSelector(selectCurrentIsTurnIndicatorShown);
  const isMoveSoundActive = useSelector(selectCurrentIsMoveSoundActive);
  const engine = useSelector(selectCurrentEngine).toLowerCase();
  const difficultyMeasure = useSelector(selectCurrentDifficultyMeasure);
  const elo = useSelector(selectCurrentElo);
  const skillLevel = useSelector(selectCurrentSkillLevel);
  const gameStart = useSelector(selectCurrentGameStart);
  const gameOver = useSelector(selectCurrentGameOver);
  const gameRestart = useSelector(selectCurrentGameRestart);
  const areSuggestionsShown = useSelector(selectCurrentAreSuggestionsShown);
  const suggestionShown = useSelector(selectCurrentSuggestionShown);
  const suggestionMoves = useSelector(selectCurrentSuggestionMoves);
  const [suggestionArrows, setSuggestionArrows] = useState<string[][]>();
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const { data: suggestions } = useSuggestionsQuery(fen, {
    skip: turn === computerColor || !gameStart || gameOver || hasPlayerMoved,
  });
  const [engineMoveTrigger] = useLazyEngineMoveQuery();
  const chessboardRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const moveSound = new Howl({
    src: ["/sounds/chess-move.mp3"],
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
  const promoPiece = useSelector(selectCurrentPromoPiece);
  const [hasSelectedPromoPiece, setHasSelectedPromoPiece] = useState(true);
  const [promoMoves, setPromoMoves] = useState<any>({});
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
    dispatch(setGameOver(false));
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
      setArePiecesDragable(true);
      if (turn === playerColor) {
        setHasPlayerMoved(false);
      } else if (turn === computerColor) {
        setArePiecesDragable(true);
        computerMove();
      }
    } else if (game.isGameOver()) {
      gameOverState();
    }
  }, [turn, gameStart]);
  useEffect(() => {
    if (suggestionShown && gameStart && !game.isGameOver()) {
      showSuggestionArrows();
    }
  }, [suggestionShown, areSuggestionsShown, suggestionMoves]);
  useEffect(() => {
    if (turn === playerColor) {
      setSuggestions();
    }
  }, [suggestions]);
  /*   useEffect(() => {
    if (promoMoves) {
      const result = game.move({
        from: promoMoves.source,
        to: promoMoves.target,
        promotion: promoPiece,
      });
      if (result != null) {
        setMoveSquares({
          [promoMoves.source]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          [promoMoves.target]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        });
        setOptionSquares({});
        showLostPieces();
        setHasPlayerMoved(true);
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
        dispatch(setPromoPiece(""));
        setHasSelectedPromoPiece(true);
        dispatch(setTurn(game.turn()));
        if (isMoveSoundActive) moveSound.play();
      }
    }
  }, [promoPiece]); */
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
  function showSuggestionArrows() {
    if (suggestionShown[1] && areSuggestionsShown) {
      setSuggestionArrows([
        [
          suggestionMoves[1].substring(0, 2),
          suggestionMoves[1].substring(2, 4),
        ],
      ]);
    } else if (suggestionShown[2] && areSuggestionsShown) {
      setSuggestionArrows([
        [
          suggestionMoves[2].substring(0, 2),
          suggestionMoves[2].substring(2, 4),
        ],
      ]);
    } else if (suggestionShown[3] && areSuggestionsShown) {
      setSuggestionArrows([
        [
          suggestionMoves[3].substring(0, 2),
          suggestionMoves[3].substring(2, 4),
        ],
      ]);
    } else {
      setSuggestionArrows(undefined);
    }
  }
  function showLostPieces() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mods/${game.fen().replaceAll("/", "-")}$`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLostPieces(data);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation: " + error.message
        );
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
  const customPieces = (pieceType: string) => {
    const pieces = [
      "wP",
      "wN",
      "wB",
      "wR",
      "wQ",
      "wK",
      "bP",
      "bN",
      "bB",
      "bR",
      "bQ",
      "bK",
    ];
    const returnPieces = {} as any;
    pieces.map((p) => {
      returnPieces[p] = ({ squareWidth }: any) => (
        <div
          className="bg-center bg-no-repeat"
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceType}/${p}.svg)`,
            backgroundSize: "100%",
          }}
        />
      );
      return null;
    });
    if (returnPieces) {
      return returnPieces;
    }
    return undefined;
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
      dispatch(setGameOver(true));
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
    if (gameStart && !game.get(moveFrom as Square) && turn === playerColor) {
      getMoveOptions(square);
    }
  }
  function onMouseOutSquare() {
    if (
      Object.keys(optionSquares).length !== 0 &&
      !game.get(moveFrom as Square) &&
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
      if (piece.type === "p" && (square[1] === "8" || square[1] === "1")) {
        try {
          result = game.move({ from: moveFrom, to: square, promotion: "q" });
          if (result) result = game.move({ from: moveFrom, to: square });
        } catch {
          resetFirstMove(square);
          return;
        }
      }
      try {
        result = game.move({ from: moveFrom, to: square });
        if (result) {
          setMoveSquares({
            [moveFrom]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            [square]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          });
          setOptionSquares({});
          showLostPieces();
          setHasPlayerMoved(true);
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
          if (isMoveSoundActive) moveSound.play();
        } else {
          resetFirstMove(square);
          return;
        }
      } catch {
        resetFirstMove(square);
        return;
      }
    }
  }
  async function setSuggestions() {
    if (suggestions) {
      dispatch(setSuggestionMoves(suggestions));
      dispatch(
        setSuggestionPieces({
          1: game.get(suggestions[1].substring(0, 2)).type,
          2: game.get(suggestions[2].substring(0, 2)).type,
          3: game.get(suggestions[3].substring(0, 2)).type,
        })
      );
    }
  }
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  async function computerMove() {
    await timeout(1000);
    let difficulty;
    function setDifficulty() {
      if (difficultyMeasure === "elo") difficulty = elo;
      else if (difficultyMeasure === "skillLevel") difficulty = skillLevel;
    }
    setDifficulty();
    const { data } = await engineMoveTrigger({ engine, difficulty, fen });
    const move = data.best_move;
    const source = move.substring(0, 2);
    const target = move.substring(2, 4);
    if (move.length === 5) {
      const promoPiece = move.substring(4);
      game.move({ from: source, to: target, promotion: promoPiece });
    } else {
      game.move({ from: source, to: target });
    }
    setMoveSquares({
      [source]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      [target]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
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
    if (isMoveSoundActive) moveSound.play();
  }
  function onDrop(source: Square, target: Square, piece: Pieces) {
    if (turn === playerColor) {
      let result = null;
      if (
        (piece === "wP" && target[1] === "8") ||
        (piece === "bP" && target[1] === "1")
      ) {
        const gameCopy = new Chess(fen);
        const promoMove = gameCopy.move({
          from: source,
          to: target,
          promotion: "q",
        });
        if (promoMove) {
          dispatch(setPromoPiece(""));
          setHasSelectedPromoPiece(false);
          setPromoMoves({ source: source, target: target });
          return false;
        }
      }
      try {
        result = game.move({ from: source, to: target });
        if (result) {
          setMoveSquares({
            [source]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            [target]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          });
          setOptionSquares({});
          showLostPieces();
          setHasPlayerMoved(true);
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
          if (isMoveSoundActive) moveSound.play();
          return true;
        }
      } catch (error) {
        console.log("Invalid move");
        return false;
      }
      showSuggestionArrows();
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
        <div className="relative">
          <Chessboard
            position={fen}
            onPieceDrop={onDrop}
            boardWidth={boardWidth}
            customBoardStyle={{ userSelect: "none", borderRadius: "5px" }}
            customPieces={customPieces(pieceStyle)}
            customDarkSquareStyle={{ backgroundColor: "#517879" }}
            customLightSquareStyle={{ backgroundColor: "#E6E1D6" }}
            arePiecesDraggable={arePiecesDragable}
            arePremovesAllowed={true}
            boardOrientation={boardOrientation}
            animationDuration={350}
            customDropSquareStyle={{
              boxShadow: "0px 0px 0px 5px #F5FAF8 inset",
            }}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            onSquareRightClick={onSquareRightClick}
            onSquareClick={onSquareClick}
            customArrows={suggestionArrows}
            customArrowColor="#DC5A41"
            customSquareStyles={{
              ...moveSquares,
              ...optionSquares,
              ...rightClickedSquares,
              ...checkSquares,
            }}
            ref={chessboardRef}
          />
          {!hasSelectedPromoPiece ? <PromotionPieceSelector /> : null}
        </div>
        {isTurnIndicatorShown ? (
          <TurnIndicator boardWidth={boardWidth} />
        ) : null}
        {gameRestart && !gameOver ? (
          <div className="flex flex-col gap-3 p-10 z-10 absolute self-center top-24 inset-x-0 mx-auto max-w-sm bg-[#3D4547]/95 rounded-xl justify-center">
            <span className="font-roboto font-medium text-white text-2xl self-center text-center select-none">
              Do you want to restart the current game?
            </span>
            <div className="flex gap-2 mt-10">
              <button
                onClick={() => {
                  dispatch(setGameRestart(false));
                }}
                className={
                  "flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-flamingo-100 transition duration-300 hover:bg-flamingo-100 text-center"
                }
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(setGameRestart(false));
                  resetGame();
                }}
                className={
                  "block grow whitespace-nowrap self-center text-xl text-white font-roboto font-medium select-none px-10 py-3 bg-flamingo-100 rounded-xl border-2 border-flamingo-100 transition duration-300 hover:bg-flamingo-200/80 hover:border-flamingo-300 hover:shadow text-center"
                }
              >
                Confirm
              </button>
            </div>
          </div>
        ) : null}
        {gameOver ? (
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
        ) : null}
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

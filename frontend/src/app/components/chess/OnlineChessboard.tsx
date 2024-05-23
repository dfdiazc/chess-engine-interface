"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Howl } from "howler";
import { GameOver, CapturedPieces } from "@/app/components/chess";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import Cookies from "js-cookie";
import {
  selectCurrentPlayerColor,
  selectCurrentTurn,
  setTurn,
  selectCurrentFen,
  setFen,
  selectCurrentPieceStyle,
  selectCurrentIsTurnIndicatorShown,
  selectCurrentIsMoveSoundActive,
  setGameState,
  selectCurrentGameState,
  setCreatingGame,
  setGameHistory,
  appendToGameHistory,
  setPlayerColor,
  selectCurrentHasJoinedGame,
  selectCurrentTimeControl,
} from "@/lib/features/chess/chessSlice";
import { Piece, Color } from "chess.js";
import { TurnIndicator } from "@/app/components/chess";
import { Square } from "react-chessboard/dist/chessboard/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  useGetMatchQuery,
  useMoveMutation,
} from "@/lib/features/chess/chessApiSlice";

export default function OnlineChessboard() {
  const { id: matchId } = useParams();
  const hasJoinedGame = useSelector(selectCurrentHasJoinedGame);
  const { data: matchQueryData, refetch } = useGetMatchQuery(matchId, {
    skip: !hasJoinedGame,
  });
  const [move] = useMoveMutation();
  const t = useTranslations();
  const [boardWidth, setBoardWidth] = useState(initialBoardSize);
  function initialBoardSize() {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      return windowWidth < 768
        ? windowWidth * 0.9
        : windowWidth < 1024
        ? windowWidth * 0.55
        : windowHeight * 0.8;
    }
    return 0;
  }
  const handleResize = () => {
    if (typeof window !== "undefined") {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      setBoardWidth(
        windowWidth < 768
          ? windowWidth * 0.9
          : windowWidth < 1024
          ? windowWidth * 0.55
          : windowHeight * 0.8
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
  let [game, setGame] = useState(new Chess(fen));
  const [initialState, setInitialState] = useState(false);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const [hasPlayerMoved, setHasPlayerMoved] = useState(false);
  const [opponentColor, setOpponentColor] = useState<string>(
    playerColor === "w" ? "b" : "w"
  );
  const turn = useSelector(selectCurrentTurn);
  const isTurnIndicatorShown = useSelector(selectCurrentIsTurnIndicatorShown);
  const isMoveSoundActive = useSelector(selectCurrentIsMoveSoundActive);
  const gameState = useSelector(selectCurrentGameState);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const timeControl = useSelector(selectCurrentTimeControl);
  const moveSound = new Howl({
    src: ["/sounds/chess-move.mp3"],
    volume: 0.5,
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
  function resetGame(newGameState: string) {
    game.reset();
    dispatch(setFen(game.fen()));
    dispatch(setTurn(game.turn()));
    dispatch(setGameHistory([]));
    setMoveSquares({});
    setCheckSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
    setArePiecesDragable(false);
    if (newGameState === "waiting") {
      dispatch(setCreatingGame(true));
    }
    dispatch(setGameState(newGameState));
  }
  const playerId = Cookies.get("player_id");
  useEffect(() => {
    if (matchQueryData?.whites_player?.anonymous_id === playerId) {
      dispatch(setPlayerColor("w"));
    } else if (matchQueryData?.blacks_player?.anonymous_id === playerId) {
      dispatch(setPlayerColor("b"));
    }
  }, [matchQueryData?.whites_player, matchQueryData?.blacks_player, playerId]);
  function loadGame() {
    dispatch(setGameState(matchQueryData.game_state));
    dispatch(setTurn(matchQueryData.fen.split(" ")[1]));
    game.loadPgn(matchQueryData.pgn);
    dispatch(setFen(matchQueryData.fen));
    dispatch(setGameHistory(game.history()));
    setInitialState(true);
  }
  useEffect(() => {
    console.log(matchQueryData);
    console.log(initialState);
    if (matchQueryData && !initialState) {
      loadGame();
    }
  }, [matchQueryData]);
  useEffect(() => {
    if (playerColor === "w") {
      setBoardOrientation("white");
      setOpponentColor("b");
    } else {
      setBoardOrientation("black");
      setOpponentColor("w");
    }
  }, [playerColor]);
  useEffect(() => {
    if (gameState === "reset") {
      resetGame("waiting");
    } else if (gameState === "rematch") {
      resetGame("playing");
    }
  }, [gameState]);
  useEffect(() => {
    if (gameState === "playing" && !game.isGameOver()) {
      setArePiecesDragable(true);
      if (turn === playerColor) {
        setHasPlayerMoved(false);
      } else if (turn === opponentColor) {
        setArePiecesDragable(true);
        if (matchQueryData.moves) {
          const lastMove =
            matchQueryData.moves[matchQueryData.moves.length - 1];
          const lastMoveColor = game
            .history({ verbose: true })
            ?.slice(-1)[0]?.color;
          try {
            opponentMove(lastMove);
          } catch {}
        }
      }
    } else if (game.isGameOver()) {
      gameOverState();
    }
  }, [turn, gameState, matchQueryData]);
  type PieceSymbol = "p" | "r" | "n" | "b" | "q";

  function getCapturedPieces(game: Chess, color: string) {
    const capturedPieces: Record<PieceSymbol, number> = {
      p: 0,
      r: 0,
      n: 0,
      b: 0,
      q: 0,
    };
    for (const move of game.history({ verbose: true })) {
      if (
        move.hasOwnProperty("captured") &&
        move.color === color &&
        move.captured !== undefined
      ) {
        const captured = move.captured as PieceSymbol;
        capturedPieces[captured]++;
      }
    }
    return capturedPieces;
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
  const [gameOverMessage, setGameOverMessage] = useState("");
  function gameOverState() {
    if (game.isGameOver()) {
      const checkmate = game.isCheckmate();
      const draw = game.isDraw();

      if (checkmate) {
        setGameOverMessage(t("play.game.checkmate"));
      } else if (draw) {
        setGameOverMessage(t("play.game.draw"));
      }
      dispatch(setGameState("over"));
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
    if (
      gameState === "playing" &&
      !game.get(moveFrom as Square) &&
      turn === playerColor
    ) {
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
    if (gameState === "playing" && turn === playerColor) {
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
          setHasPlayerMoved(true);
          dispatch(setFen(game.fen()));
          move({ move: { from: moveFrom, to: square } });
          if (game.isCheck()) {
            const computerKingSquare: Square = getPiecePositions({
              color: opponentColor as Color,
              type: "k",
            })[0];
            addCheckSquares(computerKingSquare);
          } else {
            setCheckSquares({});
          }
          dispatch(setTurn(game.turn()));
          dispatch(appendToGameHistory(game.history().slice(-1)[0]));
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
  function opponentMove(move: { from: string; to: string; promotion: string }) {
    try {
      const source = move.from;
      const target = move.to;
      if (move?.promotion?.length > 0) {
        game.move({ from: source, to: target, promotion: move.promotion });
      } else {
        game.move({ from: source, to: target });
      }
      setMoveSquares({
        [source]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        [target]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      });
      dispatch(setFen(game.fen()));
      dispatch(appendToGameHistory(game.history().slice(-1)[0]));
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
    } catch (error) {}
  }
  function onDrop(source: Square, target: Square, piece: string) {
    if (turn === playerColor) {
      let result = null;
      try {
        result = game.move({ from: source, to: target });
        if (result) {
          setMoveSquares({
            [source]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            [target]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          });
          setOptionSquares({});
          setHasPlayerMoved(true);
          dispatch(setFen(game.fen()));
          dispatch(appendToGameHistory(game.history().slice(-1)[0]));
          move({ move: { from: source, to: target } });
          if (game.isCheck()) {
            const computerKingSquare: Square = getPiecePositions({
              color: opponentColor as Color,
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
        return false;
      }
      return false;
    }
    return false;
  }
  const [promoSquares, setPromoSquares] = useState<Square[]>([]);
  function promotionHandler(source: Square, target: Square, piece: string) {
    if (turn === playerColor) {
      let result = null;
      if (
        (piece === "wP" && target[1] === "8") ||
        (piece === "bP" && target[1] === "1")
      ) {
        try {
          const gameCopy = new Chess(fen);
          const promoMove = gameCopy.move({
            from: source,
            to: target,
            promotion: "q",
          });
          if (promoMove) {
            setPromoSquares([source, target]);
            return true;
          }
        } catch (error) {
          return false;
        }
      }
    }
    return false;
  }
  function promotionPieceHandler(piece?: string) {
    if (piece) {
      let result = null;
      try {
        result = game.move({
          from: promoSquares[0],
          to: promoSquares[1],
          promotion: piece[1].toLocaleLowerCase(),
        });
        if (result) {
          setMoveSquares({
            [promoSquares[0]]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            [promoSquares[1]]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          });
          setOptionSquares({});
          setHasPlayerMoved(true);
          dispatch(setFen(game.fen()));
          move({
            move: {
              from: promoSquares[0],
              to: promoSquares[1],
              promotion: piece[1].toLocaleLowerCase(),
            },
          });
          if (game.isCheck()) {
            const computerKingSquare: Square = getPiecePositions({
              color: opponentColor as Color,
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
        return false;
      }
    }
    return false;
  }
  const [players, setPlayers] = useState({ current: "", opponent: "" });
  useEffect(() => {
    setPlayers({
      current: getUsername("current"),
      opponent: getUsername("opponent"),
    });
  }, [matchQueryData?.whites_player, matchQueryData?.blacks_player]);
  function getUsername(player: "current" | "opponent") {
    if (player === "current") {
      if (playerId === matchQueryData?.whites_player?.anonymous_id) {
        return matchQueryData.whites_player?.username;
      } else if (playerId === matchQueryData?.blacks_player?.anonymous_id) {
        return matchQueryData.blacks_player?.username;
      }
    } else if (player === "opponent") {
      if (playerId !== matchQueryData?.whites_player?.anonymous_id) {
        return (
          matchQueryData?.whites_player?.username || "Waiting for opponent..."
        );
      } else if (playerId !== matchQueryData?.blacks_player?.anonymous_id) {
        return (
          matchQueryData?.blacks_player?.username || "Waiting for opponent..."
        );
      }
    }
  }
  const [currentPlayerTime, setCurrentPlayerTime] = useState(60 * 10);
  const [opponentPlayerTime, setOpponentPlayerTime] = useState(60 * 10);
  useEffect(() => {
    const timer = setInterval(() => {
      if (turn === playerColor) {
        setCurrentPlayerTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      } else {
        setOpponentPlayerTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }
    }, 1000);

    if (currentPlayerTime === 0 || opponentPlayerTime === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [turn, currentPlayerTime, opponentPlayerTime]);
  return (
    <div className="flex flex-col gap-2 h-fit">
      <div className={`flex justify-between ${isTurnIndicatorShown && "mr-5"} h-11`}>
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-8 h-8 bg-neutral-300 rounded opacity-80">
            <div
              className="bg-center bg-no-repeat h-6 w-6"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/wP.svg)`,
                backgroundSize: "100%",
              }}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-neutral-200 text-sm">{players.opponent}</p>
            <CapturedPieces
              capturedPieces={getCapturedPieces(game, opponentColor)}
              color={playerColor}
            />
          </div>
        </div>
        {timeControl !== "unlimited" && (
          <div className="bg-neutral-800 px-4 py-2 rounded w-24 flex justify-center items-center">
            <p
              className={`text-neutral-200 ${
                turn === playerColor && "opacity-50"
              } text-xl`}
            >
              {Math.floor(opponentPlayerTime / 60)}:
              {opponentPlayerTime % 60 < 10 ? "0" : ""}
              {opponentPlayerTime % 60}
            </p>
          </div>
        )}
      </div>
      <div className="flex">
        <div className="relative" id="chessboard">
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
            clearPremovesOnRightClick={true}
            onPromotionCheck={promotionHandler}
            onPromotionPieceSelect={promotionPieceHandler}
            boardOrientation={boardOrientation}
            animationDuration={350}
            customDropSquareStyle={{
              boxShadow: "0px 0px 0px 5px #F5FAF8 inset",
            }}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            onSquareRightClick={onSquareRightClick}
            onSquareClick={onSquareClick}
            customArrowColor="#DC5A41"
            customSquareStyles={{
              ...moveSquares,
              ...optionSquares,
              ...rightClickedSquares,
              ...checkSquares,
            }}
          />
        </div>
        {isTurnIndicatorShown ? (
          <TurnIndicator boardWidth={boardWidth} />
        ) : null}
        <GameOver gameOverMessage={gameOverMessage} />
      </div>
      <div className={`flex justify-between ${isTurnIndicatorShown && "mr-5"} h-11`}>
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-8 h-8 bg-neutral-300 rounded opacity-80">
            <div
              className="bg-center bg-no-repeat h-6 w-6"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/wP.svg)`,
                backgroundSize: "100%",
              }}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-neutral-200 text-sm">{players.current}</p>
            <CapturedPieces
              capturedPieces={getCapturedPieces(game, playerColor)}
              color={opponentColor}
            />
          </div>
        </div>
        {timeControl !== "unlimited" && (
          <div className="bg-neutral-800 px-4 py-2 rounded w-24 flex justify-center items-center">
            <p
              className={`text-neutral-200 ${
                turn === opponentColor && "opacity-50"
              } text-xl`}
            >
              {Math.floor(currentPlayerTime / 60)}:
              {currentPlayerTime % 60 < 10 ? "0" : ""}
              {currentPlayerTime % 60}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

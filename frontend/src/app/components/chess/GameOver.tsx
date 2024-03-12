"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  selectCurrentCreatingGame,
  selectCurrentPlayerColor,
  selectCurrentTurn,
  setCreatingGame,
  setGameState,
} from "@/lib/features/chess/chessSlice";
import { useSelector } from "react-redux";
import { selectCurrentGameState } from "@/lib/features/chess/chessSlice";

export default function GameOver({
  gameOverMessage,
}: {
  gameOverMessage: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const creatingGame = useSelector(selectCurrentCreatingGame);
  const gameState = useSelector(selectCurrentGameState);
  const turn = useSelector(selectCurrentTurn);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (gameState === "over") {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [creatingGame, gameState]);
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 0);
      return () => clearTimeout(timer);
    } else {
      document.body.style.pointerEvents = "auto";
    }
  }, [open]);
  function restartGame() {
    dispatch(setCreatingGame(true));
    dispatch(setGameState("reset"));
  }
  function rematch() {
    dispatch(setGameState("rematch"));
  }
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return null;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal container={document.getElementById("chessboard")}>
        <Dialog.Content
          className="data-[state=open]:animate-contentShow absolute top-[50%] left-[50%] h-[200px] max-h-[85vh] w-[80vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[200] flex flex-col gap-1"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex justify-center items-center">
            <Dialog.Title className="text-xl md:text-2xl font-bold text-neutral-200">
              {gameOverMessage}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant={"ghost"}
                className="absolute top-2 right-2 appearance-none items-center justify-center dark:hover:bg-neutral-700"
              >
                <X className="w-4 h-4 stroke-neutral-200" />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-base md:text-lg font-medium text-neutral-200 text-center">
            You {turn === playerColor ? "Lost" : "Won"}!
          </Dialog.Description>
          <div className="flex gap-2 mt-auto">
            <Button
              variant="default"
              type="submit"
              className="w-full"
              onClick={restartGame}
            >
              New game
            </Button>
            <Button
              variant="default"
              type="submit"
              className="w-full"
              onClick={rematch}
            >
              Rematch
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

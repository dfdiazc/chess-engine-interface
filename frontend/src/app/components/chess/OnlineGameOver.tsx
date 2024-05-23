"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { selectCurrentGameState } from "@/lib/features/chess/chessSlice";
import { useSelector } from "react-redux";

export default function OnlineGameOver() {
  const gameState = useSelector(selectCurrentGameState);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (gameState === "over") {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [gameState]);
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
            {turn === playerColor
              ? t("play.game.defeat")
              : t("play.game.victory")}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

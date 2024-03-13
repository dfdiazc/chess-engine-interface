"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { RotateCw, X } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectCurrentCreatingGame,
  selectCurrentGameState,
  setCreatingGame,
  setGameState,
} from "@/lib/features/chess/chessSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

export default function RestartGame() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const creatingGame = useSelector(selectCurrentCreatingGame);
  const gameState = useSelector(selectCurrentGameState);
  const [open, setOpen] = useState(false);
  function restartGame() {
    dispatch(setCreatingGame(true));
    dispatch(setGameState("reset"));
    setOpen(false);
  }
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return null;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog.Trigger
              asChild
              disabled={
                (creatingGame && gameState !== "playing") ||
                gameState === "over"
              }
            >
              <Button variant={"ghost"}>
                <RotateCw className="w-4 h-4 stroke-neutral-200" />
              </Button>
            </Dialog.Trigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("play.game.restartGame")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog.Portal container={document.getElementById("chessboard")}>
        <Dialog.Content className="data-[state=open]:animate-contentShow absolute top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[200] flex flex-col gap-4">
          <div className="flex justify-between items-center">
          <Dialog.Title className="text-lg md:text-2xl font-bold text-neutral-200">
              {t("play.game.restartGameQuestion")}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant={"ghost"}
                className="appearance-none items-center justify-center dark:hover:bg-neutral-700"
              >
                <X className="w-4 h-4 stroke-neutral-200" />
              </Button>
            </Dialog.Close>
          </div>
          <div className="flex gap-2">
            <Dialog.Close asChild>
              <Button variant="cancel" type="submit" className="w-full text-sm md:text-base">
                {t("play.game.cancel")}
              </Button>
            </Dialog.Close>
            <Button
              variant="default"
              type="submit"
              className="w-full text-sm md:text-base"
              onClick={restartGame}
            >
              {t("play.game.restartGame")}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

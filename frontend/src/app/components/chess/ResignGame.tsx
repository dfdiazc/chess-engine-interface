"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectCurrentGameState,
} from "@/lib/features/chess/chessSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { FiFlag } from "react-icons/fi";
import Cookies from "js-cookie";
import { useResignMutation } from "@/lib/features/chess/chessApiSlice";

export default function Resign() {
  const t = useTranslations();
  const playerId = Cookies.get("player_id");
  const gameState = useSelector(selectCurrentGameState);
  const [open, setOpen] = useState(false);
  const [resignMatch, { isLoading: isResigningGame, data: resignData }] =
    useResignMutation();
  async function resignGame() {
    const data = await resignMatch(playerId);
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
              disabled={gameState !== "playing"}
            >
              <Button variant={"ghost"}>
                <FiFlag className="w-4 h-4 stroke-neutral-200" />
              </Button>
            </Dialog.Trigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Resign</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog.Portal container={document.getElementById("chessboard")}>
        <Dialog.Content className="data-[state=open]:animate-contentShow absolute top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[200] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg md:text-2xl font-bold text-neutral-200">
              Resign the game?
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
              <Button
                variant="cancel"
                type="submit"
                className="w-full text-sm md:text-base"
              >
                {t("play.game.cancel")}
              </Button>
            </Dialog.Close>
            <Button
              variant="default"
              type="submit"
              className="w-full text-sm md:text-base"
              onClick={resignGame}
            >
              Resign
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
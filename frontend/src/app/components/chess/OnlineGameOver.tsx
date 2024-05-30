"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  selectCurrentGameState,
  selectCurrentHasJoinedGame,
  selectCurrentPlayerColor,
} from "@/lib/features/chess/chessSlice";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useGetMatchQuery } from "@/lib/features/chess/chessApiSlice";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { match } from "assert";

export default function OnlineGameOver() {
  const t = useTranslations();
  const gameState = useSelector(selectCurrentGameState);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const { id: matchId } = useParams();
  const hasJoinedGame = useSelector(selectCurrentHasJoinedGame);
  const { data: matchQueryData, refetch } = useGetMatchQuery(matchId, {
    skip: !hasJoinedGame,
  });
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
          className="data-[state=open]:animate-contentShow absolute top-[50%] left-[50%] h-[200px] max-h-[85vh] w-[80vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[90] flex flex-col gap-1"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex justify-center items-center">
            <Dialog.Title className="text-xl md:text-2xl font-bold text-neutral-200">
              {matchQueryData?.winner === "draw"
                ? t("play.game.draw")
                : (matchQueryData?.winner === "white" && playerColor === "w") ||
                  (matchQueryData?.winner === "black" && playerColor === "b")
                ? t("play.game.victory")
                : t("play.game.defeat")}
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
            {t("play.game.by")}{" "}
            {matchQueryData?.outcome === "checkmate"
              ? t("play.game.checkmate")
              : matchQueryData?.outcome === "stalemate"
              ? t("play.game.stalemate")
              : matchQueryData?.outcome === "insufficient_material"
              ? t("play.game.insufficientMaterial")
              : matchQueryData?.outcome === "fivefold_repetition"
              ? t("play.game.repetition")
              : matchQueryData?.outcome === "seventyfive_move_rule"
              ? t("play.game.seventyFiveMoveRule")
              : matchQueryData?.outcome === "resignation"
              ? t("play.game.resignation")
              : ""}
            {"."}
          </Dialog.Description>
          <Button variant="default" className="w-full mt-auto" asChild>
            <Link href="/play">
              <FaPlus className="w-5 h-5 stroke-neutral-200 mr-2" />
              {t("play.game.newGame")}
            </Link>
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

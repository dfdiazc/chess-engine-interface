"use client";
import { AppDispatch } from "@/lib/store";
import {
  selectCurrentPieceStyle,
  selectCurrentPlayerColor,
  selectCurrentCreatingGame,
  selectCurrentGameState,
  selectCurrentInitialRender,
  setInitialRender,
  setPlayerColor,
} from "@/lib/features/chess/chessSlice";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { FiCheck, FiCopy } from "react-icons/fi";
import {
  useCreateMatchMutation,
  useGetMatchQuery,
} from "@/lib/features/chess/chessApiSlice";
import { useRouter, useParams } from "next/navigation";

export default function OnlineCreatePanel() {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const creatingGame = useSelector(selectCurrentCreatingGame);
  const [createMatch, { isLoading: isCreatingGame, data: matchData }] =
    useCreateMatchMutation();
  const { data: matchQueryData } = useGetMatchQuery(matchData?.id, {
    skip: !matchData,
  });
  useEffect(() => {
    if (matchQueryData && matchQueryData.game_state === "playing") {
      router.push(`/play/online/${matchQueryData.id}`);
    }
  }, [matchQueryData]);
  const gameState = useSelector(selectCurrentGameState);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const initialRender = useSelector(selectCurrentInitialRender);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (initialRender) {
      setOpen(true);
      dispatch(setInitialRender(false));
    }
  }, [initialRender]);
  async function createGame() {
    const data = await createMatch(playerColor).unwrap();
    handleLinkCopy(data.id);
  }
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  function handleLinkCopy(data = matchData.id) {
    setIsLinkCopied(true);
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_URL}/play/online/${data}`)
      .then(() => {
        setTimeout(() => {
          setIsLinkCopied(false);
        }, 1500);
      });
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        asChild
        disabled={!creatingGame && gameState !== "waiting"}
      >
        <Button variant={"default"} className="w-full mt-4">
          <p>Invite a friend</p>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[100]" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-4 md:p-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[200] flex flex-col gap-2 md:gap-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-xl md:text-2xl font-bold text-neutral-200">
              Invite a friend
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
          <div>
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-neutral-200">I play as</p>
              </div>
              <div className="flex flex-row gap-2">
                <button
                  className={`px-2 pt-1.5 pb-2.5 rounded-lg disabled:opacity-60 ${
                    playerColor === "w" &&
                    "ring-2 ring-aquamarine-300 bg-aquamarine-400/50"
                  }`}
                  onClick={() => {
                    dispatch(setPlayerColor("w"));
                  }}
                  disabled={!creatingGame && gameState !== "waiting"}
                >
                  <div
                    className="bg-center bg-no-repeat h-6 w-6"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/wP.svg)`,
                      backgroundSize: "100%",
                    }}
                  />
                </button>
                <button
                  className={`px-2 pt-1.5 pb-2.5 rounded-lg disabled:opacity-60 ${
                    playerColor === "b" &&
                    "ring-2 ring-aquamarine-300 bg-aquamarine-400/50"
                  }`}
                  onClick={() => {
                    dispatch(setPlayerColor("b"));
                  }}
                  disabled={!creatingGame && gameState !== "waiting"}
                >
                  <div
                    className="bg-center bg-no-repeat h-6 w-6"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/bP.svg)`,
                      backgroundSize: "100%",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
          <Button
            variant={"default"}
            className="w-full mt-4 md:mt-0 !whitespace-normal gap-2"
            onClick={matchData?.id ? handleLinkCopy : createGame}
            disabled={isCreatingGame}
          >
            {matchData?.id ? (
              <>
                <p className="text-sm text-neutral-200 break-all">
                  {process.env.NEXT_PUBLIC_URL}
                  /play/online/{matchData.id}
                </p>
                {isLinkCopied ? (
                  <FiCheck className="w-5 h-5 stroke-green-300 shrink-0" />
                ) : (
                  <FiCopy className="w-5 h-5 stroke-neutral-200 shrink-0" />
                )}
              </>
            ) : (
              <>
                <FiCopy className="w-5 h-5 stroke-neutral-200" />
                <p>Copy Link</p>
              </>
            )}
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

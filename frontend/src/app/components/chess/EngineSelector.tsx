"use client";
import { AppDispatch } from "@/lib/store";
import {
  selectCurrentEngine,
  setEngine,
  selectCurrentDifficulty,
  selectCurrentPieceStyle,
  selectCurrentPlayerColor,
  setDifficulty,
  selectCurrentCreatingGame,
  selectCurrentGameState,
} from "@/lib/features/chess/chessSlice";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { X, ArrowLeftRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { DifficultySelector } from ".";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

export default function EngineSelector() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const creatingGame = useSelector(selectCurrentCreatingGame);
  const gameState = useSelector(selectCurrentGameState);
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const engine = useSelector(selectCurrentEngine);
  const [selectedEngine, setSelectedEngine] = useState(engine);
  const difficulty = useSelector(selectCurrentDifficulty);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setSelectedEngine(engine);
    setSelectedDifficulty(difficulty);
  }, [open]);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog.Trigger
              asChild
              disabled={!creatingGame && gameState !== "waiting"}
            >
              <Button variant={"ghost"} className="ml-auto text-neutral-200">
                <ArrowLeftRight className="w-4 h-4 stroke-neutral-200" />
              </Button>
            </Dialog.Trigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("play.settings.changeEngine")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[100]" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-4 md:p-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[200] flex flex-col gap-2 md:gap-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-xl md:text-2xl font-bold text-neutral-200">
              {t("play.settings.selectEngine")}
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
          <div className="flex flex-col justify-center items-center gap-1">
            {selectedEngine === "Stockfish" ? (
              <div className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 bg-[url('/images/stockfish.png')] bg-cover self-center rounded-lg" />
            ) : selectedEngine === "Leela" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center justify-center">
                <div className="flex bg-neutral-200 rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20 self-center">
                  <div className="self-center bg-[url('/images/leela.svg')] md:-mx-0.5 lg:mx-0.5 w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-cover" />
                </div>
              </div>
            ) : selectedEngine === "Komodo" ? (
              <div className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 bg-[url('/images/komodo.png')] bg-cover self-center rounded-lg" />
            ) : selectedEngine === "Critter" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center rounded-lg justify-center items-center">
                <div className="flex justify-center bg-white rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20">
                  <div className="self-center bg-[url('/images/critter.png')] bg-center w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-cover" />
                </div>
              </div>
            ) : selectedEngine === "Arasan" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center rounded-lg justify-center items-center">
                <div className="flex justify-center bg-white rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20">
                  <div className="self-center bg-[url('/images/arasan.svg')] bg-center w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-cover" />
                </div>
              </div>
            ) : selectedEngine === "SlowChess" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center rounded-lg justify-center items-center">
                <div className="flex justify-center bg-white rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20">
                  <div className="self-center bg-[url('/images/slowchess.svg')] bg-center w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-contain bg-no-repeat" />
                </div>
              </div>
            ) : selectedEngine === "Koivisto" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center rounded-lg justify-center items-center">
                <div className="flex justify-center bg-white rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20">
                  <div className="self-center bg-[url('/images/koivisto.png')] bg-center w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-contain bg-no-repeat" />
                </div>
              </div>
            ) : selectedEngine === "Berserk" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center rounded-lg justify-center">
                <div className="flex bg-red-900 rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20 self-center justify-center">
                  <div className="self-center bg-[url('/images/berserk.svg')] w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-cover" />
                </div>
              </div>
            ) : selectedEngine === "Wasp" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center rounded-lg justify-center">
                <div className="flex bg-[#85A843] rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20 self-center justify-center">
                  <div className="self-center bg-[url('/images/wasp.svg')] w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-contain bg-no-repeat bg-center" />
                </div>
              </div>
            ) : selectedEngine === "Ethereal" ? (
              <div className="flex w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 self-center rounded-lg justify-center">
                <div className="flex bg-neutral-900 rounded-lg w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20 self-center justify-center">
                  <div className="self-center bg-[url('/images/ethereal.svg')] w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 bg-contain bg-no-repeat bg-center" />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="flex items-center gap-2 text-base md:text-xl text-neutral-200 font-semibold">
              <p>{selectedEngine}</p>
              {(selectedEngine === "Stockfish" ||
                selectedEngine === "Arasan") && (
                <>
                  &middot;<p>{selectedDifficulty}</p>
                  <span className="text-xs uppercase">
                    {t("play.settings.difficulty.elo")}
                  </span>
                </>
              )}
              {selectedEngine === "Komodo" && (
                <>
                  &middot;<p>{selectedDifficulty}</p>
                  <span className="text-xs uppercase">
                    {t("play.settings.difficulty.skillLevel")}
                  </span>
                </>
              )}
            </div>
          </div>
          <DifficultySelector
            engine={selectedEngine}
            difficulty={selectedDifficulty}
            setEngine={setSelectedEngine}
            setDifficulty={setSelectedDifficulty}
          />
          <div className="flex flex-col self-center w-full">
            <div className="flex gap-1 justify-between">
              <div className="flex flex-col">
                <div className="flex gap-2 self-center relative flex-wrap justify-center">
                  <button
                    onClick={() => {
                      setSelectedEngine("Stockfish");
                    }}
                    className={`w-14 md:w-16 h-14 md:h-16 bg-[url('/images/stockfish.png')] bg-cover self-center rounded-lg cursor-pointer ${
                      selectedEngine === "Stockfish" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  />
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "Leela" && "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("Leela");
                      }}
                      className="flex bg-white rounded-lg w-12 md:w-14 h-12 md:h-14 self-center opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <div className="self-center bg-[url('/images/leela.svg')] md:-m-1.5 w-10 md:w-14 h-10 md:h-14 bg-cover" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEngine("Komodo");
                    }}
                    className={`w-14 md:w-16 h-14 md:h-16 bg-[url('/images/komodo.png')] bg-cover self-center rounded-lg cursor-pointer ${
                      selectedEngine === "Komodo" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  />
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "Critter" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("Critter");
                      }}
                      className="flex justify-center bg-white rounded-lg w-12 md:w-14 h-12 md:h-14 self-center opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <div className="self-center bg-[url('/images/critter.png')] bg-center w-10 md:w-12 h-10 md:h-12 bg-cover" />
                    </button>
                  </div>
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "Arasan" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("Arasan");
                      }}
                      className="flex bg-white rounded-lg w-12 md:w-14 h-12 md:h-14 self-center justify-center opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <div className="self-center bg-[url('/images/arasan.svg')] bg-center bg-contain bg-no-repeat w-10 md:w-12 h-10 md:h-12" />
                    </button>
                  </div>
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "SlowChess" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("SlowChess");
                      }}
                      className="flex bg-white rounded-lg w-12 md:w-14 h-12 md:h-14 self-center justify-center"
                    >
                      <div className="self-center bg-[url('/images/slowchess.svg')] bg-center bg-contain bg-no-repeat w-10 md:w-12 h-10 md:h-12" />
                    </button>
                  </div>
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "Koivisto" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("Koivisto");
                      }}
                      className="flex bg-white rounded-lg w-12 md:w-14 h-12 md:h-14 self-center justify-center"
                    >
                      <div className="self-center bg-[url('/images/koivisto.png')] bg-contain bg-no-repeat bg-center w-10 md:w-12 h-10 md:h-12" />
                    </button>
                  </div>
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "Berserk" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("Berserk");
                      }}
                      className="flex bg-red-900 rounded-lg w-12 md:w-14 h-12 md:h-14 self-center justify-center opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <div className="self-center bg-[url('/images/berserk.svg')] w-8 md:w-10 h-8 md:h-10 bg-cover" />
                    </button>
                  </div>
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "Wasp" && "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("Wasp");
                      }}
                      className="flex bg-[#85A843] rounded-lg w-12 md:w-14 h-12 md:h-14 self-center justify-center opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <div className="self-center bg-[url('/images/wasp.svg')] w-10 md:w-12 h-10 md:h-12 bg-contain bg-no-repeat bg-center" />
                    </button>
                  </div>
                  <div
                    className={`flex w-14 md:w-16 h-14 md:h-16 self-center rounded-lg justify-center ${
                      selectedEngine === "Ethereal" &&
                      "ring-2 ring-aquamarine-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedEngine("Ethereal");
                      }}
                      className="flex bg-neutral-900 rounded-lg w-12 md:w-14 h-12 md:h-14 self-center justify-center opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <div className="self-center bg-[url('/images/ethereal.svg')] w-10 md:w-12 h-10 md:h-12 bg-contain bg-no-repeat bg-center" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dialog.Close asChild>
            <Button
              variant={"default"}
              className="w-full mt-4 md:mt-0"
              onClick={() => {
                dispatch(setEngine(selectedEngine));
                dispatch(setDifficulty(selectedDifficulty));
              }}
            >
              <p>{t("play.settings.selectEngine")}</p>
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

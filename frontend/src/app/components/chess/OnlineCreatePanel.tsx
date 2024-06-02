"use client";
import { AppDispatch } from "@/lib/store";
import {
  selectCurrentPieceStyle,
  selectCurrentCreatingGame,
  selectCurrentGameState,
} from "@/lib/features/chess/chessSlice";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { FiCheck, FiCopy } from "react-icons/fi";
import {
  useCreateMatchMutation,
  useGetMatchQuery,
} from "@/lib/features/chess/chessApiSlice";
import { useRouter } from "next/navigation";
import { LuLink } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [playerColor, setPlayerColor] = useState("w");
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const [open, setOpen] = useState(false);
  async function createGame(data: z.infer<typeof formSchema>) {
    const matchData = await createMatch({
      playerColor,
      variant: data.variant,
    }).unwrap();
    handleLinkCopy(matchData.id);
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
  const formSchema = z.object({
    variant: z.string(),
    timeControl: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variant: "standard",
      timeControl: "unlimited",
    },
  });
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant={"secondary"}
          className="w-full px-8 gap-4 justify-start"
        >
          <div className="w-12 h-12 flex justify-center items-center">
            <LuLink className="w-8 h-8 stroke-neutral-300 shrink-0" />
          </div>
          <p className="text-xl lg:text-2xl font-semibold text-wrap text-left">
            {t("play.game.challengeFriend")}
          </p>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[100]" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-4 md:p-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[200] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-xl md:text-2xl font-bold text-neutral-200">
              {t("play.game.challengeFriend")}
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
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(createGame)}
            >
              <FormField
                control={form.control}
                name="variant"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-neutral-200 text-sm font-medium">
                      Variant
                    </FormLabel>
                    <div className="flex items-center gap-1 !mt-0">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          field.onBlur();
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-36 md:w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[200]">
                          <SelectItem value={"standard"}>Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeControl"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-neutral-200 text-sm font-medium">
                      Time Preset
                    </FormLabel>
                    <div className="flex items-center gap-1 !mt-0">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          field.onBlur();
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-36 md:w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[200]">
                          <SelectItem value={"unlimited"}>Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <div className="space-y-2 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-neutral-200">
                    {t("play.game.playerColor")}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    className={`px-2 pt-1.5 pb-2.5 rounded-lg disabled:opacity-60 ${
                      playerColor === "w" &&
                      "ring-2 ring-aquamarine-300 bg-aquamarine-400/50"
                    }`}
                    onClick={() => {
                      setPlayerColor("w");
                    }}
                    disabled={!creatingGame && gameState !== "waiting"}
                    type="button"
                  >
                    <div
                      className="bg-center bg-no-repeat h-6 w-6"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/wP.svg)`,
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
                      setPlayerColor("b");
                    }}
                    disabled={!creatingGame && gameState !== "waiting"}
                    type="button"
                  >
                    <div
                      className="bg-center bg-no-repeat h-6 w-6"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${pieceStyle}/bP.svg)`,
                        backgroundSize: "100%",
                      }}
                    />
                  </button>
                </div>
              </div>
              <Button
                variant={"default"}
                className="w-full mt-4 md:mt-0 !whitespace-normal gap-2 font-medium h-14"
                onClick={
                  matchData?.id ? handleLinkCopy : form.handleSubmit(createGame)
                }
                disabled={isCreatingGame}
                type={matchData?.id ? "button" : "submit"}
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
                    <p>{t("play.game.copyLink")}</p>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

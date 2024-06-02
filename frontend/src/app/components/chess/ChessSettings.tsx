"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayerColor,
  selectCurrentPieceStyle,
  selectCurrentIsTurnIndicatorShown,
  selectCurrentIsMoveSoundActive,
  setPieceStyle,
  setIsTurnIndicatorShown,
  setIsMoveSoundActive,
} from "@/lib/features/chess/chessSlice";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FiSettings } from "react-icons/fi";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

export default function ChessSettings() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const turnIndicator = useSelector(selectCurrentIsTurnIndicatorShown);
  const soundOnMove = useSelector(selectCurrentIsMoveSoundActive);
  const pieceStyles = [
    { value: "pirouetti", label: "Pirouetti" },
    { value: "cburnett", label: "Cburnett" },
    { value: "pixel", label: "Pixel" },
    { value: "staunty", label: "Staunty" },
  ];
  const formSchema = z.object({
    pieceStyle: z.string().optional(),
    turnIndicator: z.boolean().optional(),
    soundOnMove: z.boolean().optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pieceStyle: pieceStyle,
      turnIndicator: turnIndicator,
      soundOnMove: soundOnMove,
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const touchedFields = form.formState.touchedFields;
    if (touchedFields?.pieceStyle) {
      dispatch(setPieceStyle(data.pieceStyle));
    }
    if (touchedFields.turnIndicator) {
      dispatch(setIsTurnIndicatorShown(data.turnIndicator));
    }
    if (touchedFields.soundOnMove) {
      dispatch(setIsMoveSoundActive(data.soundOnMove));
    }
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let defaultValues: {
      pieceStyle?: string;
      turnIndicator?: boolean;
      soundOnMove?: boolean;
    } = {};
    defaultValues.pieceStyle = pieceStyle;
    defaultValues.turnIndicator = turnIndicator;
    defaultValues.soundOnMove = soundOnMove;
    form.reset({ ...defaultValues });
  }, [open]);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog.Trigger asChild>
              <Button variant={"ghost"}>
                <FiSettings className="w-4 h-4 stroke-neutral-200" />
              </Button>
            </Dialog.Trigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("play.settings.settings")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[100]" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[200] flex flex-col gap-4">
          <div className="flex justify-between items-center">
          <Dialog.Title className="text-xl md:text-2xl font-bold text-neutral-200">
              {t("play.settings.settings")}
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
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="pieceStyle"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-neutral-200 text-sm font-medium">
                      {t("play.settings.pieceStyle")}
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
                          <SelectTrigger className="w-24 md:w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[200]">
                          {pieceStyles.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div
                        className="bg-center bg-cover bg-no-repeat self-center w-8 md:w-12 h-8 md:h-12"
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}://${
                            process.env.NEXT_PUBLIC_API_URL
                          }/static/chess/pieces/${
                            form.getValues().pieceStyle
                          }/${playerColor}P.svg)`,
                          backgroundSize: "100%",
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="turnIndicator"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center gap-4">
                    <FormLabel className="text-neutral-200 text-sm font-medium">
                      {t("play.settings.turnIndicator")}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          field.onBlur();
                        }}
                        className="w-[42px] h-[25px] bg-neutral-800 rounded-full relative data-[state=checked]:bg-aquamarine-200 outline-none cursor-pointer"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soundOnMove"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center gap-4">
                    <FormLabel className="text-neutral-200 text-sm font-medium">
                      {t("play.settings.soundOnMove")}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          field.onBlur();
                        }}
                        className="w-[42px] h-[25px] bg-neutral-800 rounded-full relative data-[state=checked]:bg-aquamarine-200 outline-none cursor-pointer"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant="default"
                type="submit"
                disabled={
                  Object.keys(form.formState.touchedFields).length === 0
                }
              >
                {t("play.settings.saveChanges")}
              </Button>
            </form>
          </Form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

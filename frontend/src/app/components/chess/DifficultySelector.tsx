"use client";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Slider } from "@/components/ui/slider";
import { HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function DifficultySelector({
  engine,
  difficulty,
  setEngine,
  setDifficulty,
}: {
  engine: string;
  difficulty: number;
  setEngine: Dispatch<SetStateAction<string>>;
  setDifficulty: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [difficultyValues, setDifficultyValues] = useState({
    min: 1350,
    max: 2850,
    default: 1500,
    step: 10,
  });
  useEffect(() => {
    if (engine === "Stockfish") {
      setDifficultyValues({ min: 1350, max: 2850, default: 1500, step: 10 });
      if (difficulty < 1350 || difficulty > 2850) {
        setSliderValue(1500);
        setDifficulty(1500);
      }
    } else if (engine === "Komodo") {
      setDifficultyValues({ min: 1, max: 20, default: 5, step: 1 });
      if (difficulty < 1 || difficulty > 20) {
        setSliderValue(5);
        setDifficulty(5);
      }
    } else if (engine === "Arasan") {
      setDifficultyValues({ min: 1000, max: 3000, default: 1500, step: 10 });
      if (difficulty < 1000 || difficulty > 3000) {
        setSliderValue(1500);
        setDifficulty(1500);
      }
    } else {
      setDifficultyValues({ min: 1, max: 100, default: 100, step: 1 });
      setSliderValue(100);
      setDifficulty(100);
    }
  }, [engine]);
  const [sliderValue, setSliderValue] = useState<number>(difficulty);
  return (
    <div className="flex items-center gap-2">
      <Slider
        value={[sliderValue]}
        min={Number(difficultyValues["min"])}
        max={Number(difficultyValues["max"])}
        step={Number(difficultyValues["step"])}
        disabled={
          !(
            engine === "Stockfish" ||
            engine === "Arasan" ||
            engine === "Komodo"
          )
        }
        onValueChange={(value) => {
          setSliderValue(value[0]);
          setDifficulty(value[0]);
        }}
        className="self-center my-4"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={`dark:hover:bg-neutral-700 ${
              open ? "dark:bg-neutral-700" : ""
            } p-1.5`}
          >
            <HelpCircle className="w-4 h-4 stroke-neutral-200 hover:cursor-pointer" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[200] text-sm">
          <p className="flex whitespace-pre-wrap">
            {t("play.settings.engineDifficulty")}
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
}

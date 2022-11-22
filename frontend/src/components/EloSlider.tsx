import { AppDispatch } from "app/store";
import {
  selectCurrentEngineDifficultyValues,
  setElo,
} from "features/chess/chessSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EloSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const engineDifficultyValues = useSelector(
    selectCurrentEngineDifficultyValues
  );
  const [sliderValue, setSliderValue] = useState<number>(engineDifficultyValues["min"] as unknown as number);
  return (
    <>
      <input
        type="range"
        className="w-full mt-5 hover:cursor-pointer"
        min={engineDifficultyValues["min"]}
        max={engineDifficultyValues["max"]}
        defaultValue="1350"
        step="1"
        onChange={(event) => {
          setSliderValue(
            (event.target as HTMLInputElement).value as unknown as number
          );
        }}
        onMouseUp={(event) => {
          dispatch(setElo((event.target as HTMLInputElement).value));
        }}
      />
      <span className="font-roboto font-normal text-white text-center mt-2 select-none">
        {sliderValue} Elo
      </span>
    </>
  );
};

export default EloSlider;

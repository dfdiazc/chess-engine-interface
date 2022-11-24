import { AppDispatch } from "app/store";
import {
  selectCurrentEngine,
  selectCurrentEngineDifficultyValues,
  setSkillLevel,
} from "features/chess/chessSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SkillLevelSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const engineDifficultyValues = useSelector(
    selectCurrentEngineDifficultyValues
  );
  const [sliderValue, setSliderValue] = useState<string>(
    engineDifficultyValues["min"]
  );
  return (
    <>
      <input
        type="range"
        className="w-full mt-5 hover:cursor-pointer"
        min={engineDifficultyValues["min"]}
        max={engineDifficultyValues["max"]}
        defaultValue="1"
        step="1"
        onChange={(event) => {
          setSliderValue((event.target as HTMLInputElement).value);
        }}
        onMouseUp={(event) => {
          dispatch(setSkillLevel((event.target as HTMLInputElement).value));
        }}
      />
      <span className="font-roboto font-normal text-white text-center mt-2 select-none">
        {sliderValue} Skill Level
      </span>
    </>
  );
};

export default SkillLevelSlider;

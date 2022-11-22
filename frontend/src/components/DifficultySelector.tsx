import { AppDispatch } from "app/store";
import {
  selectCurrentDifficultyMeasure,
  selectCurrentEngine,
  setDifficultyMeasure,
  setEngineDifficultyValues
} from "features/chess/chessSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EloSlider from "./EloSlider";
import SkillLevelSlider from "./SkillLevelSlider";

const DifficultySelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const engine = useSelector(selectCurrentEngine);
  const difficultyMeasure = useSelector(selectCurrentDifficultyMeasure);
  useEffect(() => {
    if (engine === "Stockfish") {
      dispatch(setEngineDifficultyValues({ min: "1350", max: "2850" }));
      dispatch(setDifficultyMeasure("elo"));
    } else if (engine === "Leela") {
      dispatch(setEngineDifficultyValues({ min: "", max: "" }));
      dispatch(setDifficultyMeasure(""));
    } else if (engine === "Komodo") {
      dispatch(setEngineDifficultyValues({ min: "1", max: "20" }));
      dispatch(setDifficultyMeasure("skillLevel"));
    }
  }, [engine]);
  return (
    <>
      {difficultyMeasure === "elo" ? <EloSlider /> : null}
      {difficultyMeasure === "skillLevel" ? <SkillLevelSlider /> : null}
    </>
  );
};

export default DifficultySelector;

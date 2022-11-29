import {
  selectCurrentPieceStyle,
  selectCurrentPlayerColor,
  setAreSettingOpen,
  setPieceStyle,
} from "features/chess/chessSlice";
import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

const ChessUserSettings = () => {
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const dispatch = useDispatch();
  type SelectOptionType = { label: string; value: string };

  const [selectedPieceStyle, setselectedPieceStyle] =
    useState<SelectOptionType>({ label: pieceStyle[0].toUpperCase() + pieceStyle.substring(1) as unknown as string,
        value: pieceStyle as unknown as string });

  const handleSelectionChange = (option: SelectOptionType | null) => {
    if (option) {
      setselectedPieceStyle(option);
    }
  };
  function saveChanges() {
    dispatch(setPieceStyle(selectedPieceStyle.value));
    dispatch(setAreSettingOpen(false));
  }
  const pieceOptions = [
    { value: "pirouetti", label: "Pirouetti" },
    { value: "cburnett", label: "Cburnett" },
    { value: "pixel", label: "Pixel" },
    { value: "staunty", label: "Staunty" },
  ];
  return (
    <div className="flex flex-col px-5 py-10 max-w-sm w-full bg-[#2d2f32] absolute top-10 z-10 rounded-xl drop-shadow-xl">
      <span className="font-roboto font-medium text-white text-2xl self-center text-center select-none">
        Settings
      </span>
      <div className="flex justify-center mt-10">
        <span className="mt-3 font-roboto font-normal text-white text-base self-center text-center select-none">
          Piece Style:
        </span>
        <Select
          defaultValue={{
            label: pieceStyle[0].toUpperCase() + pieceStyle.substring(1) as unknown as string,
            value: pieceStyle as unknown as string,
          }}
          className="mt-3 ml-5 self-center"
          options={pieceOptions}
          onChange={handleSelectionChange}
        />
        <div
          className="ml-auto bg-center bg-cover bg-no-repeat self-center w-12 h-12 md:w-16 md:h-16"
          style={{
            backgroundImage: `url(https://unrealchess.live/static/chess/pieces/${selectedPieceStyle.value}/${playerColor}P.svg)`,
            backgroundSize: "100%",
          }}
        />
      </div>
      <div className="flex gap-2 mt-10">
        <button
          onClick={() => {
            dispatch(setAreSettingOpen(false));
          }}
          className={
            "w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 rounded-xl border-2 border-flamingo-100 transition duration-300 hover:bg-flamingo-100 text-center"
          }
        >
          Cancel
        </button>
        <button
          onClick={() => {
            saveChanges();
          }}
          className={
            "w-1/2 flex whitespace-nowrap self-center justify-center text-xl text-white font-roboto font-medium select-none px-10 py-3 bg-flamingo-100 rounded-xl border-2 border-flamingo-100 transition duration-300 hover:bg-flamingo-200/80 hover:border-flamingo-300 hover:shadow"
          }
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ChessUserSettings;

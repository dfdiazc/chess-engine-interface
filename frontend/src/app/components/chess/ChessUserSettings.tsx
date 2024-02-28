"use client";
import {
  selectCurrentIsMoveSoundActive,
  selectCurrentIsTurnIndicatorShown,
  selectCurrentPieceStyle,
  selectCurrentPlayerColor,
  selectCurrentAreSettingsOpen,
  setAreSettingOpen,
  setIsMoveSoundActive,
  setIsTurnIndicatorShown,
  setPieceStyle,
} from "@/lib/features/chess/chessSlice";
import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

const ChessUserSettings = () => {
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const areSettingsOpen = useSelector(selectCurrentAreSettingsOpen);
  const isMoveSoundActive = useSelector(selectCurrentIsMoveSoundActive);
  const [selectedIsMoveSoundActive, setSelectedIsMoveSoundActive] =
    useState(isMoveSoundActive);
  const isTurnIndicatorShown = useSelector(selectCurrentIsTurnIndicatorShown);
  const [selectedIsTurnIndicatorShown, setSelectedIsTurnIndicatorShown] =
    useState(isTurnIndicatorShown);
  const dispatch = useDispatch();
  type SelectOptionType = { label: string; value: string };

  const [selectedPieceStyle, setselectedPieceStyle] =
  
    useState<SelectOptionType>({
      label: (pieceStyle[0].toUpperCase() +
        pieceStyle.substring(1)) as unknown as string,
      value: pieceStyle as unknown as string,
    });

  const handleSelectionChange = (option: SelectOptionType | null) => {
    if (option) {
      setselectedPieceStyle(option);
    }
  };
  function saveChanges() {
    dispatch(setPieceStyle(selectedPieceStyle.value));
    dispatch(setAreSettingOpen(false));
    dispatch(setIsMoveSoundActive(selectedIsMoveSoundActive));
    dispatch(setIsTurnIndicatorShown(selectedIsTurnIndicatorShown));
  }
  const pieceOptions = [
    { value: "pirouetti", label: "Pirouetti" },
    { value: "cburnett", label: "Cburnett" },
    { value: "pixel", label: "Pixel" },
    { value: "staunty", label: "Staunty" },
  ];
  if (!areSettingsOpen) return null;
  return (
    <div className="flex flex-col px-5 py-10 max-w-sm w-full bg-[#2d2f32] absolute top-10 z-10 rounded-xl drop-shadow-xl">
      <span className="font-roboto font-medium text-white text-2xl self-center text-center select-none">
        Game Settings
      </span>
      <div className="flex justify-center mt-10">
        <span className="mt-3 font-roboto font-normal text-white text-base self-center text-center select-none">
          Piece Style:
        </span>
        <Select
          defaultValue={{
            label: (pieceStyle[0].toUpperCase() +
              pieceStyle.substring(1)) as unknown as string,
            value: pieceStyle as unknown as string,
          }}
          className="mt-3 ml-5 self-center"
          options={pieceOptions}
          onChange={handleSelectionChange}
        />
        <div
          className="ml-auto bg-center bg-cover bg-no-repeat self-center w-12 h-12 md:w-16 md:h-16"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/static/chess/pieces/${selectedPieceStyle.value}/${playerColor}P.svg)`,
            backgroundSize: "100%",
          }}
        />
      </div>
      <div className="flex justify-between items-center mt-10">
        <span className="font-roboto font-normal text-white text-base self-center text-center select-none">
          Sound on Piece Move:
        </span>
        <div className="flex self-center mr-2">
          <button
            onClick={() => {
              setSelectedIsMoveSoundActive(!selectedIsMoveSoundActive);
            }}
            className={
              selectedIsMoveSoundActive
                ? "self-center transition ease-in-out duration-300 w-12 bg-flamingo-100 rounded-full focus:outline-none"
                : "self-center transition ease-in-out duration-300 w-12 bg-gray-200 rounded-full focus:outline-none"
            }
          >
            <div
              className={
                selectedIsMoveSoundActive
                  ? "transition ease-in-out duration-300 rounded-full h-6 w-6 bg-white shadow transform translate-x-full"
                  : "transition ease-in-out duration-300 rounded-full h-6 w-6 bg-white shadow"
              }
            ></div>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <span className="font-roboto font-normal text-white text-base self-center text-center select-none">
          Turn Indicator:
        </span>
        <div className="flex self-center mr-2">
          <button
            onClick={() => {
              setSelectedIsTurnIndicatorShown(!selectedIsTurnIndicatorShown);
            }}
            className={
              selectedIsTurnIndicatorShown
                ? "self-center transition ease-in-out duration-300 w-12 bg-flamingo-100 rounded-full focus:outline-none"
                : "self-center transition ease-in-out duration-300 w-12 bg-gray-200 rounded-full focus:outline-none"
            }
          >
            <div
              className={
                selectedIsTurnIndicatorShown
                  ? "transition ease-in-out duration-300 rounded-full h-6 w-6 bg-white shadow transform translate-x-full"
                  : "transition ease-in-out duration-300 rounded-full h-6 w-6 bg-white shadow"
              }
            ></div>
          </button>
        </div>
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

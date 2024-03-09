"use client";
import React from "react";
import { IconContext } from "react-icons";
import {
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";

interface LostPiecesProps {
  r: number;
  n: number;
  b: number;
  q: number;
  k: number;
  p: number;
  P: number;
  R: number;
  N: number;
  B: number;
  Q: number;
  K: number;
  color: string;
}
const LostPieces = (props: LostPiecesProps) => {
  if (props.color === "w") {
    return (
      <div className="flex h-6">
        <IconContext.Provider
          value={{ className: "h-5 w-5 text-black stroke-[15] stroke-neutral-50/40" }}
        >
          <div className="flex gap-2">
            {props.p > 0 && (
              <div className="flex gap-1">
                <FaChessPawn />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.p}
                </span>
              </div>
            )}
            {props.n > 0 && (
              <div className="flex gap-1">
                <FaChessKnight />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.n}
                </span>
              </div>
            )}
            {props.b > 0 && (
              <div className="flex gap-1">
                <FaChessBishop />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.b}
                </span>
              </div>
            )}
            {props.q > 0 && (
              <div className="flex gap-1">
                <FaChessQueen />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.q}
                </span>
              </div>
            )}
            {props.r > 0 && (
              <div className="flex gap-1">
                <FaChessRook />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.r}
                </span>
              </div>
            )}
          </div>
        </IconContext.Provider>
      </div>
    );
  } else {
    return (
      <div className="flex h-6">
        <IconContext.Provider value={{ className: "h-5 w-5 text-white" }}>
          <div className="flex gap-2">
            {props.P > 0 && (
              <div className="flex gap-1">
                <FaChessPawn />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.P}
                </span>
              </div>
            )}
            {props.N > 0 && (
              <div className="flex gap-1">
                <FaChessKnight />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.N}
                </span>
              </div>
            )}
            {props.B > 0 && (
              <div className="flex gap-1">
                <FaChessBishop />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.B}
                </span>
              </div>
            )}
            {props.Q > 0 && (
              <div className="flex gap-1">
                <FaChessQueen />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.Q}
                </span>
              </div>
            )}
            {props.R > 0 && (
              <div className="flex gap-1">
                <FaChessRook />
                <span className="font-roboto font-normal text-white/50 select-none">
                  {props.R}
                </span>
              </div>
            )}
          </div>
        </IconContext.Provider>
      </div>
    );
  }
};

export default LostPieces;

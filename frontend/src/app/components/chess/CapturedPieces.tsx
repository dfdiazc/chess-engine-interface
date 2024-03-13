"use client";
import { selectCurrentPieceStyle } from "@/lib/features/chess/chessSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function LostPieces({
  capturedPieces,
  color,
}: {
  capturedPieces: { p: number; r: number; n: number; b: number; q: number };
  color: string;
}) {
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  return (
    <div className="flex h-6">
      {Object.entries(capturedPieces).map(([piece, count]) => {
        return (
          count > 0 && (
            <div className="flex items-center" key={piece + count}>
              {Array(count)
                .fill(null)
                .map((_, i) => (
                  <div style={{ marginLeft: i > 0 ? "-15px" : "0px" }}>
                    <Image
                      key={color + piece.toLocaleUpperCase() + i}
                      src={`${
                        process.env.NEXT_PUBLIC_API_URL
                      }/static/chess/pieces/${pieceStyle}/${color}${piece.toLocaleUpperCase()}.svg`}
                      width={24}
                      height={24}
                      alt="chessPiece"
                    />
                  </div>
                ))}
            </div>
          )
        );
      })}
    </div>
  );
}

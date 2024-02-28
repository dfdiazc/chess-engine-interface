import React, { useEffect, useState } from "react";
import { Header } from "@/app/components/ui";
import {
  CustomChessboard,
  ChessSettings,
  ChessSuggestionsPanel,
  ChessUserSettings,
} from "@/app/components/chess";

export default function Page() {
  return (
    <div className="flex flex-col bg-neutral-900 min-h-screen h-full w-full">
      <div className="flex justify-center">
        <div className="w-full max-w-[1920px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Header />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row justify-center items-center shrink-0 relative">
            <div className="relative flex flex-row pl-6 pr-3">
              <CustomChessboard />
            </div>
            <div className="flex flex-col gap-1 w-full sm:max-w-sm">
              <ChessSettings />
              <ChessSuggestionsPanel />
            </div>
            <ChessUserSettings />
          </div>
        </div>
      </div>
    </div>
  );
}

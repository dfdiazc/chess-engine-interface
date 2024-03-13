import React from "react";
import { Header } from "@/app/components/ui";
import {
  CustomChessboard,
  GamePanel,
} from "@/app/components/chess";

export default function Page() {
  return (
    <div className="flex flex-col bg-neutral-900 w-full">
      <div className="flex justify-center">
        <div className="w-full max-w-[1920px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Header />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center relative md:h-screen px-4 pt-4 md:pt-12 pb-4">
            <div className="hidden md:flex w-full p-1 shrink" />
            <div className="relative flex justify-center p-2">
              <CustomChessboard />
            </div>
            <div className="w-full lg:min-w-[20rem]">
              <GamePanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

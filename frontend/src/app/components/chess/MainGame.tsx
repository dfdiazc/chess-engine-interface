"use client";
import React, { useEffect, useState } from "react";
import { CustomChessboard, GameHistory, GamePanel } from "@/app/components/chess";

export default function MainGame() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center relative md:h-screen px-4 pt-4 md:pt-12 pb-4">
      <div className="hidden md:block w-full" />
      <div className="relative flex justify-center p-2">
        <CustomChessboard />
      </div>
      <div className="w-full lg:min-w-[20rem] max-w-md">
        <GamePanel />
      </div>
    </div>
  );
}

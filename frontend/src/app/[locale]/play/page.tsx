import React from "react";
import { Header } from "@/app/components/ui";
import { MainGame } from "@/app/components/chess";

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
          <MainGame />
        </div>
      </div>
    </div>
  );
}

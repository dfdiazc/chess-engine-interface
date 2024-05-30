import React from "react";
import { Header } from "@/app/components/ui";
import { CustomChessboard, GamePanel, MainGame, OnlineCreatePanel } from "@/app/components/chess";
import { Button } from "@/components/ui/button";
import { LuLink } from "react-icons/lu";
import { RiRobot2Line } from "react-icons/ri";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("play");
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
            <div className="hidden md:block w-full" />
            <div className="relative flex justify-center p-2">
              <CustomChessboard />
            </div>
            <div className="w-full lg:min-w-[20rem] max-w-md">
              <div className="flex flex-col gap-6">
                <Button
                  asChild
                  variant={"default"}
                  className="w-full px-12 gap-6 justify-start"
                >
                  <Link href="/play/engine">
                    <RiRobot2Line className="w-12 h-12 fill-neutral-200 shrink-0" />
                    <p className="text-2xl font-semibold text-wrap text-left">{t("game.playEngines")}</p>
                  </Link>
                </Button>
                <OnlineCreatePanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { LandingHeader } from "@/app/components/ui";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-full overflow-x-hidden bg-neutral-900">
      <div className="flex justify-center">
        <div className="w-full max-w-[1920px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <LandingHeader />
            </div>
            <div className="flex h-[calc(100vh-4rem)] shrink-0 relative max-w-screen-2xl">
              <div
                className="absolute inset-y-0 m-auto sm:-right-[32rem] 
                md:-right-[28rem] lg:-right-60 h-5/6 aspect-square"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={"/images/chessboard.png"}
                    width={1000}
                    height={100}
                    className="hidden sm:block"
                    alt="Description pending"
                  />
                </div>
              </div>
              <div className="flex h-full justify-left">
                <div className="relative flex px-3 sm:w-2/3 md:w-3/4 lg:left-[15%] xl:left-[35%]">
                  <Image
                    src={"/images/white_rook.png"}
                    width={100}
                    height={100}
                    className="absolute select-none h-24 top-[5%] left-[0%] xl:-left-[25%] -rotate-12"
                    alt="Description pending"
                  />
                  <Image
                    src={"/images/white_rook.png"}
                    width={100}
                    height={100}
                    className="absolute select-none h-24 bottom-[5%] left-[70%] xl:left-[100%] rotate-[25deg]"
                    alt="Description pending"
                  />
                  <Image
                    src={"/images/white_pawn.png"}
                    width={100}
                    height={100}
                    className="absolute select-none h-24 top-[10%] left-[70%] xl:left-[90%] rotate-12"
                    alt="Description pending"
                  />
                  <Image
                    src={"/images/white_pawn.png"}
                    width={100}
                    height={100}
                    className="absolute  select-none h-24 bottom-[10%] left-[5%] xl:left-[0%] -rotate-[20deg]"
                    alt="Description pending"
                  />
                  <div className="flex flex-col gap-10 self-center text-center select-none">
                    <h2 className="text-6xl text-white text-left font-lato font-medium">
                      Play chess online for free!
                    </h2>
                    <div className="flex mx-3 sm:mx-16">
                      <Link
                        href="/play"
                        className="grow whitespace-nowrap self-center text-xl text-white font-lato font-medium 
                        select-none p-3 bg-flamingo-100 rounded-full border-b-4 border-flamingo-200 transition duration-300 
                        hover:bg-flamingo-200/80 hover:border-flamingo-300 hover:shadow text-center"
                      >
                        Play now!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<img
              src="https://img-08.stickers.cloud/packs/7b6076b2-8227-4343-bff7-a218e327bf7e/webp/0fc594da-af1d-4aac-8cbe-50de8a725510.webp"
              className="h-2 w-2 absolute bottom-0 left-0 hover:w-96 hover:h-96"
              alt="Description pending"
  ></img>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

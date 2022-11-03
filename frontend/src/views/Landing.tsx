import { LandingHeader } from "components";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ChessboardImage from "assets/images/chessboard.png";
import WhiteRook from "assets/images/white_rook.png";
import WhitePawn from "assets/images/white_pawn.png";

const Landing = () => {
  return (
    <div className="h-full overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-[1920px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Helmet>
                <style>{"body {background-color: #1C2021}"}</style>
              </Helmet>
              <LandingHeader />
            </div>
            <div className="flex h-[calc(100vh-4rem)] shrink-0 relative max-w-screen-2xl">
              <img
                src={ChessboardImage}
                className="hidden select-none sm:flex absolute inset-y-0 -z-10 m-auto sm:-right-[32rem] 
                md:-right-[28rem] lg:-right-60 h-5/6 aspect-square"
                alt="Description pending"
              ></img>
              <div className="flex h-full justify-left">
                <div className="relative flex px-3 sm:w-2/3 md:w-3/4 lg:left-[15%] xl:left-[35%]">
                  <img
                    src={WhiteRook}
                    className="absolute select-none h-24 top-[5%] left-[0%] xl:-left-[25%] -rotate-12"
                    alt="Description pending"
                  ></img>
                  <img
                    src={WhiteRook}
                    className="absolute select-none h-24 bottom-[5%] left-[70%] xl:left-[100%] rotate-[25deg]"
                    alt="Description pending"
                  ></img>
                  <img
                    src={WhitePawn}
                    className="absolute select-none h-24 top-[10%] left-[70%] xl:left-[90%] rotate-12"
                    alt="Description pending"
                  ></img>
                  <img
                    src={WhitePawn}
                    className="absolute  select-none h-24 bottom-[10%] left-[5%] xl:left-[0%] -rotate-[20deg]"
                    alt="Description pending"
                  ></img>
                  <div className="flex flex-col gap-10 self-center text-center select-none">
                    <h2 className="text-6xl text-white text-left font-roboto font-medium">
                      Play chess online for free!
                    </h2>
                    <div className="flex mx-3 sm:mx-16">
                      <Link
                        to="/play"
                        className="grow whitespace-nowrap self-center text-xl text-white font-roboto font-medium 
                        select-none p-3 bg-[#DC5A41] rounded-full border-b-4 border-[#8F3C2B] transition duration-300 
                        hover:bg-[#DC5A41]/80 hover:[#8F3C2B]/80 hover:shadow text-center"
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

export default Landing;

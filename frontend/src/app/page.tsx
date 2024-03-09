import { LandingHeader, LandingFooter } from "@/app/components/ui";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const LandingChessboard = dynamic(
  () => import("@/app/components/ui/LandingChessboard"),
  { ssr: false }
);
import { Slider } from "@/components/ui/slider";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

async function get_game() {
  const response = await fetch(
    `http://localhost:8000/api/playfullgame/stockfish`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export default async function Page() {
  const game = await get_game();
  return (
    <div className="h-full overflow-x-hidden bg-neutral-900">
      <div className="flex justify-center relative">
        <div className="w-full max-w-[1920px]">
          <div className="relative flex flex-col">
            <LandingHeader />
            <LandingChessboard game={game} />
            <div className="flex justify-center h-[calc(100vh-4rem)] relative w-full">
              <div className="flex">
                <div className="flex flex-col items-center gap-10 self-center text-center">
                  <div className="flex flex-col gap-4 md:gap-8 z-[150]">
                    <h2 className="text-3xl md:text-5xl text-white text-center font-lato font-semibold">
                      Play Chess against the{" "}
                      <span className="text-white font-extrabold underline">
                        World's Top Engines
                      </span>
                    </h2>
                    <div className="flex justify-center mx-3 sm:mx-16">
                      <Link
                        href="/play"
                        className="grow whitespace-nowrap self-center text-xl text-white font-lato font-medium 
                        select-none p-3 bg-aquamarine-200 rounded-full border-b-4 border-aquamarine-400 transition duration-300 
                        hover:bg-aquamarine-400 hover:border-aquamarine-500 hover:shadow text-center md:max-w-sm"
                      >
                        Play now!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <IoIosArrowDown className="w-8 h-8 fill-neutral-200 absolute bottom-6 animate-bounce" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-screen-md">
              <div className="flex justify-center bg-neutral-900 w-full p-4 py-6 md:p-8">
                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <div className="grid grid-flow-col grid-cols-3 justify-center items-center gap-2 h-16 md:h-20">
                    <div className="flex justify-center items-center">
                      <div className="w-16 md:w-20 h-16 md:h-20 bg-[url('/images/stockfish.png')] bg-cover self-center rounded-lg hover:scale-110 transition duration-400" />
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="flex bg-neutral-200 rounded-lg w-14 md:w-16 h-[3.25rem] md:h-16 self-center hover:scale-110 transition duration-400">
                        <div className="self-center bg-[url('/images/leela.svg')] md:-ml-0.5 w-12 md:w-14 h-12 md:h-14 bg-cover" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="w-16 md:w-20 h-16 md:h-20 bg-[url('/images/komodo.png')] bg-cover self-center rounded-lg hover:scale-110 transition duration-400" />
                    </div>
                  </div>
                  <div className="flex flex-col text-center gap-2">
                    <h2 className="text-lg md:text-xl text-neutral-200 font-medium">
                      The best engines
                    </h2>
                    <p className="text-sm md:text-base text-neutral-400 font-normal">
                      Play against some of the best ranked chess engines
                      available for free
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center bg-neutral-900 w-full p-4 py-6 md:p-8">
                <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
                  <Slider
                    defaultValue={[75]}
                    max={100}
                    step={1}
                    className="w-/4 self-center h-16 md:h-20"
                  />
                  <h2 className="text-lg md:text-xl text-neutral-200 font-medium">
                    Fine tune your skills
                  </h2>
                  <p className="text-sm md:text-base text-neutral-400 font-normal">
                    Select the ELO or Skill Level of the engine you want to play
                    against
                  </p>
                </div>
              </div>
              <div className="flex justify-center bg-neutral-900 w-full p-4 py-6 md:p-8">
                <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
                  <div className="flex justify-center items-center gap-4 h-16 md:h-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 md:w-14 h-10 md:h-14"
                      clipRule="evenodd"
                      fillRule="evenodd"
                      imageRendering="optimizeQuality"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      version="1.1"
                      viewBox="0 0 50 50"
                    >
                      <g
                        clipRule="evenodd"
                        fillRule="evenodd"
                        shapeRendering="geometricPrecision"
                      >
                        <path
                          d="m25.192 23.015c-0.16544 6.9672-11.758 5.2189-11.516 18.104l22.86 0.1184c-2.094-6.442 9.69-25.16-11.931-32.258v-1e-4s-2.4381-2.601-5.9655-2.8237l0.2227 3.5347-4.5583 4.5816c-2.6294 3.1455-8.7347 8.3784-7.7513 9.6111 3.1158 5.3041 6.3306 4.4316 6.3306 4.4316 4.2418-4.5433 5.8193-2.0894 12.309-5.2997z"
                          fill="#f0f0f0"
                          imageRendering="optimizeQuality"
                          stroke="#3c3c3c"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                        />
                        <path
                          d="m19.32 14.694c-0.7757 0.86088-0.6902 1.1156-0.8137 2.1503 0.8055 0.12316 1.5069 0.23982 2.2486 0.0656 2.3809-1.262 0.075-3.4026-1.4347-2.2162z"
                          imageRendering="optimizeQuality"
                          opacity=".35"
                          style={{ paintOrder: "fill markers stroke" }}
                        />
                        <path
                          d="m9.1916 22.166c-0.8496 0.4078-0.9984 0.9608-1.0565 1.4754 0.7288 0.4181 1.8765-0.1255 2.0412-1.4316l-0.9846-0.044z"
                          imageRendering="optimizeQuality"
                          opacity=".3"
                        />
                        <path
                          d="m8.1905 25.15s0.6525 1.1374-1.1019-1.641c0.6594-1.9774 8.263-9.0796 12.438-13.534l-0.1836-3.0857s1.0689 1.6901 1.2475 3.468c-4.3898 4.39-12.22 10.833-12.824 13.213 0.023 0.6738 0.24 1.0278 0.4231 1.5797z"
                          fill="#fff"
                          imageRendering="optimizeQuality"
                        />
                        <path
                          d="m13.26 28.257c2.0291-3.3367 8.3914-3.2239 11.932-5.2424 0.3228 0.1024 0.1304 1.3697 0.2398 1.23 0.8476-1.0903 2.9259-3.279 0.8684-6.8743 0.5214 5.9575-13.718 5.5912-15.89 10.305-0.2005 0.4355 2.1818 0.7932 2.85 0.5818z"
                          imageRendering="optimizeQuality"
                          opacity=".15"
                        />
                        <path
                          d="m25.8 23.781c-1.0131 5.8132-9.5449 6.1169-10.988 12.641 2.8332-6.4058 10.762-5.7136 10.988-12.641z"
                          fill="#fff"
                          imageRendering="optimizeQuality"
                        />
                        <path
                          d="m18.64 6.1556s3.051 0.73807 4.9045 3.9825c20.499 7.1536 7.6413 27.937 5.7883 31.073l7.2034 0.026c-1.9871-3.2431 9.5482-25.597-11.931-32.258-1.7757-1.0691-2.7677-2.6092-5.9655-2.8238z"
                          imageRendering="optimizeQuality"
                          opacity=".15"
                        />
                        <path
                          d="m25 36.457s-9.1309 0.048-11.691 1.6192c-1.7273 1.0602-2.1348 3.6514-1.8998 6.3237h27.182c0.235-2.6723-0.1725-5.2636-1.8999-6.3237-2.5597-1.5711-11.691-1.6192-11.691-1.6192z"
                          fill="#f0f0f0"
                          imageRendering="optimizeQuality"
                          stroke="#3c3c3c"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                        />
                        <path
                          d="m25 37.147s-8.7121-0.1373-11.624 1.6658c-0.3698 0.2291-0.6992 0.8394-0.9536 1.3902 0.2608-0.3313 0.5022-0.613 0.8867-0.849 2.5598-1.5711 11.691-1.6191 11.691-1.6191s9.1318 0.048 11.692 1.6191c0.391 0.24 0.5924 0.5316 0.8556 0.8701 0.026-0.076-0.4084-1.1578-1.1438-1.5962-2.7554-1.492-11.403-1.4808-11.403-1.4808z"
                          fill="#fff"
                          imageRendering="optimizeQuality"
                        />
                      </g>
                    </svg>
                    <div className="flex items-center gap-2 text-base md:text-lg text-neutral-200">
                      <p>g1</p>
                      <FaArrowRightLong className="fill-white w-4 md:w-6 h-4 md:h-6" />
                      <p>f3</p>
                    </div>
                  </div>
                  <h2 className="text-lg md:text-xl text-neutral-200 font-medium">
                    Get move recommendations
                  </h2>
                  <p className="text-sm md:text-base text-neutral-400 font-normal">
                    Train with recommendations from Stockfish to improve your
                    game
                  </p>
                </div>
              </div>
              <div className="flex justify-center bg-neutral-900 w-full p-4 py-6 md:p-8">
                <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
                  <div className="flex justify-center items-center h-16 md:h-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      className="w-12 md:w-14 h-12 md:h-14 mt-5"
                    >
                      <path
                        d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
                        fill="#fff"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 md:w-14 h-12 md:h-14"
                      clipRule="evenodd"
                      fillRule="evenodd"
                      height="144"
                      imageRendering="optimizeQuality"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      viewBox="0 0 3810 3810"
                      width="144"
                    >
                      <g fill="#383838">
                        <path d="M953 3239h1907v204H953z" />
                        <path d="M1099 3386h1621v153H1099z" />
                        <path d="M950 3506h1907v204H950z" />
                      </g>
                      <path d="M1099 3443h1621v63H1099z" fill="#111" />
                      <g fill="#383838">
                        <path d="M1659 2059l296-4 1 1282-618-9z" />
                        <path d="M2140 2059l-264-4v1282l617-9z" />
                        <path d="M1355 1907h1115v158H1355z" />
                        <ellipse cx="1890" cy="1549" rx="414" ry="433" />
                      </g>
                      <g fill="#111">
                        <path d="M1980 1126s195 147 218 349c36 315-162 418-446 351-143-34-244-110-231-82 0 0 21 51 59 90 37 39 82 75 82 75h457s74-41 114-117c40-77 72-137 72-244s-41-199-68-237-56-71-105-114c-48-44-152-71-152-71z" />
                        <path d="M2074 1907l69 158h326v-158zm-516 158h585l346 1242h-255l-168-1095z" />
                        <path d="M2466 3239l70 471h321v-204h-137v-63h140v-204z" />
                      </g>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 md:w-14 h-12 md:h-14 mt-3.5"
                      viewBox="0 -0.5 16 16"
                      shapeRendering="crispEdges"
                      imageRendering="optimizeQuality"
                    >
                      <path
                        stroke="#000000"
                        d="M6 2h4M5 3h1M10 3h1M5 4h1M10 4h1M5 5h1M10 5h1M6 6h1M9 6h1M5 7h1M10 7h1M5 8h1M10 8h1M6 9h1M9 9h1M5 10h1M10 10h1M4 11h1M11 11h1M4 12h1M11 12h1M4 13h8"
                      />
                      <path stroke="#fdfdfd" d="M6 3h1" />
                      <path
                        stroke="#e1e1e1"
                        d="M7 3h2M6 4h1M6 7h2M6 10h1M5 11h2M5 12h1"
                      />
                      <path
                        stroke="#a7a7a7"
                        d="M9 3h1M9 4h1M9 5h1M8 6h1M9 7h1M7 8h3M8 9h1M9 10h1M10 11h1M6 12h5"
                      />
                      <path
                        stroke="#c1c1c1"
                        d="M7 4h2M6 5h3M7 6h1M8 7h1M6 8h1M7 9h1M7 10h2M7 11h3"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 md:w-14 h-12 md:h-14 mt-2.5"
                      style={{
                        clipRule: "evenodd",
                        fillRule: "evenodd",
                        shapeRendering: "geometricPrecision",
                        textRendering: "geometricPrecision",
                      }}
                      version="1.1"
                      viewBox="0 0 50 50"
                    >
                      <path
                        d="m21.503 27.594h6.9944m-9.4974-10.086c0 1.7315 0.7123 3.3873 1.9657 4.587l-3.6504 2.0999 0.43091 3.3988h4.3059c-0.79438 3.559-2.7548 7.3308-5.0622 8.6173s-5.2994 3.0968-4.8425 8.189l25.706 2.1e-5c0.45687-5.0922-2.5352-6.9025-4.8425-8.189-2.3074-1.2865-4.2678-5.0583-5.0622-8.6173h4.3059l0.43091-3.3988-3.6503-2.0999c1.2533-1.1996 1.9655-2.8554 1.9655-4.5869 3.11e-4 -3.3667-2.628-5.9118-6.0006-5.9118-3.3726-1.1e-5 -6.0008 2.545-6.0006 5.9117z"
                        style={{
                          clipRule: "evenodd",
                          fillRule: "evenodd",
                          fill: "#5f5955",
                          shapeRendering: "geometricPrecision",
                          strokeLinejoin: "round",
                          strokeWidth: 1.2,
                          stroke: "#1e1e1e",
                        }}
                      />
                      <path
                        d="m24.962 11.537c1.1709-0.4586 9.5273 5.9057 0.64714 10.773l4.512 2.1-0.56221 3.125h2.6586l0.42868-3.3987-3.6504-2.0999c1.2534-1.1996 1.9618-2.5812 1.9646-4.3128-0.46888-5.4159-5.9985-6.1861-5.9985-6.1861zm-2.9485 15.998c4.5025 7.9337 9.4701 9.994 13.074 9.9646l-2.1157-1.347c-2.075-1.4895-4.7317-4.8572-5.0622-8.6177z"
                        style={{
                          clipRule: "evenodd",
                          fillRule: "evenodd",
                          opacity: 0.18,
                          shapeRendering: "geometricPrecision",
                          strokeWidth: 0.26457,
                        }}
                      />
                      <path
                        d="m21.983 22.213-1.647 2.3466-2.3561-0.01371 4.013-2.3234z"
                        style={{
                          clipRule: "evenodd",
                          fillRule: "evenodd",
                          fill: "#ffffff",
                          shapeRendering: "geometricPrecision",
                          opacity: 0.25,
                        }}
                      />
                      <path
                        d="m24.307 12.267c-2.5425 0.1381-5.73 3.1733-4.3848 6.9183l0.19878 0.64312c-0.3298-3.4894 2.1268-7.1169 4.186-7.5614z"
                        style={{
                          clipRule: "evenodd",
                          fillRule: "evenodd",
                          fill: "#ffffff",
                          shapeRendering: "geometricPrecision",
                          opacity: 0.25,
                        }}
                      />
                      <path
                        d="m17.863 37.625c-3.9839 2.3053-5.117 6.1402-5.117 6.1402-0.01037 0-0.54754-4.1751 3.9564-6.654 4.5039-2.4789 4.8215-6.1507 5.8602-8.8927-0.63708 3.7031-0.71573 7.1012-4.6996 9.4065z"
                        style={{
                          clipRule: "evenodd",
                          fillRule: "evenodd",
                          fill: "#ffffff",
                          shapeRendering: "geometricPrecision",
                          opacity: 0.25,
                        }}
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg md:text-xl text-neutral-200 font-medium">
                    Customize your game
                  </h2>
                  <p className="text-sm md:text-base text-neutral-400 font-normal">
                    Whether you like an old-school or modern look, we've got you
                    covered
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-8 p-12">
              <h2 className="text-2xl md:text-3xl text-neutral-200 text-center font-semibold font-lato">
                What are you waiting for?
              </h2>
              <div className="flex justify-center mx-3 sm:mx-16">
                <Link
                  href="/play"
                  className="grow whitespace-nowrap self-center text-xl text-white font-lato font-medium 
                        select-none p-3 bg-aquamarine-200 rounded-full border-b-4 border-aquamarine-300 transition duration-300 
                        hover:bg-aquamarine-400 hover:border-aquamarine-500 hover:shadow text-center md:max-w-sm"
                >
                  Play now!
                </Link>
              </div>
            </div>
          </div>
          <LandingFooter />
        </div>
      </div>
    </div>
  );
}

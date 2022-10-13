import { LandingHeader } from "components";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-full">
      <div className="flex justify-center">
        <div className="w-full max-w-screen-2xl">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Helmet>
                <style>{"body {background-color: #121B1E}"}</style>
              </Helmet>
              <LandingHeader />
            </div>
            <div className="flex h-[calc(100vh-4rem)] relative overflow-x-hidden max-w-screen-2xl">
              <img
                src="https://i.pinimg.com/originals/b5/2a/42/b52a42ba2b209665e62baf1c93feb66f.png"
                className="absolute inset-y-0 m-auto -right-52 h-5/6"
                alt="Description pending"
              ></img>
              <div className="flex h-full">
                <div className="relative grid grid-flow-col grid-cols-12 w-full">
                <img
                  src="https://i.pinimg.com/originals/cc/f5/a5/ccf5a501510ff6e3ab0d400ee922f2ae.png"
                  className="absolute h-24 top-24 left-[calc(30%-300px)] -rotate-12"
                  alt="Description pending"
                ></img>
                <img
                  src="https://i.pinimg.com/originals/cc/f5/a5/ccf5a501510ff6e3ab0d400ee922f2ae.png"
                  className="absolute h-24 bottom-24 left-[calc(85%-300px)] rotate-[25deg]"
                  alt="Description pending"
                ></img>
                <img
                  src="https://i.pinimg.com/originals/c5/fe/e2/c5fee2b05ce93bc24906ccd2f30eff0b.png"
                  className="absolute h-24 top-28 left-[calc(80%-300px)] rotate-12"
                  alt="Description pending"
                ></img>
                <img
                  src="https://i.pinimg.com/originals/c5/fe/e2/c5fee2b05ce93bc24906ccd2f30eff0b.png"
                  className="absolute h-24 bottom-32 left-[calc(35%-300px)] -rotate-[20deg]"
                  alt="Description pending"
                ></img>
                  <div className="col-start-3 col-end-8 flex flex-col gap-10 self-center text-center select-none">
                    <h2 className="text-6xl text-white text-left font-roboto font-medium">
                      Play chess online for free!
                    </h2>
                    <Link
                      to="/play"
                      className="w-1/2 self-center text-xl text-white font-roboto font-medium select-none p-3 bg-blue-500 rounded-full border-b-4 border-blue-600 transition duration-300 hover:bg-blue-500/80 hover:border-blue-600/80 hover:shadow text-center"
                    >
                      Play now!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://img-08.stickers.cloud/packs/7b6076b2-8227-4343-bff7-a218e327bf7e/webp/0fc594da-af1d-4aac-8cbe-50de8a725510.webp"
              className="h-2 w-2 absolute bottom-0 left-0 hover:w-96 hover:h-96"
              alt="Description pending"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

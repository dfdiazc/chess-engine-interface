import { LandingHeader } from "components";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-full">
      <Helmet>
        <style>{"body {background-color: #262626}"}</style>
      </Helmet>
      <LandingHeader />
      <div>
        <div className="flex justify-center bg-neutral-100">
          <div className="grid grid-flow-col grid-cols-12 gap-5 px-10 py-12">
            <img
              src="https://i.pinimg.com/originals/b5/2a/42/b52a42ba2b209665e62baf1c93feb66f.png"
              className="justify-self-center self-center col-start-2 col-end-7"
              alt="Description pending"
            ></img>
            <div className="flex flex-col gap-10 self-center text-center select-none col-start-8 col-end-12">
              <h2 className="text-xl text-gray-800 font-roboto font-semibold md:text-5xl">
                Play chess online against a powerful AI!
              </h2>
              <Link
                to="/login"
                className="text-xl text-gray-800 font-roboto font-medium select-none p-3 bg-blue-400 rounded-lg border-b-4 border-blue-500 transition duration-300 hover:bg-blue-400/80 hover:border-blue-500/80 hover:shadow text-center"
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
  );
};

export default Landing;

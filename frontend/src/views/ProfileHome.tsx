import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";

const ProfileHome = () => {
  return (
    <div className="px-10 flex flex-col h-full">
      <div className="pt-10 flex flex-col">
        <div className="flex flex-col flex-1 justify-center">
          <div className="bg-white/80 p-5 rounded-full w-fit self-center">
            <IconContext.Provider
              value={{ className: "h-16 w-16 text-gray-500 m-1" }}
            >
              <AiOutlineUser />
            </IconContext.Provider>
          </div>
          <span className="text-2xl font-roboto text-white font-normal self-center mt-5">
            Welcome Back!
          </span>
        </div>
        <div className="p-3 mt-10">
          <div className="rounded-lg bg-[#2D3033] p-10 flex flex-col">
            <span className="font-roboto font-normal text-white/80 text-base">
              Recent Matches
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;

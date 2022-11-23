import React from "react";
import { useProfileQuery } from "features/auth/authApiSlice";
import { IconContext } from "react-icons";
import { AiOutlineUser, AiFillEdit } from "react-icons/ai";

const ProfileAccount = () => {
  const { data: profileData } = useProfileQuery();
  return (
    <div className="px-10 flex flex-col h-full">
      <div className="pt-10 flex flex-col">
        <div className="flex flex-row flex-1 gap-5">
          <div className="bg-white/80 p-5 rounded-full w-fit self-start">
            <IconContext.Provider
              value={{ className: "h-10 w-10 text-gray-500 m-1" }}
            >
              <AiOutlineUser />
            </IconContext.Provider>
          </div>
          <span className="font-roboto font-normal text-xl text-white text-center self-center">
            My Account
          </span>
          <div className="self-end ml-auto">
            <button>
              <IconContext.Provider
                value={{ className: "h-5 w-5 text-gray-500 m-1" }}
              >
                <AiFillEdit />
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <div className="p-3 mt-10">
          <div className="flex flex-col bg-[#2D3033] rounded-lg p-5 w-fit">
            <span className="font-roboto font-normal text-base text-white">
              Email
            </span>
            <span className="font-roboto font-light text-base text-white mt-3">
              {profileData?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccount;

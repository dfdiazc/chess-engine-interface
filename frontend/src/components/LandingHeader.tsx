import React from "react";
import { FaChess, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <div className="flex items-center justify-between h-16 px-5 w-full bg-yellow-400">
      <div className="flex gap-5">
        <IconContext.Provider value={{ className: "h-8 w-8 text-gray-800" }}>
          <FaChess />
        </IconContext.Provider>
        <span className="text-roboto font-medium text-xl text-gray-800 text-center select-none self-center">
          Un-Real Chess
        </span>
      </div>
      <div className="flex items-center gap-3 text-center self-center">
        <Link to="#" className="text-roboto font-medium text-md text-gray-800 select-none hover:underline">About</Link>
        <Link to="#" className="text-roboto font-medium text-md text-gray-800 select-none hover:underline">Contact</Link>
        <Link to="#">
          <IconContext.Provider value={{ className: "h-8 w-8 text-gray-800" }}>
            <FaGithub />
          </IconContext.Provider>
        </Link>
      </div>
    </div>
  );
};

export default LandingHeader;

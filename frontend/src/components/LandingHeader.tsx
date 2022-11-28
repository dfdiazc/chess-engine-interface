import React from "react";
import { FaChess, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png"

const LandingHeader = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 sm:px-10 w-full bg-transparent max-w-[1920px]">
      <div className="flex gap-5 shrink-0">
      <img src={Logo} className="h-10" alt="Description pending"/>
        <span className="text-roboto font-medium text-xl text-white text-center select-none self-center">
          Un-Real Chess
        </span>
      </div>
      <div className="flex items-end gap-8 text-center self-center">
        {/*
        <Link to="#" className="text-roboto font-medium text-md text-white select-none hover:underline">About</Link>
  <Link to="#" className="text-roboto font-medium text-md text-white select-none hover:underline">Contact</Link>*/}
        <a href="https://github.com/dfdiazc/chess-engine-interface">
          <IconContext.Provider value={{ className: "h-8 w-8 text-white" }}>
            <FaGithub />
          </IconContext.Provider>
        </a>
      </div>
    </header>
  );
};

export default LandingHeader;

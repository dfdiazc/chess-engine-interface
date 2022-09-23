import React from "react";
import { FaChess } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-5 w-full bg-yellow-400">
      <div className="flex gap-5">
        <IconContext.Provider value={{ className: "h-8 w-8 text-gray-800" }}>
          <FaChess />
        </IconContext.Provider>
        <span className="text-roboto font-medium text-xl text-gray-800 text-center select-none self-center">
          Un-Real Chess
        </span>
      </div>
      <div className="flex items-center gap-5 text-center self-center">
        <button className="flex p-2 rounded-3xl transition duration-200 ease-in-out bg-blue-600 hover:bg-blue-500">
          <div className="bg-white rounded-full">
            <IconContext.Provider
              value={{ className: "h-5 w-5 text-gray-500 m-1" }}
            >
              <AiOutlineUser />
            </IconContext.Provider>
          </div>
          <IconContext.Provider value={{ className: "h-5 w-5 text-white m-1" }}>
            <FiChevronDown />
          </IconContext.Provider>
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { FaChess } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 sm:px-10 w-full bg-transparent shadow max-w-[1920px]">
      <Link to="/" className="flex gap-5 shrink-0">
        <IconContext.Provider value={{ className: "h-8 w-8 text-white" }}>
          <FaChess />
        </IconContext.Provider>
        <span className="text-roboto font-medium text-xl text-white text-center select-none self-center">
          Un-Real Chess
        </span>
      </Link>
      <div className="flex items-center gap-5 text-center self-center">
        {/*<button className="flex p-2 rounded-3xl transition duration-200 ease-in-out bg-gray-600 hover:bg-gray-500">
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
        </button>*/}
        <Link to="/register" className="px-8 py-2 bg-blue-500 rounded-full text-roboto text-md text-white">
          Sign Up
        </Link>
        <Link to="/login" className="px-8 py-2 bg-transparent rounded-full border-2 border-blue-500 text-roboto text-md text-white">
          Log In
        </Link>
      </div>
    </header>
  );
};

export default Header;

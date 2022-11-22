import React, { useState } from "react";
import { FaChess } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { useLogoutMutation } from "features/auth/authApiSlice";
import { logOut } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentRefreshToken } from "features/auth/authSlice";

const Header = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectCurrentRefreshToken);
  const navigate = useNavigate();
  function handleLogOut() {
    try {
      logout({ refresh: token });
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  return (
    <header className="flex items-center justify-between h-16 pl-6 pr-5 sm:pl-10 w-full bg-transparent shadow max-w-[1920px]">
      <Link to="/" className="flex gap-5 shrink-0">
        <IconContext.Provider value={{ className: "h-8 w-8 text-white" }}>
          <FaChess />
        </IconContext.Provider>
        <span className="text-roboto font-medium text-xl text-white text-center select-none self-center">
          Un-Real Chess
        </span>
      </Link>
      <div className="flex items-center text-center self-center">
        {token ? (
          <button
            className="flex p-2 rounded-3xl transition duration-200 ease-in-out bg-flamingo-100 hover:bg-flamingo-200"
            onClick={handleLogOut}
          >
            <div className="bg-gray-200 rounded-full">
              <IconContext.Provider
                value={{ className: "h-5 w-5 text-gray-500 m-1" }}
              >
                <AiOutlineUser />
              </IconContext.Provider>
            </div>
            <span className="font-roboto font-normal text-gray-100 text-md ml-3 mr-1 text-center self-center select-none">Sign Out</span>
            {/*<IconContext.Provider
              value={{ className: "h-5 w-5 text-gray-300 m-1" }}
            >
              <FiChevronDown />
        </IconContext.Provider>*/}
          </button>
        ) : (
          <>
            <div className="hidden md:flex gap-3">
              <Link
                to="/register"
                className="px-8 py-2 bg-flamingo-100 rounded-full text-roboto text-md text-white"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-8 py-2 bg-transparent rounded-full border-2 border-flamingo-100 text-roboto text-md text-white"
              >
                Log In
              </Link>
            </div>
              <button className="text-white w-10 z-30 h-10 relative focus:outline-none rounded-lg md:hidden" onClick={() => setSideBarOpen(!sidebarOpen)}>
                <div className="block w-5 absolute right-0 transform -translate-x-1/2 -translate-y-1/2">
                    <div aria-hidden="true" className="block absolute h-0.5 w-5 rounded-full bg-current transform transition duration-500 ease-in-out rotate-45" style={sidebarOpen ? {transform: "rotate(45deg)"} : {transform: "translateY(-6px)"}}></div>
                    <div aria-hidden="true" className="block absolute h-0.5 w-5 rounded-full bg-current transform transition duration-500 ease-in-out" style={sidebarOpen ? {opacity: "0%"} : {opacity: "100%"}}></div>
                    <div aria-hidden="true" className="block absolute h-0.5 w-5 rounded-full bg-current transform transition duration-500 ease-in-out rotate-45" style={sidebarOpen ? {transform: "rotate(-45deg)"} : {transform: "translateY(6px)"}}></div>
                </div>
            </button>
              <div
                className="flex flex-col gap-3 justify-center z-20 bg-[#164150] px-5 h-full w-full fixed top-0 right-0 transition-all duration-300"
                style={
                  sidebarOpen
                    ? { transform: "translateX(0%)" }
                    : { transform: "translateX(100%)" }
                }
              >
                <Link
                  to="/register"
                  className="px-8 py-2 bg-flamingo-100 rounded-full text-roboto text-md text-white"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-2 bg-transparent rounded-full border-2 border-flamingo-100 text-roboto text-md text-white"
                >
                  Log In
                </Link>
              </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

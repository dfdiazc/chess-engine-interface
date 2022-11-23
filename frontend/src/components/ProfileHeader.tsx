import React from "react";
import { IconContext } from "react-icons";
import { FaChess } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { useLogoutMutation } from "features/auth/authApiSlice";
import { logOut } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentRefreshToken } from "features/auth/authSlice";
import { FiChevronDown } from "react-icons/fi";

const ProfileHeader = () => {
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
  return (
    <header className="flex flex-col items-center justify-between pl-6 pr-5 sm:pl-10 w-full bg-transparent shadow max-w-[1920px]">
        <div className="flex items-center justify-between h-16 w-full">
      <Link to="/" className="flex gap-5 shrink-0">
        <IconContext.Provider value={{ className: "h-8 w-8 text-white" }}>
          <FaChess />
        </IconContext.Provider>
        <span className="text-roboto font-medium text-xl text-white text-center select-none self-center">
          Un-Real Chess
        </span>
      </Link>
      <div className="flex items-center text-center self-center">
        <Link
          to="/profile"
          className="flex p-2 rounded-3xl transition duration-200 ease-in-out bg-flamingo-100 hover:bg-flamingo-200"
        >
          <div className="bg-gray-200 rounded-full">
            <IconContext.Provider
              value={{ className: "h-5 w-5 text-gray-500 m-1" }}
            >
              <AiOutlineUser />
            </IconContext.Provider>
          </div>
          <IconContext.Provider
            value={{ className: "h-5 w-5 text-gray-300 m-1" }}
          >
            <FiChevronDown />
          </IconContext.Provider>
        </Link>
      </div>
      </div>
      <div>
        <NavLink to="/profile">Stats</NavLink>
      </div>
    </header>
  );
};

export default ProfileHeader;

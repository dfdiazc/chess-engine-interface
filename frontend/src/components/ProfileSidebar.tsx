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

const ProfileSidebar = () => {
  const [logout, { isLoading }] = useLogoutMutation();
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
    <div className="flex flex-col w-fit pr-5 pb-5 h-full bg-[#2B3133] drop-shadow-lg">
      <div className="flex h-16">
        <Link to="/" className="flex gap-5 ml-10 w-fit h-fit self-center">
          <IconContext.Provider
            value={{ className: "h-8 w-8 text-white self-center" }}
          >
            <FaChess />
          </IconContext.Provider>
          <span className="text-roboto font-medium text-xl text-white text-center select-none self-center whitespace-nowrap">
            Un-Real Chess
          </span>
        </Link>
      </div>
      <div className="flex mt-36 mb-auto ml-5">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "flex rounded-full px-3 py-1 text-flamingo-100" : "flex rounded-full px-3 py-1 text-white"
          }
        >
          <IconContext.Provider
            value={{ className: "h-6 w-6 text-gray-300 self-center" }}
          >
            <AiOutlineUser />
          </IconContext.Provider>
          <span className="font-roboto font-normal text-md hover:underline self-center ml-3 whitespace-nowrap">
            My Account
          </span>
        </NavLink>
      </div>
      <span className="mx-3 my-2 h-px bg-[#3E474A]"></span>
      <button
        className="flex w-fit rounded-full px-2 py-1 ml-5 hover:bg-[#3E474A] transition-all duration-100"
        onClick={handleLogOut}
      >
        <IconContext.Provider
          value={{ className: "h-6 w-6 text-white self-center" }}
        >
          <BiLogOut />
        </IconContext.Provider>
        <span className="font-roboto font-normal text-md text-red-500 text-center self-center ml-3 px-3 py-1 whitespace-nowrap">
          Sign Out
        </span>
      </button>
    </div>
  );
};

export default ProfileSidebar;

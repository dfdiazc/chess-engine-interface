import { AppDispatch } from "lib/store";
import { useLogoutMutation } from "lib/features/auth/authApiSlice";
import { selectCurrentRefreshToken, logOut } from "lib/features/auth/authSlice";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserDropdown = () => {
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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <button
        className="flex p-2 rounded-3xl transition duration-200 ease-in-out bg-flamingo-100 hover:bg-flamingo-200"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
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
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="flex flex-col gap-8 pt-5 pb-3 absolute z-10 bg-[#2D3033] ring-1 ring-flamingo-100 top-16 -left-24 rounded-lg"
            ref={menuRef}
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{
              opacity: 0,
              y: "-50%",
              transition: { duration: "0.35" },
            }}
          >
            <Link className="flex justify-center hover:bg-[#3e4145] px-5 py-1" to="/profile">
              <div className="bg-gray-200 rounded-full">
                <IconContext.Provider
                  value={{ className: "h-5 w-5 text-gray-500 m-1" }}
                >
                  <AiOutlineUser />
                </IconContext.Provider>
              </div>
              <span className="font-roboto font-normal text-white text-center text-base block whitespace-nowrap select-none self-center px-5">
                My Profile
              </span>
            </Link>
            <button
              className="flex justify-start hover:bg-[#3e4145] px-5 py-1"
              onClick={() => {
                handleLogOut();
              }}
            >
              <IconContext.Provider
                value={{ className: "h-6 w-6 text-red-500 m-1" }}
              >
                <BiLogOut />
              </IconContext.Provider>
              <span className="font-roboto font-normal text-red-500 text-center text-base block whitespace-nowrap select-none self-center px-5">
                Logout
              </span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default UserDropdown;

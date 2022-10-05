import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "components";
import { IconContext } from "react-icons";
import {
  FaChess,
  FaApple,
  FaFacebook,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-r from-yellow-400 to-blue-400 overflow-scroll">
      <div className="flex justify-center grow py-10">
        <div className="bg-white px-10 py-6 relative rounded-xl self-center w-full max-w-sm">
          <div className="flex flex-col pb-6 items-center gap-5">
            <div className="flex gap-5">
              <IconContext.Provider
                value={{ className: "h-8 w-8 text-gray-800" }}
              >
                <FaChess />
              </IconContext.Provider>
              <span className="text-roboto font-medium text-xl text-gray-800 text-center select-none self-center">
                Un-Real Chess
              </span>
            </div>
          </div>
          <LoginForm />
          <div className="flex items-center py-5">
            <span className="grow mr-3 h-px bg-black/20"></span>
            <span className="font-roboto font-normal text-gray-800">or</span>
            <span className="grow ml-3 h-px bg-black/20"></span>
          </div>
          <div className="flex flex-col pb-10 gap-2">
            <Link
              to="#"
              className="flex items-center justify-center gap-5 select-none grow whitespace-nowrap text-md text-gray-800 font-roboto font-medium p-3 bg-white border rounded-lg transition duration-300"
            >
              <IconContext.Provider
                value={{ className: "h-6 w-6 absolute left-16" }}
              >
                <FcGoogle />
              </IconContext.Provider>
              <span className="">Log In with Google</span>
            </Link>
            <Link
              to="#"
              className="flex items-center justify-center gap-5 select-none grow whitespace-nowrap text-md text-white font-roboto font-medium p-3 bg-black border rounded-lg transition duration-300"
            >
              <IconContext.Provider
                value={{ className: "h-6 w-6 absolute left-16 fill-white" }}
              >
                <FaApple />
              </IconContext.Provider>
              <span className="">Log In with Apple</span>
            </Link>
            <Link
              to="#"
              className="flex items-center justify-center gap-5 select-none grow whitespace-nowrap text-md text-white font-roboto font-medium p-3 bg-[#4267B2] rounded-lg transition duration-300"
            >
              <IconContext.Provider
                value={{ className: "h-6 w-6 absolute left-16 fill-white" }}
              >
                <FaFacebook />
              </IconContext.Provider>
              <span className="">Log In with Facebook</span>
            </Link>
            <Link
              to="#"
              className="flex items-center justify-center gap-5 select-none grow whitespace-nowrap text-md text-white font-roboto font-medium p-3 bg-[#1DA1F2] rounded-lg transition duration-300"
            >
              <IconContext.Provider
                value={{ className: "h-6 w-6 absolute left-16 fill-white" }}
              >
                <FaTwitter />
              </IconContext.Provider>
              <span className="">Log In with Twitter</span>
            </Link>
            <Link
              to="#"
              className="flex items-center justify-center gap-5 select-none grow whitespace-nowrap text-md text-white font-roboto font-medium p-3 bg-[#24292f] rounded-lg transition duration-300"
            >
              <IconContext.Provider
                value={{ className: "h-6 w-6 absolute left-16 fill-white" }}
              >
                <FaGithub />
              </IconContext.Provider>
              <span className="">Log In with GitHub</span>
            </Link>
          </div>
          <div className="font-roboto fonto-normal text-gray-800 text-sm">
            New here?&nbsp;
            <Link
              to="/register"
              className="select-none text-blue-500 hover:underline"
            >
              Start playing chess today!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

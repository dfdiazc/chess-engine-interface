import React from 'react'
import { Link } from "react-router-dom";
import { RegisterForm } from "components";
import { IconContext } from "react-icons";
import { FaChess } from "react-icons/fa";

const Register = () => {
  return (
    <div className="flex flex-col h-max w-full bg-gradient-to-r from-yellow-400 to-blue-400 bg-fixed">
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
          <RegisterForm />
          <div className="block pt-5 font-roboto font-normal text-gray-800 text-xs text-center">
            By signing up you agree to Un-Real Chess'&nbsp;
            <Link
              to="/register"
              className="select-none text-blue-500 hover:underline"
            >
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link
              to="/register"
              className="select-none text-blue-500 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </div>
          <div className="flex items-center py-5">
            <span className="grow h-px bg-black/20"></span>
          </div>
          <div className="font-roboto fonto-normal text-gray-800 text-sm">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="select-none text-blue-500 hover:underline"
            >
              Start playing chess!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
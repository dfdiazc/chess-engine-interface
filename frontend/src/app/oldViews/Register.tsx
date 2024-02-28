/* import React from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "components";
import { IconContext } from "react-icons";
import { FaChess } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Register = () => {
  const registerVariations = {
    hidden: { scale: 0.95 },
    visible: { scale: 1 },
  };
  const scale = useMotionValue(0.95);
  const scaleRange = [0.95, 1];
  const opacityRange = [0, 1];
  const opacity = useTransform(scale, scaleRange, opacityRange);
  return (
    <div className="flex flex-col h-screen w-full overflow-auto bg-gradient-to-r from-[#1d7c8f] to-[#dc5a41]">
      <div className="flex justify-center grow py-10">
        <motion.div
          className="bg-white px-10 py-6 relative rounded-xl self-center w-full max-w-sm z-10"
          variants={registerVariations}
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.35 }}
          style={{ opacity, scale }}
        >
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
              to="/terms"
              className="text-blue-500 hover:underline"
            >
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link
              to="/privacy"
              className="text-blue-500 hover:underline"
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
              className="text-blue-500 hover:underline"
            >
              Start playing chess!
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
 */
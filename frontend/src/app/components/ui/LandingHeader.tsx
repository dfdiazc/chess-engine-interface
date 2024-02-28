import React from "react";
import { FaChess, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import Link from "next/link";
import Image from "next/image";

const LandingHeader = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 sm:px-10 w-full bg-transparent max-w-[1920px]">
      <div className="flex gap-5 shrink-0">
        <Image src={"/images/logo.png"} className="w-10 h-10" width={100} height={100} alt="Description pending" />
        <span className="text-lato font-medium text-xl text-white text-center select-none self-center">
          Un-Real Chess
        </span>
      </div>
      <div className="flex items-end gap-8 text-center self-center">
        <Link href="https://github.com/dfdiazc/chess-engine-interface">
          <FaGithub className="h-8 w-8 text-white" />
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;

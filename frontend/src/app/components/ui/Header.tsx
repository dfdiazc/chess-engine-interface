"use client";
import React, { useState } from "react";
import { FaChess } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  return (
    <header className="flex items-center justify-between h-12 pl-6 pr-5 sm:pl-10 w-full bg-transparent shadow max-w-[1920px] bg-neutral-900">
      <Link href="/" className="flex gap-5 shrink-0">
        <Image
          src={"/images/logo.png"}
          width={100}
          height={100}
          className="w-8 h-8"
          alt="Description pending"
        />
        <span className="text-roboto font-medium text-md text-neutral-200 text-center select-none self-center">
          Un-Real Chess
        </span>
      </Link>
      {/* <div className="relative flex items-center text-center self-center">
        <div className="hidden md:flex gap-3">
          <Link
            href="/register"
            className="px-8 py-2 bg-flamingo-100 border-flamingo-100 hover:bg-flamingo-200/80 transition duration-300 rounded-full text-roboto text-md text-white"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-8 py-2 bg-transparent rounded-full border-2 border-flamingo-100 hover:bg-flamingo-200/80 transition duration-300 text-roboto text-md text-white"
          >
            Log In
          </Link>
        </div>
        <button
          className="text-white w-10 z-30 h-10 relative focus:outline-none rounded-lg md:hidden"
          onClick={() => setSideBarOpen(!sidebarOpen)}
        >
          <div className="block w-5 absolute right-0 transform -translate-x-1/2 -translate-y-1/2">
            <div
              aria-hidden="true"
              className="block absolute h-0.5 w-5 rounded-full bg-current transform transition duration-500 ease-in-out rotate-45"
              style={
                sidebarOpen
                  ? { transform: "rotate(45deg)" }
                  : { transform: "translateY(-6px)" }
              }
            ></div>
            <div
              aria-hidden="true"
              className="block absolute h-0.5 w-5 rounded-full bg-current transform transition duration-500 ease-in-out"
              style={sidebarOpen ? { opacity: "0%" } : { opacity: "100%" }}
            ></div>
            <div
              aria-hidden="true"
              className="block absolute h-0.5 w-5 rounded-full bg-current transform transition duration-500 ease-in-out rotate-45"
              style={
                sidebarOpen
                  ? { transform: "rotate(-45deg)" }
                  : { transform: "translateY(6px)" }
              }
            ></div>
          </div>
        </button>
        <div
          className="flex flex-col gap-3 justify-center z-20 bg-[#1d1d1f] px-5 h-full w-full fixed top-0 right-0 transition-all duration-300"
          style={
            sidebarOpen
              ? { transform: "translateX(0%)" }
              : { transform: "translateX(100%)" }
          }
        >
          <Link
            href="/register"
            className="px-8 py-2 bg-flamingo-100 rounded-full text-roboto text-md text-white"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-8 py-2 bg-transparent rounded-full border-2 border-flamingo-100 text-roboto text-md text-white"
          >
            Log In
          </Link>
        </div>
      </div> */}
    </header>
  );
}

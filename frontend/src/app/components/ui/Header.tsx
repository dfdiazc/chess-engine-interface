"use client";
import React, { useState } from "react";
import { Link } from "@/navigation";
import Image from "next/image";

export default function Header() {
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  return (
    <header className="md:fixed flex items-center justify-between h-12 pl-6 pr-5 sm:pl-10 w-full bg-transparent max-w-[1920px] bg-neutral-900 z-[100]">
      <Link href="/" className="flex gap-2 shrink-0">
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
    </header>
  );
}

import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "@/navigation";
import Image from "next/image";
import { LanguageSelector } from "@/app/components/ui";

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-between h-16 px-6 sm:px-10 w-full bg-transparent z-[100] max-w-[1920px]">
      <div className="flex gap-2 shrink-0">
        <Image
          src={"/images/logo.png"}
          className="w-10 h-10"
          width={100}
          height={100}
          alt="Description pending"
        />
        <span className="text-lato font-medium text-lg md:text-xl text-neutral-200 text-center select-none self-center">
          Un-Real Chess
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-4 text-center self-center">
        <LanguageSelector />
        <Link href="https://github.com/dfdiazc/chess-engine-interface">
          <FaGithub className="h-8 w-8 fill-neutral-200" />
        </Link>
      </div>
    </header>
  );
}

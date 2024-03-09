import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingFooter() {
  return (
    <header className="flex items-center justify-between h-16 px-6 sm:px-10 w-full bg-transparent z-50 max-w-[1920px] mt-12">
      <div className="flex gap-2 shrink-0">
        <Image
          src={"/images/logo.png"}
          className="w-8 h-8"
          width={100}
          height={100}
          alt="Description pending"
        />
        <span className="text-lato font-medium text-base text-neutral-200 text-center select-none self-center">
          Un-Real Chess
        </span>
      </div>
    </header>
  );
};

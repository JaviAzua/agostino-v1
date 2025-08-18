"use client";
import React from "react";
import { Logo } from "../Logo";
import Link from "next/link";
import LeftText from "../left-text";
import Navbar from "../navbar/navbar";

interface TopNavbarProps {
  leftText: string;
}

export default function TopNavbar({ leftText }: TopNavbarProps) {
  return (
    <div className="w-full flex h-[8vh] justify-between items-center sticky top-0 z-50 bg-honeydew">
      <LeftText
        className="hidden lg:block flex-1 font-darker-grotesque text-2xl tracking-widest font-semibold text-night pl-6"
        text={leftText}
      />
      <Link href="/">
        <Logo
          underline={false}
          color="#121619"
          className="w-full lg:h-full lg:w-full p-3 flex-1"
        />
      </Link>
      <div className="pb-2 flex-1 flex justify-end px-4">
        <Navbar className="text-night" />
      </div>
    </div>
  );
}

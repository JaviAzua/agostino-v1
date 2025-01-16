import Link from "next/link";
import React from "react";
import { SiVimeo } from "react-icons/si";

function Footer() {
  return (
    <div className="relative select-none bg-orangeL">
      <div className="flex items-center justify-center flex-wrap px-2 py-2 right-7 gap-5">
        <p className="text-sm font-semibold">Gonzalo Agostino</p>
        <Link href={"https://vimeo.com/user53523138"} target={"_blank"}>
          <div className="flex items-center gap-2 group cursor-pointer">
            <SiVimeo className=" group-hover:scale-110 duration-300 " />
            <span className="text-xs">Vimeo</span>
          </div>
        </Link>
      </div>
      <p className="md:absolute bottom-2 left-10 text-[0.5rem]">
        ©2023 - Web made by JavierAzua
      </p>
    </div>
  );
}

export default Footer;

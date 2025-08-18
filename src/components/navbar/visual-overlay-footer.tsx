import Link from "next/link";
import React from "react";
import JaLogo from "../ja-logo";

export default function VisualOverlayFooter() {
  return (
    <footer className="flex justify-between items-center relative">
      <JaLogo className="flex-1 invert absolute left-0 bottom-0" />
      <ul
        aria-label="Social media links and contact links"
        className="w-full flex-wrap justify-evenly space-x-2 lg:space-x-4 text-sm md:text-base lg:text-lg px-10 hidden lg:flex"
      >
        <li className="hover:scale-[0.9]">
          <Link target="_blank" href="mailto:un.totem777@gmail.com">
            Contact
          </Link>
        </li>
        <li className="hover:scale-[0.9]">
          <Link href={"https://vimeo.com/user53523138"} target={"_blank"}>
            Vimeo
          </Link>
        </li>
        <li className="hover:scale-[0.9]">
          <Link target="_blank" href="https://www.instagram.com/un.totem">
            Instagram
          </Link>
        </li>
      </ul>
      <div className="flex-1"></div>
    </footer>
  );
}

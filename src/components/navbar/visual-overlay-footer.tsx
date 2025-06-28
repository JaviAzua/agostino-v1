import Link from "next/link";
import React from "react";
import JaLogo from "../ja-logo";

export default function VisualOverlayFooter() {
  return (
    <footer className="flex justify-between items-center">
      <JaLogo className="flex-1" />
      <ul
        aria-label="Social media links and contact links"
        className="flex-1 flex flex-wrap justify-evenly lg:flex-initial space-x-2 lg:space-x-4 text-sm md:text-base lg:text-lg  "
      >
        <li className="hover:scale-[0.9]">
          <Link target="_blank" href="/">
            Contact
          </Link>
        </li>
        <li className="hover:scale-[0.9]">
          <Link target="_blank" href="/">
            Vimeo
          </Link>
        </li>
        <li className="hover:scale-[0.9]">
          <Link target="_blank" href="/">
            Upwork
          </Link>
        </li>
        <li className="hover:scale-[0.9]">
          <Link target="_blank" href="/">
            Instagram
          </Link>
        </li>
      </ul>
      <div className="flex-1"></div>
    </footer>
  );
}

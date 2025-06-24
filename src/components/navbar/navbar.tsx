"use client";

import React, { useState } from "react";
import Link from "next/link";

const MENU = [
  { id: "home", label: "Home", href: "#home" },
  { id: "works", label: "Works", href: "#works" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

interface NavbarProps {
  isNight: boolean;
}

export default function Navbar({ isNight }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const bgClass = isNight ? "bg-night" : "bg-honeydew";
  const textClass = isNight ? "text-persian_orange" : "text-night";
  const hoverClass = isNight ? "hover:text-night" : "hover:text-persian_orange";

  const handleMenuClick = () => setOpen(true);
  const handleOverlayClick = () => setOpen(false);
  const handleLinkClick = () => setOpen(false);

  return (
    <>
      {/* Hamburguesa */}
      <button
        className="fixed top-10 left-10 z-50 flex flex-col gap-1 w-10 h-10 justify-center items-center bg-transparent border-none outline-none cursor-pointer"
        aria-label="Open menu"
        onClick={handleMenuClick}
        tabIndex={0}
      >
        <span className="block w-8 h-1 bg-white rounded transition-all" />
        <span className="block w-8 h-1 bg-white rounded transition-all" />
        <span className="block w-8 h-1 bg-white rounded transition-all" />
      </button>

      {/* Overlay menú */}
      {open && (
        <div
          className={`fixed inset-0 flex flex-col items-center justify-center transition-all duration-300 z-50 ${bgClass} ${textClass}`}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <ul className="flex flex-col gap-12">
            {MENU.map((item) => (
              <li key={item.id} className="text-5xl md:text-7xl font-extrabold">
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 ${hoverClass}`}
                  onClick={handleLinkClick}
                  tabIndex={0}
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

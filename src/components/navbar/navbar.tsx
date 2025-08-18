"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import VisualOverlayPortal from "./visual-overlay-portal";
import VisualOverlay from "./visual-overlay";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (isOpen) setShowOverlay(true);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleExited = () => {
    setShowOverlay(false);
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  };

  return (
    <>
      {/* 🍔 */}
      <button
        onClick={() => toggleMenu()}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className={cn(
          "z-[99] flex gap-1 justify-center items-center hover:scale-[0.9] transition-colors duration-300",
          className
        )}
      >
        <p className="text-current text-sm">MENU</p>
        <div className="flex flex-col gap-1.5 w-12 h-12 md:w-10 md:h-10 lg:w-9 lg:h-9 justify-center items-center bg-transparent border-none outline-none">
          <span
            className={`block w-8 h-0.5 rounded-full bg-current ${
              isOpen ? "bg-black" : "bg-current"
            }`}
          />
          <span
            className={`block w-8 h-0.5 rounded-full bg-current ${
              isOpen ? "bg-black" : "bg-current"
            }`}
          />
          <span className="block w-8 h-0.5 rounded-full bg-current" />
        </div>
      </button>

      {/* Overlay del menú usando Portal */}
      {showOverlay && (
        <VisualOverlayPortal
          isOpen={isOpen}
          onClick={handleOverlayClick}
          overlayRef={overlayRef}
          onExited={handleExited}
          menuItemsRef={menuItemsRef}
        >
          <VisualOverlay
            menuItemsRef={menuItemsRef}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </VisualOverlayPortal>
      )}
    </>
  );
}

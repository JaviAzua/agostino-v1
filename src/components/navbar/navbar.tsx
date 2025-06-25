"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const bgClass = isNight ? "bg-night" : "bg-honeydew";
  const textClass = isNight ? "text-persian_orange" : "text-night";
  const hamburgerBarColorClosed = isNight ? "bg-night" : "bg-persian_orange";
  const hamburgerBarColorOpen = isNight ? "bg-persian_orange" : "bg-night";
  const hamburgerBarColor = isOpen
    ? hamburgerBarColorOpen
    : hamburgerBarColorClosed;

  useGSAP(() => {
    const overlay = overlayRef.current;
    const menuItems = menuItemsRef.current;
    const hamburger = hamburgerRef.current;

    if (!overlay || !hamburger) return;

    if (isOpen) {
      const tl = gsap.timeline();

      tl.to(hamburger.children[0], { rotation: 45, y: 8, duration: 0.2 })
        .to(hamburger.children[1], { opacity: 0, duration: 0.1 }, "<")
        .to(
          hamburger.children[2],
          { rotation: -45, y: -8, duration: 0.2 },
          "<"
        );

      tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });

      tl.fromTo(
        menuItems,
        {
          y: 50,
          autoAlpha: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );
    } else {
      const tl = gsap.timeline();

      tl.to(menuItems, {
        y: -30,
        autoAlpha: 0,
        filter: "blur(5px)",
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });

      tl.to(overlay, {
        autoAlpha: 0,
        duration: 0.3,
      });

      tl.to(hamburger.children[0], { rotation: 0, y: 0, duration: 0.2 }, "<")
        .to(hamburger.children[1], { opacity: 1, duration: 0.1 }, "<")
        .to(hamburger.children[2], { rotation: 0, y: 0, duration: 0.2 }, "<");
    }
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
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* 🍔 */}
      <button
        ref={hamburgerRef}
        className="fixed top-10 left-10 z-[60] flex flex-col gap-1.5 w-10 h-10 justify-center items-center bg-transparent border-none outline-none cursor-pointer group"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span
          className={`block w-8 h-0.5 rounded-full transition-all duration-300 group-hover:bg-opacity-80 ${hamburgerBarColor}`}
        />
        <span
          className={`block w-8 h-0.5 rounded-full transition-all duration-300 group-hover:bg-opacity-80 ${hamburgerBarColor}`}
        />
        <span
          className={`block w-8 h-0.5 rounded-full transition-all duration-300 group-hover:bg-opacity-80 ${hamburgerBarColor}`}
        />
      </button>

      {/* Overlay del menú */}
      {(isOpen || overlayRef.current) && (
        <div
          ref={overlayRef}
          className={`fixed inset-0 flex flex-col items-center justify-center z-50 ${bgClass} ${textClass}`}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
          style={{
            visibility: "hidden",
            opacity: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          <nav aria-label="Main navigation">
            <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-8 md:gap-12">
              {MENU.map((item, index) => (
                <li
                  key={item.id}
                  ref={(el) => {
                    if (el) menuItemsRef.current[index] = el;
                  }}
                  className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-darker-grotesque"
                >
                  <Link
                    href={item.href}
                    className={`block`}
                    onClick={handleLinkClick}
                    tabIndex={isOpen ? 0 : -1}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.08,
                        duration: 0.25,
                        ease: "power2.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.in",
                      });
                    }}
                    onFocus={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.08,
                        duration: 0.25,
                        ease: "power2.out",
                      });
                    }}
                    onBlur={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.in",
                      });
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

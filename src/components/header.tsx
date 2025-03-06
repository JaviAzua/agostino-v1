"use client";

import Image from "next/image";
import React, { useEffect, useState, RefObject } from "react";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

type Props = {
  scrollContainer: RefObject<HTMLElement>;
};

function Header({ scrollContainer }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!scrollContainer.current) return;

    const handleScroll = () => {
      if (scrollContainer.current) {
        setScrolled(scrollContainer.current.scrollTop > 50);
      }
    };

    const currentScrollContainer = scrollContainer.current;
    currentScrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      if (currentScrollContainer) {
        currentScrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainer]);

  return (
    <header
      className={`${
        scrolled ? "bg-blackB" : "bg-transparent"
      } fixed w-full top-0 flex items-center justify-around py-4 z-50 select-none transition-colors duration-300 h-20`}
    >
      <div>
        <Link href="#reel">
          <Image
            src="/logoW.svg"
            alt="Logo"
            width={160}
            height={200}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <div>
        <div className="md:hidden">
          <GiHamburgerMenu
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer w-10 h-10"
          />
          {menuOpen && (
            <motion.div
              initial={{
                x: 10,
                opacity: 0,
                y: 20,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              className="bg-black absolute z-20 left-32 right-0 shadow-md top-20"
            >
              <ul className="py-10 text-2xl font-semibold flex flex-col gap-20">
                <Link onClick={() => setMenuOpen(false)} href="#reel">
                  <li className="burguerMenu">Home</li>
                </Link>
                <Link onClick={() => setMenuOpen(false)} href="#about">
                  <li className="burguerMenu">About</li>
                </Link>
                <Link onClick={() => setMenuOpen(false)} href="#projects">
                  <li className="burguerMenu">Projects</li>
                </Link>
                <Link onClick={() => setMenuOpen(false)} href="#contactB">
                  <li className="burguerMenu">Contact</li>
                </Link>
              </ul>
            </motion.div>
          )}
        </div>
        <ul className="hidden md:flex gap-5 md:gap-20">
          <Link href="#about">
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
              className="listItem"
            >
              About
            </motion.li>
          </Link>
          <Link href="#projects">
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
              className="listItem"
            >
              Projects
            </motion.li>
          </Link>
          <Link href="#contactB">
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
              className="listItem"
            >
              Contact
            </motion.li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;

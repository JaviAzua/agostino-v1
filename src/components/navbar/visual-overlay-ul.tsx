import React from "react";
import gsap from "gsap";
import Link from "next/link";

const MENU = [
  { id: "home", label: "Home", href: "#home" },
  { id: "works", label: "Works", href: "#works" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function VisualOverlayUl({
  setIsOpen,
  menuItemsRef,
  isOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
  menuItemsRef: React.RefObject<HTMLLIElement[]>;
  isOpen: boolean;
}) {
  const handleLinkClick = () => setIsOpen(false);
  return (
    <div className="flex-grow">
      <ul className="flex flex-col lg:grid lg:grid-cols-4 h-full place-content-center justify-center items-center gap-8 md:gap-12">
        {MENU.map((item, index) => (
          <li
            key={item.id}
            ref={(el) => {
              if (el) menuItemsRef.current[index] = el;
            }}
            className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-darker-grotesque text-center"
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
    </div>
  );
}

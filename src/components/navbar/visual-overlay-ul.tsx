import React from "react";
import gsap from "gsap";
import { scroller } from "react-scroll";

const MENU = [
  { id: "home", label: "Home" },
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
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
  const handleMenuClick = (id: string) => {
    setIsOpen(false);
    window.history.replaceState({}, "", "/" + "#" + id);
    scroller.scrollTo(id, { smooth: true, duration: 600, offset: -80 });
  };
  return (
    <div className="flex-grow">
      <ul className="grid grid-cols-1 lg:grid-cols-4 h-full place-content-center justify-center items-center gap-8 md:gap-12">
        {MENU.map((item, index) => (
          <li
            key={item.id}
            ref={(el) => {
              if (el) menuItemsRef.current[index] = el;
            }}
            className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-darker-grotesque text-center"
          >
            <button
              type="button"
              className="block w-full"
              tabIndex={isOpen ? 0 : -1}
              aria-label={`Go to ${item.label}`}
              onClick={() => handleMenuClick(item.id)}
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
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

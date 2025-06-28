import React from "react";

import VisualOerlayTop from "./visual-overlay-top";
import VisualOverlayUl from "./visual-overlay-ul";
import VisualOverlayFooter from "./visual-overlay-footer";

export default function VisualOverlay({
  menuItemsRef,
  isOpen,
  setIsOpen,
}: {
  menuItemsRef: React.RefObject<HTMLLIElement[]>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <nav
      aria-label="Main navigation"
      className="h-full w-full flex flex-col justify-between"
    >
      <VisualOerlayTop setIsOpen={setIsOpen} />
      <VisualOverlayUl
        setIsOpen={setIsOpen}
        menuItemsRef={menuItemsRef}
        isOpen={isOpen}
      />
      <VisualOverlayFooter />
    </nav>
  );
}

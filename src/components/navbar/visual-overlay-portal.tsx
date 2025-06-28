"use client";

import React from "react";
import ReactDOM from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  onExited?: () => void;
  menuItemsRef: React.RefObject<HTMLLIElement[]>;
}

const VisualOverlayPortal: React.FC<MenuOverlayProps> = ({
  overlayRef,
  isOpen,
  onClick,
  children,
  onExited,
  menuItemsRef,
}) => {
  useGSAP(() => {
    const overlay = overlayRef.current;
    const menuItems = menuItemsRef.current;
    if (!overlay) return;

    if (isOpen && menuItems.length) {
      gsap.fromTo(
        menuItems,
        { y: 50, autoAlpha: 0, filter: "blur(10px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
      gsap.to(overlay, { autoAlpha: 1, duration: 0.3 });
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else if (menuItems.length) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onExited) onExited();
          document.body.style.overflow = "unset";
          document.body.style.paddingRight = "0px";
        },
      });
      tl.to(menuItems, {
        y: -30,
        autoAlpha: 0,
        filter: "blur(5px)",
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      }).to(
        overlay,
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        "-=0.2"
      );
    }
  }, [isOpen, overlayRef, onExited, menuItemsRef]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-[99] bg-honeydew"
      onClick={onClick}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      style={{ opacity: 0 }}
    >
      {children}
    </div>,
    document.body
  );
};

export default VisualOverlayPortal;

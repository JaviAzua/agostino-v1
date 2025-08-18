"use client";
import React from "react";
import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  type JSX,
  useCallback,
  useMemo,
} from "react";
import { isMobile } from "./cursor-utils";

type CursorVariant = "circle" | "arrow" | string;
type CursorContextType = {
  setVariant: (variant: CursorVariant) => void;
};
const CursorContext = createContext<CursorContextType>({
  setVariant: () => {},
});
export const useCursor = () => useContext(CursorContext);

const CursorSVGs: Record<CursorVariant, JSX.Element> = {
  circle: (
    <svg width="32" height="32">
      <circle
        cx="16"
        cy="16"
        r="8"
        fill="white"
        stroke="black"
        strokeWidth="2"
        filter="drop-shadow(0 0 2px black)"
      />
    </svg>
  ),
  circleClick: (
    <svg width="32" height="32">
      <circle
        cx="16"
        cy="16"
        r="8"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  ),
  arrow: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 384 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M384 256L0 32V480L384 256z"
        fill="white"
        stroke="black"
        strokeWidth="8"
        filter="drop-shadow(0 0 2px black)"
      />
    </svg>
  ),
};

const CustomCursor: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [showCursor, setShowCursor] = useState(false);
  const [variant, setVariantState] = useState<CursorVariant>("circle");
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });

  const requestRef = useRef<number>(0);

  const setVariant = useCallback((v: CursorVariant) => setVariantState(v), []);
  const contextValue = useMemo(() => ({ setVariant }), [setVariant]);

  // Ciclo de vida logs
  useEffect(() => {
    console.log("[CustomCursor] MOUNT");
    return () => {
      console.log("[CustomCursor] UNMOUNT");
    };
  }, []);

  useEffect(() => {
    setShowCursor(!isMobile());
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []); // Solo al montar/desmontar

  if (!showCursor) {
    return <>{children}</>;
  }

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 999,
          transition: "transform 0.08s cubic-bezier(.4,2,.6,1)",
          mixBlendMode: "difference",
        }}
      >
        {CursorSVGs[variant] || CursorSVGs.circle}
      </div>
    </CursorContext.Provider>
  );
};

export default CustomCursor;

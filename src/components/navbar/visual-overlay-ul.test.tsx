import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VisualOverlayUl from "./visual-overlay-ul";
import { vi } from "vitest";

// Type declarations for spies on globalThis
// Use vi.Mock for Vitest compatibility
declare global {
  // eslint-disable-next-line no-var
  var gsapTo: ReturnType<typeof vi.fn>;
}

vi.mock("gsap", () => {
  globalThis.gsapTo = vi.fn();
  return {
    __esModule: true,
    default: { to: globalThis.gsapTo },
    to: globalThis.gsapTo,
  };
});
vi.mock("react-scroll", () => {
  // Only assign if not already defined
  if (!globalThis.scrollTo) {
    globalThis.scrollTo = vi.fn();
  }
  return { scroller: { scrollTo: globalThis.scrollTo } };
});

const setIsOpen = vi.fn();
const menuItemsRef = { current: [] };

describe("VisualOverlayUl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    menuItemsRef.current = [];
    window.scrollTo = vi.fn(); // Mock window.scrollTo for jsdom
  });

  it("renders all menu items", () => {
    render(
      <VisualOverlayUl
        setIsOpen={setIsOpen}
        menuItemsRef={menuItemsRef}
        isOpen={true}
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Works")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("buttons have correct aria-label and tabIndex", () => {
    render(
      <VisualOverlayUl
        setIsOpen={setIsOpen}
        menuItemsRef={menuItemsRef}
        isOpen={true}
      />
    );
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-label");
      expect(btn).toHaveAttribute("tabIndex", "0");
    });
  });

  it("buttons have tabIndex -1 when isOpen is false", () => {
    render(
      <VisualOverlayUl
        setIsOpen={setIsOpen}
        menuItemsRef={menuItemsRef}
        isOpen={false}
      />
    );
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("tabIndex", "-1");
    });
  });

  it("clicking a button calls setIsOpen(false) and navigates", () => {
    render(
      <VisualOverlayUl
        setIsOpen={setIsOpen}
        menuItemsRef={menuItemsRef}
        isOpen={true}
      />
    );
    const btn = screen.getByRole("button", { name: "Go to Home" });
    fireEvent.click(btn);
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(window.location.hash).toBe("#home");
  });

  it("hover/focus triggers gsap.to for animation", () => {
    render(
      <VisualOverlayUl
        setIsOpen={setIsOpen}
        menuItemsRef={menuItemsRef}
        isOpen={true}
      />
    );
    const btn = screen.getByRole("button", { name: "Go to Home" });
    fireEvent.mouseEnter(btn);
    expect(globalThis.gsapTo).toHaveBeenCalled();
    fireEvent.mouseLeave(btn);
    expect(globalThis.gsapTo).toHaveBeenCalled();
    fireEvent.focus(btn);
    expect(globalThis.gsapTo).toHaveBeenCalled();
    fireEvent.blur(btn);
    expect(globalThis.gsapTo).toHaveBeenCalled();
  });
});

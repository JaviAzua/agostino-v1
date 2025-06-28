import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import VisualOverlay from "./visual-overlay";
import { vi } from "vitest";

vi.mock("./visual-overlay-top", () => ({
  __esModule: true,
  default: () => <div data-testid="top" />,
}));
vi.mock("./visual-overlay-ul", () => ({
  __esModule: true,
  default: () => <ul data-testid="ul" />,
}));
vi.mock("./visual-overlay-footer", () => ({
  __esModule: true,
  default: () => <footer data-testid="footer" />,
}));

describe("VisualOverlay", () => {
  it("renders subcomponents and nav with accessibility", () => {
    const menuItemsRef = { current: [] };
    render(
      <VisualOverlay
        menuItemsRef={menuItemsRef}
        isOpen={true}
        setIsOpen={vi.fn()}
      />
    );
    expect(screen.getByTestId("top")).toBeInTheDocument();
    expect(screen.getByTestId("ul")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });
});

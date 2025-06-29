import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VisualOerlayTop from "./visual-overlay-top";
import { vi } from "vitest";

vi.mock("../Logo", () => ({ Logo: () => <svg data-testid="logo" /> }));
vi.mock("../left-text", () => ({
  __esModule: true,
  default: (props: { className?: string }) => (
    <div data-testid="left-text" {...props} />
  ),
}));
vi.mock("../close-button", () => ({
  __esModule: true,
  default: ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => (
    <button data-testid="close-btn" onClick={() => setIsOpen(false)}>
      Close
    </button>
  ),
}));

describe("VisualOerlayTop", () => {
  it("renders the logo, close button, and left text", () => {
    render(<VisualOerlayTop setIsOpen={vi.fn()} />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
    expect(screen.getByTestId("left-text")).toBeInTheDocument();
  });

  it("close button calls setIsOpen(false)", () => {
    const setIsOpen = vi.fn();
    render(<VisualOerlayTop setIsOpen={setIsOpen} />);
    fireEvent.click(screen.getByTestId("close-btn"));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});

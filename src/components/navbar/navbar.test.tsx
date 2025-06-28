import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar";
import { vi } from "vitest";

// Mock VisualOverlayPortal para simular onExited correctamente
let lastIsOpen = false;
vi.mock("./visual-overlay-portal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    onExited,
    onClick,
    children,
  }: {
    isOpen: boolean;
    onExited: () => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
  }) => {
    // Simular ciclo de cerrado
    if (lastIsOpen && !isOpen && onExited) {
      onExited();
    }
    lastIsOpen = isOpen;
    return isOpen ? (
      <div data-testid="overlay-portal" onClick={onClick}>
        {children}
      </div>
    ) : null;
  },
}));
vi.mock("./visual-overlay", () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <nav data-testid="overlay-nav">Menu</nav> : null,
}));

describe("Navbar", () => {
  beforeEach(() => {
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  });

  it("renderiza el botón de menú", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label");
    expect(button).toHaveAttribute("aria-expanded");
  });

  it("abre y cierra el overlay al hacer click", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    expect(screen.getByTestId("overlay-portal")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByTestId("overlay-portal")).not.toBeInTheDocument();
  });

  it("cierra el menú al presionar Escape", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    expect(screen.getByTestId("overlay-portal")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByTestId("overlay-portal")).not.toBeInTheDocument();
  });

  it("cierra el overlay al hacer click fuera", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    const overlay = screen.getByTestId("overlay-portal");
    fireEvent.click(overlay);
    expect(screen.queryByTestId("overlay-portal")).not.toBeInTheDocument();
  });

  it("body tiene overflow hidden cuando el menú está abierto", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(button);
    expect(document.body.style.overflow).toBe("unset");
  });

  it("snapshot inicial es rápido y estable", () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});

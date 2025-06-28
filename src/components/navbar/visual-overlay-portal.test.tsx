import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VisualOverlayPortal from "./visual-overlay-portal";
import { vi } from "vitest";

describe("VisualOverlayPortal", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  });

  it("renders the overlay in a portal", () => {
    const overlayRef = React.createRef<HTMLDivElement | null>();
    const menuItemsRef = { current: [] };
    render(
      <VisualOverlayPortal
        isOpen={true}
        overlayRef={overlayRef}
        menuItemsRef={menuItemsRef}
      >
        <div data-testid="content">Content</div>
      </VisualOverlayPortal>
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("overlay has correct roles and aria-modal", () => {
    const overlayRef = React.createRef<HTMLDivElement | null>();
    const menuItemsRef = { current: [] };
    render(
      <VisualOverlayPortal
        isOpen={true}
        overlayRef={overlayRef}
        menuItemsRef={menuItemsRef}
      >
        <div>Content</div>
      </VisualOverlayPortal>
    );
    const overlay = document.querySelector("[role='dialog']");
    expect(overlay).toHaveAttribute("aria-modal", "true");
    expect(overlay).toHaveAttribute("aria-hidden", "false");
  });

  it("calls onClick when clicking the background", () => {
    const overlayRef = React.createRef<HTMLDivElement | null>();
    const menuItemsRef = { current: [] };
    const onClick = vi.fn();
    render(
      <VisualOverlayPortal
        isOpen={true}
        overlayRef={overlayRef}
        menuItemsRef={menuItemsRef}
        onClick={onClick}
      >
        <div>Content</div>
      </VisualOverlayPortal>
    );
    const overlay = document.querySelector("[role='dialog']")!;
    fireEvent.click(overlay);
    expect(onClick).toHaveBeenCalled();
  });

  it("calls onExited when closing (simulate animation)", async () => {
    const overlayRef = React.createRef<HTMLDivElement | null>();
    const menuItemsRef = { current: [document.createElement("li")] };
    const onExited = vi.fn();
    const { rerender } = render(
      <VisualOverlayPortal
        isOpen={true}
        overlayRef={overlayRef}
        menuItemsRef={menuItemsRef}
        onExited={onExited}
      >
        <div>Content</div>
      </VisualOverlayPortal>
    );
    rerender(
      <VisualOverlayPortal
        isOpen={false}
        overlayRef={overlayRef}
        menuItemsRef={menuItemsRef}
        onExited={onExited}
      >
        <div>Content</div>
      </VisualOverlayPortal>
    );
    await new Promise((resolve) => setTimeout(resolve, 400)); // Wait for GSAP timeline
    expect(onExited).toHaveBeenCalled();
  });

  it("changes body overflow according to state", () => {
    const overlayRef = React.createRef<HTMLDivElement | null>();
    const menuItemsRef = { current: [document.createElement("li")] };
    render(
      <VisualOverlayPortal
        isOpen={true}
        overlayRef={overlayRef}
        menuItemsRef={menuItemsRef}
      >
        <div>Content</div>
      </VisualOverlayPortal>
    );
    expect(document.body.style.overflow).toBe("hidden");
  });
});

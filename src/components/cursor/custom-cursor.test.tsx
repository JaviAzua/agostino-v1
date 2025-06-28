import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CustomCursor, { useCursor } from "./custom-cursor";
import { vi } from "vitest";

vi.mock("./cursor-utils", () => ({
  isMobile: vi.fn(),
}));
import { isMobile } from "./cursor-utils";

describe("CustomCursor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza los hijos correctamente", () => {
    (isMobile as jest.Mock).mockReturnValue(false);
    render(
      <CustomCursor>
        <div data-testid="child">Contenido</div>
      </CustomCursor>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("no renderiza el cursor en mobile", () => {
    (isMobile as jest.Mock).mockReturnValue(true);
    render(
      <CustomCursor>
        <div data-testid="child">Contenido</div>
      </CustomCursor>
    );
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("renderiza el cursor en desktop", () => {
    (isMobile as jest.Mock).mockReturnValue(false);
    render(
      <CustomCursor>
        <div data-testid="child">Contenido</div>
      </CustomCursor>
    );
    // El div del cursor debe estar en el documento
    expect(
      document.querySelector("div[style*='position: fixed']")
    ).toBeInTheDocument();
  });

  it("el cursor sigue el mouse", () => {
    (isMobile as jest.Mock).mockReturnValue(false);
    let called = false;
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        if (!called) {
          called = true;
          cb(0);
        }
        return 1;
      });
    render(
      <CustomCursor>
        <div data-testid="child">Contenido</div>
      </CustomCursor>
    );
    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });
    });
    expect(rafSpy).toHaveBeenCalled();
    const cursorDiv = document.querySelector(
      "div[style*='position: fixed']"
    ) as HTMLDivElement;
    expect(cursorDiv).toBeInTheDocument();
    rafSpy.mockRestore();
  });

  it("cambia el SVG según el variant", () => {
    (isMobile as jest.Mock).mockReturnValue(false);
    const TestComponent = () => {
      const { setVariant } = useCursor();
      return <button onClick={() => setVariant("arrow")}>Set Arrow</button>;
    };
    render(
      <CustomCursor>
        <TestComponent />
      </CustomCursor>
    );
    act(() => {
      fireEvent.click(screen.getByText("Set Arrow"));
    });
    expect(document.querySelector("svg path")?.getAttribute("d")).toContain(
      "M384 256L0 32V480L384 256z"
    );
  });

  it("limpia listeners y animation frame al desmontar", () => {
    (isMobile as jest.Mock).mockReturnValue(false);
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const cancelAnimationFrameSpy = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(
      <CustomCursor>
        <div />
      </CustomCursor>
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });

  it("no causa renders innecesarios (performance)", () => {
    (isMobile as jest.Mock).mockReturnValue(false);
    let renderCount = 0;
    const Counter = () => {
      renderCount++;
      return <div>Counter</div>;
    };
    render(
      <CustomCursor>
        <Counter />
      </CustomCursor>
    );
    expect(renderCount).toBeLessThanOrEqual(2);
  });
});

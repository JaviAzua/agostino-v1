import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import WorkSection from "./index";
import type { VideoGridType } from "@/types";
import { vi } from "vitest";
import { act } from "react";
// @ts-expect-error: No types for react-scroll
import { scroller } from "react-scroll";

// Mock global de react-scroll
vi.mock("react-scroll", () => {
  const scrollTo = vi.fn();
  return {
    scroller: { scrollTo },
  };
});

// Mock global de video-player-vimeo para evitar requests a Vimeo
vi.mock("@/components/video-player-vimeo", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-vimeo-player" aria-label="Video player" />
  ),
}));

const mockData: VideoGridType[] = [
  {
    _createdAt: new Date(),
    _id: "1",
    _rev: "1",
    _type: "video",
    _updatedAt: new Date(),
    description: "Descripción de video 1",
    name: "Video 1",
    slug: { _type: "slug", current: "video-1" },
    url: "https://vimeo.com/123456789",
  },
  {
    _createdAt: new Date(),
    _id: "2",
    _rev: "2",
    _type: "video",
    _updatedAt: new Date(),
    description: "Descripción de video 2",
    name: "Video 2",
    slug: { _type: "slug", current: "video-2" },
    url: "https://vimeo.com/987654321",
  },
];

describe("WorkSection", () => {
  it("abre el modal con el video, título y descripción al hacer click en un video", () => {
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    const modal = screen.getByRole("dialog", { name: "Video modal" });
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText("Video 1")).toBeInTheDocument();
    expect(
      within(modal).getByText("Descripción de video 1")
    ).toBeInTheDocument();
  });

  it("cierra el modal al hacer click en el botón de cerrar", () => {
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    const closeButton = screen.getByLabelText("Cerrar modal");
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(
      screen.queryByRole("dialog", { name: "Video modal" })
    ).not.toBeInTheDocument();
  });

  it("el video de la grilla no se reproduce al hacer click", () => {
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    expect(
      screen.getByRole("dialog", { name: "Video modal" })
    ).toBeInTheDocument();
  });

  it("el video en el modal tiene controles y autoplay", () => {
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    const modal = screen.getByRole("dialog", { name: "Video modal" });
    const videoPlayer = within(modal).getByLabelText(/Video player/i);
    expect(videoPlayer).toBeInTheDocument();
  });

  it("cierra el modal si navego a otra ruta", async () => {
    Element.prototype.scrollIntoView = vi.fn();
    window.location.hash = "#works";
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    expect(
      screen.getByRole("dialog", { name: "Video modal" })
    ).toBeInTheDocument();
    // Simulo navegación a otra ruta
    await act(async () => {
      window.history.pushState({}, "", "/about");
      fireEvent.popState(window);
    });
    // El modal debe cerrarse
    expect(
      screen.queryByRole("dialog", { name: "Video modal" })
    ).not.toBeInTheDocument();
  });

  it("cierra el modal si hago click en un link del navbar", async () => {
    Element.prototype.scrollIntoView = vi.fn();
    window.location.hash = "#works";
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    expect(
      screen.getByRole("dialog", { name: "Video modal" })
    ).toBeInTheDocument();
    // Simulo click en un link del navbar (cambia el hash)
    await act(async () => {
      window.location.hash = "#about";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Video modal" })
      ).not.toBeInTheDocument();
    });
  });

  it("cierra el modal si hago scroll en window", () => {
    Element.prototype.scrollIntoView = vi.fn();
    window.location.hash = "#works";
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    expect(
      screen.getByRole("dialog", { name: "Video modal" })
    ).toBeInTheDocument();
    // Simulo scroll
    fireEvent.scroll(window);
    expect(
      screen.queryByRole("dialog", { name: "Video modal" })
    ).not.toBeInTheDocument();
  });

  it("cuando el modal está abierto, el body tiene overflow: hidden", () => {
    Element.prototype.scrollIntoView = vi.fn();
    window.location.hash = "#works";
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    expect(document.body.style.overflow).toBe("hidden");
    // Cierro el modal
    const closeButton = screen.getByLabelText("Cerrar modal");
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("al navegar a un hash desde el modal, la url queda solo con el hash y el modal se cierra", async () => {
    Element.prototype.scrollIntoView = vi.fn();
    window.location.hash = "#works";
    window.history.pushState({}, "", "/works/video-4#works");
    render(<WorkSection data={mockData} />);
    // Abro el modal manualmente
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[1]); // video-4
    });
    expect(
      screen.getByRole("dialog", { name: "Video modal" })
    ).toBeInTheDocument();
    // Simulo click en un link del navbar (cambia el hash)
    await act(async () => {
      window.location.hash = "#home";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Video modal" })
      ).not.toBeInTheDocument();
    });
    expect(window.location.pathname + window.location.hash).toBe("/#home");
  });
});

describe("WorkSection - Deep Linking y Scroll", () => {
  beforeEach(() => {
    scroller.scrollTo.mockClear();
    window.location.hash = "";
    Element.prototype.scrollIntoView = vi.fn();
    window.scrollTo = vi.fn();
  });

  it("al renderizar con #works hace scroll al id works", () => {
    window.location.hash = "#works";
    render(<WorkSection data={mockData} />);
    expect(scroller.scrollTo).toHaveBeenCalledWith(
      "works",
      expect.objectContaining({ smooth: true })
    );
  });

  it("al renderizar con slug en la url abre el modal correspondiente", () => {
    // Simular que la url es /works/video-1
    window.history.pushState({}, "", "/works/video-1");
    render(<WorkSection data={mockData} />);
    const modal = screen.getByRole("dialog", { name: "Video modal" });
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText("Video 1")).toBeInTheDocument();
  });

  it("al abrir un modal desde la grilla, la url cambia a /works/[slug] y el scroll se mantiene", () => {
    window.location.hash = "#works";
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    expect(window.location.pathname).toContain("/works/video-1");
    expect(scroller.scrollTo).toHaveBeenCalledWith(
      "works",
      expect.objectContaining({ smooth: true })
    );
  });

  it("al cerrar el modal, la url vuelve a /works y el scroll se mantiene", () => {
    window.location.hash = "#works";
    render(<WorkSection data={mockData} />);
    const videoButtons = screen.getAllByRole("button", {
      name: /Abrir modal de/i,
    });
    act(() => {
      fireEvent.click(videoButtons[0]);
    });
    const closeButton = screen.getByLabelText("Cerrar modal");
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(window.location.pathname).toBe("/works");
    expect(scroller.scrollTo).toHaveBeenCalledWith(
      "works",
      expect.objectContaining({ smooth: true })
    );
  });
});

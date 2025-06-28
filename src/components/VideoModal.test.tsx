import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VideoModal from "./VideoModal";
import type { VideoGridType } from "@/types";
import { vi } from "vitest";

const mockVideo: VideoGridType = {
  _createdAt: new Date(),
  _id: "1",
  _rev: "1",
  _type: "video",
  _updatedAt: new Date(),
  description: "Descripción de video",
  name: "Video Test",
  slug: { _type: "slug", current: "video-test" },
  url: "https://vimeo.com/123456789",
};

describe("VideoModal", () => {
  it("no renderiza si open es false", () => {
    render(<VideoModal open={false} onClose={() => {}} video={mockVideo} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("no renderiza si video es null", () => {
    render(<VideoModal open={true} onClose={() => {}} video={null} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renderiza correctamente y es accesible", () => {
    render(<VideoModal open={true} onClose={() => {}} video={mockVideo} />);
    const modal = screen.getByRole("dialog", { name: "Video modal" });
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Video Test")).toBeInTheDocument();
    expect(screen.getByText("Descripción de video")).toBeInTheDocument();
    expect(screen.getByLabelText("Cerrar modal")).toBeInTheDocument();
  });

  it("llama a onClose al hacer click en el botón de cerrar", () => {
    const onClose = vi.fn();
    render(<VideoModal open={true} onClose={onClose} video={mockVideo} />);
    const closeButton = screen.getByLabelText("Cerrar modal");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});

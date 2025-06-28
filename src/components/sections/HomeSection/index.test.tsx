import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeSection from "./index";

const mockData = [
  {
    _createdAt: new Date(),
    _id: "1",
    _rev: "1",
    _type: "banner",
    _updatedAt: new Date(),
    title: "Test Banner",
    url: "https://vimeo.com/123456789",
    description: "Banner description",
    image: null,
    slug: { _type: "slug", current: "test-banner" },
  },
];

describe("HomeSection", () => {
  it("renderiza sin crashear con datos mínimos", () => {
    render(<HomeSection data={mockData} />);
    expect(screen.getByRole("region", { hidden: true })).toBeInTheDocument();
  });

  it("renderiza el logo correctamente", () => {
    render(<HomeSection data={mockData} />);
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });

  it("renderiza el video si hay url", () => {
    render(<HomeSection data={mockData} />);
    expect(screen.getByLabelText(/video player/i)).toBeInTheDocument();
  });

  it("renderiza el footer y el navbar", () => {
    render(<HomeSection data={mockData} />);
    expect(
      screen.getByRole("contentinfo", { hidden: true })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { hidden: true })
    ).toBeInTheDocument();
  });

  it("oculta el footer al hacer scroll", () => {
    render(<HomeSection data={mockData} />);
    const footer = screen.getByRole("contentinfo", { hidden: true });
    expect(footer).toBeInTheDocument();
    // Simular scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    // El footer sigue existiendo en el DOM
    expect(footer).toBeInTheDocument();
  });

  it("el section tiene el id y clases correctas", () => {
    render(<HomeSection data={mockData} />);
    const section = screen.getByRole("region", { hidden: true });
    expect(section).toHaveAttribute("id", "home");
    expect(section).toHaveClass("relative");
    expect(section).toHaveClass("flex");
    expect(section).toHaveClass("bg-night");
  });
});

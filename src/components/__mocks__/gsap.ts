import { vi } from "vitest";

export const gsapToMock = vi.fn();
export const gsapSetMock = vi.fn();

export const gsap = {
  to: gsapToMock,
  set: gsapSetMock,
  fromTo: vi.fn(),
};

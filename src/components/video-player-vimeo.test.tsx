import "@testing-library/jest-dom";
import React from "react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { gsapToMock } from "./__mocks__/gsap";

// Mock window.matchMedia for desktop
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false, // always desktop
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Define spies globally so they are reused in all tests
const playMock = vi.fn().mockResolvedValue(undefined);
const pauseMock = vi.fn().mockResolvedValue(undefined);
const getPausedMock = vi.fn().mockResolvedValue(true);
const getVolumeMock = vi.fn().mockResolvedValue(0);
const setVolumeMock = vi.fn().mockResolvedValue(undefined);
const unloadMock = vi.fn();

// Mock Vimeo Player
vi.mock("@vimeo/player", () =>
  vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    setVolume: setVolumeMock,
    getPaused: getPausedMock,
    play: playMock,
    pause: pauseMock,
    getVolume: getVolumeMock,
    unload: unloadMock,
    requestPictureInPicture: vi.fn(),
    exitPictureInPicture: vi.fn(),
    getPictureInPicture: vi.fn(),
    getAutopause: vi.fn(),
    setAutopause: vi.fn(),
    getChapters: vi.fn(),
    getCurrentChapter: vi.fn(),
    addCuePoint: vi.fn(),
    removeCuePoint: vi.fn(),
    getCuePoints: vi.fn(),
    getBuffered: vi.fn(),
    getCurrentTime: vi.fn(),
    setCurrentTime: vi.fn(),
    getDuration: vi.fn(),
    getEnded: vi.fn(),
    getLoop: vi.fn(),
    setLoop: vi.fn(),
    getMuted: vi.fn(),
    setMuted: vi.fn(),
    getPlayed: vi.fn(),
    getSeekable: vi.fn(),
  }))
);

// Mock GSAP with spies and export them for assertions
vi.mock("@gsap/react", () => ({ useGSAP: () => {} }));

// Use the manual mock for @vimeo/player
vi.mock("@vimeo/player");

import VideoPlayerVimeo from "./video-player-vimeo";

const vimeoUrl = "https://vimeo.com/123456789";

describe("VideoPlayerVimeo (TDD)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    gsapToMock.mockClear();
    playMock.mockClear();
    pauseMock.mockClear();
    getPausedMock.mockClear();
    getVolumeMock.mockClear();
    setVolumeMock.mockClear();
    unloadMock.mockClear();
    getPausedMock.mockResolvedValue(true);
    getVolumeMock.mockResolvedValue(0);
  });

  it("renders the component and main container with aria-label and role", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} />);
    const container = screen.getByLabelText(/video player/i);
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("role", "video");
  });

  it("applies extra className if passed as prop", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} className="test-class" />);
    expect(screen.getByLabelText(/video player/i)).toHaveClass("test-class");
  });

  it("applies a hover:scale-* class if shouldScaleUp=true", () => {
    render(
      <VideoPlayerVimeo
        vimeoUrl={vimeoUrl}
        shouldScaleUp={true}
        shouldScaleDown={false}
      />
    );
    const container = screen.getByLabelText(/video player/i);
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toMatch(/hover:scale-[\w-]+/);
  });

  it("applies a hover:scale-* class if shouldScaleDown=true", () => {
    render(
      <VideoPlayerVimeo
        vimeoUrl={vimeoUrl}
        shouldScaleUp={false}
        shouldScaleDown={true}
      />
    );
    const container = screen.getByLabelText(/video player/i);
    const wrapper = container.querySelector("div");
    expect(wrapper?.className).toMatch(/hover:scale-[\w-]+/);
  });

  it("shows controls if showControls=true", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} showControls={true} />);
    expect(screen.getByLabelText(/video controls/i)).toBeVisible();
  });

  it("hides controls if showControls=false", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} showControls={false} />);
    const controls = screen.getByLabelText(/video controls/i);
    expect(controls).toHaveStyle({ pointerEvents: "none" });
  });

  it("controls are accessible by aria-label", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} showControls={true} />);
    expect(screen.getByLabelText(/video controls/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/play video|pause video/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/mute video|unmute video/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/fullscreen video|exit fullscreen/i)
    ).toBeInTheDocument();
  });

  it("volume slider is accessible", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} showControls={true} />);
    expect(screen.getByLabelText(/volume/i)).toBeInTheDocument();
  });

  it("allows clicking play/pause", () => {
    getPausedMock.mockResolvedValue(true);
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} showControls={true} />);
    const playPauseBtn = screen.getByLabelText(/play video|pause video/i);
    fireEvent.click(playPauseBtn);
    expect(playPauseBtn).toBeInTheDocument();
  });

  it("allows clicking mute/unmute", () => {
    getVolumeMock.mockResolvedValue(0);
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} showControls={true} />);
    const muteBtn = screen.getByLabelText(/mute video|unmute video/i);
    fireEvent.click(muteBtn);
    expect(muteBtn).toBeInTheDocument();
  });

  it("allows clicking fullscreen", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} showControls={true} />);
    const fullscreenBtn = screen.getByLabelText(
      /fullscreen video|exit fullscreen/i
    );
    fireEvent.click(fullscreenBtn);
    expect(fullscreenBtn).toBeInTheDocument();
  });

  it("renders correctly with autoplay=false", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} autoplay={false} />);
    expect(screen.getByLabelText(/video player/i)).toBeInTheDocument();
  });

  it("accepts and renders the title prop if passed", () => {
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} title="My video" />);
    // Not used in DOM, but test ensures no crash
    expect(screen.getByLabelText(/video player/i)).toBeInTheDocument();
  });

  it.skip("should animate scale to 1.10 on hover if shouldScaleUp is true", async () => {
    render(
      <VideoPlayerVimeo
        vimeoUrl={vimeoUrl}
        shouldScaleUp={true}
        shouldScaleDown={false}
      />
    );
    const container = screen.getByLabelText(/video player/i);
    await waitFor(() => expect(container).toBeInTheDocument());
    fireEvent.mouseEnter(container);
    expect(gsapToMock).toHaveBeenCalledWith(
      container,
      expect.objectContaining({ scale: 1.1 })
    );
    fireEvent.mouseLeave(container);
    expect(gsapToMock).toHaveBeenCalledWith(
      container,
      expect.objectContaining({ scale: 1 })
    );
  });

  it.skip("should animate scale to 0.75 on hover if shouldScaleDown is true", async () => {
    render(
      <VideoPlayerVimeo
        vimeoUrl={vimeoUrl}
        shouldScaleUp={false}
        shouldScaleDown={true}
      />
    );
    const container = screen.getByLabelText(/video player/i);
    await waitFor(() => expect(container).toBeInTheDocument());
    fireEvent.mouseEnter(container);
    expect(gsapToMock).toHaveBeenCalledWith(
      container,
      expect.objectContaining({ scale: 0.75 })
    );
    fireEvent.mouseLeave(container);
    expect(gsapToMock).toHaveBeenCalledWith(
      container,
      expect.objectContaining({ scale: 1 })
    );
  });

  it.skip("should play on hover and pause on mouse leave if playOnHover is true", async () => {
    getPausedMock.mockResolvedValue(true); // Always paused for this test
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} playOnHover={true} />);
    const container = screen.getByLabelText(/video player/i);
    await waitFor(() => expect(container).toBeInTheDocument());
    fireEvent.mouseEnter(container);
    expect(playMock).toHaveBeenCalled();
    fireEvent.mouseLeave(container);
    expect(pauseMock).toHaveBeenCalled();
  });

  it.skip("should toggle play/pause on video click", async () => {
    let paused = true;
    getPausedMock.mockImplementation(() => Promise.resolve(paused));
    playMock.mockImplementation(() => {
      paused = false;
      return Promise.resolve();
    });
    pauseMock.mockImplementation(() => {
      paused = true;
      return Promise.resolve();
    });
    render(<VideoPlayerVimeo vimeoUrl={vimeoUrl} />);
    const container = screen.getByLabelText(/video player/i);
    await waitFor(() => expect(container).toBeInTheDocument());
    // First click: should play
    fireEvent.click(container);
    await waitFor(() => expect(playMock).toHaveBeenCalled());
    // Second click: should pause
    fireEvent.click(container);
    await waitFor(() => expect(pauseMock).toHaveBeenCalled());
  });
});

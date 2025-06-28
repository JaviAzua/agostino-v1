"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import Player from "@vimeo/player";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Play,
  Pause,
  VolumeX,
  Volume2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerVimeoProps {
  vimeoUrl: string;
  title?: string;
  autoplay?: boolean;
  shouldScale?: boolean;
}

const VideoPlayerVimeo = ({
  vimeoUrl,
  autoplay = true,
  shouldScale = true,
}: VideoPlayerVimeoProps) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const playerRef = useRef<Player | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  /*   const [isVideoLoading, setIsVideoLoading] = useState(true); */
  const [volume, setVolume] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const vimeoId = vimeoUrl ? Number(vimeoUrl.split("/").pop()) : undefined;

  useGSAP(() => {
    // Animate video container entrance
    if (playerContainerRef.current) {
      gsap.set(playerContainerRef.current, {
        autoAlpha: 0,
        y: 30,
      });

      gsap.to(playerContainerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });

      // Subtle hover effect
      const videoElement = playerContainerRef.current;

      if (shouldScale) {
        videoElement.addEventListener("mouseenter", () => {
          gsap.to(videoElement, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        videoElement.addEventListener("mouseleave", () => {
          gsap.to(videoElement, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    }

    // Animate controls on mount
    if (controlsRef.current) {
      gsap.set(controlsRef.current, {
        y: 50,
        autoAlpha: 0,
      });

      gsap.to(controlsRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.5,
      });
    }

    // Loading animation
    if (loadingRef.current) {
      const spinner = loadingRef.current.querySelector(".loading-spinner");
      if (spinner) {
        gsap.to(spinner, {
          rotation: 360,
          duration: 1,
          repeat: -1,
          ease: "none",
        });
      }
    }

    // Volume slider initial state
    if (volumeSliderRef.current) {
      gsap.set(volumeSliderRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
    }
  }, []);

  useEffect(() => {
    if (!playerContainerRef.current || !vimeoId) return;
    const container = playerContainerRef.current;
    if (!container) return;

    const player = new Player(playerContainerRef.current, {
      id: vimeoId,
      autoplay: autoplay,
      muted: true,
      controls: false,
      responsive: true,
      background: false,
      loop: true,
    });
    playerRef.current = player;
    /* setIsVideoLoading(true); */

    player.on("loaded", () => {
      /*  setIsVideoLoading(false); */

      // Animate loading out and video in
      if (loadingRef.current) {
        gsap.to(loadingRef.current, {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }

      // Animate video fade in when loaded
      const iframe = playerContainerRef.current?.querySelector("iframe");
      if (iframe) {
        gsap.fromTo(
          iframe,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.3,
            zIndex: -1,
          }
        );
      }

      player.setVolume(0).then(() => {
        setVolume(0);
        setIsMuted(true);
      });
      player.getPaused().then((paused: boolean) => setIsPlaying(!paused));
    });

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("volumechange", (data: { volume: number }) => {
      setVolume(data.volume);
      setIsMuted(data.volume === 0);
    });

    return () => {
      player.unload();
    };
  }, [vimeoId, autoplay]);

  // Enhanced button animations
  const animateButton = (element: HTMLElement, scale = 1.15) => {
    gsap.to(element, {
      scale,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };

  const togglePlayPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButton(e.currentTarget);
    if (!playerRef.current) return;
    playerRef.current.getPaused().then((paused: boolean) => {
      if (paused) {
        playerRef.current?.play();
      } else {
        playerRef.current?.pause();
      }
    });
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButton(e.currentTarget);
    if (!playerRef.current) return;
    playerRef.current.getVolume().then((vol: number) => {
      if (vol === 0) {
        playerRef.current?.setVolume(0.4);
        // Animate volume slider in
        if (volumeSliderRef.current) {
          gsap.to(volumeSliderRef.current, {
            scaleX: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        }
      } else {
        playerRef.current?.setVolume(0);
        // Animate volume slider out
        if (volumeSliderRef.current) {
          gsap.to(volumeSliderRef.current, {
            scaleX: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        }
      }
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const handleFullscreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButton(e.currentTarget);
    if (!playerContainerRef.current) return;
    if (isFullscreen) {
      const doc = document as Document & {
        webkitExitFullscreen?: () => void;
        msExitFullscreen?: () => void;
      };
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    } else {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      } else if (
        (
          playerContainerRef.current as unknown as {
            webkitRequestFullscreen?: () => void;
          }
        ).webkitRequestFullscreen
      ) {
        (
          playerContainerRef.current as unknown as {
            webkitRequestFullscreen: () => void;
          }
        ).webkitRequestFullscreen();
      } else if (
        (
          playerContainerRef.current as unknown as {
            msRequestFullscreen?: () => void;
          }
        ).msRequestFullscreen
      ) {
        (
          playerContainerRef.current as unknown as {
            msRequestFullscreen: () => void;
          }
        ).msRequestFullscreen();
      }
    }
  };

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setShowControls(true));
      container.addEventListener("mouseleave", () => setShowControls(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () =>
          setShowControls(true)
        );
        container.removeEventListener("mouseleave", () =>
          setShowControls(false)
        );
      }
      clearTimeout(timeout);
    };
  }, []);

  // Animate controls visibility
  useEffect(() => {
    if (controlsRef.current) {
      gsap.to(controlsRef.current, {
        autoAlpha: showControls ? 1 : 0,
        y: showControls ? 0 : 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [showControls]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as Document & {
        webkitFullscreenElement?: Element;
        msFullscreenElement?: Element;
      };
      const fullscreenElement =
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const buttonColor = "text-white hover:bg-white/20";

  return (
    <div
      ref={playerContainerRef}
      className="relative mx-auto w-full aspect-video overflow-hidden shadow-2xl"
    >
      {/*  {isVideoLoading && (
        <div
          ref={loadingRef}
          className={`absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm text-honeydew bg-night/50`}
        >
          <div className="flex flex-col items-center gap-4">
            <svg
              className="loading-spinner h-12 w-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <p className="text-sm font-medium">Loading video...</p>
          </div>
        </div>
      )} */}

      <div
        ref={controlsRef}
        className="cursor-none absolute bottom-4 right-4 flex gap-2 z-10 items-center bg-black/20 backdrop-blur-md rounded-full px-3 py-2 pointer-events-auto"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          className={`${buttonColor} hover:scale-110 transition-transform`}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className={`${buttonColor} hover:scale-110 transition-transform`}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>

        <input
          ref={volumeSliderRef}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(volume * 100)}
          onChange={handleVolumeChange}
          className="w-20 h-2 accent-persian_orange bg-white/30 rounded-lg appearance-none"
          aria-label="Volume"
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreen}
          className={`${buttonColor} hover:scale-110 transition-transform`}
          aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen video"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayerVimeo;

"use client";

import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
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
import { cn } from "@/lib/utils";

interface VideoPlayerVimeoProps {
  vimeoUrl: string;
  title?: string;
  autoplay?: boolean;
  shouldScaleUp?: boolean;
  shouldScaleDown?: boolean;
  className?: string;
  showControls?: boolean;
  playOnHover?: boolean;
  onReady?: () => void;
}

export interface VideoPlayerVimeoHandle {
  play: () => void;
  pause: () => void;
  setVolume: (v: number) => void;
  getPlayer: () => Player | null;
}

const VideoPlayerVimeo = forwardRef<
  VideoPlayerVimeoHandle,
  VideoPlayerVimeoProps
>((props, ref) => {
  const {
    vimeoUrl,
    autoplay = true,
    shouldScaleUp = true,
    className,
    shouldScaleDown = false,
    showControls,
    playOnHover = false,
    onReady,
  } = props;
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const playerRef = useRef<Player | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const [showControlsState, setShowControls] = useState(true);

  const vimeoId = vimeoUrl ? Number(vimeoUrl.split("/").pop()) : undefined;

  useGSAP(() => {
    // Solo animar la entrada de los controles al montar
    if (controlsRef.current) {
      gsap.fromTo(
        controlsRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.5,
        }
      );
    }
    // El slider de volumen inicia oculto
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
      autoplay: false, // autoplay se controla por separado
      muted: true,
      controls: false,
      responsive: true,
      background: false,
      loop: true,
    });
    playerRef.current = player;

    player.on("loaded", () => {
      const iframe = playerContainerRef.current?.querySelector("iframe");
      if (iframe) {
        gsap.fromTo(
          iframe,
          { autoAlpha: 0 },
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
      });
      player.getPaused().then((paused: boolean) => setIsPlaying(!paused));
      if (onReady) onReady();
    });

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("volumechange", (data: { volume: number }) => {
      setVolume(data.volume);
    });

    return () => {
      player.unload();
      playerRef.current = null;
    };
  }, [vimeoId, vimeoUrl, onReady]);

  // Controlar autoplay dinámicamente
  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.getPaused().then((paused: boolean) => {
      if (autoplay && paused) {
        playerRef.current?.play?.();
      } else if (!autoplay && !paused) {
        playerRef.current?.pause?.();
      }
    });
  }, [autoplay]);

  // Centralizar play/pause
  const handlePlayPause = () => {
    if (!playerRef.current) return;
    playerRef.current.getPaused().then((paused: boolean) => {
      if (paused) {
        playerRef.current?.play?.();
      } else {
        playerRef.current?.pause?.();
      }
    });
  };

  // Centralizar mute/unmute y animación del slider
  const handleMute = () => {
    if (!playerRef.current) return;
    if (volume === 0) {
      playerRef.current.setVolume(0.4);
      if (volumeSliderRef.current) {
        gsap.to(volumeSliderRef.current, {
          scaleX: 1,
          ease: "back.out(1.7)",
        });
      }
    } else {
      playerRef.current.setVolume(0);
      if (volumeSliderRef.current) {
        gsap.to(volumeSliderRef.current, {
          scaleX: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
    // Mostrar el slider si el volumen es mayor a 0
    if (volumeSliderRef.current) {
      gsap.to(volumeSliderRef.current, {
        scaleX: newVolume > 0 ? 1 : 0,
        duration: 0.2,
        ease: newVolume > 0 ? "back.out(1.7)" : "power2.in",
      });
    }
  };

  const handleFullscreen = () => {
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

  // Visibilidad de controles solo por estado interno
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

  // Determinar visibilidad de controles: prop tiene prioridad, si no, estado interno
  const controlsVisible =
    showControls !== undefined ? showControls : showControlsState;

  // Eliminar animación Y en visibilidad, solo opacidad
  useEffect(() => {
    if (controlsRef.current) {
      gsap.to(controlsRef.current, {
        autoAlpha: controlsVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [controlsVisible]);

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

  const handleScaleEnter = () => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;
    if (!playOnHover) return;
    if (playerRef.current) {
      playerRef.current.play();
    }
  };
  const handleScaleLeave = () => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    if (!playOnHover) return;
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      play: () => playerRef.current?.play?.(),
      pause: () => playerRef.current?.pause?.(),
      setVolume: (v: number) => playerRef.current?.setVolume?.(v),
      getPlayer: () => playerRef.current,
    }),
    []
  );

  // 1. Crear un pequeño componente para los botones de control
  const ControlButton = ({
    onClick,
    ariaLabel,
    children,
    tabIndex = 0,
    onKeyDown,
    className = "",
  }: {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    ariaLabel: string;
    children: React.ReactNode;
    tabIndex?: number;
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    className?: string;
  }) => (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={`text-white hover:bg-white/20 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-persian_orange ${className}`}
    >
      {children}
    </Button>
  );

  return (
    <div
      aria-label="Video player"
      role="video"
      className={cn(
        "relative mx-auto w-full aspect-video shadow-2xl transition-all duration-300 cursor-none select-none",
        className
      )}
    >
      <div
        ref={playerContainerRef}
        onMouseEnter={handleScaleEnter}
        onMouseLeave={handleScaleLeave}
        className={cn(
          "w-full h-full transition-transform duration-100",
          shouldScaleDown
            ? "hover:scale-[0.99]"
            : shouldScaleUp
            ? "hover:scale-[1.01]"
            : undefined
        )}
        style={{ height: "100%" }}
      >
        {/* Vimeo iframe will be injected here by Player */}
        {/* Controls */}
        <div
          ref={controlsRef}
          onClick={(e) => e.stopPropagation()}
          id="controls"
          aria-label="Video controls"
          className="cursor-none absolute bottom-4 right-4 flex gap-2 z-10 items-center bg-black/20 backdrop-blur-md rounded-full px-3 py-2"
          style={{
            pointerEvents: controlsVisible ? "auto" : "none",
            display: controlsVisible ? "flex" : "none",
          }}
        >
          <ControlButton
            onClick={handlePlayPause}
            ariaLabel={isPlaying ? "Pause video" : "Play video"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handlePlayPause();
            }}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </ControlButton>
          <ControlButton
            onClick={handleMute}
            ariaLabel={volume === 0 ? "Unmute video" : "Mute video"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleMute();
            }}
          >
            {volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </ControlButton>
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
          <ControlButton
            onClick={handleFullscreen}
            ariaLabel={isFullscreen ? "Exit fullscreen" : "Fullscreen video"}
            onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
              if (e.key === "Enter" || e.key === " ") handleFullscreen();
            }}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </ControlButton>
        </div>
      </div>
    </div>
  );
});

VideoPlayerVimeo.displayName = "VideoPlayerVimeo";

export default VideoPlayerVimeo;

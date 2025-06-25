"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Player from "@vimeo/player";
import VideoPlayerVimeo from "@/components/VideoPlayerVimeo";
import type { BannerType } from "@/types";

gsap.registerPlugin(SplitText);

interface HomeSectionProps {
  data: BannerType[];
  isNight: boolean;
}

export default function HomeSection({ data, isNight }: HomeSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const vimeoUrl = data[0]?.url;
  const vimeoId = vimeoUrl ? Number(vimeoUrl.split("/").pop()) : undefined;

  useGSAP(() => {
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: "words,lines" });

      gsap.from(split.words, {
        delay: 0.5,
        y: 15,
        autoAlpha: 0,
        filter: "blur(15px)",
        stagger: 0.1,
      });
    }
  }, []);

  useEffect(() => {
    if (!playerContainerRef.current || !vimeoId) return;
    const player = new Player(playerContainerRef.current, {
      id: vimeoId,
      autoplay: true,
      muted: true,
      controls: false,
      responsive: true,
      background: false,
    });
    playerRef.current = player;

    player.on("loaded", () => {
      // Animate video fade in when loaded
      if (playerContainerRef.current) {
        gsap.fromTo(
          playerContainerRef.current.querySelector("iframe"),
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    });

    player.on("play", () => {});
    player.on("pause", () => {});
    player.on("volumechange", () => {});

    player.getPaused().then(() => {});

    return () => {
      player.unload();
    };
  }, [vimeoId]);

  const bgClass = isNight ? "bg-night" : "bg-honeydew";
  const textClass = isNight ? "text-persian_orange" : "text-night";

  return (
    <div id="home" className={`${bgClass} h-dvh flex flex-col overflow-hidden`}>
      <div ref={titleRef} className="w-full flex flex-col">
        <h1
          className={`relative font-dm px-6 pt-6 font-bold text-[4rem] md:text-[7rem] lg:text-[8rem] xl:text-[9rem] ${textClass} text-right leading-none`}
        >
          GONZALO AGOSTINO
        </h1>
        <p
          className={`${textClass} text-right text-pretty px-10 text-[1.5rem] md:text-[2rem] lg:text-[2.75rem] xl:text-[3.5rem] font-darker-grotesque w-[50%] md:w-full self-end`}
        >
          Unlock the power of storytelling with high-quality video editing
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        {vimeoUrl && <VideoPlayerVimeo vimeoUrl={vimeoUrl} isNight={isNight} />}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import VideoPlayerVimeo from "@/components/video-player-vimeo";
import type { BannerType } from "@/types";

gsap.registerPlugin(SplitText);

interface HomeSectionProps {
  data: BannerType[];
  isNight: boolean;
}

export default function HomeSection({ data, isNight }: HomeSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const vimeoUrl = data[0]?.url;

  useGSAP(() => {
    if (titleRef.current) {
      const subtitle = document.getElementById("subtitle");
      const subtitleSplit = new SplitText(subtitle, { type: "words" });

      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        autoAlpha: 0,
        filter: "blur(15px)",
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });

      tl.from(
        subtitleSplit.words,
        {
          y: 10,
          autoAlpha: 0,
          filter: "blur(5px)",
          stagger: 0.1,
          ease: "power1.out",
        },
        "-=0.3"
      );
    }
  }, []);

  const bgClass = isNight ? "bg-night" : "bg-honeydew";
  const textClass = isNight ? "text-persian_orange" : "text-night";

  return (
    <div id="home" className={`${bgClass} min-h-dvh overflow-x-hidden`}>
      <div className="w-full flex flex-col items-end">
        <h1
          ref={titleRef}
          className={`relative font-dm px-6 pt-10 md:pt-6 font-bold text-[2rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[10rem] ${textClass} text-right leading-none w-[70%] lg:w-full`}
        >
          GONZALO AGOSTINO
        </h1>
        <p
          id="subtitle"
          className={`${textClass} text-right text-pretty px-10 text-[1rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.75rem] xl:text-[3.5rem] font-darker-grotesque w-[50%] md:w-full self-end`}
        >
          Unlock the power of storytelling with high-quality video editing
        </p>
      </div>
      <div className="w-full pt-20 pb-20 flex flex-col items-center max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] 2xl:max-w-[50vw] mx-auto">
        {vimeoUrl && (
          <VideoPlayerVimeo
            vimeoUrl={vimeoUrl}
            isNight={isNight}
            title="Home Video"
          />
        )}
      </div>
    </div>
  );
}

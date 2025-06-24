"use client";

import { BannerType } from "@/types";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface HomeSectionProps {
  data: BannerType[];
  isNight: boolean;
}

export default function HomeSection({ data, isNight }: HomeSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: "words" });
      gsap.from(split.words, {
        duration: 0.5,
        y: 15,
        autoAlpha: 0,
        filter: "blur(15px)",
        stagger: 0.1,
      });
    }
  }, []);

  const bgClass = isNight ? "bg-night" : "bg-honeydew";
  const textClass = isNight ? "text-persian_orange" : "text-night";

  return (
    <div id="home" className={`${bgClass} h-dvh flex justify-end`}>
      <h1
        ref={titleRef}
        className={`font-dm font-bold text-[3rem] sm:text-[4rem] md:text-[7rem] lg:text-[8rem] xl:text-[11rem] ${textClass} text-right p-4 -tracking-[0.01em] leading-none`}
      >
        GONZALO
        <br />
        AGOSTINO
      </h1>
    </div>
  );
}

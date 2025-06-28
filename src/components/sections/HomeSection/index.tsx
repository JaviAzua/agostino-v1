"use client";

import VideoPlayerVimeo from "@/components/video-player-vimeo";
import type { BannerType } from "@/types";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/navbar/navbar";
import JaLogo from "@/components/ja-logo";
import { Logo } from "@/components/Logo";

interface HomeSectionProps {
  data: BannerType[];
}

export default function HomeSection({ data }: HomeSectionProps) {
  const vimeoUrl = data[0]?.url;
  const scopeRef = useRef(null);
  const [isFooterHidden, setIsFooterHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsFooterHidden(true);
      } else {
        setIsFooterHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const logoContainerElement =
        gsap.utils.selector(scopeRef)(".logo-container");
      const logoPathElement = gsap.utils.selector(scopeRef)(
        ".logo-container path"
      );
      const videoContainerElement =
        gsap.utils.selector(scopeRef)(".video-container");
      const footerElement = gsap.utils.selector(scopeRef)(".footer-element");
      const mainTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        repeat: 0,
      });

      mainTl.fromTo(
        logoContainerElement,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1 }
      );
      mainTl.fromTo(
        footerElement,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        "+=0.2"
      );
      mainTl.fromTo(
        videoContainerElement,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 },
        "+=0.2"
      );

      const colors = [
        "#eaf2e3",
        "#ed8f49",
        "#85baa1",
        "#e8e7ee",
        "#fac5cf",
        "eaf2e3",
      ];
      const colorDuration = 10;

      const colorTl = gsap.timeline({ repeat: -1, yoyo: true });

      colors.forEach((color) => {
        colorTl.to(logoPathElement, {
          delay: 3,
          fill: color,
          duration: colorDuration,
          ease: "none",
        });
      });

      const triangleElement = gsap.utils.selector(scopeRef)(".triangle");
      const tl = gsap.timeline({
        yoyo: true,
        repeat: -1,
      });

      tl.to(triangleElement, { height: "40px", duration: 2.4 })
        .to(triangleElement, { height: "60px", duration: 0.8 })
        .to(triangleElement, { height: "40px", duration: 0.8 });
    },

    { scope: scopeRef }
  );

  return (
    <div
      ref={scopeRef}
      className="relative flex flex-col h-dvh w-full bg-night"
    >
      <div className="w-full p-6 z-0 logo-container">
        <Logo className="w-full h-auto" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {vimeoUrl && (
          <div className="video-container w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] 2xl:max-w-[50vw]">
            <VideoPlayerVimeo vimeoUrl={vimeoUrl} title="Home Video" />
          </div>
        )}
      </div>

      <footer
        className={`w-full absolute bottom-0 flex z-20 footer-element text-honeydew ${
          isFooterHidden && "hidden"
        }`}
      >
        <JaLogo className="flex-1" />
        <div
          id="triangle"
          className="w-[2px] bg-current absolute bottom-0 left-1/2 -translate-x-1/2 triangle h-[20px]"
        ></div>
        <div className="pb-2 flex-1 flex justify-end px-4">
          <Navbar />
        </div>
      </footer>
    </div>
  );
}

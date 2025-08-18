import { Logo } from "@/components/Logo";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function WorkSectionLogo() {
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = logoContainerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.set(el, { zIndex: 0 }).fromTo(
        el,
        { autoAlpha: 0, filter: "blur(10px)" },
        {
          filter: "blur(0px)",
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  useGSAP(() => {
    const logoPathElement = gsap.utils.selector(logoContainerRef)(
      ".logo-container path"
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
  }, []);

  return (
    <div
      ref={logoContainerRef}
      className="w-full p-6 absolute z-0 -bottom-10 logo-container"
    >
      <Logo
        className="w-full h-auto"
        role="img"
        aria-label="Logo"
        color="#ed8f49"
      />
    </div>
  );
}

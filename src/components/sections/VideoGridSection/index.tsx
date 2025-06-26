"use client";

import type { VideoGridType } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoPlayerVimeo from "@/components/video-player-vimeo";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface VideoGridSectionProps {
  data: VideoGridType[];
  isNight: boolean;
}

export default function VideoGridSection({
  data,
  isNight,
}: VideoGridSectionProps) {
  const bgClass = isNight ? "bg-night" : "bg-honeydew";
  const textClass = isNight ? "text-persian_orange" : "text-night";
  const subtitleClass = isNight ? "text-honeydew" : "text-night";
  const modalBgClass = isNight ? "bg-night" : "bg-honeydew";

  const initialOpenItems = data.slice(0, 3).map((item) => item._id);
  const [openAccordionItems, setOpenAccordionItems] =
    useState<string[]>(initialOpenItems);

  const scope = useRef(null);

  // Array de refs para los contenidos del acordeón (ya no se usan para animación)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const accordionItems = gsap.utils.toArray(
        ".gsap-item-reveal",
        scope.current
      );

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const start = isMobile ? "top 90%" : "top 70%";
      const end = isMobile ? "bottom 80%" : "bottom top";

      accordionItems.forEach((el) => {
        gsap.fromTo(
          el as HTMLElement,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el as HTMLElement,
              start,
              end,
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: scope, dependencies: [data] }
  );

  // Función para alternar el estado del acordeón
  const handleToggleAccordion = (id: string) => {
    setOpenAccordionItems((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <section id="works" className={`${bgClass} ${textClass} min-h-dvh pb-48`}>
      <div className="mx-auto max-w-[100vw]">
        <h2 className="pt-10 px-6 text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[8rem] text-center">
          Works
        </h2>
        <Accordion
          type="multiple"
          value={openAccordionItems}
          onValueChange={setOpenAccordionItems}
          className="grid md:grid-cols-2 gap-12 w-full items-start md:w-[80%] mx-auto"
          ref={scope}
        >
          {data.map((item, index) => {
            const isOpen = openAccordionItems.includes(item._id);
            const isFullRow = index % 3 === 0;

            return (
              <AccordionItem
                key={item._id}
                value={item._id}
                aria-label={`${index} Work ${item.name}, made by Gonzalo Agostino`}
                className={cn(
                  "gsap-item-reveal border-none shadow-none",
                  isFullRow && "md:col-span-2",
                  modalBgClass
                )}
              >
                <AccordionTrigger className="px-2 text-left hover:no-underline">
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-darker-grotesque">
                      {item.name}
                    </h3>

                    <span
                      role="button"
                      tabIndex={0}
                      className={`text-[0.6rem] underline ml-1 cursor-pointer ${subtitleClass}`}
                      aria-label={isOpen ? "Show less" : "Show more"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleAccordion(item._id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleToggleAccordion(item._id);
                        }
                      }}
                    >
                      {isOpen ? "Show less" : "Show more"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="overflow-hidden"
                  >
                    <p
                      className={cn(
                        "transition-all duration-300 font-dm text-sm px-2 pb-1",
                        subtitleClass
                      )}
                    >
                      {item.description}
                    </p>
                    <VideoPlayerVimeo
                      vimeoUrl={item.url}
                      isNight={isNight}
                      autoplay={false}
                      shouldScale={false}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}

"use client";
import { useState, useRef, useEffect, createRef } from "react";
import type { RefObject } from "react";

import { cn } from "@/lib/utils";
import type { VideoGridType } from "@/types";
import VideoPlayerVimeo, {
  VideoPlayerVimeoHandle,
} from "@/components/video-player-vimeo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface WorkVideoSliderProps {
  items: VideoGridType[];
  onOpenModal: (item: VideoGridType) => void;
  contentRefs: RefObject<(HTMLDivElement | null)[]>;
  startIndex?: number;
  className?: string;
}

function WorkVideoSlider({
  items,
  onOpenModal,
  contentRefs,
  startIndex = 0,
  className,
}: WorkVideoSliderProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

  const videoRefs = useRef<React.RefObject<VideoPlayerVimeoHandle>[]>([]);
  if (videoRefs.current.length !== items.length) {
    videoRefs.current = items.map(
      (_, i) => videoRefs.current[i] || createRef<VideoPlayerVimeoHandle>()
    );
  }

  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  if (containerRefs.current.length !== items.length) {
    containerRefs.current = items.map(
      (_, i) => containerRefs.current[i] || null
    );
  }

  const [readyStates, setReadyStates] = useState<boolean[]>(() =>
    items.map(() => false)
  );

  const [inViewStates, setInViewStates] = useState<boolean[]>(() =>
    items.map(() => false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    containerRefs.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setInViewStates((prev) => {
            const next = [...prev];
            next[idx] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items.length]);

  const handleReady = (idx: number) => {
    setReadyStates((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  useEffect(() => {
    videoRefs.current.forEach((ref, idx) => {
      if (ref.current && readyStates[idx]) {
        setTimeout(() => {
          ref.current
            ?.getPlayer?.()
            ?.getPaused()
            .then((paused: boolean) => {
              if (idx === selectedIndex && inViewStates[idx]) {
                if (paused) {
                  ref.current?.play?.();
                }
              } else {
                if (!paused) {
                  ref.current?.pause?.();
                }
              }
            });
        }, 0);
      }
    });
  }, [selectedIndex, items.length, readyStates, inViewStates]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap() ?? 0);
    };
    emblaApi.on("select", onSelect);
    setSelectedIndex(emblaApi.selectedScrollSnap() ?? 0);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className={cn(
        "relative h-dvh w-full flex items-center justify-center text-honeydew z-10",
        className
      )}
    >
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 5000 })]}
        setApi={setEmblaApi}
        className="w-full h-full"
      >
        <CarouselContent className="h-full m-0">
          {items.map((item, index) => (
            <CarouselItem
              key={item._id}
              className="basis-full h-full flex justify-center p-4 "
            >
              <div
                ref={(el) => {
                  if (contentRefs.current) {
                    contentRefs.current[startIndex + index] = el;
                  }
                  containerRefs.current[index] = el;
                }}
                className={`relative w-full max-w-4xl aspect-video flex items-center justify-center`}
                onClick={() => onOpenModal(item)}
                tabIndex={0}
                role="button"
                aria-pressed="false"
                aria-haspopup="dialog"
                aria-label={`Abrir modal de ${item.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onOpenModal(item);
                }}
              >
                <div className="relative w-full aspect-video">
                  <span className="font-darker-grotesque absolute flex w-full justify-center -top-16 text-lg md:text-2xl lg:text-3xl font-medium px-2 py-1 rounded-md">
                    {item.name}
                  </span>
                  <VideoPlayerVimeo
                    ref={videoRefs.current[index]}
                    vimeoUrl={item.url}
                    autoplay={selectedIndex === index && inViewStates[index]}
                    playOnHover={false}
                    shouldScaleUp={false}
                    shouldScaleDown={false}
                    className="w-full h-full object-cover"
                    onReady={() => handleReady(index)}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Controles desktop (a los lados del video) */}
        <div className="hidden lg:flex pointer-events-none absolute inset-y-0 left-0 right-0 items-center justify-between max-w-4xl mx-auto -translate-y-10">
          <CarouselPrevious className="pointer-events-auto text-current z-20 rounded-none hover:scale-95 transition-all duration-300 hover:bg-honeydew hover:text-night" />
          <CarouselNext className="pointer-events-auto text-current z-20 rounded-none hover:scale-95 transition-all duration-300 hover:bg-honeydew hover:text-night" />
        </div>
        {/* Controles mobile (debajo del video, juntos) */}
        <div className="lg:hidden absolute bottom-36 left-1/2 -translate-x-1/2">
          <CarouselPrevious className="text-current z-20 rounded-none hover:scale-95 transition-all duration-300 hover:bg-honeydew hover:text-night" />
          <CarouselNext className="text-current z-20 rounded-none hover:scale-95 transition-all duration-300 hover:bg-honeydew hover:text-night" />
        </div>
      </Carousel>
    </section>
  );
}

export default WorkVideoSlider;

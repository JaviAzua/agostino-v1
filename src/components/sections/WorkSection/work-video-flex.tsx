import VideoPlayerVimeo, {
  VideoPlayerVimeoHandle,
} from "@/components/video-player-vimeo";
import useInView from "@/hooks/useInView";
import { VideoGridType } from "@/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { createRef, RefObject, useRef } from "react";

interface WorkVideoFlexProps {
  flexItems: VideoGridType[];
  contentRefs: RefObject<(HTMLDivElement | null)[]>;
  handleOpenModal: (item: VideoGridType) => void;
}

function WorkVideoFlex({
  flexItems,
  contentRefs,
  handleOpenModal,
}: WorkVideoFlexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    threshold: 0.3,
  });

  useGSAP(() => {
    if (isInView) {
      gsap.from(contentRefs.current, {
        autoAlpha: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.1,
        filter: "blur(10px)",
      });
    }
  }, [isInView]);

  const videoRefs = useRef<React.RefObject<VideoPlayerVimeoHandle>[]>([]);
  if (videoRefs.current.length !== flexItems.length) {
    videoRefs.current = flexItems.map(
      (_, i) => videoRefs.current[i] || createRef<VideoPlayerVimeoHandle>()
    );
  }
  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-[95vw] text-night flex-col md:flex-row flex min-h-[80vh] h-full items-center justify-center gap-2"
    >
      {flexItems.map((item, index) => (
        <div
          key={item._id}
          ref={(el) => {
            contentRefs.current[index] = el;
          }}
          className={`relative overflow-hidden group h-auto w-full`}
          onClick={() => handleOpenModal(item)}
          tabIndex={0}
          role="button"
          aria-pressed="false"
          aria-haspopup="dialog"
          aria-label={`Abrir modal de ${item.name}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpenModal(item);
          }}
        >
          <div className="relative w-full aspect-video">
            <span className="absolute bottom-2 left-2 text-gray-800 text-sm font-medium z-20">
              {item.name}
            </span>
            <VideoPlayerVimeo
              ref={videoRefs.current[index]}
              vimeoUrl={item.url}
              autoplay={false}
              playOnHover={true}
              showControls={false}
              shouldScaleDown={true}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkVideoFlex;

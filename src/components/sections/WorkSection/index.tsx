"use client";

import React, { useEffect, useRef, useState } from "react";
import type { VideoGridType } from "@/types";
import VideoPlayerVimeo from "@/components/video-player-vimeo";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import VideoModal from "@/components/VideoModal";
// @ts-expect-error: No types for react-scroll
import { scroller } from "react-scroll";

interface WorkSectionProps {
  data: VideoGridType[];
}

export default function WorkSection({ data }: WorkSectionProps) {
  const scope = useRef(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initialItems = data.slice(0, 3);
  // const lastItems = data.slice(3, 6); // No se usa

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoGridType | null>(
    null
  );

  // GSAP animation
  useGSAP(
    () => {
      const items = gsap.utils.toArray(".gsap-item-reveal", scope.current);
      items.forEach((el) => {
        gsap.fromTo(
          el as HTMLElement,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      });
    },
    { scope: scope, dependencies: [data] }
  );

  // Scroll al id works si hay hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#works") {
      scroller.scrollTo("works", {
        smooth: true,
        duration: 600,
        offset: -80, // Ajusta según tu header
      });
    }
  }, []);

  // Abrir modal si la url es /works/[slug]
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathParts = window.location.pathname.split("/");
    if (pathParts[1] === "works" && pathParts[2]) {
      const slug = pathParts[2];
      const video = data.find((item) => item.slug.current === slug);
      if (video) {
        setSelectedVideo(video);
        setModalOpen(true);
      }
    } else {
      setModalOpen(false);
      setSelectedVideo(null);
    }
  }, [data]);

  // Cerrar modal si la ruta ya no es /works/[slug] (por navegación externa)
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split("/");
      if (!(pathParts[1] === "works" && pathParts[2])) {
        setModalOpen(false);
        setSelectedVideo(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Cerrar modal si ocurre scroll en window
  useEffect(() => {
    if (!modalOpen) return;
    const handleScroll = () => {
      setModalOpen(false);
      setSelectedVideo(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [modalOpen]);

  // Cerrar modal si cambia el hash
  useEffect(() => {
    const handleHashChange = () => {
      if (modalOpen) {
        setModalOpen(false);
        setSelectedVideo(null);
        window.history.replaceState({}, "", "/" + window.location.hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [modalOpen]);

  // Abrir modal y actualizar la url
  const handleOpenModal = (item: VideoGridType) => {
    setSelectedVideo(item);
    setModalOpen(true);
    const hash = window.location.hash;
    const newUrl = `/works/${item.slug.current}${hash}`;
    window.history.pushState({}, "", newUrl);
    if (hash === "#works") {
      scroller.scrollTo("works", {
        smooth: true,
        duration: 600,
        offset: -80,
      });
    }
  };

  // Cerrar modal y actualizar la url
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
    const hash = window.location.hash;
    const newUrl = `/works${hash}`;
    window.history.pushState({}, "", newUrl);
    if (hash === "#works") {
      scroller.scrollTo("works", {
        smooth: true,
        duration: 600,
        offset: -80,
      });
    }
  };

  return (
    <section
      id="works"
      aria-label="Works, made by Gonzalo Agostino"
      className="bg-honeydew"
    >
      <div className="mx-auto max-w-[100vw]">
        <div
          ref={scope}
          className="grid md:grid-cols-2 gap-10 w-full items-start md:w-[95%] mx-auto"
        >
          {initialItems.map((item, index) => {
            return (
              <div
                key={item._id}
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="overflow-hidden border-none shadow-none last:col-span-2 last:px-20"
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
                <div className="relative group">
                  <span className="absolute bottom-2 left-2 text-honeydew z-10">
                    {item.name}
                  </span>
                  <VideoPlayerVimeo
                    vimeoUrl={item.url}
                    autoplay={false}
                    playOnHover={true}
                    showControls={false}
                    shouldScaleDown={true}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <VideoModal
        open={modalOpen}
        onClose={handleCloseModal}
        video={selectedVideo}
      />
    </section>
  );
}

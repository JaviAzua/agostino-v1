"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import type { ReviewsType, VideoGridType } from "@/types";
import VideoModal from "@/components/VideoModal";
import WorkVideoSlider from "./work-video-slider";
import WorkVideoFlex from "./work-video-flex";
import WorkVideoReview from "./work-video-review";
import WorkSectionLogo from "./work-section-logo";

interface WorkSectionProps {
  data: VideoGridType[];
  review: Pick<ReviewsType, "review">;
}

export default function WorkSectionPage({ data, review }: WorkSectionProps) {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoGridType | null>(
    null
  );

  const [stableData, setStableData] = useState<VideoGridType[]>(data);
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(stableData)) {
      setStableData(data);
    }
  }, [data, stableData]);

  const flexItems = useMemo(() => {
    if (!data) return [];
    return data.slice(0, 2);
  }, [data]);
  const sliderItems = useMemo(() => {
    if (!data) return [];
    return data.slice(2);
  }, [data]);

  const handleOpenModal = (item: VideoGridType) => {
    setSelectedVideo(item);
    setModalOpen(true);
    window.location.hash = `works/${item.slug.current}`;
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section
      id="works"
      aria-label="Works, made by Gonzalo Agostino"
      className="bg-honeydew min-h-screen relative"
    >
      <WorkVideoFlex
        flexItems={flexItems}
        contentRefs={contentRefs}
        handleOpenModal={handleOpenModal}
      />

      <WorkVideoReview review={review.review} />
      <div className="bg-night">
        <WorkVideoSlider
          items={sliderItems}
          contentRefs={contentRefs}
          onOpenModal={handleOpenModal}
        />

        <WorkSectionLogo />
      </div>
      <VideoModal
        open={modalOpen}
        onClose={handleCloseModal}
        video={selectedVideo}
      />
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { VideoGridT } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  video: VideoGridT;
};

function VideoGrid({ video }: Props) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const extractVimeoId = (url: string) => {
      const regexes = [
        /vimeo\.com\/(\d+)/,
        /vimeo\.com\/video\/(\d+)/,
        /player\.vimeo\.com\/video\/(\d+)/,
      ];

      for (const regex of regexes) {
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
      }

      return /^\d+$/.test(url) ? url : null;
    };

    if (video.url) {
      const id = extractVimeoId(video.url);
      setVideoId(id);
    }
  }, [video.url]);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const handleIframeLoad = () => {
    setIsVideoLoaded(true);
  };

  // Modified Vimeo embed URL to ensure controls work properly
  // Removed background=1 and muted=1 to allow proper control functionality
  const vimeoEmbedUrl = videoId
    ? `https://player.vimeo.com/video/${videoId}?autoplay=0&loop=1&byline=1&title=0&controls=1&transparent=1`
    : "";

  return (
    <div className="relative h-full w-full overflow-hidden bg-black rounded-lg shadow-lg">
      {/* Video iframe - positioned at the bottom of the z-index stack */}
      {videoId && (
        <iframe
          ref={iframeRef}
          src={vimeoEmbedUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={handleIframeLoad}
          title={`Vimeo video player: ${video.name}`}
        />
      )}

      {/* Loading state */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-white text-lg">Loading video...</p>
          </div>
        </div>
      )}

      {/* Title bar - always visible */}
      <div className="absolute top-0 left-0 right-0 text-center z-20 py-2 px-4 bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-base sm:text-lg font-bold tracking-wider sm:tracking-widest py-1 text-white">
          {video.name}
        </h2>
      </div>

      {/* Description overlay - conditionally visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isDescriptionVisible ? 1 : 0,
          y: isDescriptionVisible ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        className={`absolute bottom-0 left-0 w-full bg-black h-full pt-4 overflow-y-auto z-20 ${
          isDescriptionVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <p className="max-w-[90%] mx-auto text-sm sm:text-base font-medium text-white max-h-[80%] overflow-y-auto">
          {video.description}
        </p>
      </motion.div>

      {/* Toggle button - positioned to not interfere with video controls */}
      <button
        onClick={toggleDescription}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-black/60 hover:bg-black/80 text-white px-4 py-1.5 rounded-full flex items-center gap-1 text-sm transition-colors"
        aria-label={
          isDescriptionVisible
            ? "Hide video description"
            : "Show video description"
        }
      >
        {isDescriptionVisible ? (
          <>
            View less <ChevronDown className="w-4 h-4" />
          </>
        ) : (
          <>
            View more <ChevronUp className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}

export default VideoGrid;

"use client";

import { useState, useRef, useEffect } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import type { BannerT } from "@/types";

interface Props {
  bannerImg: BannerT;
}

function ReelPage({ bannerImg }: Props) {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Extract Vimeo ID from URL
    if (bannerImg?.url) {
      const extractVimeoId = (url: string) => {
        // Handle different Vimeo URL formats
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

        // If the URL is already just the ID
        if (/^\d+$/.test(url)) {
          return url;
        }

        return null;
      };

      const id = extractVimeoId(bannerImg.url);
      setVideoId(id);

      // Set a timeout to hide loading indicator after a reasonable time
      // in case the onLoad event doesn't fire
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [bannerImg?.url]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);

    // Use Vimeo's postMessage API to mute/unmute
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const action = isMuted ? "unmute" : "mute";
      iframeRef.current.contentWindow.postMessage(
        `{"method":"${action}"}`,
        "*"
      );
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!videoId) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <p className="text-white text-xl">Video not available</p>
      </div>
    );
  }

  // Construct Vimeo embed URL with parameters
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=${
    isMuted ? 1 : 0
  }&background=1`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video container */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={iframeRef}
          src={vimeoEmbedUrl}
          className="w-full h-full"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            minWidth: "177.77vh" /* 16:9 aspect ratio */,
            minHeight: "56.25vw" /* 16:9 aspect ratio */,
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          onLoad={handleIframeLoad}
          title="Vimeo Background Video"
        />
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <p className="text-white text-xl">Loading video...</p>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-[1]" />

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-20 md:bottom-[25%] lg:bottom-[20%] left-[5%] lg:left-14 z-[45] cursor-pointer text-white opacity-80 hover:opacity-100 transition-opacity"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <HiSpeakerXMark className="w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12" />
        ) : (
          <HiSpeakerWave className="w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12" />
        )}
      </button>
    </div>
  );
}

export default ReelPage;

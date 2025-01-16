"use client";

import React, { useState, useCallback } from "react";
import ReactPlayer from "react-player/lazy";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BannerT } from "@/types";

interface Props {
  bannerImg: BannerT;
}

function ReelPage({ bannerImg }: Props) {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden ">
      <div className="absolute inset-0">
        <ReactPlayer
          url={bannerImg?.url}
          playing={true}
          loop={true}
          muted={isMuted}
          width="100%"
          height="100%"
          playsinline
          config={{
            vimeo: {
              playerOptions: {
                background: true,
                autoplay: true,
                controls: false,
                responsive: true,
              },
            },
          }}
          onReady={handleReady}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <p className="text-white text-xl">Loading video...</p>
        </div>
      )}
      <div className="absolute inset-0 bg-blackB bg-opacity-30" />
      <button
        onClick={toggleMute}
        className="absolute sm:bottom-20 md:bottom-[25%] lg:bottom-[20%] left-[5%] lg:left-14 z-[45] cursor-pointer text-white opacity-80 hover:opacity-100 transition-opacity"
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

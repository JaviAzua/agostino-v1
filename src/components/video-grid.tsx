"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { VideoGridT } from "@/types";

type Props = {
  video: VideoGridT;
};

function VideoGrid({ video }: Props) {
  const [hasWindow, setHasWindow] = useState(false);
  const [descrip, setDescrip] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <>
      {hasWindow && (
        <div className="relative aspect-video w-full flex flex-col cursor-pointer overflow-hidden bg-black/50 justify-center">
          <div
            onClick={() => setDescrip(!descrip)}
            className="absolute top-0 left-0 right-0 text-center select-none rounded-sm z-40 py-1 sm:py-2 bg-black/50"
          >
            <h4 className="text-base sm:text-lg font-bold hover:scale-105 sm:hover:scale-110 duration-300 tracking-wider sm:tracking-widest py-1">
              {video.name}
            </h4>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: descrip ? 1 : 0,
              y: descrip ? 0 : 10,
            }}
            className="absolute bottom-0 left-0 w-full bg-black/50 py-1 sm:py-2"
          >
            <p className="max-w-[90%] sm:max-w-[80%] mx-auto text-sm sm:text-base font-semibold">
              {video.description}
            </p>
          </motion.div>
          <ReactPlayer
            light={true}
            url={video.url}
            width="100%"
            height="100%"
            loop
            playsinline
            muted
            controls={true}
          />
        </div>
      )}
    </>
  );
}

export default VideoGrid;

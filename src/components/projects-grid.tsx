"use client";

import type { VideoGridT } from "@/types";
import { motion } from "framer-motion";
import VideoGrid from "./video-grid";

interface Props {
  videoGrid: VideoGridT[];
  title?: string;
  isLoading?: boolean;
}

function ProjectsGrid({
  videoGrid,
  title = "Projects",
  isLoading = false,
}: Props) {
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full py-8 min-h-[200vh] md:min-h-screen flex flex-col">
      {/* Section heading with improved typography */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-500 text-center font-semibold text-2xl md:text-3xl md:tracking-[1rem]"
      >
        {title}
      </motion.h2>

      {/* Loading state */}
      {isLoading && (
        <div className="flex-grow flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && videoGrid.length === 0 && (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-lg text-gray-500">
            No projects available at the moment.
          </p>
        </div>
      )}

      {/* Projects grid with improved layout and animations */}
      {!isLoading && videoGrid.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 overflow-y-auto mb-14"
        >
          {videoGrid.map((video) => (
            <motion.div
              key={video.slug?.current || video.url}
              variants={item}
              className="h-full"
            >
              <VideoGrid video={video} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default ProjectsGrid;

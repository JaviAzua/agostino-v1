import { VideoGridT } from "@/types";
import React from "react";
import VideoGrid from "./video-grid";

interface Props {
  videoGrid: VideoGridT[];
}

function ProjectsGrid({ videoGrid }: Props) {
  return (
    <div className="flex flex-col min-h-screen py-4">
      <h2 className="text-gray-500 text-center font-semibold text-xl sm:text-2xl tracking-[1rem] sm:tracking-[2rem] py-4">
        Projects
      </h2>
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 p-2 sm:p-4">
          {videoGrid.map((video) => (
            <VideoGrid key={video.slug.current} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsGrid;

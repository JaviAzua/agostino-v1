"use client";

import type React from "react";
import type { VideoGridType } from "@/types";
import VideoPlayerVimeo from "@/components/video-player-vimeo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  video: VideoGridType | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ open, onClose, video }) => {
  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <div>
        <DialogContent
          id="video-modal"
          className="bg-honeydew p-2 max-w-[80vw] min-h-[90vh] max-h-[90vh] !rounded-none overflow-y-auto"
        >
          <div className="relative flex flex-col justify-evenly">
            <DialogHeader className="w-full px-10">
              <DialogTitle className="text-3xl font-dm font-bold text-left w-full text-night">
                {video.name}
              </DialogTitle>
              <DialogDescription className="w-[90%] text-gray-700 font-dm text-pretty">
                {video.description}
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw]">
                <VideoPlayerVimeo
                  vimeoUrl={video.url}
                  autoplay={true}
                  showControls={true}
                  playOnHover={false}
                  shouldScaleUp={false}
                  shouldScaleDown={false}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default VideoModal;

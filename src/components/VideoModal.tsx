import React, { useEffect } from "react";
import type { VideoGridType } from "@/types";
import VideoPlayerVimeo from "@/components/video-player-vimeo";
import CloseButton from "./close-button";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  video: VideoGridType | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ open, onClose, video }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !video) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm "
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="relative bg-honeydew shadow-xl w-[80vw] max-w-4xl p-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton setIsOpen={onClose} />
        <h2 className="text-2xl font-bold mb-2 text-center w-full">
          {video.name}
        </h2>
        <p className="mb-4 text-center w-full text-gray-700">
          {video.description}
        </p>
        <div className="w-full flex justify-center">
          <div className="w-full" style={{ maxWidth: "900px" }}>
            <VideoPlayerVimeo
              vimeoUrl={video.url}
              autoplay={true}
              showControls={true}
              shouldScaleUp={false}
              shouldScaleDown={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import { title } from "process";
import React, { useState } from "react";
import VideoModal from "./VideoModal";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate thumbnail from video URL if not provided
  const defaultThumbnail = videoUrl.replace(
    "/video/upload/",
    "/video/upload/so_0,w_800,h_450,c_fill/"
  );

  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300  ${className}`}
        onClick={handleVideoClick}
      >
        {/* Video Thumbnail */}
        <div className="relative h-full w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <Image
            src={thumbnailUrl || defaultThumbnail}
            alt={title}
            fill
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              console.log(
                "Thumbnail failed to load, using gradient background"
              );
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing Ring */}
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />

              {/* Play Button */}
              <div className="relative w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Play className="w-6 h-6 text-gray-800 ml-1 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default VideoPlayer;

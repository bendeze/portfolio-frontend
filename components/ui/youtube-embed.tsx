"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  thumbnail?: string;
}

export function YouTubeEmbed({ videoId, title, thumbnail }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (!isLoaded) {
    return (
      <div 
        className="aspect-video w-full rounded-xl overflow-hidden bg-white/5 border border-white/10 relative group cursor-pointer"
        onClick={() => setIsLoaded(true)}
      >
        {/* We use next/image with unoptimized for external URLs without config, or standard img */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-xl shadow-red-500/20">
            <Play className="w-8 h-8 text-white ml-1 fill-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 relative">
      <iframe
        className="w-full h-full absolute top-0 left-0"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

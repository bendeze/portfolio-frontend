"use client";

import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/language-context";
import { YouTubeVideo } from "@/lib/youtube";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";

interface YoutubeVideosSectionProps {
  videos?: YouTubeVideo[];
}

export function YoutubeVideosSection({ videos = [] }: YoutubeVideosSectionProps) {
  const { t, lang } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to format date in localized style
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Scroll function for left/right carousel navigation
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const firstCard = container.firstChild as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // gap-6 is 24px
        const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // If no videos were loaded, do not crash; return null
  if (videos.length === 0) {
    return null;
  }

  return (
    <section 
      id="videos" 
      aria-label="YouTube Channel and Video Resources"
      className="relative w-full py-16 bg-background px-4 sm:px-8 lg:px-16 overflow-hidden select-none"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full relative z-10"
      >
        {/* Section Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ebcb00] font-bold">
              {t("youtube.badge") || "MEDIA"}
            </span>
            <h2
              id="videos-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-gray-900 dark:text-white leading-none tracking-tight"
            >
              {t("youtube.title") || "My Latest Videos"}
            </h2>
          </div>

          <Link
            href="https://www.youtube.com/@NdezeBonheur"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3 sm:py-2.5 rounded-full border border-border text-sm font-medium hover:border-[#ebcb00] hover:text-[#ebcb00] transition-colors bg-card text-foreground font-mono"
          >
            {t("youtube.viewChannel") || "Go to Channel"}
          </Link>
        </motion.div>

        {/* Horizontal Snapping Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-[300px] sm:w-[360px] md:w-[420px] lg:w-[480px] shrink-0 snap-start snap-always flex flex-col justify-between"
            >
              <div className="space-y-4">
                <YouTubeEmbed videoId={video.id} title={video.title} thumbnail={video.thumbnail} />

                {/* Video Info Copy */}
                <div className="space-y-2 px-1 text-left">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="group">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug line-clamp-2 min-h-[56px] transition-colors group-hover:text-[#ebcb00] font-mono">
                      {video.title}
                    </h3>
                  </a>

                  {/* Subtitle Metadata Row: Date + Views */}
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 font-mono">
                    <span>{formatDate(video.publishedAt)}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Bottom-Left Navigation controls */}
        <motion.div
          variants={headerVariants}
          className="flex items-center gap-3 mt-8 text-left"
        >
          <button
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-[#ebcb00] hover:text-[#ebcb00] hover:bg-muted transition-all duration-200 active:scale-95 bg-card cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-[#ebcb00] hover:text-[#ebcb00] hover:bg-muted transition-all duration-200 active:scale-95 bg-card cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

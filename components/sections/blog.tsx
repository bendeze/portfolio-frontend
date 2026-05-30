"use client";

import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface BlogPost {
  id: number;
  author: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  title: string;
  slug: string;
  summary: string;
  image: string;
  reading_time: number;
  status: string;
  status_label: string;
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

interface BlogSectionProps {
  posts?: BlogPost[];
}

export function BlogSection({ posts = [] }: BlogSectionProps) {
  const { t, lang } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to construct full URL for media images served by Django
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder_image.png";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";
    const domain = apiBase.endsWith("/api") ? apiBase.slice(0, -4) : apiBase;
    const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    
    if (!cleanPath.startsWith("/media/") && !imagePath.startsWith("media/")) {
      return `${cleanDomain}/media/${imagePath}`;
    }
    return `${cleanDomain}${cleanPath}`;
  };

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

  // If no posts were loaded, do not crash; display premium empty state
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative w-full py-16 bg-background dark:bg-[#030303] px-4 sm:px-8 lg:px-16 overflow-hidden select-none"
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
          variants={headerVariants}
          className="flex items-center justify-between w-full mb-12"
        >
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
              {t("blog.badge")}
            </span>
            <h2
              id="blog-heading" 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-sans font-medium leading-none tracking-tight"
            >
              {t("blog.title")}
            </h2>
          </div>

          <Link
            href="/blog"
            className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-zinc-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors bg-white dark:bg-[#030303] text-gray-900 dark:text-zinc-100 font-mono"
          >
            {t("blog.viewBlog")}
          </Link>
        </motion.div>

        {/* Horizontal Snapping Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] shrink-0 snap-start snap-always group cursor-pointer text-left flex flex-col justify-between"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col justify-between h-full w-full">
                <div className="space-y-4">
                  {/* Square Premium Graphic Placeholder Container */}
                  <div className="aspect-square w-full rounded-[48px] overflow-hidden bg-black relative border border-gray-100 dark:border-zinc-900 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    {/* Subtle hover gradient wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-[800ms] ease-[0.16,1,0.3,1]"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder_image.png";
                      }}
                    />
                  </div>

                  {/* Article Info Copy */}
                  <div className="space-y-2 px-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-zinc-100 leading-snug line-clamp-2 min-h-[56px] transition-colors group-hover:text-gray-600 dark:group-hover:text-zinc-300 font-mono">
                      {post.title}
                    </h3>

                    {/* Subtitle Metadata Row: Date + Category */}
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-zinc-400 font-mono">
                      <span>{formatDate(post.created_at)}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700" />
                      <span>{post.category?.name || "General"}</span>
                    </div>
                  </div>
                </div>

                {/* Call-to-action chevron link */}
                <div className="px-1 mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-zinc-200 transition-all duration-300 font-mono border-b border-transparent group-hover:border-gray-900 dark:group-hover:border-zinc-200">
                    {t("blog.readBlog")}
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
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
            className="w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-200 active:scale-95 bg-white dark:bg-[#030303]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-200 active:scale-95 bg-white dark:bg-[#030303]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

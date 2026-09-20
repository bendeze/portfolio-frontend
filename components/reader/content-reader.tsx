"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Share2, Check, ExternalLink, Github } from "lucide-react";
import { ContentItem, ContentMeta } from "@/lib/content";
import { TagBadge } from "@/components/shared/tag-badge";
import { TableOfContents, TocItem } from "@/components/reader/table-of-contents";
import { SubscribeBox } from "@/components/newsletter/subscribe-box";
import { PostFooter } from "@/components/reader/post-footer";

interface ContentReaderProps {
  item: ContentItem;
  prev?: ContentMeta | null;
  next?: ContentMeta | null;
  children?: React.ReactNode;
}

export function ContentReader({ item, prev, next, children }: ContentReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract headings from MDX text for Table of Contents
  useEffect(() => {
    const headingLines = item.content
      .split("\n")
      .filter((line) => line.startsWith("## ") || line.startsWith("### "));

    const extracted: TocItem[] = headingLines.map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s+/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return { id, text, level };
    });

    setTocItems(extracted);
  }, [item.content]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const parentPath = item.type === "articles" ? "/articles" : item.type === "posts" ? "/posts" : "/projects";
  const parentLabel = item.type === "articles" ? "Articles" : item.type === "posts" ? "Posts" : "Projects";

  return (
    <div className="relative min-h-screen">
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-[#ebcb00] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center gap-2">
          <Link
            href={parentPath}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-[#ebcb00] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {parentLabel}</span>
          </Link>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Rail (Desktop Sticky Sidebar) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 select-none">
            {/* Author & Meta Widget */}
            <div className="p-4 rounded-lg border-[0.5px] border-zinc-200 border-dashed dark:border-zinc-800 bg-zinc-50/50 dark:bg-transparent space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-zinc-300 dark:border-zinc-700 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/profile.png" alt="Emmanuel Bonheur Ndeze" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Emmanuel Bonheur Ndeze
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                    Backend & Network Engineer
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t-[0.5px] border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[#ebcb00]" />
                  <span>
                    {(() => {
                      try {
                        return format(new Date(item.publishedAt), "MMMM dd, yyyy");
                      } catch {
                        return item.publishedAt;
                      }
                    })()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#ebcb00]" />
                  <span>{item.readingTime}</span>
                </div>
              </div>

              {/* Project External Links if applicable */}
              {(item.liveUrl || item.githubUrl) && (
                <div className="flex items-center gap-2 pt-2 border-t-[0.5px] border-zinc-200 dark:border-zinc-800">
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#ebcb00] hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 hover:text-[#ebcb00] transition-colors"
                    >
                      <Github className="h-3 w-3" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              )}

              {/* Share action */}
              <div className="pt-2 border-t-[0.5px] border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border-[0.5px] border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#ebcb00] hover:text-[#ebcb00] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span className="text-green-500">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Copy Article Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic TOC */}
            {tocItems.length > 0 && (
              <div className="p-4 rounded-lg border-[0.5px] border-zinc-200 dark:border-zinc-800 border-dashed bg-zinc-50/50 dark:bg-transparent">
                <TableOfContents items={tocItems} />
              </div>
            )}

            {/* Tags Widget */}
            {item.tags.length > 0 && (
              <div className="p-4 rounded-lg border-[0.5px] border-zinc-200 dark:border-zinc-800 border-dashed bg-zinc-50/50 dark:bg-transparent space-y-2">
                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-500">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {item.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main Reading Column */}
          <article className="lg:col-span-8 min-w-0">
            {/* Header / Title */}
            <header className="space-y-3 pb-6 mb-6 border-b-[0.5px] border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#ebcb00] uppercase font-semibold border-b border-dashed border-[#ebcb00] pb-0.5">
                  {item.type}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {(() => {
                    try {
                      return format(new Date(item.publishedAt), "yyyy-MM-dd");
                    } catch {
                      return item.publishedAt;
                    }
                  })()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight pt-2">
                {item.title}
              </h1>

              {item.description && (
                <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Project Metrics pill cards if available */}
              {item.metrics && item.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3">
                  {item.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded border-[0.5px] border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50"
                    >
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">{m.label}</div>
                      <div className="text-sm font-mono font-bold text-[#ebcb00]">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </header>

            {/* MDX Body with Embedded Diagrams */}
            <div className="prose-container">
              {children}
            </div>

            {/* Steipete-Style Newsletter Box */}
            <SubscribeBox source={`${item.type}:${item.slug}`} />

            {/* Steipete-Style Bottom Section (Tags, Social Shares, Back to Top, Next/Prev, License) */}
            <PostFooter
              title={item.title}
              tags={item.tags}
              prev={prev}
              next={next}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

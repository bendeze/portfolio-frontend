"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, ArrowUpRight, BookOpen } from "lucide-react";
import { ContentMeta } from "@/lib/content";
import { TagBadge } from "@/components/shared/tag-badge";

interface BlogSectionProps {
  items: ContentMeta[];
}

export function BlogSection({ items = [] }: BlogSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      id="publications"
      aria-labelledby="publications-heading"
      className="relative w-full py-16 px-4 sm:px-8 lg:px-16 bg-background overflow-hidden select-none border-t-[0.5px] border-border/80"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-[0.5px] border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ebcb00] uppercase tracking-wider font-semibold">
              <BookOpen className="h-4 w-4" />
              <span>Latest Insights &amp; Notes</span>
            </div>
            <h2
              id="publications-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-foreground tracking-tight"
            >
              Recent Publications
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/articles"
              className="px-4 py-2 rounded text-xs font-mono border-[0.5px] border-border hover:border-[#ebcb00] hover:text-[#ebcb00] transition-colors text-foreground"
            >
              All Articles →
            </Link>
            <Link
              href="/posts"
              className="px-4 py-2 rounded text-xs font-mono border-[0.5px] border-border hover:border-[#ebcb00] hover:text-[#ebcb00] transition-colors text-foreground"
            >
              All Posts →
            </Link>
          </div>
        </div>

        {/* Content Items List */}
        <div className="divide-y-[0.5px] divide-border/60">
          {items.slice(0, 6).map((item) => (
            <article
              key={`${item.type}:${item.slug}`}
              className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6 transition-colors"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase font-medium bg-transparent border-b border-transparent">
                    {item.type}
                  </span>
                  <Link
                    href={`/${item.type}/${item.slug}`}
                    className="font-mono text-base sm:text-lg font-semibold text-foreground group-hover:text-[#ebcb00] transition-colors underline decoration-dashed underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-[#ebcb00] line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#ebcb00] transition-all shrink-0 inline" />
                </div>

                {item.description && (
                  <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                    {item.tags.slice(0, 4).map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-zinc-400 dark:text-zinc-500 sm:text-right">
                <time dateTime={item.publishedAt}>
                  {(() => {
                    try {
                      return format(new Date(item.publishedAt), "yyyy-MM-dd");
                    } catch {
                      return item.publishedAt;
                    }
                  })()}
                </time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.readingTime}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { Search as SearchIcon, X, Terminal } from "lucide-react";
import { ContentMeta } from "@/lib/content";
import { ContentCard } from "@/components/reader/content-card";

interface SearchClientProps {
  allItems: ContentMeta[];
}

export function SearchClient({ allItems }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allItems;

    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      const matchType = item.type.toLowerCase().includes(q);
      const matchSlug = item.slug.toLowerCase().includes(q);

      return matchTitle || matchDesc || matchTags || matchType || matchSlug;
    });
  }, [allItems, query]);

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-3 pb-6 border-b-[0.5px] border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ebcb00] uppercase tracking-wider font-semibold">
          <Terminal className="h-4 w-4" />
          <span>Full-Text Search</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Search
        </h1>
        <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Quickly locate technical topics, BGP configurations, system case studies, or dev logs.
        </p>

        {/* Search Input */}
        <div className="relative pt-2">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword, topic, tag (e.g. bgp, linux, evpn)..."
              autoFocus
              className="w-full pl-10 pr-10 py-3 text-sm font-mono rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border-[0.5px] border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-[#ebcb00] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {query && (
            <div className="mt-2 text-xs font-mono text-zinc-500">
              Found {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="divide-y-[0.5px] divide-zinc-200/60 dark:divide-zinc-800/60">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ContentCard key={`${item.type}:${item.slug}`} item={item} showType />
          ))
        ) : (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-mono text-zinc-500">No matching results found for &ldquo;{query}&rdquo;.</p>
            <p className="text-xs font-mono text-zinc-400">Try searching for broader terms like &quot;network&quot;, &quot;linux&quot;, or &quot;bgp&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
}

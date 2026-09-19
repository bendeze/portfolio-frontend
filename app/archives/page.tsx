import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getArchives } from "@/lib/content";
import { Archive, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Archives | E. Ndeze Bonheur",
  description: "Chronological archive of all technical articles, posts, and projects by year.",
};

export default function ArchivesPage() {
  const archives = getArchives();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="space-y-3 pb-8 border-b-[0.5px] border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ebcb00] uppercase tracking-wider font-semibold">
          <Archive className="h-4 w-4" />
          <span>Timeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight pt-2">
          Archives
        </h1>
        <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          A complete, chronological index of all publications, dev notes, and architecture breakdowns grouped by year.
        </p>
      </div>

      {/* Year Groups */}
      <div className="py-8 space-y-12">
        {archives.length > 0 ? (
          archives.map(({ year, items }) => (
            <section key={year} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  {year}
                </h2>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-transparent">
                  ({items.length} {items.length === 1 ? "entry" : "entries"})
                </span>
              </div>

              <div className="divide-y-[0.5px] divide-zinc-200/60 dark:divide-zinc-800/60 border-t-[0.5px] border-zinc-200 dark:border-zinc-800">
                {items.map((item) => (
                  <div
                    key={`${item.type}:${item.slug}`}
                    className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 group"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase font-medium bg-transparent border-b border-transparent">
                        {item.type}
                      </span>
                      <Link
                        href={`/${item.type}/${item.slug}`}
                        className="font-mono text-sm sm:text-base text-zinc-900 dark:text-zinc-200 group-hover:text-[#ebcb00] transition-colors underline decoration-dashed underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-[#ebcb00]"
                      >
                        {item.title}
                      </Link>
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#ebcb00] transition-all shrink-0 inline" />
                    </div>

                    <time
                      dateTime={item.publishedAt}
                      className="text-xs font-mono text-zinc-400 dark:text-zinc-500 shrink-0 sm:text-right"
                    >
                      {(() => {
                        try {
                          return format(new Date(item.publishedAt), "MMM dd");
                        } catch {
                          return item.publishedAt;
                        }
                      })()}
                    </time>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="py-12 text-center text-sm font-mono text-zinc-500">No archived entries yet.</p>
        )}
      </div>
    </div>
  );
}

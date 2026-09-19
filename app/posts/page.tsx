import { Metadata } from "next";
import Link from "next/link";
import { getAllContent, getAllTags } from "@/lib/content";
import { ContentCard } from "@/components/reader/content-card";
import { TagBadge } from "@/components/shared/tag-badge";
import { Terminal, Archive, ArrowRight } from "lucide-react";
import { YoutubeVideosSection } from "@/components/sections/youtube-videos";
import { getLatestYouTubeVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Blog | E. Ndeze Bonheur",
  description: "Dev logs, engineering notes, tips, debugging post-mortems, and status updates.",
};

export default async function PostsPage() {
  const posts = getAllContent("posts");
  const tags = getAllTags();

  const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID || "";
  const youtubeVideos = await getLatestYouTubeVideos(youtubeChannelId, 10);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="space-y-3 pb-8 border-b-[0.5px] border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ebcb00] uppercase tracking-wider font-semibold">
              <Terminal className="h-4 w-4" />
              <span>Engineering Notes & Dev Logs</span>
            </div>
            <Link
              href="/archives"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-[#ebcb00] transition-colors border border-dashed border-zinc-300 dark:border-zinc-800 rounded-md px-2.5 py-1 hover:border-[#ebcb00]"
            >
              <Archive className="h-3.5 w-3.5" />
              <span>Archives Timeline</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight pt-2">
            Blog
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Shorter engineering thoughts, quick troubleshooting logs, tool insights, and daily progress from the terminal.
          </p>
        </div>

        {/* Featured Tags Bar */}
        {tags.length > 0 && (
          <div className="py-4 border-b-[0.5px] border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-1.5 items-center justify-between">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mr-1">Tags:</span>
              {tags.slice(0, 10).map(({ tag, count }) => (
                <TagBadge key={tag} tag={tag} count={count} />
              ))}
            </div>
            <Link
              href="/tags"
              className="text-[11px] font-mono text-zinc-500 hover:text-[#ebcb00] transition-colors inline-flex items-center gap-1 border border-dashed border-zinc-300 dark:border-zinc-800 rounded px-2 py-0.5 hover:border-[#ebcb00]"
            >
              <span>View all tags ({tags.length})</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </Link>
          </div>
        )}

        {/* Posts List */}
        <div className="divide-y-[0.5px] divide-zinc-200/60 dark:divide-zinc-800/60 pt-2">
          {posts.length > 0 ? (
            posts.map((item) => <ContentCard key={item.slug} item={item} />)
          ) : (
            <p className="py-12 text-center text-sm font-mono text-zinc-500">No posts published yet.</p>
          )}
        </div>
      </div>

      {/* YouTube Videos Section */}
      <YoutubeVideosSection videos={youtubeVideos} />
    </div>
  );
}

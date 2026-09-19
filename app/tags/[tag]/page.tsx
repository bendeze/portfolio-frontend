import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getContentByTag } from "@/lib/content";
import { ContentCard } from "@/components/reader/content-card";
import { ArrowLeft, Tag as TagIcon } from "lucide-react";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag);

  return {
    title: `Tag: #${decodedTag} | E. Ndeze Bonheur`,
    description: `All technical publications, posts, and projects tagged with #${decodedTag}.`,
  };
}

export default async function TagFilteredPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag).toLowerCase();
  const items = getContentByTag(decodedTag);

  if (!items || items.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Back to all tags */}
      <div className="mb-6">
        <Link
          href="/tags"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-[#ebcb00] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Tags</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 pb-8 border-b-[0.5px] border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ebcb00] uppercase tracking-wider font-semibold">
          <TagIcon className="h-4 w-4" />
          <span>Tagged Collection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2 pt-2">
          <span className="text-zinc-400">#</span>
          <span>{decodedTag}</span>
        </h1>
        <p className="text-sm font-mono text-zinc-500">
          Showing {items.length} {items.length === 1 ? "entry" : "entries"} across articles, posts, and projects.
        </p>
      </div>

      {/* Filtered Content List */}
      <div className="divide-y-[0.5px] divide-zinc-200/60 dark:divide-zinc-800/60 pt-2">
        {items.map((item) => (
          <ContentCard key={`${item.type}:${item.slug}`} item={item} showType />
        ))}
      </div>
    </div>
  );
}

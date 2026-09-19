import { Metadata } from "next";
import { getAllTags } from "@/lib/content";
import { TagBadge } from "@/components/shared/tag-badge";
import { Tag as TagIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Tags | E. Ndeze Bonheur",
  description: "Browse articles, posts, and projects across technical topics and domains.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="space-y-3 pb-8 border-b-[0.5px] border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ebcb00] uppercase tracking-wider font-semibold">
          <TagIcon className="h-4 w-4" />
          <span>Global Taxonomy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight pt-2">
          All Tags
        </h1>
        <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Explore publications, RFCs, engineering notes, and case studies indexed by technical topic.
        </p>
      </div>

      {/* Tags Grid */}
      <div className="py-8">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {tags.map(({ tag, count }) => (
              <TagBadge key={tag} tag={tag} count={count} className="text-sm px-3 py-1.5" />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm font-mono text-zinc-500">No tags indexed yet.</p>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { format } from "date-fns";
import { Clock, ArrowUpRight } from "lucide-react";
import { ContentMeta } from "@/lib/content";
import { TagBadge } from "@/components/shared/tag-badge";

interface ContentCardProps {
  item: ContentMeta;
  showType?: boolean;
}

export function ContentCard({ item, showType = false }: ContentCardProps) {
  const itemPath = `/${item.type}/${item.slug}`;

  return (
    <article className="group py-4 sm:py-5 border-b-[0.5px] border-zinc-200 dark:border-zinc-800/80 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1.5">
        <div className="flex items-center gap-2">
          {showType && (
            <span className="text-[11px] font-mono text-zinc-500 uppercase font-medium bg-transparent border-b border-transparent">
              {item.type}
            </span>
          )}
          <Link
            href={itemPath}
            className="font-mono text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[#ebcb00] transition-colors underline decoration-dashed underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-[#ebcb00]"
          >
            {item.title}
          </Link>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#ebcb00] transition-all shrink-0" />
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-zinc-400 dark:text-zinc-500">
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
      </div>

      {item.description && (
        <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3">
          {item.description}
        </p>
      )}

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {item.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}

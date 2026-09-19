import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  count?: number;
  className?: string;
  isActive?: boolean;
}

export function TagBadge({ tag, count, className, isActive }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
      className={cn(
        "group/tag inline-flex items-center gap-1 font-mono text-xs py-0.5 bg-transparent select-none cursor-pointer",
        "border-b border-transparent transition-all duration-200 ease-out",
        "hover:border-dashed hover:border-[#2a7c13] hover:text-[#2a7c13]",
        "dark:hover:border-[#ebcb00] dark:hover:text-[#ebcb00]",
        isActive
          ? "border-dashed border-[#2a7c13] text-[#2a7c13] dark:border-[#ebcb00] dark:text-[#ebcb00] font-medium"
          : "text-zinc-600 dark:text-zinc-400",
        className
      )}
    >
      <span
        className={cn(
          "transition-colors duration-200 ease-out",
          isActive
            ? "text-[#2a7c13] dark:text-[#ebcb00]"
            : "text-zinc-400 dark:text-zinc-500 group-hover/tag:text-[#2a7c13] dark:group-hover/tag:text-[#ebcb00]"
        )}
      >
        #
      </span>
      <span
        className={cn(
          "transition-colors duration-200 ease-out",
          isActive
            ? "text-[#2a7c13] dark:text-[#ebcb00]"
            : "group-hover/tag:text-[#2a7c13] dark:group-hover/tag:text-[#ebcb00]"
        )}
      >
        {tag}
      </span>
      {typeof count === "number" && (
        <span
          className={cn(
            "text-[11px] font-mono ml-0.5 transition-colors duration-200 ease-out",
            isActive
              ? "text-[#2a7c13]/80 dark:text-[#ebcb00]/80"
              : "text-zinc-400 dark:text-zinc-500 group-hover/tag:text-[#2a7c13] dark:group-hover/tag:text-[#ebcb00]"
          )}
        >
          ({count})
        </span>
      )}
    </Link>
  );
}

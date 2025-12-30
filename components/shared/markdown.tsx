import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Minimal, safe markdown renderer
 */
export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          h1: ({ node, ...props }) => (
            <h2 className="mt-6 text-xl font-semibold" {...props} />
          ),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          h2: ({ node, ...props }) => (
            <h3 className="mt-5 text-lg font-semibold" {...props} />
          ),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          p: ({ node, ...props }) => (
            <p className="leading-relaxed text-muted-foreground" {...props} />
          ),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6" {...props} />
          ),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          code: ({ node, inline, className, children, ...props }: any) =>
            inline ? (
              <code
                className="rounded bg-muted px-1 py-0.5 text-sm"
                {...props}
              />
            ) : (
              <code
                className="block rounded-lg bg-muted p-4 text-sm"
                {...props}
              />
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

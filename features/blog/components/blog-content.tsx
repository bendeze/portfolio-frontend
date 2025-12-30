"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { parseAsInteger, useQueryState } from "nuqs";

import { useBlogPosts } from "@/features/blog/hooks";
import { BlogPagination } from "@/features/blog/components/blog-pagination";
import { Markdown } from "@/components/shared/markdown";
import BlogListSkeleton from "@/features/blog/components/blog-skeleton";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function BlogPageContent() {
  // Ensure page is at least 1
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading, isError } = useBlogPosts(page);

  const last_element = data?.results[data.results.length - 1];

  // Calculate total items (Django usually sends this in 'count')
  const totalCount = data?.count || 0; 
  // IMPORTANT: Set this to match your Django Standard Page Size (settings.py)
  const PAGE_SIZE = 2;

  return (
    <div className="container py-24 max-w-6xl px-8 sm:mx-auto ">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-14 text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            Engineering Blog
          </h1>
          <p className="text-muted-foreground text-lg">
            Thoughts on software architecture, full-stack development, and AI.
          </p>
        </header>

        <Separator className="mb-12" />

        {/* Error */}
        {isError && (
          <p className="text-center text-sm text-muted-foreground">
            Failed to load blog posts.
          </p>
        )}

        {/* Loading */}
        {isLoading && <BlogListSkeleton />}

        {/* List */}
        {!isLoading && data && (
          <>
          <div className="space-y-14">
            {data.results.map((post) => (
              <article key={post.id}>
                <Card className="border-none shadow-none bg-background">
                  {/* Image */}
                  {post.image && (
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative mb-6 h-40 w-full overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority={false}
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                  )}

                  <CardHeader className="p-0 space-y-3">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <time>
                        {format(post.updated_at, "MMM dd, yyyy")}
                      </time>
                      <span>•</span>
                      <span>{post.reading_time} min read</span>
                      <Badge variant="secondary" className="ml-2">
                        {post.status}
                      </Badge>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-2xl leading-snug">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 mt-4">
                    <Markdown
                      content={post.summary}
                      className="prose-sm line-clamp-4"
                    />

                    <div className="mt-5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Read article →
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {last_element?.id !== post.id && <Separator className="mt-14" />}
              </article>
            ))}
          </div>
          <BlogPagination 
              totalCount={totalCount} 
              pageSize={PAGE_SIZE} 
            />
          </>
        )}
      </div>
    </div>
  );
}

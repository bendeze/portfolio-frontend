import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Props } from "@/features/blog/types";
import { safeFetch } from "@/lib/api-fetch";
import { BlogPostSchema, PaginatedResponseSchema } from "@/features/blog/schemas";
import { Button } from "@/components/ui/button";

// Explicitly define ISR revalidation strategy (1 hour)
export const revalidate = 3600;

/**
 * Pre-generate static paths for all published blog posts at build time.
 * Dramatically speeds up navigation and reduces database load.
 */
export async function generateStaticParams() {
  const responseData = await safeFetch<any>("/blog/?page_size=100", {}, null);
  if (!responseData) return [];

  const schema = PaginatedResponseSchema(BlogPostSchema);
  const parsed = schema.safeParse(responseData);
  if (!parsed.success) return [];

  return parsed.data.results.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata statically or dynamically with native deduplication.
 */
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  
  const rawPost = await safeFetch<any>(`/blog/${slug}/`, {}, null);
  if (!rawPost) {
    return { title: "Post Not Found" };
  }

  const parsed = BlogPostSchema.safeParse(rawPost);
  if (!parsed.success) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${parsed.data.title} | E.Ndeze`,
    description: parsed.data.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const rawPost = await safeFetch<any>(`/blog/${slug}/`, {}, null);
  if (!rawPost) {
    notFound();
  }

  const parsed = BlogPostSchema.safeParse(rawPost);
  if (!parsed.success) {
    console.error(`[BlogPostPage] Zod schema validation failed for blog slug: ${slug}`);
    notFound();
  }

  const post = parsed.data;

  return (
    <article className="container max-w-6xl px-8 sm:mx-auto py-24">
      <Button variant="ghost" asChild className="mb-10 -ml-4">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to blog
        </Link>
      </Button>

      <header className="mb-12">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="text-muted-foreground flex gap-2 text-sm items-center">
          <span>{post.author}</span> 
          <span>•</span> 
          <time>{format(new Date(post.created_at), "MMM dd, yyyy")}</time>
          <span>•</span>
          <span>{post.reading_time} min read</span>
        </div>
      </header>

      {post.image && (
        <div className="mb-12 w-full overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            priority
            className="w-full h-auto object-cover max-h-[500px]"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
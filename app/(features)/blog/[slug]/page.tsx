import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

import { Props } from "@/features/blog/types";
import { safeFetch } from "@/lib/api-fetch";
import { BlogPostSchema, PaginatedResponseSchema } from "@/features/blog/schemas";
import { extractHeadings } from "@/features/blog/utils/headings";
import { resolveEmbeddableMedia } from "@/features/blog/utils/media";
import { BlogReader } from "@/features/blog/components/blog-reader";

// Force dynamic rendering to deliver real-time content and ensure seamless build execution
export const dynamic = "force-dynamic";

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

  // Resolve any shared media links (Google Photos, Unsplash) inside post body to direct images
  const resolvedContent = await resolveEmbeddableMedia(post.content);

  // Extract h2 and h3 markdown headings for scroll-linked Table of Contents sidebar
  const headings = extractHeadings(resolvedContent);

  // Pre-serialize MDX string on the server side using GitHub Flavored Markdown
  const mdxSource = await serialize(resolvedContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  });

  return (
    <BlogReader post={post} headings={headings} mdxSource={mdxSource} />
  );
}
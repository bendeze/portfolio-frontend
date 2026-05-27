import { Suspense } from "react";
import BlogPageContent from "@/features/blog/components/blog-content";
import BlogListSkeleton from "@/features/blog/components/blog-skeleton";
import { safeFetch } from "@/lib/api-fetch";
import { PaginatedResponseSchema, BlogPostSchema } from "@/features/blog/schemas";

// Explicitly define ISR revalidation strategy (1 hour)
export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;

  // Server-side native fetch with automatic deduplication, timeout, and fallbacks
  const responseData = await safeFetch<any>(`/blog/?page=${currentPage}`, {}, null);

  let postsData = { count: 0, results: [] as any[] };
  if (responseData) {
    const schema = PaginatedResponseSchema(BlogPostSchema);
    const parsed = schema.safeParse(responseData);
    if (parsed.success) {
      postsData = {
        count: parsed.data.meta.count,
        results: parsed.data.results,
      };
    } else {
      console.error("[BlogPage] Zod schema validation failed for API response:", parsed.error.message);
    }
  }

  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogPageContent postsData={postsData} currentPage={currentPage} />
    </Suspense>
  );
}

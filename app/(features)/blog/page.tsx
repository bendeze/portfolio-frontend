import { Suspense } from "react";
import BlogPageContent from "@/features/blog/components/blog-content";
import BlogListSkeleton from "@/features/blog/components/blog-skeleton";
import { safeFetch } from "@/lib/api-fetch";
import { PaginatedResponseSchema, BlogPostSchema } from "@/features/blog/schemas";
import { YoutubeVideosSection } from "@/components/sections/youtube-videos";
import { getLatestYouTubeVideos } from "@/lib/youtube";

// Real-time server dynamic fetching for instant search & filters
export const revalidate = 0;

interface BlogPageProps {
  searchParams: Promise<{ 
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const currentCategory = params.category || "";
  const currentSearch = params.search || "";

  // Construct server-side fetch URL
  let fetchUrl = `/blog/?page=${currentPage}`;
  if (currentCategory) {
    fetchUrl += `&category__slug=${encodeURIComponent(currentCategory)}`;
  }
  if (currentSearch) {
    fetchUrl += `&search=${encodeURIComponent(currentSearch)}`;
  }

  // Debug logs to verify server-side parameters in terminal
  console.log(`[BlogPage Server Component] Loading page: ${currentPage}, Category: "${currentCategory}", Search: "${currentSearch}"`);
  console.log(`[BlogPage Server Component] Fetching URL from Django: ${fetchUrl}`);

  // FORCE cache: "no-store" to completely bypass Next.js server-side Data Caching
  const responseData = await safeFetch<any>(
    fetchUrl, 
    { 
      cache: "no-store", 
      next: { revalidate: 0 } 
    }, 
    null
  );

  console.log(`[BlogPage Server Component] Fetched articles count: ${responseData?.results?.length || 0}`);

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

  // Fetch YouTube Videos
  const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID || "";
  const youtubeVideos = await getLatestYouTubeVideos(youtubeChannelId, 10);

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogPageContent 
          postsData={postsData} 
          currentPage={currentPage}
          currentCategory={currentCategory}
          currentSearch={currentSearch}
        />
      </Suspense>
      
      {/* Show YouTube Videos Section below the blog content */}
      <YoutubeVideosSection videos={youtubeVideos} />
    </div>
  );
}

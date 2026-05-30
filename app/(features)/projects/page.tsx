import { Suspense } from "react";
import ProjectPageContent from "@/features/projects/components/project-content";
import { ProjectSkeleton } from "@/features/projects/components/project-skeleton";
import { safeFetch } from "@/lib/api-fetch";
import { z } from "zod";
import { PaginatedResponseSchema, ProjectSchema } from "@/features/projects/schemas";

// Real-time server dynamic fetching for instant search & filters
export const revalidate = 0;

interface ProjectPageProps {
  searchParams: Promise<{ 
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const currentCategory = params.category || "";
  const currentSearch = params.search || "";

  // Construct server-side fetch URL matching backend query parameters
  let fetchUrl = `/projects/?page=${currentPage}&page_size=8`;
  if (currentCategory) {
    fetchUrl += `&category__slug=${encodeURIComponent(currentCategory)}`;
  }
  if (currentSearch) {
    fetchUrl += `&search=${encodeURIComponent(currentSearch)}`;
  }

  console.log(`[ProjectPage Server Component] Loading page: ${currentPage}, Category: "${currentCategory}", Search: "${currentSearch}"`);
  console.log(`[ProjectPage Server Component] Fetching URL from Django: ${fetchUrl}`);

  // Fetch from Django REST backend
  const responseData = await safeFetch<any>(
    fetchUrl, 
    { 
      cache: "no-store", 
      next: { revalidate: 0 } 
    }, 
    null
  );

  let projectsData = { count: 0, results: [] as any[] };
  if (responseData) {
    const parsed = PaginatedResponseSchema.safeParse(responseData);
    if (parsed.success) {
      try {
        projectsData = {
          count: parsed.data.meta.count,
          results: z.array(ProjectSchema).parse(parsed.data.results),
        };
      } catch (err: any) {
        console.error("[ProjectPage] Error parsing projects domain mapping:", err.message || err);
      }
    } else {
      console.error("[ProjectPage] Zod schema validation failed for API response:", parsed.error.message);
    }
  }

  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectPageContent 
        postsData={projectsData}
        currentPage={currentPage}
        currentCategory={currentCategory}
        currentSearch={currentSearch}
      />
    </Suspense>
  );
}

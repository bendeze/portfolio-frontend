import { Suspense } from "react";
import ProjectPageContent from "@/features/projects/components/project-content";
import { ProjectSkeleton } from "@/features/projects/components/project-skeleton";
import { safeFetch } from "@/lib/api-fetch";
import { z } from "zod";
import { PaginatedResponseSchema, ProjectSchema } from "@/features/projects/schemas";

// Explicitly define ISR revalidation strategy (1 hour)
export const revalidate = 3600;

export default async function ProjectPage() {
  // Server-side native fetch with automatic deduplication, timeout, and try/catch fallbacks
  const responseData = await safeFetch<any>("/projects/?page_size=8", {}, null);

  let projects: any[] = [];
  if (responseData) {
    const parsed = PaginatedResponseSchema.safeParse(responseData);
    if (parsed.success) {
      try {
        projects = z.array(ProjectSchema).parse(parsed.data.results);
      } catch (err: any) {
        console.error("[ProjectPage] Error parsing projects domain mapping:", err.message || err);
      }
    } else {
      console.error("[ProjectPage] Zod schema validation failed for API response:", parsed.error.message);
    }
  }

  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectPageContent projects={projects} />
    </Suspense>
  );
}

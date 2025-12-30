import { Suspense } from "react";
import ProjectPageContent from "@/features/projects/components/project-content";
import { ProjectSkeleton } from "@/features/projects/components/project-skeleton";

export default function ProjectPage() {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectPageContent />
    </Suspense>
  );
}

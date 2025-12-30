import { Skeleton } from "@/components/ui/skeleton";

export function ProjectSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
</div>
  );
}
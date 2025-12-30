import { Suspense } from "react";
import BlogPageContent from "@/features/blog/components/blog-content";
import BlogListSkeleton from "@/features/blog/components/blog-skeleton";

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogPageContent />
    </Suspense>
  );
}

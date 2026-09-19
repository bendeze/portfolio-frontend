import { redirect } from "next/navigation";

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogSlugRedirect({ params }: BlogSlugPageProps) {
  const resolvedParams = await params;
  redirect(`/posts/${resolvedParams.slug}`);
}
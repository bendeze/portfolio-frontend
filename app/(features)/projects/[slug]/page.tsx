import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

import { safeFetch } from "@/lib/api-fetch";
import { ProjectSchema, PaginatedResponseSchema } from "@/features/projects/schemas";
import { extractHeadings } from "@/features/blog/utils/headings";
import { resolveEmbeddableMedia } from "@/features/blog/utils/media";
import { ProjectReader } from "@/features/projects/components/project-reader";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const responseData = await safeFetch<any>("/projects/?page_size=100", {}, null);
  if (!responseData) return [];

  const parsed = PaginatedResponseSchema.safeParse(responseData);
  if (!parsed.success) return [];

  return parsed.data.results.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  const rawProject = await safeFetch<any>(`/projects/${slug}/`, {}, null);
  if (!rawProject) {
    return { title: "Project Not Found" };
  }

  const parsed = ProjectSchema.safeParse(rawProject);
  if (!parsed.success) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${parsed.data.title} | E.Ndeze`,
    description: parsed.data.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const rawProject = await safeFetch<any>(`/projects/${slug}/`, {}, null);
  if (!rawProject) {
    notFound();
  }

  const parsed = ProjectSchema.safeParse(rawProject);
  if (!parsed.success) {
    console.error(`[ProjectDetailPage] Zod schema validation failed for project slug: ${slug}`, parsed.error.message);
    notFound();
  }

  const project = parsed.data;

  const resolvedContent = await resolveEmbeddableMedia(project.content);

  const headings = extractHeadings(resolvedContent);

  const mdxSource = await serialize(resolvedContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  });

  return (
    <ProjectReader project={project} headings={headings} mdxSource={mdxSource} />
  );
}

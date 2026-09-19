import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllContent, getContentBySlug, getAdjacentContent } from "@/lib/content";
import { ContentReader } from "@/components/reader/content-reader";
import { MdxContent } from "@/components/shared/mdx-content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllContent("projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getContentBySlug("projects", resolvedParams.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | E. Ndeze Bonheur`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      publishedTime: project.publishedAt,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getContentBySlug("projects", resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentContent("projects", resolvedParams.slug);

  return (
    <ContentReader item={project} prev={prev} next={next}>
      <MdxContent source={project.content} />
    </ContentReader>
  );
}

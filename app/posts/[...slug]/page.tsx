import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllContent, getContentBySlug, getAdjacentContent } from "@/lib/content";
import { ContentReader } from "@/components/reader/content-reader";
import { MdxContent } from "@/components/shared/mdx-content";

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const posts = getAllContent("posts");
  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join("/");
  const post = getContentBySlug("posts", slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | E. Ndeze Bonheur`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join("/");
  const post = getContentBySlug("posts", slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentContent("posts", slug);

  return (
    <ContentReader item={post} prev={prev} next={next}>
      <MdxContent source={post.content} />
    </ContentReader>
  );
}

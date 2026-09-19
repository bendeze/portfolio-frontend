import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllContent, getContentBySlug, getAdjacentContent } from "@/lib/content";
import { ContentReader } from "@/components/reader/content-reader";
import { MdxContent } from "@/components/shared/mdx-content";

interface ArticlePageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const articles = getAllContent("articles");
  return articles.map((article) => ({
    slug: article.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join("/");
  const article = getContentBySlug("articles", slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | E. Ndeze Bonheur`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join("/");
  const article = getContentBySlug("articles", slug);

  if (!article) {
    notFound();
  }

  const { prev, next } = getAdjacentContent("articles", slug);

  return (
    <ContentReader item={article} prev={prev} next={next}>
      <MdxContent source={article.content} />
    </ContentReader>
  );
}

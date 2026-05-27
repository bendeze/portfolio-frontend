import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { BlogPagination } from "@/features/blog/components/blog-pagination";
import { Markdown } from "@/components/shared/markdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BlogPost {
  id: string;
  author: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string | null;
  reading_time: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface BlogPageContentProps {
  postsData: {
    count: number;
    results: BlogPost[];
  };
  currentPage: number;
}

export default function BlogPageContent({ postsData, currentPage }: BlogPageContentProps) {
  const last_element = postsData.results[postsData.results.length - 1];
  const totalCount = postsData.count; 
  const PAGE_SIZE = 2; // Matches Django Standard Page Size

  return (
    <div className="container py-24 max-w-6xl px-8 sm:mx-auto ">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-14 text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            Engineering Blog
          </h1>
          <p className="text-muted-foreground text-lg">
            Thoughts on software architecture, full-stack development, and AI.
          </p>
        </header>

        <Separator className="mb-12" />

        {/* List */}
        <div className="space-y-14">
          {postsData.results.map((post) => (
            <article key={post.id}>
              <Card className="border-none shadow-none bg-background">
                {/* Image */}
                {post.image && (
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority={false}
                        className="object-cover transition-transform duration-300 hover:scale-[1.01]"
                      />
                    </div>
                  </Link>
                )}

                <CardHeader className="p-0 space-y-3">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time>
                      {format(new Date(post.updated_at), "MMM dd, yyyy")}
                    </time>
                    <span>•</span>
                    <span>{post.reading_time} min read</span>
                    <Badge variant="secondary" className="ml-2 capitalize">
                      {post.status}
                    </Badge>
                  </div>

                  {/* Title */}
                  <CardTitle className="text-2xl leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 mt-4">
                  <Markdown
                    content={post.summary}
                    className="prose-sm line-clamp-4"
                  />

                  <div className="mt-5">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read article →
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {last_element?.id !== post.id && <Separator className="mt-14" />}
            </article>
          ))}
        </div>

        <BlogPagination 
          totalCount={totalCount} 
          currentPage={currentPage}
          pageSize={PAGE_SIZE} 
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Props } from "@/features/blog/types";
import { isAxiosError } from "axios";
import { getBlogPostBySlug } from "@/features/blog/api";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: Props) {
  // Await the params first!
  const { slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug);
    return {
      title: `${post.title} | E.Ndeze`,
      description: post.summary,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

// 3. Fix the Page Component
export default async function BlogPostPage({ params }: Props) {
  // Await the params first!
  const { slug } = await params;
  
  let post;

  try {
    post = await getBlogPostBySlug(slug);
  } catch (error) {
    // If Django says 404, we tell Next.js to show the Not Found UI
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    // For other errors, you might want to throw them to trigger an Error Boundary
    throw error;
  }

  return (
    <article className="container max-w-6xl px-8 sm:mx-auto py-24">
      <Button variant="ghost" asChild className="mb-10 -ml-4">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to blog
        </Link>
      </Button>

      <header className="mb-12">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="text-muted-foreground flex gap-2 text-sm items-center">
          <span>{post.author}</span> 
          <span>•</span> 
          <time>{format(post.created_at, "MMM dd, yyyy")}</time>
          <span>•</span>
          <span>{post.reading_time} min read</span>
        </div>
      </header>

      {post.image && (
        <div className="mb-12 w-full overflow-hidden rounded-xl">
            <Image
            src={post.image}
            alt={post.title}
            // 1. "0" means "I don't know the size, just use the style"
            width={0}
            height={0}
            sizes="100vw"
            // 2. This style makes it full width and auto height (aspect ratio preserved)
            className="w-full h-auto" 
            priority
            />
        </div>
        )}

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
import { api } from "@/lib/axios";
import {
  BlogPostSchema,
  PaginatedResponseSchema,
} from "./schemas";

/**
 * Fetch all blog posts (paginated)
 */
export const getBlogPosts = async (page: number = 1) => {
  // Django usually uses ?page=2
  const { data } = await api.get(`/blog/?page=${page}`);

  const parsed = PaginatedResponseSchema(BlogPostSchema).parse(data);

  return {
    count: parsed.meta.count,
    next: parsed.meta.next,
    previous: parsed.meta.previous,
    results: parsed.results,
  };
};

/**
 * Fetch single blog post by slug
 */
export const getBlogPostBySlug = async (slug: string) => {
  const { data } = await api.get(`/blog/${slug}/`);
  return BlogPostSchema.parse(data);
};

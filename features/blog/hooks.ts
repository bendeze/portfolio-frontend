import { useQuery } from "@tanstack/react-query";

import {
  getBlogPostBySlug,
  getBlogPosts,
} from "./api";
import { blogQueryKeys } from "./query-keys.ts";

/**
 * Get all blog posts
 */
export const useBlogPosts = (page: number) =>
  useQuery({
    // Add page to the queryKey so it refetches when page changes
    queryKey: [...blogQueryKeys.list(), page], 
    queryFn: () => getBlogPosts(page),
    placeholderData: (previousData) => previousData, // Keeps list visible while loading next page
  });

/**
 * Get blog post by slug
 */
export const useBlogPost = (slug: string) =>
  useQuery({
    queryKey: blogQueryKeys.detail(slug),
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  });

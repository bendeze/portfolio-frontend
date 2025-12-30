import { z } from "zod";
import {
  BlogPostSchema,
  PaginatedResponseSchema,
} from "./schemas";

export type BlogPost = z.infer<typeof BlogPostSchema>;

export type PaginatedBlogPosts = z.infer<
  ReturnType<typeof PaginatedResponseSchema<typeof BlogPostSchema>>
>;

export type Props = {
  params: Promise<{ slug: string }>;
};
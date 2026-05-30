import { z } from "zod";

/**
 * Blog status enum
 * Adjust values to match backend choices:
 * DF = Draft, PB = Published, AC = Archived
 */
export const BackendBlogStatusEnum = z.enum([
  "DF",
  "PB",
  "AC",
]);

export const BlogStatusEnum = z.enum([
  "draft",
  "published",
  "archived",
]);

const statusMap: Record<
  z.infer<typeof BackendBlogStatusEnum>,
  z.infer<typeof BlogStatusEnum>
> = {
  DF: "draft",
  PB: "published",
  AC: "archived",
};

// 0. Define relation schemas
const TagAPISchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

const CategoryAPISchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

// 1. Raw API Shape representing exactly what Django returns
const BlogPostAPISchema = z.object({
  id: z.string().uuid(),
  author: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  content: z.string().optional().default(""),
  image: z.string().url().nullable().optional(),
  reading_time: z.number().nullable().optional().default(0),
  status: BackendBlogStatusEnum,
  likes_count: z.number().optional().default(0),
  // Backend returns serialized relations, not flat string arrays
  tags: z.array(TagAPISchema).optional().default([]),
  category: CategoryAPISchema.nullable().optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

/**
 * BlogPost schema (Domain Model)
 * Transforms backend API representation into clean frontend models.
 */
export const BlogPostSchema = BlogPostAPISchema.transform((apiPost) => ({
  id: apiPost.id,
  author: apiPost.author,
  title: apiPost.title,
  slug: apiPost.slug,
  summary: apiPost.summary,
  content: apiPost.content,
  image: apiPost.image,
  reading_time: apiPost.reading_time || 0,
  likes_count: apiPost.likes_count ?? 0,
  status: statusMap[apiPost.status],
  // Transform Tag objects to string names for list rendering
  tags: apiPost.tags.map((tag) => tag.name),
  // Map Category object to simple name or null
  category: apiPost.category ? apiPost.category.name : null,
  created_at: apiPost.created_at,
  updated_at: apiPost.updated_at,
}));

/**
 * Generic paginated response
 * Uses simple string validation for next/previous pages for maximum environment safety
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    meta: z.object({
      count: z.number(),
      next: z.string().nullable(),
      previous: z.string().nullable(),
    }),
    results: z.array(itemSchema),
  });


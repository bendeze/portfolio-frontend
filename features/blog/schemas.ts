import { z } from "zod";

/**
 * Blog status enum
 * Adjust values to match backend
 */
export const BackendBlogStatusEnum = z.enum([
  "DR",
  "PB",
  "AR",
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
    DR: "draft",
    PB: "published",
    AR: "archived",
    };

/**
 * BlogPost schema
 */
export const BlogPostSchema = z.object({
  id: z.string().uuid(),
  author: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  content: z.string(),
  image: z.string().url().nullable(),
  reading_time: z.number(),

  status: BackendBlogStatusEnum.transform(
    (value) => statusMap[value]
  ),

  tags: z.array(z.string()).optional().default([]),

  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});


/**
 * Generic paginated response
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    meta: z.object({
      count: z.number(),
      next: z.string().url().nullable(),
      previous: z.string().url().nullable(),
    }),
    results: z.array(itemSchema),
  });


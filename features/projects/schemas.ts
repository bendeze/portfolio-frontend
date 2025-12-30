import { z } from "zod";

// 1. Define the Raw API Shape (Exactly what the backend sends)
const ProjectAPISchema = z.object({
  id: z.string(), // Backend sends UUID string
  title: z.string(),
  slug: z.string(),
  summary: z.string(), // Backend name
  content: z.string(), // Backend name
  image: z.string().nullable().optional(),
  repository_url: z.string().url().nullable().optional(), // Backend name
  live_demo_url: z.string().url().nullable().optional(), // Backend name
  is_featured: z.boolean().default(false), // Backend name
  created_at: z.string(),
  // Backend is missing 'technologies', so we make it optional in API schema
  technologies: z.array(z.string()).optional().default([]), 
});

// 2. Define the Paginated Response Shape
export const PaginatedResponseSchema = z.object({
  meta: z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
  }),
  results: z.array(ProjectAPISchema),
});

// 3. Create the Domain Type (What our UI components use)
// We use .transform() to map Backend Fields -> Frontend Fields
export const ProjectSchema = ProjectAPISchema.transform((apiProject) => ({
  id: apiProject.id, // Keep string UUID
  title: apiProject.title,
  slug: apiProject.slug,
  description: apiProject.summary, // Map summary -> description
  content: apiProject.content, // Map content -> content
  image: apiProject.image,
  technologies: apiProject.technologies, // Defaults to []
  demo_link: apiProject.live_demo_url, // Map live_demo_url -> demo_link
  repo_link: apiProject.repository_url, // Map repository_url -> repo_link
  featured: apiProject.is_featured, // Map is_featured -> featured
  created_at: apiProject.created_at,
  page_size: z.number().optional(),
}));

export type Project = z.infer<typeof ProjectSchema>;
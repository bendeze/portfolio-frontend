import { z } from "zod";

// 0. Define the Category Relation Shape
const CategoryAPISchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

// Define the Technology Relation Shape
const TechnologyAPISchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  icon_name: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
});

// 1. Define the Raw API Shape (Exactly what the backend sends)
const ProjectAPISchema = z.object({
  id: z.string(), // Backend sends UUID string
  title: z.string(),
  slug: z.string(),
  summary: z.string(), // Backend name
  content: z.string().optional().default(""), // Backend name
  image: z.string().nullable().optional(),
  repository_url: z.string().url().nullable().optional(), // Backend name
  live_demo_url: z.string().url().nullable().optional(), // Backend name
  is_featured: z.boolean().default(false), // Backend name
  claps_count: z.number().default(0), // Backend name
  created_at: z.string(),
  category: CategoryAPISchema.nullable().optional(), // Nested category relation
  // Backend now returns fully serialized Technology objects
  technologies: z.array(TechnologyAPISchema).optional().default([]), 
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
  category: apiProject.category ? apiProject.category.name : null, // Extract category name
  // Transform the technology objects list into an array of string names for UI components
  technologies: apiProject.technologies.map((tech) => tech.name),
  demo_link: apiProject.live_demo_url, // Map live_demo_url -> demo_link
  repo_link: apiProject.repository_url, // Map repository_url -> repo_link
  featured: apiProject.is_featured, // Map is_featured -> featured
  claps: apiProject.claps_count, // Map claps_count -> claps
  created_at: apiProject.created_at,
}));

export type Project = z.infer<typeof ProjectSchema>;
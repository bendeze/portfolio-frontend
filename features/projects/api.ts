import { api } from "@/lib/axios";
import { Project, PaginatedResponseSchema, ProjectSchema } from "./schemas";
import { z } from "zod";

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await api.get("/projects/?page_size=8");
  
  // 1. Validate the structure (Paginated)
  const parsedData = PaginatedResponseSchema.parse(data);

  // 2. Transform the results array using our ProjectSchema
  // z.array(ProjectSchema) will run the .transform() function for every item
  return z.array(ProjectSchema).parse(parsedData.results);
};

export const getFeaturedProjects = async (page_size: number = 4): Promise<Project[]> => {
  const { data } = await api.get(`/projects/featured/?page_size=${page_size}`);
  
  // 1. Validate the structure (Paginated)
  const parsedData = PaginatedResponseSchema.parse(data);

  // 2. Transform the results array using our ProjectSchema
  // z.array(ProjectSchema) will run the .transform() function for every item
  return z.array(ProjectSchema).parse(parsedData.results);
};

/**
 * Fetch single blog post by slug
 */
export const getProjectBySlug = async (slug: string) => {

  const { data } = await api.get(`/projects/${slug}/`);
  return ProjectSchema.parse(data);
};
import { api } from "@/lib/axios";
import { Project, PaginatedResponseSchema, ProjectSchema } from "./schemas";
import { z } from "zod";

export const getProjects = async (page: number = 1, category: string = "", search: string = ""): Promise<Project[]> => {
  let fetchUrl = `/projects/?page=${page}&page_size=8`;
  if (category) {
    fetchUrl += `&category__slug=${encodeURIComponent(category)}`;
  }
  if (search) {
    fetchUrl += `&search=${encodeURIComponent(search)}`;
  }
  const { data } = await api.get(fetchUrl);
  
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

export const clapProject = async (slug: string, amount: number = 1): Promise<number> => {
  const { data } = await api.post(`/projects/${slug}/clap/`, { amount });
  return data.claps_count;
};
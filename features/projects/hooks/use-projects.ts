import { useQuery } from "@tanstack/react-query";
import { getProjects, getFeaturedProjects, getProjectBySlug } from "../api";

export const projectQueryKeys = {
  all: ["projects"] as const,
  list: () => [...projectQueryKeys.all, "list"] as const,
  detail: (slug: string) =>
    [...projectQueryKeys.all, "detail", slug] as const,
};


export function useProjects() {
  return useQuery({
    queryKey: ["projects"], // Unique key for caching
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });
}

export function useFeaturedProjects(page_size: number = 4) {
  return useQuery({
    queryKey: ["projects/featured"], // Unique key for caching
    queryFn: () => getFeaturedProjects(page_size),
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });
}

export const useProject = (slug: string) =>
  useQuery({
    queryKey: projectQueryKeys.detail(slug),
    queryFn: () => getProjectBySlug(slug),
    enabled: !!slug,
  });
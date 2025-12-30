export const blogQueryKeys = {
  all: ["blog"] as const,
  list: () => [...blogQueryKeys.all, "list"] as const,
  detail: (slug: string) =>
    [...blogQueryKeys.all, "detail", slug] as const,
};

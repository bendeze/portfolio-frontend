export const STATUS_SIZES = {
  sm: { dot: "h-2 w-2", ping: "h-2 w-2" },
  md: { dot: "h-3 w-3", ping: "h-3 w-3" },
  lg: { dot: "h-4 w-4", ping: "h-4 w-4" },
} as const;

export type StatusSize = keyof typeof STATUS_SIZES;

    export const STATUS_CONFIG = {
  active: {
    dot: "bg-emerald-500",
    ping: "bg-emerald-400",
    animate: true,
    label: "Active",
  },
  down: {
    dot: "bg-red-500",
    ping: "bg-red-400",
    animate: true,
    label: "Down",
  },
  fixing: {
    dot: "bg-amber-500",
    ping: "bg-amber-400",
    animate: true,
    label: "Fixing",
  },
  idle: {
    dot: "bg-slate-500",
    ping: "bg-slate-400",
    animate: false,
    label: "Idle",
  },
  available: {
    dot: "bg-green-500",
    ping: "bg-green-400",
    animate: true,
    label: "Available",
  },
  busy: {
    dot: "bg-orange-500",
    ping: "bg-orange-400",
    animate: false,
    label: "Busy",
  },
  maintenance: {
  dot: "bg-blue-500",
  ping: "bg-blue-400",
  animate: true,
  label: "Maintenance",
},
} as const;

export type StatusKey = keyof typeof STATUS_CONFIG;

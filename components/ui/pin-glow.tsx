// components/ui/pin-glow.tsx
"use client";

import { motion } from "motion/react";

interface PinGlowProps {
  title?: string;
  href?: string;
}

export function PinGlow({ title, href }: PinGlowProps) {
  if (!title) return null;

  return (
    <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 transition">
      <a
        href={href}
        target="_blank"
        className="rounded-full bg-zinc-900 px-4 py-1 text-xs font-semibold text-white ring-1 ring-white/10"
      >
        {title}
      </a>
    </motion.div>
  );
}

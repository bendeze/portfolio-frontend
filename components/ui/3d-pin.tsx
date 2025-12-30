// components/ui/pin-container.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PinGlow } from "./pin-glow";

interface PinContainerProps {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}

export function PinContainer({
  children,
  title,
  href = "#",
  className,
  containerClassName,
}: PinContainerProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
      onKeyDown={(e) => e.key === "Enter" && window.open(href, "_blank")}
      rel="noopener noreferrer"
      className={cn("relative group/pin block", containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Card */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "1000px" }}
      >
        <div
          className={cn(
            "rounded-2xl border border-white/10 bg-zinc-950 shadow-lg transition-transform duration-700 w-full",
            className
          )}
          style={{
            transform: isHovered
              ? "rotateX(40deg) scale(0.9)"
              : "rotateX(0deg) scale(1)",
          }}
        >
          {children}
        </div>
      </div>

      <PinGlow title={title} href={href} />
    </div>
  );
}

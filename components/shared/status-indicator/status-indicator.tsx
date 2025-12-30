import React from "react";
import { cn } from "@/lib/utils";
import { STATUS_CONFIG, StatusKey } from "./status.config";
import { STATUS_SIZES, StatusSize } from "./status.sizes";

interface StatusIndicatorProps {
  status: StatusKey;
  size?: StatusSize;
  label?: string;
  className?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

export function StatusIndicator({
  status,
  size = "md",
  label,
  showLabel = true,
  className,
  labelClassName,
}: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status];
  const sizes = STATUS_SIZES[size];

  if (!config) return null;

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="status"
      aria-label={label ?? config.label}
    >
      <span className="relative inline-flex">
        {config.animate && (
          <span
            className={cn(
              "absolute inline-flex rounded-full opacity-75 animate-ping",
              sizes.ping,
              config.ping
            )}
          />
        )}

        <span
          className={cn(
            "relative inline-flex rounded-full",
            sizes.dot,
            config.dot
          )}
        />
      </span>

      {showLabel && (
        <span
          className={cn(
            "text-sm text-muted-foreground",
            labelClassName
          )}
        >
          {label ?? config.label}
        </span>
      )}
    </div>
  );
}

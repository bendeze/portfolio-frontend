"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { GitBranch, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { DiagramContainer } from "./diagram-container";
import {
  cleanDiagramSource,
  renderMermaidSafely,
  getCachedMermaidSvg,
} from "./diagram-utils";

export interface MermaidDiagramProps {
  chart: string;
  title?: string;
  className?: string;
}

export function MermaidDiagram({
  chart,
  title = "Mermaid Diagram",
  className,
}: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const [renderCount, setRenderCount] = useState(0);

  const cleanedChart = cleanDiagramSource(chart);

  // Immediate detection of dark mode from DOM if resolvedTheme is not ready yet
  const isDark =
    resolvedTheme === "dark" ||
    (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  // Check cache synchronously for instant display without flash
  const cachedSvg = cleanedChart ? getCachedMermaidSvg(cleanedChart, isDark) : undefined;

  const [svgContent, setSvgContent] = useState<string>(cachedSvg || "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedSvg);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    if (!cleanedChart) {
      setIsLoading(false);
      setError("Diagram source is empty");
      return;
    }

    // If already in cache, apply immediately
    const immediateCached = getCachedMermaidSvg(cleanedChart, isDark);
    if (immediateCached) {
      setSvgContent(immediateCached);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Only set loading to true if we don't have any SVG yet to prevent flickering
    if (!svgContent) {
      setIsLoading(true);
    }
    setError(null);

    async function executeRender() {
      try {
        const svg = await renderMermaidSafely(cleanedChart, isDark);
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error("Mermaid diagram render error:", err);
          const rawMsg = err instanceof Error ? err.message : String(err);
          const cleanMsg = rawMsg
            .split("\n")[0]
            .replace(/Parse error on line \d+:/i, "Syntax error:")
            .trim();

          setError(cleanMsg || "Invalid diagram syntax");
          setIsLoading(false);
        }
      }
    }

    executeRender();

    return () => {
      isMounted = false;
    };
  }, [cleanedChart, isDark, renderCount]);

  const handleRetry = () => {
    setRenderCount((prev) => prev + 1);
  };

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-diagram.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DiagramContainer
      title={title}
      badge="MERMAID"
      code={cleanedChart || chart}
      icon={<GitBranch className="h-3.5 w-3.5 text-[#ebcb00]" />}
      className={className}
      onDownloadSvg={svgContent ? handleDownloadSvg : undefined}
    >
      {isLoading && !svgContent ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3 select-none">
          <Loader2 className="h-6 w-6 animate-spin text-[#ebcb00]" />
          <span className="text-xs font-mono tracking-wide">Rendering diagram...</span>
        </div>
      ) : error && !svgContent ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-w-md mx-auto space-y-3 select-none">
          <AlertCircle className="h-8 w-8 text-amber-500" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">
              Diagram Syntax Warning
            </h5>
            <p className="text-[11px] text-muted-foreground font-mono leading-relaxed break-words">
              {error}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-foreground transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry</span>
            </button>
            <span className="text-[10px] text-zinc-500 font-sans">
              or switch to the &quot;Source&quot; tab above
            </span>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="w-full min-w-full flex justify-center items-center select-none overflow-x-auto p-4 sm:p-6 [&>svg]:max-w-none [&>svg]:w-auto [&>svg]:h-auto [&>svg]:min-w-[280px] [&_svg]:filter-none [&_svg_*]:filter-none [&_svg_*]:drop-shadow-none [&_svg_*]:shadow-none [&_rect]:filter-none [&_polygon]:filter-none [&_circle]:filter-none [&_path]:filter-none [&_.node]:filter-none [&_.cluster]:filter-none"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </DiagramContainer>
  );
}

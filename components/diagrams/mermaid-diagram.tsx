"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AlertCircle, Loader2 } from "lucide-react";
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

export function MermaidDiagram({ chart, title, className }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const cleanedChart = cleanDiagramSource(chart);

  // Immediate detection of dark mode
  const isDark =
    resolvedTheme === "dark" ||
    (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  // Synchronous cache check for instant rendering without flash
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

    const immediateCached = getCachedMermaidSvg(cleanedChart, isDark);
    if (immediateCached) {
      setSvgContent(immediateCached);
      setError(null);
      setIsLoading(false);
      return;
    }

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
  }, [cleanedChart, isDark]);

  if (error && !svgContent) {
    // If syntax fails, fallback directly to raw code block (exactly like GitHub)
    return (
      <div className="my-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 font-mono text-xs overflow-x-auto">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2 font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Mermaid Syntax Warning: {error}</span>
        </div>
        <pre className="text-zinc-700 dark:text-zinc-300 p-2 bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
          <code>{cleanedChart || chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={`my-6 flex justify-center items-center overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 sm:p-6 select-none ${
        className || ""
      }`}
    >
      {isLoading && !svgContent ? (
        <div className="flex items-center justify-center py-8 text-zinc-400 gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-[#ebcb00]" />
          <span className="text-xs font-mono">Rendering diagram...</span>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="w-full flex justify-center items-center overflow-x-auto [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:mx-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
}

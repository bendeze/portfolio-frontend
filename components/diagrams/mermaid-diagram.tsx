"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { useTheme } from "next-themes";
import { GitBranch, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { DiagramContainer } from "./diagram-container";
import {
  cleanDiagramSource,
  mermaidQueue,
  cleanupMermaidDomElements,
} from "./diagram-utils";

export interface MermaidDiagramProps {
  chart: string;
  title?: string;
  className?: string;
}

// Global counter for bulletproof unique DOM IDs
let diagramCounter = 0;

export function MermaidDiagram({
  chart,
  title = "Mermaid Diagram",
  className,
}: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const [renderCount, setRenderCount] = useState(0);

  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanedChart = cleanDiagramSource(chart);

  useEffect(() => {
    let isMounted = true;
    let renderTimer: NodeJS.Timeout | null = null;

    if (!cleanedChart) {
      setIsLoading(false);
      setError("Diagram source is empty");
      return;
    }

    async function executeRender() {
      setIsLoading(true);
      setError(null);

      // Safe DOM ID without special characters
      diagramCounter += 1;
      const safeId = `mermaid_diag_${Date.now()}_${diagramCounter}`;

      // Timeout watchdog: ensure we NEVER get stuck permanently in loading state
      renderTimer = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
          setError("Diagram rendering timed out. Switch to Source tab to view code.");
          cleanupMermaidDomElements(safeId);
        }
      }, 7000);

      try {
        await mermaidQueue.enqueue(async () => {
          if (!isMounted) return;

          // Dynamically import Mermaid on client
          const mermaid = (await import("mermaid")).default;
          const isDark =
            resolvedTheme === "dark" ||
            (typeof document !== "undefined" &&
              document.documentElement.classList.contains("dark"));

          mermaid.initialize({
            startOnLoad: false,
            suppressErrorRendering: true,
            securityLevel: "loose",
            fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
            theme: isDark ? "dark" : "default",
            themeVariables: isDark
              ? {
                  darkMode: true,
                  background: "#09090b",
                  primaryColor: "#27272a",
                  primaryTextColor: "#f4f4f5",
                  primaryBorderColor: "#3f3f46",
                  lineColor: "#71717a",
                  secondaryColor: "#18181b",
                  tertiaryColor: "#141416",
                  nodeBorder: "#3f3f46",
                  clusterBkg: "#18181b",
                  clusterBorder: "#27272a",
                  defaultLinkColor: "#a1a1aa",
                  titleColor: "#fafafa",
                  edgeLabelBackground: "#18181b",
                  actorBkg: "#27272a",
                  actorBorder: "#3f3f46",
                  actorTextColor: "#f4f4f5",
                  actorLineColor: "#71717a",
                  signalColor: "#f4f4f5",
                  signalTextColor: "#f4f4f5",
                  labelBoxBkgColor: "#27272a",
                  labelBoxBorderColor: "#3f3f46",
                  labelTextColor: "#f4f4f5",
                }
              : {
                  darkMode: false,
                  background: "#ffffff",
                  primaryColor: "#f4f4f5",
                  primaryTextColor: "#18181b",
                  primaryBorderColor: "#e4e4e7",
                  lineColor: "#71717a",
                  secondaryColor: "#fafafa",
                  tertiaryColor: "#ffffff",
                  nodeBorder: "#d4d4d8",
                  clusterBkg: "#fafafa",
                  clusterBorder: "#e4e4e7",
                  defaultLinkColor: "#52525b",
                  titleColor: "#18181b",
                  edgeLabelBackground: "#ffffff",
                  actorBkg: "#f4f4f5",
                  actorBorder: "#e4e4e7",
                  actorTextColor: "#18181b",
                  actorLineColor: "#71717a",
                  signalColor: "#18181b",
                  signalTextColor: "#18181b",
                  labelBoxBkgColor: "#f4f4f5",
                  labelBoxBorderColor: "#e4e4e7",
                  labelTextColor: "#18181b",
                },
          });

          // Pre-clean any leftover DOM artifacts
          cleanupMermaidDomElements(safeId);

          // Render diagram
          const { svg } = await mermaid.render(safeId, cleanedChart);

          if (isMounted) {
            // Post-process SVG for responsive container fitting
            // Remove hardcoded max-width if it artificially compresses wide diagrams
            const responsiveSvg = svg.replace(/style="max-width:\s*[^"]+;?"/i, "");
            setSvgContent(responsiveSvg);
            setError(null);
            setIsLoading(false);
          }
        });
      } catch (err: unknown) {
        if (isMounted) {
          console.error("Mermaid diagram render error:", err);
          cleanupMermaidDomElements(safeId);
          const rawMsg = err instanceof Error ? err.message : String(err);
          // Strip internal parser traceback if present for cleaner user message
          const cleanMsg = rawMsg
            .split("\n")[0]
            .replace(/Parse error on line \d+:/i, "Syntax error:")
            .trim();

          setError(cleanMsg || "Invalid diagram syntax");
          setIsLoading(false);
        }
      } finally {
        if (renderTimer) clearTimeout(renderTimer);
        cleanupMermaidDomElements(safeId);
      }
    }

    executeRender();

    return () => {
      isMounted = false;
      if (renderTimer) clearTimeout(renderTimer);
    };
  }, [cleanedChart, resolvedTheme, renderCount]);

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
      icon={<GitBranch className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />}
      className={className}
      onDownloadSvg={svgContent ? handleDownloadSvg : undefined}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3 select-none">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
          <span className="text-xs font-mono tracking-wide">Rendering diagram...</span>
        </div>
      ) : error ? (
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
          className="w-full min-w-full flex justify-center items-center select-none overflow-x-auto p-2 [&>svg]:max-w-none [&>svg]:w-auto [&>svg]:h-auto [&>svg]:min-w-[200px]"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </DiagramContainer>
  );
}

"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { useTheme } from "next-themes";
import { GitBranch, AlertCircle, Loader2 } from "lucide-react";
import { DiagramContainer } from "./diagram-container";

export interface MermaidDiagramProps {
  chart: string;
  title?: string;
  className?: string;
}

export function MermaidDiagram({ chart, title = "Mermaid Diagram", className }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const diagramId = "mermaid-" + rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderMermaid() {
      setIsLoading(true);
      setError(null);

      try {
        const mermaid = (await import("mermaid")).default;
        const isDark =
          resolvedTheme === "dark" ||
          (typeof document !== "undefined" &&
            document.documentElement.classList.contains("dark"));

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
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

        const cleanChart = chart.trim();
        const renderId = `${diagramId}-${Date.now()}`;
        const { svg } = await mermaid.render(renderId, cleanChart);

        if (isMounted) {
          setSvgContent(svg);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error("Mermaid diagram render error:", err);
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg || "Invalid Mermaid syntax");
          setIsLoading(false);
        }
      }
    }

    renderMermaid();

    return () => {
      isMounted = false;
    };
  }, [chart, resolvedTheme, diagramId]);

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
      code={chart}
      icon={<GitBranch className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />}
      className={className}
      onDownloadSvg={svgContent ? handleDownloadSvg : undefined}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
          <span className="text-xs font-mono">Rendering diagram...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-w-md mx-auto space-y-3">
          <AlertCircle className="h-8 w-8 text-amber-500" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">
              Diagram Syntax Warning
            </h5>
            <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">
              {error}
            </p>
          </div>
          <span className="text-[10px] text-zinc-500 font-sans">
            Switch to the &quot;Source&quot; tab above to view raw mermaid code.
          </span>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="w-full flex justify-center items-center select-none overflow-x-auto [&>svg]:max-w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </DiagramContainer>
  );
}

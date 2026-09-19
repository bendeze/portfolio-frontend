"use client";

import React, { useState, useEffect } from "react";
import { Network, AlertCircle, Loader2, ExternalLink, RefreshCw } from "lucide-react";
import { DiagramContainer } from "./diagram-container";
import { cleanDiagramSource } from "./diagram-utils";

export interface PlantUMLDiagramProps {
  code: string;
  title?: string;
  className?: string;
}

export function PlantUMLDiagram({
  code,
  title = "PlantUML Diagram",
  className,
}: PlantUMLDiagramProps) {
  const [svgUrl, setSvgUrl] = useState<string>("");
  const [editorUrl, setEditorUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isEncoding, setIsEncoding] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  const cleanedCode = cleanDiagramSource(code);

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout | null = null;

    if (!cleanedCode) {
      setIsEncoding(false);
      setIsImageLoading(false);
      setError("PlantUML source is empty");
      return;
    }

    async function encodePlantUML() {
      setIsEncoding(true);
      setIsImageLoading(true);
      setError(null);

      // Watchdog timeout to prevent infinite loader
      timer = setTimeout(() => {
        if (isMounted) {
          setIsImageLoading(false);
          setIsEncoding(false);
        }
      }, 7000);

      try {
        const plantumlEncoder = (await import("plantuml-encoder")).default;
        
        let codeWithNoShadow = cleanedCode;
        if (!/skinparam\s+shadowing/i.test(codeWithNoShadow)) {
          if (/^@startuml/m.test(codeWithNoShadow)) {
            codeWithNoShadow = codeWithNoShadow.replace(/^@startuml\b/m, "@startuml\nskinparam shadowing false\n");
          } else {
            codeWithNoShadow = `@startuml\nskinparam shadowing false\n${codeWithNoShadow}\n@enduml`;
          }
        }

        const encoded = plantumlEncoder.encode(codeWithNoShadow);

        const serverUrl =
          process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL ||
          "https://www.plantuml.com/plantuml";

        const url = `${serverUrl}/svg/~1${encoded}`;
        const editUrl = `${serverUrl}/uml/~1${encoded}`;

        if (isMounted) {
          setSvgUrl(url);
          setEditorUrl(editUrl);
          setIsEncoding(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error("PlantUML encoding error:", err);
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg || "Failed to encode PlantUML code");
          setIsEncoding(false);
          setIsImageLoading(false);
        }
      }
    }

    encodePlantUML();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [cleanedCode, renderCount]);

  const handleRetry = () => {
    setRenderCount((prev) => prev + 1);
  };

  const handleDownloadSvg = async () => {
    if (!svgUrl) return;
    try {
      const response = await fetch(svgUrl);
      const text = await response.text();
      const blob = new Blob([text], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-plantuml.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download PlantUML SVG failed:", err);
    }
  };

  const isLoading = isEncoding || (Boolean(svgUrl) && isImageLoading && !error);

  return (
    <DiagramContainer
      title={title}
      badge="PLANTUML"
      code={cleanedCode || code}
      icon={<Network className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />}
      className={className}
      onDownloadSvg={svgUrl ? handleDownloadSvg : undefined}
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3 select-none">
          <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
          <span className="text-xs font-mono tracking-wide">Generating PlantUML diagram...</span>
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-w-md mx-auto space-y-3 select-none">
          <AlertCircle className="h-8 w-8 text-amber-500" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">
              PlantUML Server Error
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
            {editorUrl && (
              <a
                href={editorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-indigo-500 hover:underline"
              >
                <span>View Online</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      ) : (
        svgUrl && (
          <div className={`flex flex-col items-center justify-center w-full space-y-4 ${isLoading ? "sr-only" : "block"}`}>
            <div className="w-full flex justify-center items-center overflow-x-auto select-none rounded-lg p-3 bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 shadow-none">
              {/* PlantUML SVG Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={svgUrl}
                alt={title}
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageLoading(false);
                  setError("Failed to fetch rendered diagram from PlantUML server.");
                }}
                className="max-w-none w-auto h-auto object-contain dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-125 transition-all duration-300"
              />
            </div>

            {editorUrl && (
              <a
                href={editorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Open in PlantUML Online Server</span>
              </a>
            )}
          </div>
        )
      )}
    </DiagramContainer>
  );
}

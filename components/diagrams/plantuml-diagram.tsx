"use client";

import React, { useState, useEffect } from "react";
import { Network, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { DiagramContainer } from "./diagram-container";

export interface PlantUMLDiagramProps {
  code: string;
  title?: string;
  className?: string;
}

export function PlantUMLDiagram({ code, title = "PlantUML Diagram", className }: PlantUMLDiagramProps) {
  const [svgUrl, setSvgUrl] = useState<string>("");
  const [editorUrl, setEditorUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function encodePlantUML() {
      setIsLoading(true);
      setError(null);

      try {
        const plantumlEncoder = (await import("plantuml-encoder")).default;
        const cleanCode = code.trim();
        const encoded = plantumlEncoder.encode(cleanCode);

        const serverUrl =
          process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL ||
          "https://www.plantuml.com/plantuml";

        const url = `${serverUrl}/svg/~1${encoded}`;
        const editUrl = `${serverUrl}/uml/~1${encoded}`;

        if (isMounted) {
          setSvgUrl(url);
          setEditorUrl(editUrl);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error("PlantUML encoding error:", err);
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg || "Failed to encode PlantUML code");
          setIsLoading(false);
        }
      }
    }

    encodePlantUML();

    return () => {
      isMounted = false;
    };
  }, [code]);

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

  return (
    <DiagramContainer
      title={title}
      badge="PLANTUML"
      code={code}
      icon={<Network className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />}
      className={className}
      onDownloadSvg={svgUrl ? handleDownloadSvg : undefined}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
          <span className="text-xs font-mono">Generating PlantUML diagram...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-w-md mx-auto space-y-3">
          <AlertCircle className="h-8 w-8 text-amber-500" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">
              PlantUML Error
            </h5>
            <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">
              {error}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="w-full flex justify-center items-center overflow-x-auto select-none rounded-lg p-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs">
            {/* PlantUML SVG */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svgUrl}
              alt={title}
              className="max-w-full h-auto object-contain dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-125 transition-all duration-300"
              onError={() => setError("Failed to render PlantUML SVG diagram from server.")}
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
      )}
    </DiagramContainer>
  );
}

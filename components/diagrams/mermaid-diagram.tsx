"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
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

  const isDark =
    resolvedTheme === "dark" ||
    (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  const cachedSvg = cleanedChart ? getCachedMermaidSvg(cleanedChart, isDark) : undefined;

  const [svgContent, setSvgContent] = useState<string>(cachedSvg || "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedSvg);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pan & Zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  // Pan & Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.4));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePan = (dx: number, dy: number) => {
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(cleanedChart || chart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy diagram source:", err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    handleReset();
  };

  // Mouse Drag to Pan
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const onMouseUp = () => setIsDragging(false);

  // Wheel zoom with Ctrl or meta
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY * -0.002;
      setZoom((prev) => Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.4), 3));
    }
  };

  if (error && !svgContent) {
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
    <>
      {/* Normal In-Article Diagram View */}
      <div
        className={`group relative my-6 rounded-lg border-[0.5px] border-dashed border-[#ebcb00]/50 dark:border-[#ebcb00]/40 bg-transparent overflow-hidden ${
          className || ""
        }`}
      >
        {/* Top-Right Action Buttons (Fullscreen, Copy) */}
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={toggleFullscreen}
            title="Expand Fullscreen"
            aria-label="Expand Fullscreen"
            className="p-1.5 rounded-md bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-xs cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleCopyCode}
            title="Copy Diagram Source"
            aria-label="Copy Diagram Source"
            className="p-1.5 rounded-md bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-xs cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Diagram Canvas */}
        <div
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onWheel={handleWheel}
          className={`relative w-full min-h-[120px] max-h-[500px] p-3 sm:p-5 overflow-hidden flex items-center justify-center select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {isLoading && !svgContent ? (
            <div className="flex items-center justify-center py-10 text-zinc-400 gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#ebcb00]" />
              <span className="text-xs font-mono">Rendering diagram...</span>
            </div>
          ) : (
            <div
              className="w-full flex items-center justify-center transition-transform duration-75 ease-out origin-center"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <div
                className="w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:max-h-[440px] [&_svg]:w-auto [&_svg]:h-auto [&_svg]:mx-auto [&_svg]:block"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          )}
        </div>

        {/* Bottom-Right GitHub-Style D-Pad Pan & Zoom Controller */}
        <div className="absolute bottom-2.5 right-2.5 z-20 opacity-85 group-hover:opacity-100 transition-opacity select-none">
          <div className="flex flex-col gap-1 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xs p-1 rounded-md border border-zinc-200 dark:border-zinc-700/80 shadow-xs">
            {/* Row 1: Up, ZoomIn */}
            <div className="flex gap-1 justify-end">
              <button
                onClick={() => handlePan(0, 40)}
                title="Pan Up"
                aria-label="Pan Up"
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                aria-label="Zoom In"
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Row 2: Left, Reset, Right */}
            <div className="flex gap-1 justify-end">
              <button
                onClick={() => handlePan(40, 0)}
                title="Pan Left"
                aria-label="Pan Left"
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleReset}
                title="Reset View"
                aria-label="Reset View"
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
              <button
                onClick={() => handlePan(-40, 0)}
                title="Pan Right"
                aria-label="Pan Right"
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Row 3: Down, ZoomOut */}
            <div className="flex gap-1 justify-end">
              <button
                onClick={() => handlePan(0, -40)}
                title="Pan Down"
                aria-label="Pan Down"
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                aria-label="Zoom Out"
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Modal (GitHub Style) */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-100 shrink-0">
            <span className="font-mono text-xs text-zinc-400">
              {title || "Diagram Viewer (Drag to pan, Ctrl+Scroll to zoom)"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied" : "Copy Source"}</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Canvas */}
          <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={handleWheel}
            className={`flex-1 flex items-center justify-center overflow-hidden select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div
              className="w-full flex items-center justify-center transition-transform duration-75 ease-out origin-center"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <div
                className="w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto [&_svg]:block"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          </div>

          {/* D-Pad Controller in Fullscreen */}
          <div className="absolute bottom-6 right-6 z-50 select-none">
            <div className="flex flex-col gap-1 bg-zinc-900/90 backdrop-blur-xs p-1.5 rounded-lg border border-zinc-700 shadow-lg">
              <div className="flex gap-1 justify-end">
                <button
                  onClick={() => handlePan(0, 50)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
              <div className="flex gap-1 justify-end">
                <button
                  onClick={() => handlePan(50, 0)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handlePan(-50, 0)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex gap-1 justify-end">
                <button
                  onClick={() => handlePan(0, -50)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState, useRef } from "react";
import {
  Code,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DiagramContainerProps {
  title?: string;
  badge?: string;
  code: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  activeTab?: "diagram" | "code" | "mermaid";
  onTabChange?: (tab: "diagram" | "code" | "mermaid") => void;
  availableTabs?: { id: "diagram" | "code" | "mermaid"; label: string; icon?: React.ReactNode }[];
  onDownloadSvg?: () => void;
  allowZoom?: boolean;
}

export function DiagramContainer({
  title,
  badge = "DIAGRAM",
  code,
  icon,
  children,
  className,
  activeTab: controlledTab,
  onTabChange,
  availableTabs = [
    { id: "diagram", label: "Diagram", icon: <Eye className="h-3 w-3" /> },
    { id: "code", label: "Source", icon: <Code className="h-3 w-3" /> },
  ],
  onDownloadSvg,
  allowZoom = true,
}: DiagramContainerProps) {
  const [internalTab, setInternalTab] = useState<"diagram" | "code" | "mermaid">("diagram");
  const activeTab = controlledTab ?? internalTab;

  const handleTabSelect = (tabId: "diagram" | "code" | "mermaid") => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalTab(tabId);
    }
  };

  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.4));
  const handleResetZoom = () => setZoom(1);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy diagram source:", err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setZoom(1);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative my-8 rounded-2xl border border-border/60 bg-zinc-950/[0.03] dark:bg-zinc-950/60 shadow-sm overflow-hidden transition-all duration-300",
          isFullscreen ? "hidden" : "block",
          className
        )}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-border/40 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md">
          {/* Left Title & Badge */}
          <div className="flex items-center gap-2">
            {icon && <span className="text-zinc-500 dark:text-zinc-400">{icon}</span>}
            {title && (
              <span className="text-xs font-semibold text-foreground font-sans tracking-tight">
                {title}
              </span>
            )}
            <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300/60 dark:border-zinc-700/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
              {badge}
            </span>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-1">
            {/* Tab switchers */}
            <div className="flex items-center rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 p-0.5 border border-border/50 text-[11px] font-sans">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer",
                    activeTab === tab.id
                      ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-border/40 mx-1 hidden sm:block" />

            {/* Zoom Controls (Active only in diagram view) */}
            {activeTab === "diagram" && allowZoom && (
              <div className="hidden sm:flex items-center gap-0.5">
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                  className="p-1.5 rounded-md text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                  className="p-1.5 rounded-md text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer font-mono text-[10px]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  aria-label="Zoom In"
                  className="p-1.5 rounded-md text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Download SVG */}
            {onDownloadSvg && activeTab === "diagram" && (
              <button
                onClick={onDownloadSvg}
                title="Download SVG"
                aria-label="Download SVG"
                className="p-1.5 rounded-md text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Copy Source */}
            <button
              onClick={handleCopyCode}
              title={copied ? "Copied!" : "Copy Code"}
              aria-label={copied ? "Copied!" : "Copy Code"}
              className="p-1.5 rounded-md text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer flex items-center gap-1"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Fullscreen Modal Toggle */}
            <button
              onClick={toggleFullscreen}
              title="Fullscreen"
              aria-label="Fullscreen"
              className="p-1.5 rounded-md text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative min-h-[160px] p-4 sm:p-6 overflow-x-auto select-text">
          {activeTab === "code" ? (
            <div className="rounded-xl border border-white/5 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 overflow-x-auto leading-relaxed">
              <pre>{code.trim()}</pre>
            </div>
          ) : (
            <div
              className="w-full flex items-center justify-center transition-transform duration-150 origin-center"
              style={{ transform: `scale(${zoom})` }}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Overlay Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-background/95 dark:bg-zinc-950/95 backdrop-blur-xl p-4 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
              <div className="flex items-center gap-3">
                {icon && <span className="text-zinc-400">{icon}</span>}
                <span className="text-sm font-bold text-foreground font-sans">{title}</span>
                <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 border border-border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-foreground">
                  {badge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {allowZoom && (
                  <div className="flex items-center gap-1 bg-zinc-200/80 dark:bg-zinc-800/80 p-1 rounded-lg">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 rounded text-zinc-400 hover:text-foreground"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-1.5 rounded text-zinc-400 hover:text-foreground font-mono text-xs"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 rounded text-zinc-400 hover:text-foreground"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {onDownloadSvg && (
                  <button
                    onClick={onDownloadSvg}
                    className="p-2 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 text-foreground hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 text-foreground hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Fullscreen Body */}
            <div className="flex-1 flex items-center justify-center overflow-auto p-4">
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-150 origin-center"
                style={{ transform: `scale(${zoom})` }}
              >
                {children}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

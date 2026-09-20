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
          "relative my-4 rounded-md border-[0.5px] border-dashed border-[#ebcb00]/50 dark:border-[#ebcb00]/40 bg-transparent overflow-hidden transition-all duration-200 shadow-none",
          isFullscreen ? "hidden" : "block",
          className
        )}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-1.5 border-b-[0.5px] border-dashed border-[#ebcb00]/30 dark:border-[#ebcb00]/20 bg-transparent">
          {/* Left Title & Badge */}
          <div className="flex items-center gap-2">
            {icon && <span className="text-zinc-500 dark:text-zinc-400">{icon}</span>}
            {title && (
              <span className="text-xs font-semibold text-foreground font-mono tracking-tight">
                {title}
              </span>
            )}
            <span className="rounded bg-transparent border-[0.5px] border-zinc-300/80 dark:border-zinc-800 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {badge}
            </span>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-1">
            {/* Tab switchers */}
            <div className="flex items-center rounded bg-transparent p-0.5 border-[0.5px] border-zinc-300/80 dark:border-zinc-800 text-[10px] font-mono">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded transition-all font-medium cursor-pointer",
                    activeTab === tab.id
                      ? "bg-transparent text-[#ebcb00] font-semibold border-[0.5px] border-[#ebcb00]/50 shadow-none"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="h-3.5 w-[1px] bg-border/40 mx-0.5 hidden sm:block" />

            {/* Zoom Controls (Active only in diagram view) */}
            {activeTab === "diagram" && allowZoom && (
              <div className="hidden sm:flex items-center gap-0.5">
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                  className="p-1 rounded text-zinc-500 hover:text-[#ebcb00] transition-colors cursor-pointer"
                >
                  <ZoomOut className="h-3 w-3" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                  className="p-1 rounded text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer font-mono text-[9px]"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  aria-label="Zoom In"
                  className="p-1 rounded text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                  <ZoomIn className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Download SVG */}
            {onDownloadSvg && activeTab === "diagram" && (
              <button
                onClick={onDownloadSvg}
                title="Download SVG"
                aria-label="Download SVG"
                className="p-1 rounded text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
              >
                <Download className="h-3 w-3" />
              </button>
            )}

            {/* Copy Source */}
            <button
              onClick={handleCopyCode}
              title={copied ? "Copied!" : "Copy Code"}
              aria-label={copied ? "Copied!" : "Copy Code"}
              className="p-1 rounded text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer flex items-center gap-1"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>

            {/* Fullscreen Modal Toggle */}
            <button
              onClick={toggleFullscreen}
              title="Fullscreen"
              aria-label="Fullscreen"
              className="p-1 rounded text-zinc-500 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
            >
              <Maximize2 className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative min-h-[100px] p-3 sm:p-5 overflow-x-auto overflow-y-hidden select-text">
          {activeTab === "code" ? (
            <div className="rounded border-[0.5px] border-zinc-200/80 dark:border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-100 overflow-x-auto leading-relaxed">
              <pre>{code.trim()}</pre>
            </div>
          ) : (
            <div className="w-full min-w-full flex items-center justify-center overflow-x-auto py-1">
              <div
                className="transition-transform duration-150 origin-top flex items-center justify-center"
                style={{
                  transform: zoom === 1 ? undefined : `scale(${zoom})`,
                  transformOrigin: "center top",
                }}
              >
                {children}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Overlay Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-background dark:bg-zinc-950 p-4 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                {icon && <span className="text-zinc-400">{icon}</span>}
                <span className="text-sm font-bold text-foreground font-mono">{title}</span>
                <span className="rounded-md bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-foreground">
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
                className="w-full flex items-center justify-center transition-transform duration-150"
                style={{
                  transform: zoom === 1 ? undefined : `scale(${zoom})`,
                  transformOrigin: "center center",
                }}
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

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Terminal, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectData } from "./project-card";

const IconMap = {
  globe: Globe,
  terminal: Terminal,
};

const CtaIconMap = {
  github: Github,
  external: ExternalLink,
};

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

export function ProjectDetailsModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailsModalProps) {
  if (!project) return null;

  const IconComponent = IconMap[project.iconName] || Globe;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 dark:bg-black/80 backdrop-blur-md p-4 sm:p-10 select-text cursor-zoom-out"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-[32px] border shadow-2xl flex flex-col gap-6 cursor-default p-6 sm:p-10 lg:p-12",
              "border-white/5 dark:border-zinc-200 bg-[#030303] dark:bg-white text-white dark:text-black"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full border border-white/10 dark:border-zinc-200 bg-white/5 dark:bg-zinc-100 hover:bg-white/10 dark:hover:bg-zinc-200 transition-colors text-zinc-300 dark:text-zinc-700"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Full detailed copy in terminal monospace font */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    {project.badge}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white dark:text-black">
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/10 dark:border-zinc-200">
                  <p className="text-zinc-300 dark:text-zinc-800 text-sm sm:text-base font-mono leading-relaxed">
                    {project.detailedP1}
                  </p>
                  <p className="text-zinc-300 dark:text-zinc-800 text-sm sm:text-base font-mono leading-relaxed pt-4 border-t border-white/10 dark:border-zinc-200">
                    {project.detailedP2}
                  </p>
                  {project.detailedP3 && (
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-mono italic leading-relaxed pt-4 border-t border-white/10 dark:border-zinc-200">
                      {project.detailedP3}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Side: Architecture & CTAs */}
              <div className="lg:col-span-4 w-full flex flex-col justify-between h-full space-y-6 lg:pl-6 border-t lg:border-t-0 lg:border-l border-white/10 dark:border-zinc-200 pt-6 lg:pt-0">
                {/* Tech Highlights Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 text-left">
                    {project.techLabel}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono py-1 px-2.5 rounded-md border border-white/10 dark:border-zinc-200 bg-white/5 dark:bg-zinc-100 text-zinc-300 dark:text-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-white/10 dark:border-zinc-200 flex flex-col gap-3">
                  {project.ctas.map((cta, idx) => {
                    const CtaIcon = CtaIconMap[cta.icon] || ExternalLink;
                    return (
                      <a
                        key={idx}
                        href={cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2 border-white/10 dark:border-zinc-200 bg-transparent hover:bg-white/10 dark:hover:bg-zinc-100 text-white dark:text-black hover:text-white dark:hover:text-black"
                        >
                          <CtaIcon className="h-4 w-4" />
                          {cta.label}
                          <ArrowUpRight className="h-3 w-3 opacity-60 ml-auto" />
                        </Button>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

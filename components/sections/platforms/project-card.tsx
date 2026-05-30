"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Globe, Terminal, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const IconMap = {
  globe: Globe,
  terminal: Terminal,
};

const CtaIconMap = {
  github: Github,
  external: ExternalLink,
};

export interface ProjectCTA {
  label: string;
  href: string;
  icon: "github" | "external";
}

export interface ProjectData {
  id: number;
  badge: string;
  title: string;
  iconName: "globe" | "terminal";
  p1: string;
  p2: string;
  p3?: string;
  techLabel: string;
  tags: string[];
  ctas: ProjectCTA[];
  detailedP1: string;
  detailedP2: string;
  detailedP3?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  hoveredIndex: number | null;
  cardVariants: Variants;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

export function ProjectCard({
  project,
  index,
  hoveredIndex,
  cardVariants,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const IconComponent = IconMap[project.iconName] || Globe;
  const isHovered = hoveredIndex === index;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col h-full p-6 sm:p-10 lg:p-12 rounded-[32px] border transition-all duration-300 will-change-transform overflow-hidden cursor-zoom-in shadow-2xl",
        "border-white/5 dark:border-zinc-200 bg-[#030303] dark:bg-white backdrop-blur-md",
        isHovered ? "border-white/10 dark:border-zinc-300 shadow-2xl" : ""
      )}
    >
      {/* 1s Hover Interest Progress Bar */}
      <div
        className={cn(
          "absolute top-0 left-0 h-[3px] bg-zinc-400 dark:bg-zinc-600 transition-all pointer-events-none z-20",
          isHovered ? "w-full duration-[3000ms] ease-linear" : "w-0 duration-0"
        )}
      />

      {/* Subtle glow layer on hover */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-white/[0.01] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col h-full justify-between gap-8 relative z-10">
        {/* Top Side: Copy */}
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-2">
              <IconComponent className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
              {project.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white dark:text-black transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-zinc-300 dark:text-zinc-800 text-xs sm:text-sm font-mono leading-relaxed">
            {project.p1}
          </p>

          <p className="text-zinc-300 dark:text-zinc-800 text-xs sm:text-sm font-mono leading-relaxed pt-2 border-t border-white/10 dark:border-zinc-200">
            {project.p2}
          </p>

          {project.p3 && (
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs font-mono italic tracking-wide leading-relaxed">
              {project.p3}
            </p>
          )}
        </div>

        {/* Bottom Side: Tech Pill & CTA */}
        <div className="w-full flex flex-col space-y-6 pt-6 border-t border-white/10 dark:border-zinc-200">
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
          <div className="pt-4 border-t border-white/10 dark:border-zinc-200 flex flex-col gap-3">
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
                    className="w-full flex items-center justify-center gap-2 border-white/10 dark:border-zinc-200 bg-transparent hover:bg-white/10 dark:hover:bg-zinc-100 text-white dark:text-black hover:text-white dark:hover:text-black font-mono text-xs"
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
  );
}

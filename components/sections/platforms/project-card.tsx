"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Globe, Terminal, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/shared/tag-badge";
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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col h-full p-6 sm:p-10 lg:p-12 rounded-[28px] border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent transition-all duration-300 will-change-transform overflow-hidden cursor-zoom-in shadow-xs",
        "hover:border-[#2a7c13]/40 dark:hover:border-[#ebcb00]/30"
      )}
    >
      <div className="flex flex-col h-full justify-between gap-8 relative z-10">
        {/* Top Side: Copy */}
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#ebcb00] font-semibold flex items-center gap-2">
              <IconComponent className="h-3.5 w-3.5 text-[#ebcb00]" />
              {project.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-foreground transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed">
            {project.p1}
          </p>

          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed pt-2 border-t border-border/40">
            {project.p2}
          </p>

          {project.p3 && (
            <p className="text-zinc-500 dark:text-zinc-500 text-[11px] sm:text-xs font-mono italic tracking-wide leading-relaxed">
              {project.p3}
            </p>
          )}
        </div>

        {/* Bottom Side: Tech Pill & CTA */}
        <div className="w-full flex flex-col space-y-6 pt-6 border-t border-border/40">
          {/* Tech Highlights Tag Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-left">
              {project.techLabel}
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {project.tags.map((tag, idx) => (
                <TagBadge key={idx} tag={tag} />
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-4 border-t border-border/40 flex flex-col gap-3">
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
                    className="w-full flex items-center justify-center gap-2 border-border bg-background/60 hover:bg-background hover:border-[#ebcb00] hover:text-[#ebcb00] text-foreground font-mono text-xs transition-colors"
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

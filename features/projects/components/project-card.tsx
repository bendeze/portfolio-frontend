"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { ProjectCardProps } from "../types";

export function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0c]/60 p-6 glassmorphism transition-all duration-500",
        "h-full min-h-[420px] w-full"
      )}
    >
      {/* Background Spotlight Glow */}
      {!shouldReduceMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Border Spotlight Glow */}
      {!shouldReduceMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
            maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black) border-box",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-mono text-white/30">
            [No Preview Image]
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-indigo-500/20">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>

          {/* Technologies Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.02] text-white/55 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.02] text-white/30 border border-white/5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center gap-3 pt-6 mt-auto">
          {project.demo_link && (
            <Link
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300",
                "bg-white text-black hover:bg-white/90"
              )}
            >
              Demo
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          )}
          {project.repo_link && (
            <Link
              href={project.repo_link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border border-white/10",
                "text-white/80 hover:bg-white/5 hover:text-white"
              )}
            >
              Code
              <Github className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

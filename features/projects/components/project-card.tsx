"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { ProjectCardProps } from "../types";
import { useTranslation } from "@/context/language-context";
import { clapProject } from "../api";

export function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(project.image || "/placeholder_image.png");

  const { t, lang } = useTranslation();
  const [localClaps, setLocalClaps] = useState(project.claps || 0);
  const [userClaps, setUserClaps] = useState(0);
  const [floatingClaps, setFloatingClaps] = useState<{ id: number }[]>([]);

  const pendingClapsRef = useRef(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`claps_${project.slug}`);
      if (stored) {
        setUserClaps(parseInt(stored, 10));
      }
    }
  }, [project.slug]);

  useEffect(() => {
    setLocalClaps(project.claps || 0);
  }, [project.claps]);

  const handleClapClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (userClaps >= 50) return;

    const newLocal = localClaps + 1;
    const newUserClaps = userClaps + 1;
    setLocalClaps(newLocal);
    setUserClaps(newUserClaps);

    if (typeof window !== "undefined") {
      localStorage.setItem(`claps_${project.slug}`, String(newUserClaps));
    }

    const id = Date.now() + Math.random();
    setFloatingClaps((prev) => [...prev, { id }]);
    setTimeout(() => {
      setFloatingClaps((prev) => prev.filter((c) => c.id !== id));
    }, 1000);

    pendingClapsRef.current += 1;
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      const amountToSend = pendingClapsRef.current;
      pendingClapsRef.current = 0;
      try {
        const updatedTotal = await clapProject(project.slug, amountToSend);
        setLocalClaps(updatedTotal);
      } catch (err) {
        console.error("Failed to sync project claps:", err);
      }
    }, 850);
  };

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
        "group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 dark:border-white/5 bg-zinc-50/50 dark:bg-[#0a0a0c]/60 p-6 glassmorphism transition-all duration-500",
        "h-full min-h-[420px] w-full"
      )}
    >
      {/* Background Spotlight Glow */}
      {!shouldReduceMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Border Spotlight Glow */}
      {!shouldReduceMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(129, 140, 248, 0.25), transparent 80%)`,
            maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black) border-box",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 mb-6">
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setImgSrc("/placeholder_image.png")}
          unoptimized={imgSrc.includes("localhost") || imgSrc.includes("127.0.0.1")}
        />
        {project.featured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-white/80 dark:bg-black/60 backdrop-blur-md border border-indigo-200 dark:border-indigo-500/20">
              {t("projects.featuredLabel") || "Featured"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-zinc-600 dark:text-muted-foreground text-sm leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>

          {/* Technologies Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-white/[0.02] text-zinc-600 dark:text-white/55 border border-zinc-200 dark:border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/[0.02] text-zinc-400 dark:text-white/30 border border-zinc-200 dark:border-white/5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center gap-3 pt-6 mt-auto">
          {/* Tactile Clapping Pill Button Widget */}
          <div className="relative flex items-center select-none">
            {/* Rising floating +1 animations */}
            <AnimatePresence>
              {floatingClaps.map((clap) => (
                <motion.span
                  key={clap.id}
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: -28, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute left-4 text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 pointer-events-none select-none"
                >
                  +1
                </motion.span>
              ))}
            </AnimatePresence>

            <button
              onClick={handleClapClick}
              disabled={userClaps >= 50}
              className={cn(
                "group/clap inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border cursor-pointer",
                userClaps >= 50
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 cursor-default"
                  : userClaps > 0
                  ? "border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:text-zinc-950 dark:hover:text-white"
                  : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              <ThumbsUp
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300 group-hover/clap:scale-110",
                  userClaps > 0 ? "fill-indigo-500/10 dark:fill-indigo-400/20 stroke-indigo-500 dark:stroke-indigo-400" : ""
                )}
              />
              <span className="font-bold">{localClaps}</span>
              <span className="text-[10px] text-zinc-400 dark:text-white/40 group-hover/clap:text-zinc-600 group-hover/clap:dark:text-white/60 transition-colors font-sans">
                {userClaps > 0 ? (t("projects.clappedBtn") || "Bravo !") : (t("projects.clapBtn") || "Clap")}
              </span>
            </button>
          </div>

          {project.demo_link && (
            <Link
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 shadow-sm",
                "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
              )}
            >
              {t("projects.demoBtn") || "Demo"}
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          )}
          {project.repo_link && (
            <Link
              href={project.repo_link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border",
                "border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-white/80 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              {t("projects.codeBtn") || "Code"}
              <Github className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InvitationBannerProps {
  title: string;
  desc: string;
  ctaGithub: string;
  ctaPages: string;
  cardVariants: Variants;
}

export function InvitationBanner({
  title,
  desc,
  ctaGithub,
  ctaPages,
  cardVariants,
}: InvitationBannerProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mt-20 p-8 sm:p-10 rounded-[32px] border text-center relative overflow-hidden select-none w-full shadow-2xl transition-all duration-300 will-change-transform",
        "border-white/5 dark:border-zinc-200 bg-[#030303] dark:bg-white text-white dark:text-black"
      )}
    >
      <div className="space-y-4 max-w-2xl mx-auto relative z-10">
        <h4 className="text-xl sm:text-2xl font-black font-sans tracking-tight">
          {title}
        </h4>
        <p className="text-zinc-400 dark:text-zinc-600 text-xs sm:text-sm font-mono leading-relaxed">
          {desc}
        </p>

        <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
          <a
            href="https://github.com/bonheurNE07"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-white/10 dark:border-zinc-200 bg-white/5 dark:bg-zinc-100 hover:bg-white/10 dark:hover:bg-zinc-200 text-white dark:text-black hover:text-white dark:hover:text-black font-mono text-xs px-6 py-5 rounded-2xl shadow-md"
            >
              <Github className="h-4 w-4" /> {ctaGithub}
              <ArrowUpRight className="h-3 w-3 opacity-60 ml-1" />
            </Button>
          </a>

          <a href="/projects" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-white/10 dark:border-zinc-200 bg-white/5 dark:bg-zinc-100 hover:bg-white/10 dark:hover:bg-zinc-200 text-white dark:text-black hover:text-white dark:hover:text-black font-mono text-xs px-6 py-5 rounded-2xl shadow-md"
            >
              <Globe className="h-4 w-4" /> {ctaPages}
              <ArrowUpRight className="h-3 w-3 opacity-60 ml-1" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Shield, Code2, Network, Server } from "lucide-react";
import { useTranslation } from "@/context/language-context";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative flex min-h-[70vh] items-center justify-center px-8 py-32 bg-[#050505] noise-overlay"
    >
      <div className="w-full max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Minimal Cinematic Narrative */}
          <div className="md:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400/80">
                {t("about.badge")}
              </span>
              <h2 
                id="about-heading" 
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                {t("about.title")}
              </h2>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed font-light">
              {t("about.p1")}
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed font-light">
              {t("about.p2")}
            </p>
          </div>

          {/* Right Column: Premium Visual Pillars */}
          <div className="md:col-span-6 grid grid-cols-1 gap-6">
            
            {/* Pillar 1: Software Developer */}
            <div className={cn(
              "group relative flex flex-col p-8 rounded-2xl glassmorphism border-glow",
              "transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02]"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Code2 className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{t("about.pillar1Title")}</h3>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed text-sm">
                {t("about.pillar1Desc")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">Python</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">Django</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">PostgreSQL</span>
              </div>
            </div>

            {/* Pillar 2: Network Engineer */}
            <div className={cn(
              "group relative flex flex-col p-8 rounded-2xl glassmorphism border-glow",
              "transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02]"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Network className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{t("about.pillar2Title")}</h3>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed text-sm">
                {t("about.pillar2Desc")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">Cisco IOS-XE</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">Routing/OSPF</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">Network Automation</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


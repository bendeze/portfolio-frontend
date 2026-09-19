"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function LanguageToggler() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative flex items-center bg-transparent border border-dashed border-zinc-300 dark:border-zinc-800 rounded-md p-0.5 text-[10px] font-mono font-bold h-7 select-none">
      {/* Slider Background */}
      <div className="absolute inset-0.5 flex w-[calc(100%-4px)]">
        <motion.div
          animate={{ x: lang === "en" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="w-1/2 h-full bg-zinc-200/60 dark:bg-zinc-800/80 rounded-sm border border-border/40"
        />
      </div>

      <button
        onClick={() => setLang("en")}
        className={cn(
          "relative z-10 px-2 rounded-sm transition-colors duration-200 w-6 h-full flex items-center justify-center cursor-pointer",
          lang === "en" ? "text-foreground font-bold" : "text-zinc-400 hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang("fr")}
        className={cn(
          "relative z-10 px-2 rounded-sm transition-colors duration-200 w-6 h-full flex items-center justify-center cursor-pointer",
          lang === "fr" ? "text-foreground font-bold" : "text-zinc-400 hover:text-foreground"
        )}
        aria-label="Passer en Français"
      >
        FR
      </button>
    </div>
  );
}

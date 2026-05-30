"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function LanguageToggler() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative flex items-center bg-muted/40 hover:bg-muted/60 border border-border rounded-full p-0.5 text-[10px] sm:text-xs font-mono font-bold h-8 select-none">
      {/* Slider Background */}
      <div className="absolute inset-0.5 flex w-[calc(100%-4px)]">
        <motion.div
          animate={{ x: lang === "en" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="w-1/2 h-full bg-background rounded-full border border-border shadow-sm"
        />
      </div>

      <button
        onClick={() => setLang("en")}
        className={cn(
          "relative z-10 px-2.5 rounded-full transition-colors duration-300 w-8 h-full flex items-center justify-center",
          lang === "en" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang("fr")}
        className={cn(
          "relative z-10 px-2.5 rounded-full transition-colors duration-300 w-8 h-full flex items-center justify-center",
          lang === "fr" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Passer en Français"
      >
        FR
      </button>
    </div>
  );
}

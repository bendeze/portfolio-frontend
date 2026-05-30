"use client";

import React, { useState, useEffect } from "react";
import { SOCIAL_LINKS } from "@/components/shared/utils";
import { Mail, ShieldCheck, Cpu } from "lucide-react";
import { useTranslation } from "@/context/language-context";

export function ContactInfos() {
  const { t } = useTranslation();
  const fullText = t("contact.infos.description");
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [fullText]);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const typingSpeed = 5000 / fullText.length;
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="space-y-6 lg:space-y-12">
      {/* Console-styled Description Box */}
      <div className="rounded-2xl border border-white/10 dark:border-black/10 bg-white/[0.02] dark:bg-black/[0.02] p-4 font-mono text-xs sm:text-sm leading-relaxed text-gray-300 dark:text-gray-700 space-y-2 relative overflow-hidden select-text">
        <div className="flex items-center gap-1.5 pb-2 border-b border-white/5 dark:border-black/5">
          <span className="w-2 h-2 rounded-full bg-rose-500/60" />
          <span className="w-2 h-2 rounded-full bg-amber-500/60" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
          <span className="ml-1.5 text-[9px] text-gray-500 dark:text-gray-400 font-mono tracking-wider uppercase">connection_session.sh</span>
        </div>
        <p className="pt-1 text-green-400 dark:text-green-600 font-bold">$ cat connection_stream.txt</p>
        <p className="text-gray-100 dark:text-gray-800 font-mono font-light leading-relaxed whitespace-pre-wrap">
          {displayedText}
          {currentIndex < fullText.length && (
            <span className="animate-pulse duration-700 text-green-500 dark:text-green-600 font-bold ml-0.5">|</span>
          )}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap items-center gap-4 pt-6">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] dark:bg-black/[0.02] border border-white/5 dark:border-black/5 text-xs font-mono text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black hover:border-white/10 dark:hover:border-black/10 hover:bg-white/[0.04] dark:hover:bg-black/[0.04] transition-all duration-300"
            title={social.label}
          >
            {social.icon}
            <span>{social.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}


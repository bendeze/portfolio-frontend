"use client";

import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "@/context/language-context";
import SvgYoutube from "@/components/icons/Youtube";
import SvgWhatsapp from "@/components/icons/Whatsapp";

function SvgBluesky({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.733 1.5 3.5c0 1.25.5 8.25 4.5 11.5-3.5-.5-5 1.5-5 3.5 0 2.25 2.5 3.5 6 1.5 4-2.286 5-5.2 5-5.2s1 2.914 5 5.2c3.5 2 6 .75 6-1.5 0-2-1.5-4-5-3.5 4-3.25 4.5-10.25 4.5-11.5 0-1.767-1.066-2.49-3.702-.695C16.046 4.747 13.087 8.686 12 10.8z" />
    </svg>
  );
}

function SvgTelegram({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function SvgX({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const CONTACT_SOCIALS = [
  { label: "GitHub", href: "https://github.com/bendeze", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bonheur-ndeze-bne/", icon: Linkedin },
  { label: "X / Twitter", href: "https://x.com/ndeze_emmanuel", icon: SvgX },
  { label: "Bluesky", href: "https://bsky.app/profile/ndezebonheur.bsky.social", icon: SvgBluesky },
  { label: "Telegram", href: "https://t.me/BonheurNe", icon: SvgTelegram },
  { label: "WhatsApp", href: "https://wa.me/250791348888", icon: SvgWhatsapp },
  { label: "YouTube", href: "https://www.youtube.com/@NdezeBonheur", icon: SvgYoutube },
  { label: "Email", href: "mailto:bonheurndezenc@gmail.com", icon: Mail },
];

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
    <div className="space-y-6 lg:space-y-8">
      {/* Console-styled Description Box */}
      <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent p-4 font-mono text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-2 relative overflow-hidden select-text">
        <div className="flex items-center gap-1.5 pb-2 border-b border-dashed border-zinc-300/60 dark:border-zinc-800/60">
          <span className="w-2 h-2 rounded-full bg-rose-500/60" />
          <span className="w-2 h-2 rounded-full bg-amber-500/60" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
          <span className="ml-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">ssh session</span>
        </div>
        <p className="pt-1 text-[#2a7c13] dark:text-[#ebcb00] font-mono">$ ssh contact@ndeze.dev</p>
        <p className="text-zinc-800 dark:text-zinc-200 font-mono font-light leading-relaxed whitespace-pre-wrap">
          {displayedText}
          {currentIndex < fullText.length && (
            <span className="animate-pulse duration-700 text-[#ebcb00] font-bold ml-0.5">|</span>
          )}
        </p>
      </div>

      {/* Social Links */}
      <div className="space-y-1.5 pt-2">
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {CONTACT_SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group inline-flex items-center gap-1.5 py-1 text-gray-400 dark:text-gray-600 hover:text-[#ebcb00] dark:hover:text-[#ebcb00] transition-colors duration-300 select-none cursor-pointer"
                title={social.label}
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-115 shrink-0" />
                <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 overflow-hidden whitespace-nowrap text-xs font-mono font-medium transition-all duration-300 ease-out">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}


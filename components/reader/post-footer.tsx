"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import { ContentMeta } from "@/lib/content";
import { TagBadge } from "@/components/shared/tag-badge";
import { useTranslation } from "@/context/language-context";

// Custom and standard SVG social icons matching Steipete
function IconX({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconBluesky({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.733 1.5 3.5c0 1.25.5 8.25 4.5 11.5-3.5-.5-5 1.5-5 3.5 0 2.25 2.5 3.5 6 1.5 4-2.286 5-5.2 5-5.2s1 2.914 5 5.2c3.5 2 6 .75 6-1.5 0-2-1.5-4-5-3.5 4-3.25 4.5-10.25 4.5-11.5 0-1.767-1.066-2.49-3.702-.695C16.046 4.747 13.087 8.686 12 10.8z" />
    </svg>
  );
}

function IconLinkedin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.88a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function IconWhatsapp({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.17 8.17 0 0 1-5.82 2.41c-1.46 0-2.88-.38-4.13-1.1l-.3-.18-3.07.81.82-2.99-.2-.31a8.16 8.16 0 0 1-1.25-4.48c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
    </svg>
  );
}

function IconFacebook({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
    </svg>
  );
}

function IconTelegram({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function IconPinterest({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29l1.1-4.68s-.28-.56-.28-1.39c0-1.3.76-2.28 1.7-2.28.8 0 1.19.6 1.19 1.33 0 .81-.51 2.01-.78 3.13-.22.94.47 1.71 1.4 1.71 1.68 0 2.98-1.77 2.98-4.33 0-2.26-1.63-3.84-3.95-3.84-2.69 0-4.27 2.02-4.27 4.1 0 .81.31 1.68.7 2.16.08.1.09.18.06.3-.08.33-.26 1.05-.29 1.2-.05.2-.16.24-.37.15-1.37-.64-2.22-2.64-2.22-4.25 0-3.46 2.51-6.64 7.25-6.64 3.81 0 6.77 2.71 6.77 6.34 0 3.78-2.39 6.83-5.7 6.83-1.11 0-2.16-.58-2.52-1.26l-.69 2.62c-.25.96-.92 2.16-1.37 2.89A12 12 0 1 0 12 0z" />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconGitHub({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconYoutube({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z" />
    </svg>
  );
}

interface PostFooterProps {
  title: string;
  tags: string[];
  prev?: ContentMeta | null;
  next?: ContentMeta | null;
}

export function PostFooter({ title, tags, prev, next }: PostFooterProps) {
  const { t } = useTranslation();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const tagList = tags.slice(0, 3).map((t) => `#${t}`).join(" ");

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: IconX,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${title}" by Emmanuel Bonheur Ndeze (@ndeze_emmanuel)`)}&url=${encodedUrl}${tags.length > 0 ? `&hashtags=${encodeURIComponent(tags.slice(0, 3).join(','))}` : ''}`,
    },
    {
      name: "Bluesky",
      icon: IconBluesky,
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`"${title}" by Emmanuel Bonheur Ndeze\n\n${currentUrl}${tagList ? `\n\n${tagList}` : ''}`)}`,
    },
    {
      name: "LinkedIn",
      icon: IconLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: IconWhatsapp,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out "${title}" by Emmanuel Bonheur Ndeze:\n${currentUrl}`)}`,
    },
    {
      name: "Telegram",
      icon: IconTelegram,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(`"${title}" by Emmanuel Bonheur Ndeze`)}`,
    },
    {
      name: "Facebook",
      icon: IconFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Pinterest",
      icon: IconPinterest,
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodeURIComponent(`"${title}" — Emmanuel Bonheur Ndeze`)}`,
    },
    {
      name: "Email",
      icon: IconMail,
      href: `mailto:?subject=${encodeURIComponent(`[Technical Note] ${title}`)}&body=${encodeURIComponent(`Hi,\n\nI recommend reading this article:\n"${title}"\nby Emmanuel Bonheur Ndeze\n\nRead here:\n${currentUrl}\n\nBest regards,\n`)}`,
    },
  ];

  return (
    <div className="space-y-6 pt-4 font-mono select-none">
      {/* Dashed Separator */}
      <div className="border-t-[0.5px] border-dashed border-[#ebcb00]/40 dark:border-[#ebcb00]/30" />

      {/* Tags Row */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* Share This Post On + Back to Top Row */}
      <div className="space-y-2.5">
        <div className="text-xs italic text-zinc-600 dark:text-zinc-400">
          {t("blog.reader.shareOn")}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Social Share Icons */}
          <div className="flex items-center gap-3.5 text-zinc-600 dark:text-zinc-400">
            {shareLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`Share on ${item.name}`}
                  className="transform hover:-translate-y-0.5 hover:scale-115 text-zinc-600 dark:text-zinc-400 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200 ease-out"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200 self-start sm:self-auto cursor-pointer"
          >
            <ChevronUp className="h-4 w-4 text-[#2a7c13] dark:text-[#ebcb00]" />
            <span>{t("blog.reader.backToTop")}</span>
          </button>
        </div>
      </div>

      {/* Dashed Separator */}
      <div className="border-t-[0.5px] border-dashed border-[#ebcb00]/40 dark:border-[#ebcb00]/30" />

      {/* Next / Previous Post Navigation */}
      {(prev || next) && (
        <div className="py-2 flex flex-col sm:flex-row items-stretch justify-between gap-4">
          {prev ? (
            <div className="space-y-1">
              <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                <ChevronLeft className="h-3 w-3" />
                <span>{t("blog.reader.previousPost")}</span>
              </div>
              <Link
                href={`/${prev.type}/${prev.slug}`}
                className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] underline decoration-dashed underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-[#2a7c13] dark:hover:decoration-[#ebcb00] block leading-snug transition-colors"
              >
                {prev.title}
              </Link>
            </div>
          ) : <div />}

          {next ? (
            <div className="space-y-1 sm:text-right">
              <div className="text-[11px] text-zinc-500 flex items-center gap-1 sm:justify-end">
                <span>{t("blog.reader.nextPost")}</span>
                <ChevronRight className="h-3 w-3" />
              </div>
              <Link
                href={`/${next.type}/${next.slug}`}
                className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] underline decoration-dashed underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-[#2a7c13] dark:hover:decoration-[#ebcb00] block leading-snug transition-colors"
              >
                {next.title}
              </Link>
            </div>
          ) : <div />}
        </div>
      )}

      {/* Solid Separator */}
      <div className="border-t-[0.5px] border-[#ebcb00]/40 dark:border-[#ebcb00]/30" />

      {/* Bottom Attribution & Social Profiles Row */}
      <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-400">
        <div>
          <span>{t("blog.reader.stealPost")} </span>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2a7c13] dark:hover:text-[#ebcb00] hover:underline transition-colors"
          >
            CC BY 4.0
          </a>
          <span> · </span>
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2a7c13] dark:hover:text-[#ebcb00] hover:underline transition-colors"
          >
            Code MIT
          </a>
          <span> · </span>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2a7c13] dark:hover:text-[#ebcb00] hover:underline transition-colors font-mono"
            title="Subscribe via RSS (XML)"
          >
            RSS Feed
          </a>
        </div>

        <div className="flex items-center gap-3.5 text-zinc-600 dark:text-zinc-400">
          <a
            href="https://github.com/bendeze"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="transform hover:-translate-y-0.5 hover:scale-115 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200"
          >
            <IconGitHub className="h-4 w-4" />
          </a>
          <a
            href="https://x.com/ndeze_emmanuel"
            target="_blank"
            rel="noreferrer"
            title="X (Twitter)"
            className="transform hover:-translate-y-0.5 hover:scale-115 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200"
          >
            <IconX className="h-4 w-4" />
          </a>
          <a
            href="https://bsky.app/profile/ndezebonheur.bsky.social"
            target="_blank"
            rel="noreferrer"
            title="Bluesky"
            className="transform hover:-translate-y-0.5 hover:scale-115 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200"
          >
            <IconBluesky className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/bonheur-ndeze-bne/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="transform hover:-translate-y-0.5 hover:scale-115 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200"
          >
            <IconLinkedin className="h-4 w-4" />
          </a>
          <a
            href="https://wa.me/250791348888"
            target="_blank"
            rel="noreferrer"
            title="WhatsApp (+250791348888)"
            className="transform hover:-translate-y-0.5 hover:scale-115 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200"
          >
            <IconWhatsapp className="h-4 w-4" />
          </a>
          <a
            href="https://www.youtube.com/@NdezeBonheur"
            target="_blank"
            rel="noreferrer"
            title="YouTube"
            className="transform hover:-translate-y-0.5 hover:scale-115 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200"
          >
            <IconYoutube className="h-4 w-4" />
          </a>
          <a
            href="mailto:bonheurndezenc@gmail.com"
            title="Email (Emmanuel Bonheur Ndeze)"
            className="transform hover:-translate-y-0.5 hover:scale-115 hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-all duration-200"
          >
            <IconMail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

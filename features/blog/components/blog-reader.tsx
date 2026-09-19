"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Check, Copy, ThumbsUp, Heart, X } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { MDXRemote } from "next-mdx-remote";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/language-context";
import { likeBlogPost } from "@/features/blog/api";

import { BlogPost } from "@/features/blog/types";
import { Heading } from "@/features/blog/utils/headings";
import { DiagramCodeDetector, MermaidDiagram, PlantUMLDiagram, SchemaDiagram } from "@/components/diagrams";

interface BlogReaderProps {
  post: BlogPost;
  headings: Heading[];
  mdxSource: any; // Pre-compiled MDX serialized on server or rendered natively
}


// Resilient Image component bypassing localhost private IP resolution blocks
function ReaderImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder_image.png";
      }}
      className="w-full h-auto object-cover max-h-[480px] rounded-3xl border border-border/40 shadow-md select-none"
    />
  );
}

// Copy-to-Clipboard Code Block Wrapper
function CodeBlock({ children }: { children: React.ReactNode }) {
  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const container = button.closest(".group-code-container");
    const pre = container?.querySelector("pre");
    if (pre) {
      const codeText = pre.innerText || "";
      try {
        await navigator.clipboard.writeText(codeText.trim());
        const copyTextSpan = button.querySelector(".copy-text-span");
        const checkIcon = button.querySelector(".check-icon");
        const copyIcon = button.querySelector(".copy-icon");
        
        if (copyTextSpan && checkIcon && copyIcon) {
          const isFr = typeof document !== "undefined" && document.documentElement.lang === "fr";
          copyTextSpan.textContent = isFr ? "Copié !" : "Copied!";
          
          checkIcon.classList.remove("hidden");
          copyIcon.classList.add("hidden");
          copyTextSpan.classList.add("text-green-400");
          
          setTimeout(() => {
            copyTextSpan.textContent = isFr ? "Copier" : "Copy";
            checkIcon.classList.add("hidden");
            copyIcon.classList.remove("hidden");
            copyTextSpan.classList.remove("text-green-400");
          }, 2000);
        }
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }
  };

  return (
    <div className="relative group/code my-6 rounded-xl border border-white/5 bg-zinc-950 overflow-hidden shadow-xl select-text group-code-container">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/60 border-b border-white/5 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5 select-none">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors duration-200 cursor-pointer select-none"
        >
          {/* Check Icon (initially hidden) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 text-green-400 check-icon hidden"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {/* Copy Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 copy-icon"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          <span className="copy-text-span">Copy</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed font-mono text-zinc-100 bg-transparent scrollbar-thin select-text">
        {children}
      </pre>
    </div>
  );
}

export function BlogReader({ post, headings, mdxSource }: BlogReaderProps) {
  const [activeId, setActiveId] = useState<string>(
    headings.length > 0 ? headings[0].slug : ""
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t, lang } = useTranslation();

  // Clapping / Likes engagement state
  const [localLikes, setLocalLikes] = useState(post.likes_count ?? 0);
  const [hasLiked, setHasLiked] = useState(false);

  // Sync state if backend model likes count changes or on slug mount
  useEffect(() => {
    setLocalLikes(post.likes_count ?? 0);
    
    if (typeof window !== "undefined") {
      const alreadyLiked = localStorage.getItem(`liked_${post.slug}`) === "true";
      setHasLiked(alreadyLiked);
    }
  }, [post.slug, post.likes_count]);

  const handleLike = async () => {
    if (hasLiked) return;

    // Optimistically update frontend UI instantly to prevent lag
    setLocalLikes((prev) => prev + 1);
    setHasLiked(true);
    
    if (typeof window !== "undefined") {
      localStorage.setItem(`liked_${post.slug}`, "true");
    }

    try {
      const updatedCount = await likeBlogPost(post.slug, 1);
      setLocalLikes(updatedCount);
    } catch (err) {
      console.error("Failed to post likes engagement:", err);
      // Rollback on server failure
      setLocalLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem(`liked_${post.slug}`);
      }
    }
  };

  // Social Sharing States
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [modalCopied, setModalCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleShareTrigger = () => {
    setIsShareOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setModalCopied(true);
      setTimeout(() => setModalCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const getLocalizedCategoryDisplay = (catName: string | null) => {
    if (!catName) return t("blog.reader.general");
    const lower = catName.toLowerCase();
    if (lower.includes("network")) return t("blog.categories.networking");
    if (lower.includes("product")) return t("blog.categories.product");
    if (lower.includes("soft") || lower.includes("dev")) return t("blog.categories.software_dev");
    if (lower.includes("system") || lower.includes("admi")) return t("blog.categories.system_admin");
    return catName;
  };

  const formatDate = (dateInput: Date | string, long: boolean = true) => {
    try {
      const date = new Date(dateInput);
      return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
        month: long ? "long" : "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return String(dateInput);
    }
  };

  // 1. Reading Progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Absolute viewport-scroll boundary tracker for active table of contents
  useEffect(() => {
    if (headings.length === 0) return;

    // Set the first heading active by default on mount/initial load
    setActiveId(headings[0].slug);

    const handleActiveHeading = () => {
      const scrollPosition = window.scrollY + 110; // 110px top safety/spacing offset
      
      let currentActive = headings[0].slug;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].slug);
        if (el) {
          // Calculate absolute top position of header relative to the document
          const rect = el.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;

          if (scrollPosition >= absoluteTop) {
            currentActive = headings[i].slug;
          } else {
            // Since headings appear sequentially, we can break as soon as we cross a heading below the line
            break;
          }
        }
      }

      setActiveId(currentActive);
    };

    // Run initially on mount to map the correct heading if page was loaded at a scrolled position
    handleActiveHeading();

    window.addEventListener("scroll", handleActiveHeading, { passive: true });
    return () => window.removeEventListener("scroll", handleActiveHeading);
  }, [headings]);

  // Smooth scroll helper for table of contents clicks
  const scrollTo = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 90; // scroll offset for header bar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Helper to generate a slug identical to server-side headings parser
  const getSlug = (children: any) => {
    const text = typeof children === "string" ? children : React.Children.toArray(children).join("");
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  };

  // Dynamic MDX Components styled according to standard high-fidelity specs
  const mdxComponents = {
    h1: ({ children }: any) => {
      const slug = getSlug(children);
      return (
        <h1 
          id={slug} 
          className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground mt-8 mb-3 scroll-mt-24 group relative cursor-pointer border-b border-border/20 pb-2"
          onClick={() => scrollTo(slug)}
        >
          <span className="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500 font-mono font-thin text-base">#</span>
          {children}
        </h1>
      );
    },
    h2: ({ children }: any) => {
      const slug = getSlug(children);
      return (
        <h2 
          id={slug} 
          className="text-lg sm:text-xl font-bold font-mono tracking-tight text-foreground mt-7 mb-2.5 scroll-mt-24 group relative border-b border-border/10 pb-1.5 cursor-pointer"
          onClick={() => scrollTo(slug)}
        >
          <span className="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500 font-mono font-thin text-sm">#</span>
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const slug = getSlug(children);
      return (
        <h3 
          id={slug} 
          className="text-base sm:text-lg font-bold font-mono tracking-tight text-foreground mt-5 mb-2 scroll-mt-24 group relative cursor-pointer"
          onClick={() => scrollTo(slug)}
        >
          <span className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500/80 font-mono font-thin text-xs">#</span>
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => {
      const slug = getSlug(children);
      return (
        <h4 
          id={slug} 
          className="text-sm sm:text-base font-bold font-mono tracking-tight text-foreground mt-4 mb-1.5 scroll-mt-24 group relative cursor-pointer"
          onClick={() => scrollTo(slug)}
        >
          <span className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500/60 font-mono font-thin text-xs">#</span>
          {children}
        </h4>
      );
    },
    h5: ({ children }: any) => {
      const slug = getSlug(children);
      return (
        <h5 
          id={slug} 
          className="text-xs sm:text-sm font-bold font-mono tracking-tight text-foreground mt-3 mb-1 scroll-mt-24 group relative cursor-pointer"
          onClick={() => scrollTo(slug)}
        >
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500/50 font-mono font-thin text-[10px]">#</span>
          {children}
        </h5>
      );
    },
    h6: ({ children }: any) => {
      const slug = getSlug(children);
      return (
        <h6 
          id={slug} 
          className="text-xs font-semibold font-mono tracking-tight text-foreground mt-3 mb-1 scroll-mt-24 group relative cursor-pointer"
          onClick={() => scrollTo(slug)}
        >
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500/40 font-mono font-thin text-[10px]">#</span>
          {children}
        </h6>
      );
    },
    p: ({ children }: any) => (
      <p className="text-[13.5px] sm:text-[14.5px] leading-[1.75] text-muted-foreground/95 dark:text-zinc-300 font-mono my-3.5 font-normal tracking-normal antialiased">
        {children}
      </p>
    ),
    pre: ({ children, ...props }: any) => (
      <DiagramCodeDetector
        {...props}
        fallbackRenderer={(fbProps) => <CodeBlock>{fbProps.children}</CodeBlock>}
      >
        {children}
      </DiagramCodeDetector>
    ),
    Mermaid: ({ chart, children, ...props }: any) => (
      <MermaidDiagram chart={chart || children} {...props} />
    ),
    PlantUML: ({ code, children, ...props }: any) => (
      <PlantUMLDiagram code={code || children} {...props} />
    ),
    DatabaseSchema: ({ code, sql, children, ...props }: any) => (
      <SchemaDiagram code={code || sql || children} {...props} />
    ),
    SchemaViewer: ({ code, sql, children, ...props }: any) => (
      <SchemaDiagram code={code || sql || children} {...props} />
    ),
    code: ({ children }: any) => (
      <code className="text-foreground bg-zinc-100 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800 px-1.5 py-0.5 rounded font-mono text-[12.5px] font-medium">
        {children}
      </code>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#ebcb00] bg-zinc-50/50 dark:bg-zinc-900/30 pl-4 pr-3 py-2 my-3.5 rounded-r font-mono text-[13px] text-zinc-600 dark:text-zinc-400 not-italic leading-relaxed">
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc pl-5 my-3 space-y-1 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-muted-foreground/95 dark:text-zinc-300 font-mono">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-5 my-3 space-y-1 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-muted-foreground/95 dark:text-zinc-300 font-mono">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="pl-0.5">
        {children}
      </li>
    ),
    a: ({ href, children }: any) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[#ebcb00] hover:text-[#ffd700] font-mono font-medium underline underline-offset-4 decoration-[#ebcb00]/40 hover:decoration-[#ebcb00] transition-colors"
      >
        {children}
      </a>
    ),
    table: ({ children }: any) => (
      <div className="my-3.5 w-full overflow-x-auto rounded border-[0.5px] border-border/40 bg-zinc-50/50 dark:bg-zinc-950">
        <table className="w-full border-collapse text-left text-xs font-mono">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="border-b-[0.5px] border-border/40 bg-zinc-100/60 dark:bg-zinc-900/60 font-semibold text-foreground font-mono">
        {children}
      </thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y-[0.5px] divide-border/10 font-mono">
        {children}
      </tbody>
    ),
    tr: ({ children }: any) => (
      <tr className="hover:bg-zinc-100/30 dark:hover:bg-zinc-900/30 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }: any) => (
      <th className="px-3 py-2 font-semibold text-foreground/90 font-mono text-[11px] uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-3 py-2 text-muted-foreground/90 dark:text-zinc-300/90 font-mono leading-relaxed text-xs">
        {children}
      </td>
    ),
    img: ({ src, alt }: any) => {
      if (!src) return null;
      return (
        <span className="block my-5 space-y-1.5 select-none">
          <ReaderImage src={src} alt={alt || "Article illustration"} />
          {alt && (
            <span className="block text-center text-[11px] text-muted-foreground font-mono italic">
              {alt}
            </span>
          )}
        </span>
      );
    },
    hr: () => (
      <hr className="my-6 border-t border-border/40" />
    ),
  };

  return (
    <>
      {/* 0. Scrolling Progress Bar Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-border/20 z-50">
        <motion.div 
          className="h-full bg-[#ebcb00]" 
          style={{ width: `${scrollProgress * 100}%` }}
        /> 
      </div>

      <div className="w-full bg-background dark:bg-[#030303] text-foreground min-h-screen py-12 px-4 md:px-8 lg:px-12 select-text">
        <div className="max-w-7xl mx-auto">
          
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6 -ml-4 rounded-full group cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              {t("blog.reader.back")}
            </Link>
          </Button>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* --- LEFT COLUMN: STICKY ARTICLE DETAILS & TABLE OF CONTENTS --- */}
            <aside className="lg:col-span-3 lg:sticky lg:top-28 lg:h-[calc(100vh-10rem)] overflow-y-auto hidden lg:block scrollbar-none pr-4">
              <div className="space-y-8 pt-1">
                
                {/* Article Details Card Mockup */}
                <div className="space-y-4 font-mono">
                  <h4 className="text-[14px] font-bold text-foreground font-mono">
                    {t("blog.reader.details")}
                  </h4>
                  
                  <div className="space-y-4 font-mono text-xs select-none">
                    {/* Published */}
                    <div className="space-y-1">
                      <span className="block text-muted-foreground/80 font-normal">{t("blog.reader.published")}</span>
                      <time className="block text-foreground font-medium">
                        {formatDate(post.created_at, true)}
                      </time>
                    </div>

                    {/* Reading time */}
                    <div className="space-y-1">
                      <span className="block text-muted-foreground/80 font-normal">{t("blog.reader.readingTime")}</span>
                      <span className="block text-foreground font-medium">
                        {post.reading_time} {t("blog.reader.minRead")}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <span className="block text-muted-foreground/80 font-normal">{t("blog.reader.category")}</span>
                      <span className="inline-block px-2.5 py-0.5 rounded-md border border-border bg-zinc-100 dark:bg-zinc-900 text-[10px] font-medium text-foreground">
                        {getLocalizedCategoryDisplay(post.category)}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-border/30" />

                {/* Table of Contents List Mockup */}
                {headings.length > 0 && (
                  <div className="font-mono">
                    <h4 className="text-[10px] font-bold text-muted-foreground/90 font-mono tracking-widest uppercase mb-4">
                      {t("blog.reader.inThisArticle")}
                    </h4>
                    
                    <nav className="relative flex flex-col gap-1 border-l border-border/40 pl-1 select-none font-mono">
                      {headings.map((heading) => {
                        const isActive = activeId === heading.slug;
                        
                        // Mathematical cascading indentation indent tree mapping
                        const getPaddingLeft = (level: number) => {
                          if (level <= 2) return "0.75rem"; // Baseline margins
                          return `${(level - 2) * 0.75 + 0.75}rem`;
                        };
                        
                        return (
                          <button
                            key={heading.slug}
                            onClick={() => scrollTo(heading.slug)}
                            style={{ paddingLeft: getPaddingLeft(heading.level) }}
                            className={`relative text-left py-1.5 transition-all duration-200 font-mono text-[11px] leading-snug cursor-pointer group text-muted-foreground hover:text-foreground ${
                              isActive 
                                ? "text-foreground font-bold" 
                                : ""
                            }`}
                          >
                            {/* Sliding active indicator */}
                            {isActive && (
                              <motion.span 
                                layoutId="tocActiveBorder"
                                className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-foreground rounded-full"
                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              />
                            )}
                            <span className="truncate block max-w-full">
                              {heading.text}
                            </span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                )}

                {/* Vercel-Style Promo Card */}
                <div className="rounded-2xl border border-border/50 bg-[#f9f9f9]/80 dark:bg-[#060606]/40 p-5 space-y-3.5 shadow-sm backdrop-blur-md select-none">
                  <h5 className="text-[12px] font-bold text-foreground tracking-tight leading-snug">
                    {t("blog.reader.promoTitle")}
                  </h5>
                  <p className="text-[10px] leading-relaxed text-muted-foreground font-sans">
                    {t("blog.reader.promoDesc")}
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-white dark:bg-zinc-950 border-border hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:text-foreground text-[10px] font-bold py-1 h-7.5 cursor-pointer shadow-xs rounded-lg transition-colors">
                    <a href="" target="_blank" rel="noopener noreferrer">
                      {t("blog.reader.promoBtn")}
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* --- RIGHT COLUMN: ARTICLE READER BODY --- */}
            <main className="lg:col-span-9 max-w-3xl w-full mx-auto space-y-6">
              
              <header className="space-y-3">
                {/* Meta Detail badges (Mobile Only, hidden on desktop viewports) */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] lg:hidden">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gray-500" />
                    <time>{formatDate(post.created_at, true)}</time>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-500" />
                    <span>{post.reading_time} {t("blog.reader.minRead")}</span>
                  </div>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[9px] font-bold text-gray-500 dark:text-gray-400">
                    {getLocalizedCategoryDisplay(post.category)}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight text-foreground font-mono">
                  {post.title}
                </h1>
                
                <p className="text-muted-foreground font-mono text-xs sm:text-sm leading-relaxed border-l-2 border-[#ebcb00] pl-3 py-0.5">
                  {post.summary}
                </p>
              </header>

              {/* Cover Image */}
              {post.image && (
                <div className="w-full relative select-none">
                  <ReaderImage src={post.image} alt={post.title} />
                </div>
              )}
 
              {/* Markdown Content (Styled customly) */}
              <div className="relative pt-4 selection:bg-[#ebcb00]/20 selection:text-foreground">
                <MDXRemote {...mdxSource} components={mdxComponents} />
              </div>

              {/* separation line */}
              <hr className="my-10 border-t border-border/20" />

              {/* CLAP & LIKES WIDGET */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-border/20">
                <div className="flex items-center gap-3 select-none">
                  <motion.button
                    whileTap={hasLiked ? {} : { scale: 0.9 }}
                    whileHover={hasLiked ? {} : { scale: 1.05 }}
                    onClick={handleLike}
                    disabled={hasLiked}
                    className={`group relative flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all select-none ${
                      hasLiked
                        ? "bg-red-500/20 text-red-500 border border-red-500/40 cursor-default"
                        : "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/30 cursor-pointer"
                    }`}
                  >
                    <Heart className={`h-4 w-4 transition-transform ${hasLiked ? "fill-red-500" : "group-hover:scale-110"}`} />
                    <span>
                      {hasLiked ? t("blog.reader.likedLabel") || "Liked!" : t("blog.reader.clapLabel") || "Like Post"}
                    </span>
                  </motion.button>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    {localLikes} {localLikes === 1 ? t("blog.reader.likeSingle") || "Like" : t("blog.reader.likePlural") || "Likes"}
                  </span>
                </div>

                {/* Social Share button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShareTrigger}
                  className="rounded-full h-10 px-5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Share2 className="mr-2 h-3.5 w-3.5" />
                  {t("blog.reader.share") || "Share Link"}
                </Button>
              </div>

              {/* AUTHOR PROFILE CARD */}
              <div className="w-full p-5 min-h-[6rem] bg-[#030303] dark:bg-gray-50 hover:bg-black/90 dark:hover:bg-white/90 text-gray-50 border border-border/40 rounded-3xl flex flex-row items-center gap-5 transition-all duration-300 shadow-sm backdrop-blur-md select-none mt-8">
                {/* Profile Photo */}
                <div className="w-18 h-18 rounded-full overflow-hidden flex-shrink-0 relative border border-border/20 shadow-md">
                  <img
                    src="/blog-profile.png"
                    alt="Ndeze Bonheur Emmanuel"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/profile.png";
                    }}
                  />
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-1 select-text">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <h4 className="text-sm font-black tracking-tight text-white dark:text-gray-950 font-mono uppercase">
                      Ndeze Bonheur Emmanuel
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500 select-all font-semibold">
                      bonheurndezenc@gmail.com
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-100 dark:text-gray-700 font-sans font-light">
                    {t("blog.reader.fromGoma") || "From Goma to the world, engineering scalable backend architectures and robust network infrastructures."}
                  </p>
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>

      {/* SHARE OVERLAY MODAL */}
      <AnimatePresence>
        {isShareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Wash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareOpen(false)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-[28px] p-6 shadow-2xl overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsShareOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 p-2 rounded-full cursor-pointer transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Title Header */}
              <div className="mb-5 select-none">
                <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white font-mono uppercase">
                  {t("blog.reader.shareTitle")}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                  {t("blog.reader.shareDesc")}
                </p>
              </div>

              {/* Article Preview Card (replicated from blog-content.tsx layout) */}
              <div className="flex flex-row items-center justify-between gap-4 p-4 rounded-[20px] border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.02] transition-all select-none mb-6">
                {/* Details (Left) */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                    <Calendar className="h-2.5 w-2.5 text-zinc-500" />
                    <span>{formatDate(post.created_at, false)}</span>
                    <span>•</span>
                    <span className="font-bold text-zinc-600 dark:text-zinc-300">
                      {getLocalizedCategoryDisplay(post.category)}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold tracking-tight text-zinc-900 dark:text-white mt-1.5 leading-snug line-clamp-2">
                    {post.title}
                  </h4>
                </div>

                {/* Cover Image Thumbnail (Right) */}
                <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 relative overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-black">
                  <img
                    src={post.image || "/placeholder_image.png"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder_image.png";
                    }}
                  />
                </div>
              </div>

              {/* Actions & Sharing Buttons */}
              <div className="space-y-4">
                {/* Primary Action: Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className={`w-full py-3 px-5 text-xs font-mono uppercase tracking-widest rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm ${
                    modalCopied
                      ? "bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/20 dark:border-green-500/30"
                      : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 border border-zinc-900 dark:border-white"
                  }`}
                >
                  {modalCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>{t("blog.reader.linkCopied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{t("blog.reader.copyLink")}</span>
                    </>
                  )}
                </button>

                {/* Social Network Pill Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20-%20${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-[10px] font-mono uppercase tracking-wider rounded-full border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] hover:bg-green-500/10 hover:border-green-500/30 text-zinc-600 dark:text-zinc-300 hover:text-green-600 dark:hover:text-white transition-all duration-300 cursor-pointer text-center"
                  >
                    {/* WhatsApp Icon */}
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-[10px] font-mono uppercase tracking-wider rounded-full border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] hover:bg-blue-600/10 hover:border-blue-600/30 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-white transition-all duration-300 cursor-pointer text-center"
                  >
                    {/* LinkedIn Icon */}
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-[10px] font-mono uppercase tracking-wider rounded-full border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/30 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-pointer text-center"
                  >
                    {/* X Icon */}
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>X</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-[10px] font-mono uppercase tracking-wider rounded-full border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] hover:bg-blue-800/10 hover:border-blue-800/30 text-zinc-600 dark:text-zinc-300 hover:text-blue-800 dark:hover:text-white transition-all duration-300 cursor-pointer text-center"
                  >
                    {/* Facebook Icon */}
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>

                {/* Instagram Helper Banner */}
                <div className="bg-gradient-to-r from-purple-500/[0.04] via-pink-500/[0.04] to-orange-500/[0.04] dark:from-purple-500/10 dark:via-pink-500/10 dark:to-orange-500/10 border border-pink-500/10 dark:border-pink-500/20 rounded-[20px] p-4 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-sans flex flex-col gap-1.5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 uppercase tracking-widest font-mono text-[9px]">
                    <svg className="h-3.5 w-3.5 text-pink-500 dark:text-pink-400 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span>{t("blog.reader.instagramGuide")}</span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {t("blog.reader.instagramDesc")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

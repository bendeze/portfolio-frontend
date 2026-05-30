"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Search, X, Calendar, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPagination } from "@/features/blog/components/blog-pagination";
import { getBlogPosts } from "@/features/blog/api";
import { useTranslation } from "@/context/language-context";

interface BlogPost {
  id: string;
  author: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string | null;
  reading_time: number;
  status: string;
  tags: string[];
  category: string | null;
  created_at: Date;
  updated_at: Date;
}

interface BlogPageContentProps {
  postsData: {
    count: number;
    results: BlogPost[];
  };
  currentPage: number;
  currentCategory: string;
  currentSearch: string;
}



// Stylized premium grid-glowing fallback image placeholder
function BlogImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 w-full h-full relative overflow-hidden bg-black select-none">
      <Image
        src="/placeholder_image.png"
        alt={title}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

const TECH_PLACEHOLDER = "/placeholder_image.png";

interface BlogImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

function BlogImage({ src, alt, fill, className, sizes, priority }: BlogImageProps) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? TECH_PLACEHOLDER : src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
      unoptimized={src.includes("localhost") || src.includes("127.0.0.1")}
    />
  );
}

export default function BlogPageContent({
  postsData,
  currentPage,
  currentCategory,
  currentSearch,
}: BlogPageContentProps) {
  const router = useRouter();
  const PAGE_SIZE = 2; // Matches Django Standard Page Size
  const totalCount = postsData.count;
  const { t, lang } = useTranslation();

  const CATEGORIES = [
    { name: t("blog.categories.all"), slug: "" },
    { name: t("blog.categories.networking"), slug: "networking" },
    { name: t("blog.categories.product"), slug: "product" },
    { name: t("blog.categories.software_dev"), slug: "software-dev" },
    { name: t("blog.categories.system_admin"), slug: "system-admi" }
  ];

  const getLocalizedCategoryName = (slug: string) => {
    switch (slug) {
      case "networking": return t("blog.categories.networking");
      case "product": return t("blog.categories.product");
      case "software-dev": return t("blog.categories.software_dev");
      case "system-admi": return t("blog.categories.system_admin");
      default: return t("blog.categories.all_categories");
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

  const formatDate = (dateInput: Date | string) => {
    try {
      const date = new Date(dateInput);
      return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return String(dateInput);
    }
  };

  // Local state for search query to ensure snappy typing experience
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Debounced search logic to push search param to Next.js Router
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // Reset page to 1 on search change
      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, router]);

  // Sync state if URL search query changes externally
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(window.location.search);
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.set("page", "1"); // Reset page to 1 on category change
    router.push(`?${params.toString()}`);
  };

  // State to hold the featured post (loaded from server props or sessionStorage cache)
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // 1. If on Page 1 (no active search/filter), store and set the latest post instantly
    if (currentPage === 1 && postsData.results.length > 0 && !currentSearch && !currentCategory) {
      const latest = postsData.results[0];
      setFeaturedPost(latest);
      try {
        sessionStorage.setItem("cached_featured_post", JSON.stringify(latest));
      } catch (err) {
        console.error("Failed to write to sessionStorage:", err);
      }
    } 
    // 2. If on Page 2+ (or if search/filter), load from client-side cache to avoid API overhead
    else {
      try {
        const cached = sessionStorage.getItem("cached_featured_post");
        if (cached) {
          setFeaturedPost(JSON.parse(cached));
        } else {
          // If no cache (e.g. direct deep link landing on Page 2), fetch from API once
          getBlogPosts(1)
            .then((data) => {
              if (data && data.results && data.results.length > 0) {
                const latest = data.results[0];
                setFeaturedPost(latest);
                sessionStorage.setItem("cached_featured_post", JSON.stringify(latest));
              }
            })
            .catch((err) => console.error("Failed to fetch featured post for cache:", err));
        }
      } catch (err) {
        console.error("Failed to read from sessionStorage:", err);
      }
    }
  }, [currentPage, postsData.results, currentSearch, currentCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } }
  };

  return (
    <div className="w-full bg-background dark:bg-[#030303] text-foreground min-h-screen py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* --- SECTION 1: FEATURED POST --- */}
        {featuredPost && !currentSearch && !currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-border/20 pb-16"
          >
            {/* Details (Left column) */}
            <div className="space-y-5 lg:col-span-5 flex flex-col justify-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-bold">
                # {t("blog.featured")}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-black dark:text-white font-sans">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300">
                  {featuredPost.title}
                </Link>
              </h1>

              {/* Meta details */}
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <time>{formatDate(featuredPost.created_at)}</time>
                </div>
                <span>•</span>
                <span className="px-2 py-0.5 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-bold">
                  {getLocalizedCategoryDisplay(featuredPost.category)}
                </span>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
                {featuredPost.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 text-xs font-mono uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-card hover:text-black dark:hover:text-white transition-all duration-300 shadow-md shadow-gray-500/5 hover:shadow-gray-500/10 cursor-pointer"
                >
                  <span>{t("blog.readBlog")}</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Image (Right column) */}
            <div className="lg:col-span-7 w-full aspect-[16/10] sm:aspect-[16/9] relative rounded-[28px] overflow-hidden border border-border/80  shadow-lg group bg-black">
              {featuredPost.image ? (
                <BlogImage
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <BlogImagePlaceholder title={featuredPost.title} />
              )}
            </div>
          </motion.div>
        )}

        {/* --- SECTION 2: FILTERS & SEARCH ROW --- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-border/20">
          {/* Category Tabs (Left) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {CATEGORIES.map((tab) => {
              const isActive = currentCategory === tab.slug;
              return (
                <button
                  key={tab.name}
                  onClick={() => handleCategoryChange(tab.slug)}
                  className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer select-none ${
                    isActive 
                      ? "text-gray-500 dark:text-gray-400 font-bold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{tab.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="absolute inset-0 bg-gray-500/5 dark:bg-gray-400/5 border border-gray-500/20 dark:border-gray-400/20 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Bar (Right) */}
          <div className="relative w-full md:w-80 flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-black/[0.01] dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-full py-2.5 pl-10 pr-10 text-xs focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 focus:ring-1 focus:ring-gray-500/10 transition-all duration-300 font-mono text-foreground placeholder:text-muted-foreground/50"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-3.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* --- SECTION 3: ARTICLES LISTING (GRID) --- */}
        <AnimatePresence mode="wait">
          {postsData.results.length > 0 ? (
            <motion.div
              key={`${currentCategory}-${currentSearch}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {postsData.results.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group flex flex-row items-center justify-between gap-6 p-6 rounded-[24px] border border-border/40 bg-black/[0.01] dark:bg-white/[0.01] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:border-gray-500/20 dark:hover:border-gray-400/20 transition-all duration-300 shadow-sm"
                >
                  {/* Article Details (Left) */}
                  <div className="flex-1 space-y-3.5 min-w-0">
                    {/* Meta Row */}
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500/80" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <span>•</span>
                      <span className="font-bold text-gray-500/90 dark:text-gray-400/90">
                        {getLocalizedCategoryDisplay(post.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300 leading-snug truncate sm:whitespace-normal sm:line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Read blog button */}
                    <div className="pt-1.5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group inline-flex items-center justify-center rounded-full bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black dark:hover:bg-white text-foreground hover:text-background dark:hover:text-black py-2.5 px-5 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        <span>{t("blog.readBlog")}</span>
                        <ArrowRight className="ml-1.5 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Article Image (Right) */}
                  <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 relative overflow-hidden rounded-2xl border border-border/50 shadow-sm bg-black">
                    {post.image ? (
                      <BlogImage
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <BlogImagePlaceholder title={post.title} />
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center space-y-4"
            >
              <div className="h-12 w-12 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-border flex items-center justify-center mx-auto text-muted-foreground text-lg font-mono">
                !
              </div>
              <h2 className="text-xl font-bold tracking-tight">{t("blog.noArticlesTitle")}</h2>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                {t("blog.noArticlesDesc")
                  .replace("{search}", searchInput)
                  .replace("{category}", getLocalizedCategoryName(currentCategory))}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSearchInput("");
                    handleCategoryChange("");
                  }}
                  className="px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-xs font-mono uppercase tracking-widest transition-all cursor-pointer"
                >
                  {t("blog.clearFilters")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- PAGINATION --- */}
        <BlogPagination
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          category={currentCategory}
          search={currentSearch}
        />

      </div>
    </div>
  );
}


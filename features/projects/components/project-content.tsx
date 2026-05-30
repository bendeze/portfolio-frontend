"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Calendar, ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPagination } from "@/features/blog/components/blog-pagination";
import { useTranslation } from "@/context/language-context";
import { Project } from "@/features/projects/schemas";
import { getProjects } from "@/features/projects/api";

interface ProjectPageContentProps {
  postsData: {
    count: number;
    results: Project[];
  };
  currentPage: number;
  currentCategory: string;
  currentSearch: string;
}

function ProjectImagePlaceholder({ title }: { title: string }) {
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

interface ProjectImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

function ProjectImage({ src, alt, fill, className, sizes, priority }: ProjectImageProps) {
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

export default function ProjectPageContent({
  postsData,
  currentPage,
  currentCategory,
  currentSearch,
}: ProjectPageContentProps) {
  const router = useRouter();
  const PAGE_SIZE = 8; // Project page size is 8
  const totalCount = postsData.count;
  const { t, lang } = useTranslation();

  const CATEGORIES = [
    { name: t("projects.categories.all") || "All", slug: "" },
    { name: t("projects.categories.networking") || "Networking", slug: "networking" },
    { name: t("projects.categories.product") || "Product", slug: "product" },
    { name: t("projects.categories.software_dev") || "Software dev", slug: "software-dev" },
    { name: t("projects.categories.system_admin") || "System Admin", slug: "system-admi" }
  ];

  const getLocalizedCategoryName = (slug: string) => {
    switch (slug) {
      case "networking": return t("projects.categories.networking") || "Networking";
      case "product": return t("projects.categories.product") || "Product";
      case "software-dev": return t("projects.categories.software_dev") || "Software dev";
      case "system-admi": return t("projects.categories.system_admin") || "System Admin";
      default: return t("projects.categories.all_categories") || "all categories";
    }
  };

  const getLocalizedCategoryDisplay = (catName: string | null) => {
    if (!catName) return t("projects.reader.general") || "General";
    const lower = catName.toLowerCase();
    if (lower.includes("network")) return t("projects.categories.networking") || "Networking";
    if (lower.includes("product")) return t("projects.categories.product") || "Product";
    if (lower.includes("soft") || lower.includes("dev")) return t("projects.categories.software_dev") || "Software dev";
    if (lower.includes("system") || lower.includes("admi")) return t("projects.categories.system_admin") || "System Admin";
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

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, router]);

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
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (currentPage === 1 && postsData.results.length > 0 && !currentSearch && !currentCategory) {
      const latest = postsData.results[0];
      setFeaturedProject(latest);
      try {
        sessionStorage.setItem("cached_featured_project", JSON.stringify(latest));
      } catch (err) {
        console.error("Failed to write featured project to sessionStorage:", err);
      }
    } else {
      try {
        const cached = sessionStorage.getItem("cached_featured_project");
        if (cached) {
          setFeaturedProject(JSON.parse(cached));
        } else {
          getProjects()
            .then((data) => {
              if (data && data.length > 0) {
                const latest = data[0];
                setFeaturedProject(latest);
                sessionStorage.setItem("cached_featured_project", JSON.stringify(latest));
              }
            })
            .catch((err) => console.error("Failed to fetch featured project for cache:", err));
        }
      } catch (err) {
        console.error("Failed to read featured project from sessionStorage:", err);
      }
    }
  }, [currentPage, postsData.results, currentSearch, currentCategory]);

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

        {/* --- SECTION 1: FEATURED PROJECT --- */}
        {featuredProject && !currentSearch && !currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-border/20 pb-16"
          >
            <div className="space-y-5 lg:col-span-5 flex flex-col justify-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 font-bold">
                # {t("projects.featured") || "Featured Project"}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-black dark:text-white font-sans">
                <Link href={`/projects/${featuredProject.slug}`} className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300">
                  {featuredProject.title}
                </Link>
              </h1>

              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <time>{formatDate(featuredProject.created_at)}</time>
                </div>
                <span>•</span>
                <span className="px-2 py-0.5 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-bold">
                  {getLocalizedCategoryDisplay(featuredProject.category)}
                </span>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
                {featuredProject.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="group inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 text-xs font-mono uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-card hover:text-black dark:hover:text-white transition-all duration-300 shadow-md shadow-gray-500/5 hover:shadow-gray-500/10 cursor-pointer"
                >
                  <span>{t("projects.readProject") || "Read project"}</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {featuredProject.demo_link && (
                  <Link
                    href={featuredProject.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 bg-zinc-100 dark:bg-white/[0.05] text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/[0.1] border border-black/5 dark:border-white/5"
                  >
                    <span>{t("projects.demoBtn") || "Demo"}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}

                {featuredProject.repo_link && (
                  <Link
                    href={featuredProject.repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-white/85 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                  >
                    <span>{t("projects.codeBtn") || "Code"}</span>
                    <Github className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 w-full aspect-[16/10] sm:aspect-[16/9] relative rounded-[28px] overflow-hidden border border-border/80 shadow-lg group bg-black">
              {featuredProject.image ? (
                <ProjectImage
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <ProjectImagePlaceholder title={featuredProject.title} />
              )}
            </div>
          </motion.div>
        )}

        {/* --- SECTION 2: FILTERS & SEARCH ROW --- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-border/20">
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
                      layoutId="activeProjectCategoryUnderline"
                      className="absolute inset-0 bg-gray-500/5 dark:bg-gray-400/5 border border-gray-500/20 dark:border-gray-400/20 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80 flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder={t("projects.searchPlaceholder") || "Search projects..."}
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

        {/* --- SECTION 3: PROJECTS LISTING (GRID) --- */}
        <AnimatePresence mode="wait">
          {postsData.results.length > 0 ? (
            <motion.div
              key={`${currentCategory}-${currentSearch}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {postsData.results.map((project) => (
                <motion.article
                  key={project.id}
                  variants={itemVariants}
                  className="group flex flex-row items-center justify-between gap-6 p-6 rounded-[24px] border border-border/40 bg-black/[0.01] dark:bg-white/[0.01] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:border-gray-500/20 dark:hover:border-gray-400/20 transition-all duration-300 shadow-sm"
                >
                  <div className="flex-1 space-y-3.5 min-w-0">
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500/80" />
                        <span>{formatDate(project.created_at)}</span>
                      </div>
                      <span>•</span>
                      <span className="font-bold text-gray-500/90 dark:text-gray-400/90">
                        {getLocalizedCategoryDisplay(project.category)}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300 leading-snug truncate sm:whitespace-normal sm:line-clamp-2">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 pt-1.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group inline-flex items-center justify-center rounded-full bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black dark:hover:bg-white text-foreground hover:text-background dark:hover:text-black py-2.5 px-5 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm border border-black/5 dark:border-white/5"
                      >
                        <span>{t("projects.readProject") || "Read project"}</span>
                        <ArrowRight className="ml-1.5 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      {project.demo_link && (
                        <Link
                          href={project.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-300 bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-sm"
                        >
                          <span>{t("projects.demoBtn") || "Demo"}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}

                      {project.repo_link && (
                        <Link
                          href={project.repo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-300 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-white/80 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <span>{t("projects.codeBtn") || "Code"}</span>
                          <Github className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 relative overflow-hidden rounded-2xl border border-border/50 shadow-sm bg-black">
                    {project.image ? (
                      <ProjectImage
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <ProjectImagePlaceholder title={project.title} />
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
              <h2 className="text-xl font-bold tracking-tight">{t("projects.noProjectsTitle") || "No projects found"}</h2>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                {(t("projects.noProjectsDesc") || "No matching projects were found for \"{search}\" in {category}.")
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
                  {t("projects.clearFilters") || "Clear all filters"}
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

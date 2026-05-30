import React from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * High-fidelity loading skeleton mirroring the exact layout of the Blog Index page.
 * Replicates the featured split post, search/filter rows, and articles grids.
 */
export default function BlogListSkeleton() {
  return (
    <div className="w-full bg-background dark:bg-[#030303] text-foreground min-h-screen py-24 px-6 md:px-12 lg:px-20 animate-pulse select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header Placeholder */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-12 w-64 rounded-lg" />
        </div>

        {/* --- SECTION 1: FEATURED ARTICLE SKELETON --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-12 border-b border-border/20">
          {/* Details (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-full" />
            </div>
            
            <div className="space-y-3">
              <Skeleton className="h-10 sm:h-12 w-11/12 rounded-lg" />
              <Skeleton className="h-10 sm:h-12 w-3/4 rounded-lg" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Skeleton className="h-3 w-28 rounded-md" />
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
          </div>

          {/* Large cover image (Right) */}
          <div className="lg:col-span-5 w-full">
            <Skeleton className="w-full aspect-[16/10] max-h-[360px] rounded-3xl" />
          </div>
        </div>

        {/* --- SECTION 2: FILTERS & SEARCH ROW SKELETON --- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-border/20">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
          {/* Search Input */}
          <Skeleton className="h-10 w-full md:w-80 rounded-full" />
        </div>

        {/* --- SECTION 3: ARTICLES LIST GRID SKELETON --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="group flex flex-row items-center justify-between p-6 sm:p-8 rounded-3xl border border-border/40 bg-black/[0.01] dark:bg-white/[0.01] gap-6"
            >
              {/* Details (Left) */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-16 rounded-full" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 sm:h-6 w-11/12 rounded-md" />
                  <Skeleton className="h-5 sm:h-6 w-2/3 rounded-md" />
                </div>
                <Skeleton className="h-3 w-1/3 rounded-md" />
              </div>

              {/* Cover image thumbnail (Right) */}
              <Skeleton className="w-24 sm:w-32 h-24 sm:h-32 rounded-2xl shrink-0" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/**
 * High-fidelity loading skeleton mirroring the exact layout of the Blog Read page.
 * Replicates the left sticky details sidebar, cascading TOC links, and prose contents.
 */
export function BlogReaderSkeleton() {
  return (
    <div className="w-full bg-background dark:bg-[#030303] text-foreground min-h-screen py-24 px-6 md:px-12 lg:px-20 animate-pulse select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Back button placeholder */}
        <Skeleton className="h-10 w-32 rounded-full mb-10 -ml-4" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: STICKY ARTICLE DETAILS SIDEBAR --- */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 lg:h-[calc(100vh-10rem)] hidden lg:block pr-4">
            <div className="space-y-8 pt-1">
              
              {/* Article details card */}
              <div className="space-y-4">
                <Skeleton className="h-5 w-32 rounded-md" />
                
                <div className="space-y-4 flex flex-col">
                  {/* Published */}
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 rounded-md" />
                    <Skeleton className="h-4 w-28 rounded-md" />
                  </div>
                  {/* Reading time */}
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                  {/* Category */}
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>

              <Separator className="border-border/30" />

              {/* Table of contents headings list */}
              <div className="space-y-4">
                <Skeleton className="h-3.5 w-28 rounded-md" />
                <div className="space-y-3 pl-1 border-l border-border/40">
                  <Skeleton className="h-4 w-11/12 rounded-md pl-3" />
                  <Skeleton className="h-4 w-10/12 rounded-md pl-3" />
                  <Skeleton className="h-4 w-8/12 rounded-md pl-6" />
                  <Skeleton className="h-4 w-9/12 rounded-md pl-6" />
                  <Skeleton className="h-4 w-7/12 rounded-md pl-3" />
                </div>
              </div>

              {/* Vercel Promo Card Placeholder */}
              <div className="rounded-2xl border border-border/50 bg-[#f9f9f9]/80 dark:bg-[#060606]/40 p-5 space-y-3.5">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full rounded-md" />
                  <Skeleton className="h-3 w-11/12 rounded-md" />
                  <Skeleton className="h-3 w-5/6 rounded-md" />
                </div>
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>

            </div>
          </aside>

          {/* --- RIGHT COLUMN: MAIN ARTICLE BODY --- */}
          <main className="lg:col-span-9 max-w-3xl w-full mx-auto space-y-10">
            
            <header className="space-y-5">
              {/* Mobile Meta Details badging */}
              <div className="flex gap-3 lg:hidden">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-10 sm:h-12 w-full rounded-lg" />
                <Skeleton className="h-10 sm:h-12 w-5/6 rounded-lg" />
              </div>
              
              <div className="space-y-2 border-l-2 border-border/40 pl-4 py-0.5">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-11/12 rounded-md" />
              </div>
            </header>

            {/* Giant cover image */}
            <Skeleton className="w-full aspect-[16/10] max-h-[480px] rounded-3xl" />

            {/* Content body paragraph lines */}
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-11/12 rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-10/12 rounded-md" />
              </div>

              {/* Blockquote Skeleton */}
              <div className="border-l-4 border-border pl-6 py-2">
                <Skeleton className="h-5 w-11/12 rounded-md italic" />
                <Skeleton className="h-5 w-3/4 rounded-md italic mt-2" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>

              {/* Coding container skeleton */}
              <div className="rounded-xl border border-border bg-[#030303] p-5 space-y-3">
                <div className="flex gap-1.5 pb-2 border-b border-border/20">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/3 rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
            </div>

          </main>
        </div>

      </div>
    </div>
  );
}
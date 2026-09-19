import { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { SearchClient } from "@/components/reader/search-client";

export const metadata: Metadata = {
  title: "Search | E. Ndeze Bonheur",
  description: "Instant search across all technical articles, posts, code, and projects.",
};

export default function SearchPage() {
  const articles = getAllContent("articles");
  const posts = getAllContent("posts");
  const projects = getAllContent("projects");

  const allItems = [...articles, ...posts, ...projects];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <SearchClient allItems={allItems} />
    </div>
  );
}

import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TechMarqueeSection } from "@/components/sections/tech-marquee";
import { PlatformsSection } from "@/components/sections/platforms";
import { BlogSection, BlogPost } from "@/components/sections/blog";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { safeFetch } from "@/lib/api-fetch";

export const dynamic = "force-dynamic";

interface BlogApiResponse {
  results: BlogPost[];
}

export default async function Home() {
  const blogData = await safeFetch<BlogApiResponse>(
    "/blog/?page_size=10",
    {},
    { results: [] }
  );

  const posts = blogData?.results || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <TechMarqueeSection />
      <PlatformsSection />
      <BlogSection posts={posts} />
      <ContactSection />
    </div>
  );
}


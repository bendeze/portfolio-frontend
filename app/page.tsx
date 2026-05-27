import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectList } from "@/features/projects/components/project-hero-list";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { safeFetch } from "@/lib/api-fetch";
import { z } from "zod";
import { PaginatedResponseSchema, ProjectSchema } from "@/features/projects/schemas";

// Explicitly define ISR revalidation strategy (1 hour)
export const revalidate = 3600;

export default async function Home() {
  // Fetch featured projects on the server with native fetch caching & revalidation
  const responseData = await safeFetch<any>("/projects/featured/?page_size=4", {}, null);

  let featuredProjects: any[] = [];
  if (responseData) {
    const parsedData = PaginatedResponseSchema.safeParse(responseData);
    if (parsedData.success) {
      try {
        featuredProjects = z.array(ProjectSchema).parse(parsedData.data.results);
      } catch (err: any) {
        console.error("[Home] Zod mapping failed for featured projects:", err.message || err);
      }
    } else {
      console.error("[Home] Zod schema validation failed for featured projects API:", parsedData.error.message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <ProjectList projects={featuredProjects} />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
